// Streams a text answer for the AI playground. The browser never sees the key.
import { GoogleGenAI } from '@google/genai';

export const config = { runtime: 'nodejs' };

const MODEL = 'gemini-2.5-flash';
const MAX_PROMPT_CHARS = 8000;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'POST only' });
  }
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY is not set on the server' });

  const body = typeof req.body === 'string' ? safeJson(req.body) : req.body || {};
  const prompt = String(body.prompt || '').slice(0, MAX_PROMPT_CHARS);
  const system = String(body.system || '').slice(0, 2000);
  if (!prompt.trim()) return res.status(400).json({ error: 'prompt is required' });

  try {
    const ai = new GoogleGenAI({ apiKey });
    const stream = await ai.models.generateContentStream({
      model: MODEL,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: system ? { systemInstruction: system } : undefined,
    });
    res.status(200);
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    for await (const chunk of stream) {
      if (chunk.text) res.write(chunk.text);
    }
    res.end();
  } catch (e: any) {
    console.error('[gemini-generate]', e?.message || e);
    if (!res.headersSent) res.status(502).json({ error: 'generation failed' });
    else res.end();
  }
}

function safeJson(s: string) {
  try { return JSON.parse(s); } catch { return {}; }
}
