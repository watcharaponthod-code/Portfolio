// Text chat for the assistant panel. RAG: embed the question, pull the top
// chunks from the in-memory vector index (lib/server/rag.ts), and stream a
// short answer from the fastest Gemini text model. The browser never sees the
// key. Response is a plain text stream; the chunk ids used are returned in
// the X-Sources header so the UI can show them.
import { GoogleGenAI } from '@google/genai';
import { retrieve, formatContext } from '../lib/server/rag.js';

export const config = { runtime: 'nodejs' };

const MODEL = 'gemini-2.5-flash-lite';
const MAX_TURNS = 8;
const MAX_MSG_CHARS = 2000;

type Msg = { role: 'user' | 'assistant'; content: string };

function systemPrompt(lang: 'th' | 'en', context: string) {
  return `You are the assistant on Watcharapon Thodraksa's portfolio site, answering visitors (recruiters, clients, engineers) about him and his work.

Answer in ${lang === 'th' ? 'Thai (ภาษาไทย), polite with ครับ, and call him คุณวัชรพล' : 'English, and call him Watcharapon'}.

STYLE
- Direct and factual. No hype, no promotional adjectives. Say what was measured and on what evidence.
- Short: 1 to 4 sentences for simple questions, a few short bullet points at most for broad ones. Plain text, no headers, no tables.
- Quote numbers exactly as they appear in the context (F1 0.883, 95.7%, 3.34M views). Never invent numbers or projects.
- If the context does not cover the question, say so in one sentence and offer the closest related fact. Do not guess.
- Do not mention "the context" or "the knowledge base"; just answer.

CONTEXT (retrieved for this question)
${context}`;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'POST only' });
  }
  const apiKey = process.env['GEMINI_API_KEY']; // bracket form so vite's define cannot replace it in dev
  if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY is not set on the server' });

  const body = typeof req.body === 'string' ? safeJson(req.body) : req.body || {};
  const lang: 'th' | 'en' = body.lang === 'en' ? 'en' : 'th';
  const raw: Msg[] = Array.isArray(body.messages) ? body.messages : [];
  const messages = raw
    .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map(m => ({ role: m.role, content: m.content.slice(0, MAX_MSG_CHARS) }))
    .slice(-MAX_TURNS * 2);
  const last = [...messages].reverse().find(m => m.role === 'user');
  if (!last || !last.content.trim()) return res.status(400).json({ error: 'a user message is required' });

  const t0 = Date.now();
  try {
    const ai = new GoogleGenAI({ apiKey });
    const hits = await retrieve(ai, last.content, 5);
    const tRetrieve = Date.now() - t0;

    const stream = await ai.models.generateContentStream({
      model: MODEL,
      contents: messages.map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.content }] })),
      config: {
        systemInstruction: systemPrompt(lang, formatContext(hits)),
        temperature: 0.3,
        maxOutputTokens: 600,
        thinkingConfig: { thinkingBudget: 0 },
      },
    });

    res.status(200);
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Sources', hits.map(h => h.chunk.id).join(','));
    res.setHeader('X-Retrieval', `${hits[0]?.method || 'none'};${tRetrieve}ms`);
    res.setHeader('X-Model', MODEL);
    for await (const chunk of stream) {
      if (chunk.text) res.write(chunk.text);
    }
    res.end();
  } catch (e: any) {
    console.error('[chat]', e?.message || e);
    if (!res.headersSent) res.status(502).json({ error: 'chat failed' });
    else res.end();
  }
}

function safeJson(s: string) {
  try { return JSON.parse(s); } catch { return {}; }
}
