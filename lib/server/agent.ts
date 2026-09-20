// The assistant as a small LangGraph state machine rather than a single call.
//
// route -> (retrieve) -> answer -> remember
//
// `route` decides in one cheap call whether the question needs the knowledge
// base at all. Small talk and follow-ups skip retrieval, which is what keeps
// the reply fast. `retrieve` pulls the few chunks that matter. `answer`
// streams. `remember` writes back the handful of facts worth carrying into the
// next turn, which is what makes it behave like an agent with memory instead
// of a chatbot that starts from nothing every time.
import { StateGraph, Annotation, START, END } from '@langchain/langgraph';
import { GoogleGenAI } from '@google/genai';
import { retrieve, formatContext, hasThai, type Hit } from './rag.js';
import { generateText } from './generate.js';

export interface Memory {
  /** who the visitor said they are, if they said */
  visitor?: string;
  /** what they are here for, in their own words */
  intent?: string;
  /** short notes the assistant chose to keep */
  notes?: string[];
}

const State = Annotation.Root({
  question: Annotation<string>(),
  lang: Annotation<'th' | 'en'>(),
  history: Annotation<{ role: 'user' | 'assistant'; content: string }[]>({
    reducer: (_, b) => b,
    default: () => [],
  }),
  memory: Annotation<Memory>({ reducer: (a, b) => ({ ...a, ...b }), default: () => ({}) }),
  needsFacts: Annotation<boolean>({ reducer: (_, b) => b, default: () => true }),
  hits: Annotation<Hit[]>({ reducer: (_, b) => b, default: () => [] }),
  context: Annotation<string>({ reducer: (_, b) => b, default: () => '' }),
});

export type AgentState = typeof State.State;

const SMALL_TALK = /^(hi|hey|hello|thanks|thank you|ok|okay|cool|bye|สวัสดี|ขอบคุณ|โอเค|ครับ|ค่ะ|บาย)\b/i;

export function buildGraph(ai: GoogleGenAI | null) {
  const graph = new StateGraph(State)
    // Decide whether this turn needs the knowledge base.
    .addNode('route', async (s: AgentState) => {
      const q = s.question.trim();
      if (q.length < 12 && SMALL_TALK.test(q)) return { needsFacts: false };
      return { needsFacts: true };
    })
    // Pull the chunks that matter, translating the question first if a Thai
    // query finds nothing in the English knowledge base.
    .addNode('retrieve', async (s: AgentState) => {
      // "and under cloud?" carries no subject of its own, so a short follow-up
      // is searched together with the question before it.
      const prevUser = [...s.history].reverse().find((m, i) => i > 0 && m.role === 'user');
      const query = s.question.trim().length <= 40 && prevUser
        ? `${prevUser.content} ${s.question}`
        : s.question;
      let hits = await retrieve(ai, query, 5);
      if (hasThai(query) && hits[0]?.method === 'keyword' && (hits[0]?.score ?? 0) < 2) {
        try {
          const { text: en } = await generateText(ai, {
            system: 'Translate the user question into short English search keywords. Output only the keywords.',
            contents: [{ role: 'user', parts: [{ text: query }] }],
            maxOutputTokens: 40,
            temperature: 0,
          });
          if (en) hits = await retrieve(ai, `${query} ${en}`, 5);
        } catch { /* keep what we have */ }
      }
      return { hits, context: formatContext(hits) };
    })
    .addEdge(START, 'route')
    .addConditionalEdges('route', (s: AgentState) => (s.needsFacts ? 'retrieve' : END), {
      retrieve: 'retrieve',
      [END]: END,
    })
    .addEdge('retrieve', END);

  return graph.compile();
}

/** The system prompt, with memory and retrieved context folded in. */
export function systemPrompt(lang: 'th' | 'en', context: string, memory: Memory) {
  const mem: string[] = [];
  if (memory.visitor) mem.push(`The visitor is: ${memory.visitor}`);
  if (memory.intent) mem.push(`What they came for: ${memory.intent}`);
  if (memory.notes?.length) mem.push(`Earlier in this conversation: ${memory.notes.slice(-6).join(' · ')}`);

  return `You are the assistant on Watcharapon Thodraksa's portfolio site, answering visitors (recruiters, clients, engineers) about him and his work.

Answer in ${lang === 'th' ? 'Thai (ภาษาไทย), polite with ครับ, and call him คุณวัชรพล' : 'English, and call him Watcharapon'}.

STYLE
- Answer the question that was asked, first sentence. No preamble, no restating the question, no "great question".
- Direct and factual. No hype, no promotional adjectives. Say what was measured and on what evidence.
- Short: 1 to 3 sentences for a simple question. Plain text, no markdown, no headers.
- Quote numbers exactly as they appear in the context (F1 0.883, 95.7%, 3.34M views). Never invent numbers or projects.
- If the context does not cover it, say so in one sentence and offer the closest fact. Do not guess.
- Do not mention "the context" or "the knowledge base"; just answer.
${mem.length ? `\nWHAT YOU ALREADY KNOW ABOUT THIS VISITOR\n${mem.join('\n')}\nUse it to stay on their thread. Do not repeat it back to them unprompted.` : ''}
${context ? `\nCONTEXT (retrieved for this question)\n${context}` : ''}`;
}

const MEMORY_RULES = `Read the exchange and return ONLY a JSON object with these optional keys:
{"visitor": "...", "intent": "...", "note": "..."}

- "visitor": ONLY when the visitor states something about themselves in the first person, for example "I am a recruiter at X" or "ผมเป็นเจ้าของโรงงาน". Never a project name, never the person the site is about. Omit it otherwise.
- "intent": what the visitor is trying to find out, in a few words.
- "note": one fact from this exchange worth having in the next turn.

Include a key only when the exchange actually establishes it. Return {} when nothing new was established. No commentary, no code fence.`;

/** Extracts what is worth carrying into the next turn. Cheap and best-effort. */
export async function updateMemory(
  ai: GoogleGenAI | null,
  memory: Memory,
  question: string,
  answer: string,
): Promise<Memory> {
  try {
    const { text } = await generateText(ai, {
      system: MEMORY_RULES,
      contents: [{ role: 'user', parts: [{ text: `VISITOR: ${question}\nASSISTANT: ${answer.slice(0, 600)}` }] }],
      maxOutputTokens: 160,
      temperature: 0,
    });
    const raw = text.replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
    const a = raw.indexOf('{'), b = raw.lastIndexOf('}');
    if (a < 0 || b <= a) return memory;
    const got = JSON.parse(raw.slice(a, b + 1)) as { visitor?: string; intent?: string; note?: string };
    const next: Memory = { ...memory };
    // Guard against the extractor mistaking the subject of the question for
    // the person asking it.
    const firstPerson = /\b(i|i'm|i am|we|my|our|me)\b|ผม|ฉัน|ดิฉัน|เรา|หนู/i.test(question);
    if (got.visitor && firstPerson) next.visitor = String(got.visitor).slice(0, 120);
    if (got.intent) next.intent = String(got.intent).slice(0, 160);
    if (got.note) {
      const notes = [...(memory.notes || []), String(got.note).slice(0, 160)];
      next.notes = notes.slice(-8);
    }
    return next;
  } catch {
    return memory;
  }
}
