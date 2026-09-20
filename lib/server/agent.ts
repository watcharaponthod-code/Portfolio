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
  plan: Annotation<string[]>({ reducer: (_, b) => b, default: () => [] }),
  coverage: Annotation<number>({ reducer: (_, b) => b, default: () => 0 }),
  hits: Annotation<Hit[]>({ reducer: (_, b) => b, default: () => [] }),
  context: Annotation<string>({ reducer: (_, b) => b, default: () => '' }),
});

export type AgentState = typeof State.State;

const SMALL_TALK = /^(hi|hey|hello|thanks|thank you|ok|okay|cool|bye|สวัสดี|ขอบคุณ|โอเค|ครับ|ค่ะ|บาย)\b/i;

export function buildGraph(ai: GoogleGenAI | null) {
  /** Retrieval for one query string, translating Thai into search keywords. */
  const search = async (q: string, k: number) => {
    let query = q;
    if (hasThai(q)) {
      try {
        const { text: en } = await generateText(ai, {
          system: 'Turn the question into 3 to 8 English search keywords for a portfolio knowledge base about satellite ML, computer vision, RAG systems and mobile apps. Output only the keywords, space separated, no punctuation.',
          contents: [{ role: 'user', parts: [{ text: q }] }],
          maxOutputTokens: 40,
          temperature: 0,
        });
        if (en) query = `${q} ${en}`;
      } catch { /* fall back to the raw question */ }
    }
    return retrieve(ai, query, k);
  };

  const graph = new StateGraph(State)
    // Small talk needs no facts at all; everything else does.
    .addNode('route', async (s: AgentState) => {
      const q = s.question.trim();
      if (q.length < 12 && SMALL_TALK.test(q)) return { needsFacts: false, plan: [] };
      return { needsFacts: true };
    })
    // Break the question into the few things that actually have to be looked
    // up. "Tell me about the satellite project and what was hard" is two
    // searches, and answering it from one is how answers end up incomplete.
    .addNode('makePlan', async (s: AgentState) => {
      // a short follow-up inherits the question before it
      // "which company?" only makes sense next to what was just said, so a
      // short follow-up is planned and searched with the previous question
      // AND the previous answer, not the question alone.
      const prevUser = [...s.history].reverse().find((m, i) => i > 0 && m.role === 'user');
      const prevAnswer = [...s.history].reverse().find(m => m.role === 'assistant');
      const short = s.question.trim().length <= 40;
      const base = short && prevUser
        ? `${prevUser.content} ${s.question}` + (prevAnswer ? ` (about: ${prevAnswer.content.slice(0, 240)})` : '')
        : s.question;
      try {
        const { text } = await generateText(ai, {
          system: 'Split the question into 1 to 3 short English search queries covering every part of it. One per line, no numbering, no commentary. If the question asks one thing, return one line.',
          contents: [{ role: 'user', parts: [{ text: base }] }],
          maxOutputTokens: 90,
          temperature: 0,
        });
        const lines = text.split('\n').map(l => l.replace(/^[-*\d.\s]+/, '').trim()).filter(l => l.length > 2).slice(0, 3);
        return { plan: lines.length ? [base, ...lines] : [base] };
      } catch {
        return { plan: [base] };
      }
    })
    // Run every query, merge the results, keep the best of each chunk.
    .addNode('search', async (s: AgentState) => {
      const runs = await Promise.all(s.plan.map(q => search(q, 5)));
      // Every sub-query keeps its two best hits no matter what, so "did the
      // mill do RAG?" still surfaces the RAG work even when the mill chunks
      // outscore it. The rest of the budget is filled by score.
      const keep = new Map<string, Hit>();
      for (const run of runs) for (const h of run.slice(0, 2)) if (!keep.has(h.chunk.id)) keep.set(h.chunk.id, h);
      const rest = new Map<string, Hit>();
      for (const run of runs) for (const h of run) {
        if (keep.has(h.chunk.id)) continue;
        const prev = rest.get(h.chunk.id);
        if (!prev || h.score > prev.score) rest.set(h.chunk.id, h);
      }
      const hits = [...keep.values(), ...[...rest.values()].sort((a, b) => b.score - a.score)].slice(0, 12);
      return { hits, context: formatContext(hits), coverage: hits.length };
    })
    // Retrieval is recall; this is precision. The model reads the candidates
    // and keeps only the ones that actually answer the question, so the final
    // context is tight and the answer does not wander into neighbouring topics.
    .addNode('rerank', async (s: AgentState) => {
      if (s.hits.length <= 4) return {};
      try {
        const listing = s.hits.map((h, i) => `[${i}] ${h.chunk.title}\n${h.chunk.text.slice(0, 320)}`).join('\n\n');
        const { text } = await generateText(ai, {
          system: 'You select passages. Given a question and numbered passages, output the indices of the passages needed to answer it fully, most relevant first, comma separated, at most 6. Output only the indices.',
          contents: [{ role: 'user', parts: [{ text: `QUESTION: ${s.question}\n\nPASSAGES:\n${listing}` }] }],
          maxOutputTokens: 40,
          temperature: 0,
        });
        const picked = Array.from(new Set((text.match(/\d+/g) || []).map(Number))).filter(i => i >= 0 && i < s.hits.length).slice(0, 7);
        // keep the planner's guaranteed hits (the first two per sub-query) even if the reranker skipped them
        const guaranteed = Math.min(s.hits.length, (s.plan.length || 1) * 2);
        for (let i = 0; i < guaranteed; i++) if (!picked.includes(i)) picked.push(i);
        if (picked.length < 2) return {};
        const hits = picked.map(i => s.hits[i]);
        return { hits, context: formatContext(hits), coverage: hits.length };
      } catch {
        return {};
      }
    })
    // Nothing matched: widen once with the bare question before giving up, so
    // a phrasing the planner mangled still has a chance.
    .addNode('widen', async (s: AgentState) => {
      const hits = await search(s.question, 8);
      return { hits, context: formatContext(hits), coverage: hits.length };
    })
    .addEdge(START, 'route')
    .addConditionalEdges('route', (s: AgentState) => (s.needsFacts ? 'makePlan' : END), { makePlan: 'makePlan', [END]: END })
    .addEdge('makePlan', 'search')
    .addConditionalEdges('search', (s: AgentState) => (s.coverage === 0 ? 'widen' : 'rerank'), { widen: 'widen', rerank: 'rerank' })
    .addEdge('rerank', END)
    .addEdge('widen', END);

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
- If asked whether something was done in one place and the context shows it was done somewhere else (for example RAG at Sycapt, not at the mill), say where it was actually done and when.
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
