// Layer 2 of the assistant: the "brain". The realtime voice model (layer 1,
// Gemini Live in the browser) handles listening and speaking; whenever the
// visitor asks something factual it calls the ask_brain tool, which lands
// here. This layer has the full knowledge base and a text model with room to
// reason, and returns a short spoken-style answer for layer 1 to read out.
import { GoogleGenAI } from '@google/genai';
import { KNOWLEDGE_BASE } from '../lib/knowledge';
import { IDENTITY_CONTEXT_STRING } from '../lib/identity';

export const config = { runtime: 'nodejs' };

const MODEL = 'gemini-2.5-flash';
const MAX_QUESTION_CHARS = 1500;

const KB = KNOWLEDGE_BASE.map(s => `## ${s.title}\n${s.content}`).join('\n\n');

function systemPrompt(lang: 'th' | 'en') {
  return `You are the knowledge layer behind Watcharapon's voice assistant. A realtime voice model talks to the visitor; it forwards factual questions to you and reads your answer aloud verbatim.

--- IDENTITY ---
${IDENTITY_CONTEXT_STRING}

--- KNOWLEDGE BASE ---
${KB}

RULES
- Answer in ${lang === 'th' ? 'Thai (ภาษาไทย), polite register with ครับ, refer to him as คุณวัชรพล' : 'English, refer to him as Watcharapon'}.
- The answer will be spoken, so write plain sentences: no markdown, no bullet points, no URLs, no emojis.
- 2 to 4 sentences, at most about 90 words. Lead with the direct answer.
- Use only the knowledge above. Quote numbers exactly as written (F1 0.883, 95.7%, 3.34M views). If the knowledge does not cover it, say so plainly and offer the closest related fact.
- No hype, no promotional adjectives. State what was measured and on what evidence.`;
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

  try {
    const ai = new GoogleGenAI({ apiKey });
    const r = await ai.models.generateContent({
      model: MODEL,
      contents: [{ role: 'user', parts: [{ text: question }] }],
      config: {
        systemInstruction: systemPrompt(lang),
        temperature: 0.3,
        maxOutputTokens: 400,
        thinkingConfig: { thinkingBudget: 512 },
      },
    });
    const answer = (r.text || '').trim();
    if (!answer) return res.status(502).json({ error: 'empty answer' });
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ answer, model: MODEL });
  } catch (e: any) {
    console.error('[brain]', e?.message || e);
    return res.status(502).json({ error: 'brain failed' });
  }
}

function safeJson(s: string) {
  try { return JSON.parse(s); } catch { return {}; }
}
