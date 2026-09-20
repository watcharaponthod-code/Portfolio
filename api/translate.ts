// On-demand translation for the long-form content (case studies, project cards)
// that is written once in English. The hand-written Thai in lib/i18n takes
// precedence; this fills in everything else so the whole site can switch
// language without maintaining a second copy of every paragraph.
//
// Cached twice: in this function instance (a Map, so repeat visitors in the same
// region pay nothing) and in the visitor's localStorage on the client side.
import { GoogleGenAI } from '@google/genai';
import { generateText } from '../lib/server/generate.js';

export const config = { runtime: 'nodejs' };

const MAX_ITEMS = 60;
const MAX_CHARS = 24000;
const cache = new Map<string, string>();

const RULES = `You translate a software engineer's portfolio from English into Thai.

RULES
- Natural, plain Thai that a Thai engineer or recruiter would write. Not machine-translation Thai.
- Keep every number, unit and metric exactly as written: F1 0.883, 95.7%, ±0.10, 8,924, 3.34M, 70 fps, 3.9 ms.
- Keep in English: product names, model names, libraries, file names, APIs and standard technical terms that Thai engineers say in English (Sentinel-1, NDVI, LightGBM, PyTorch, ONNX, RAG, LLM, YOLO, FastAPI, Docker, CNN, log-mel spectrogram, precision, recall, out-of-block).
- Keep the tone: direct and factual, no marketing adjectives, no exaggeration. If the English admits a limitation, the Thai must admit it just as plainly.
- Use ครับ only where the sentence speaks to the reader; most lines are descriptions and need no particle.
- Do not add, remove or reorder information. Do not add markdown.
- Translate each item independently and return them in the same order.`;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'POST only' });
  }
  // Either provider is enough: Groq answers, Gemini embeds. With only one of
  // them set the other half degrades (keyword retrieval, or no answer at all).
  const apiKey = process.env['GEMINI_API_KEY'] || ''; // bracket form so vite's define cannot replace it in dev
  if (!apiKey && !process.env['GROQ_API_KEY']) return res.status(500).json({ error: 'no model provider is configured on the server' });

  const body = typeof req.body === 'string' ? safeJson(req.body) : req.body || {};
  const items: string[] = Array.isArray(body.texts) ? body.texts.filter((t: any) => typeof t === 'string') : [];
  if (!items.length) return res.status(400).json({ error: 'texts is required' });
  if (items.length > MAX_ITEMS) return res.status(400).json({ error: `at most ${MAX_ITEMS} items per call` });

  const out: (string | null)[] = items.map(t => cache.get(t) ?? null);
  const todo = items.map((t, i) => ({ t, i })).filter(x => out[x.i] === null);

  if (todo.length) {
    const total = todo.reduce((n, x) => n + x.t.length, 0);
    if (total > MAX_CHARS) return res.status(400).json({ error: 'batch too large' });
    try {
      const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;
      const payload = JSON.stringify(todo.map(x => x.t));
      const { text } = await generateText(ai, {
        system: RULES + '\n\nINPUT is a JSON array of strings. OUTPUT ONLY a JSON array of the same length, same order, translated. No code fence, no commentary.',
        contents: [{ role: 'user', parts: [{ text: payload }] }],
        maxOutputTokens: 8192,
        temperature: 0.2,
      });
      const parsed = parseArray(text);
      if (!parsed || parsed.length !== todo.length) throw new Error(`model returned ${parsed ? parsed.length : 'non-array'} for ${todo.length} items`);
      todo.forEach((x, k) => {
        const v = String(parsed[k] ?? '').trim() || x.t;
        cache.set(x.t, v);
        out[x.i] = v;
      });
    } catch (e: any) {
      console.error('[translate]', e?.message || e);
      // fall back to the English text rather than showing nothing
      todo.forEach(x => { out[x.i] = x.t; });
    }
  }

  res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=604800');
  return res.status(200).json({ texts: out });
}

function parseArray(s: string): any[] | null {
  const cleaned = s.replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
  try {
    const v = JSON.parse(cleaned);
    return Array.isArray(v) ? v : null;
  } catch {
    const a = cleaned.indexOf('['), b = cleaned.lastIndexOf(']');
    if (a >= 0 && b > a) { try { const v = JSON.parse(cleaned.slice(a, b + 1)); return Array.isArray(v) ? v : null; } catch {} }
    return null;
  }
}

function safeJson(s: string) {
  try { return JSON.parse(s); } catch { return {}; }
}
