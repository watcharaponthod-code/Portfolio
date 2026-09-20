// Layer 2 of the voice assistant: the "brain". The realtime voice model
// (layer 1, Gemini Live in the browser) handles listening and speaking; when
// the visitor asks something factual it calls the ask_brain tool, which lands
// here. Retrieval pulls the few chunks that matter from the in-memory vector
// index, and the fastest text model turns them into a short spoken answer.
// Speed matters more than depth here: the visitor is waiting mid-sentence.
import { GoogleGenAI } from '@google/genai';
import { retrieve, formatContext } from '../lib/server/rag.js';
import { generateText } from '../lib/server/generate.js';

export const config = { runtime: 'nodejs' };

const MAX_QUESTION_CHARS = 1500;

function systemPrompt(lang: 'th' | 'en', context: string) {
  return `You are the knowledge layer behind Watcharapon's voice assistant. A realtime voice model forwards factual questions to you and reads your answer aloud verbatim.

RULES
- Answer in ${lang === 'th' ? 'Thai (ภาษาไทย), polite with ครับ, call him คุณวัชรพล' : 'English, call him Watcharapon'}.
- Spoken style: plain sentences, no markdown, no bullets, no URLs, no emojis.
- 1 to 3 sentences, at most about 60 words. Lead with the direct answer.
- Use only the context below. Quote numbers exactly (F1 0.883, 95.7%, 3.34M views). If the context does not cover it, say so plainly and offer the closest related fact.
- No hype. State what was measured and on what evidence.

CONTEXT
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
  const question = String(body.question || '').slice(0, MAX_QUESTION_CHARS).trim();
  const lang: 'th' | 'en' = body.lang === 'en' ? 'en' : 'th';
  if (!question) return res.status(400).json({ error: 'question is required' });

  const t0 = Date.now();
  try {
    const ai = new GoogleGenAI({ apiKey });
    const hits = await retrieve(ai, question, 4);
    const { text, model } = await generateText(ai, {
      system: systemPrompt(lang, formatContext(hits)),
      contents: [{ role: 'user', parts: [{ text: question }] }],
      maxOutputTokens: 600,
    });
    const answer = text;
    if (!answer) return res.status(502).json({ error: 'empty answer' });
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ answer, model, sources: hits.map(h => h.chunk.id), ms: Date.now() - t0 });
  } catch (e: any) {
    console.error('[brain]', e?.stack || e?.message || e);
    return res.status(502).json({ error: 'brain failed' });
  }
}

function safeJson(s: string) {
  try { return JSON.parse(s); } catch { return {}; }
}
