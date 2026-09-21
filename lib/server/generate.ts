// One place that turns a prompt into text, whichever provider is configured.
//
// Groq is used when GROQ_API_KEY is set: it is fast and its free tier is far
// more generous than Gemini's, which is what knocked the assistant offline.
// Gemini remains the fallback, and within Gemini the first model id that
// answers is remembered for the life of the function instance.
import { GoogleGenAI } from '@google/genai';

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODELS = ['qwen/qwen3.8-27b', 'openai/gpt-oss-120b'];
const GEMINI_MODELS = ['gemini-2.5-flash-lite', 'gemini-2.5-flash'];
// Gemini 2.5 thinks by default and those tokens come out of maxOutputTokens,
// which truncates short answers. Ask for no thinking; if a model rejects the
// field, retry without it.
const THINK_OFF = { thinkingConfig: { thinkingBudget: 0 } } as const;

let chosenGemini: string | null = null;
let chosenGroq: string | null = null;

export interface GenOpts {
  system: string;
  contents: any[];
  maxOutputTokens: number;
  temperature?: number;
}

const groqKey = () => process.env['GROQ_API_KEY'];

/** Gemini-shaped contents -> OpenAI-shaped messages. */
function toMessages(o: GenOpts) {
  const msgs: { role: string; content: string }[] = [{ role: 'system', content: o.system }];
  for (const c of o.contents) {
    const text = (c.parts || []).map((p: any) => p.text || '').join('');
    msgs.push({ role: c.role === 'model' ? 'assistant' : 'user', content: text });
  }
  return msgs;
}

async function groqCall(o: GenOpts, stream: boolean) {
  const order = chosenGroq ? [chosenGroq, ...GROQ_MODELS.filter(m => m !== chosenGroq)] : GROQ_MODELS;
  let lastErr: any;
  for (const model of order) {
    try {
      const r = await fetch(GROQ_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${groqKey()}` },
        body: JSON.stringify({
          model,
          messages: toMessages(o),
          temperature: o.temperature ?? 0.3,
          max_tokens: o.maxOutputTokens,
          stream,
        }),
      });
      if (!r.ok) throw new Error(`groq ${model} ${r.status}: ${(await r.text()).slice(0, 200)}`);
      chosenGroq = model;
      return { r, model };
    } catch (e: any) {
      lastErr = e;
      console.error('[gen]', e?.message || e);
    }
  }
  throw lastErr;
}

export async function generateText(ai: GoogleGenAI | null, o: GenOpts): Promise<{ text: string; model: string }> {
  if (groqKey()) {
    const { r, model } = await groqCall(o, false);
    const data = await r.json();
    const msg = data?.choices?.[0]?.message || {};
    return { text: String(msg.content || msg.reasoning || '').trim(), model };
  }
  if (!ai) throw new Error('no model provider configured');
  const order = chosenGemini ? [chosenGemini, ...GEMINI_MODELS.filter(m => m !== chosenGemini)] : GEMINI_MODELS;
  let lastErr: any;
  for (const model of order) {
    try {
      let res;
      try {
        res = await ai.models.generateContent({
          model, contents: o.contents,
          config: { systemInstruction: o.system, temperature: o.temperature ?? 0.3, maxOutputTokens: o.maxOutputTokens, ...THINK_OFF },
        });
      } catch {
        res = await ai.models.generateContent({
          model, contents: o.contents,
          config: { systemInstruction: o.system, temperature: o.temperature ?? 0.3, maxOutputTokens: o.maxOutputTokens },
        });
      }
      chosenGemini = model;
      return { text: (res.text || '').trim(), model };
    } catch (e: any) {
      lastErr = e;
      console.error(`[gen] ${model} failed:`, e?.message || e);
    }
  }
  throw lastErr;
}

/** Yields text pieces as they arrive, from whichever provider is configured. */
export async function streamText(ai: GoogleGenAI | null, o: GenOpts): Promise<{ stream: AsyncIterable<{ text?: string }>; model: string }> {
  if (groqKey()) {
    const { r, model } = await groqCall(o, true);
    async function* pieces() {
      const reader = (r.body as any)?.getReader?.();
      if (!reader) return;
      const dec = new TextDecoder();
      let buf = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split('\n');
        buf = lines.pop() || '';
        for (const line of lines) {
          const t = line.trim();
          if (!t.startsWith('data:')) continue;
          const payload = t.slice(5).trim();
          if (!payload || payload === '[DONE]') continue;
          try {
            const j = JSON.parse(payload);
            const piece = j?.choices?.[0]?.delta?.content;
            if (piece) yield { text: piece as string };
          } catch { /* partial frame */ }
        }
      }
    }
    return { stream: pieces(), model };
  }

  if (!ai) throw new Error('no model provider configured');
  const order = chosenGemini ? [chosenGemini, ...GEMINI_MODELS.filter(m => m !== chosenGemini)] : GEMINI_MODELS;
  let lastErr: any;
  for (const model of order) {
    try {
      let stream;
      try {
        stream = await ai.models.generateContentStream({
          model, contents: o.contents,
          config: { systemInstruction: o.system, temperature: o.temperature ?? 0.3, maxOutputTokens: o.maxOutputTokens, ...THINK_OFF },
        });
      } catch {
        stream = await ai.models.generateContentStream({
          model, contents: o.contents,
          config: { systemInstruction: o.system, temperature: o.temperature ?? 0.3, maxOutputTokens: o.maxOutputTokens },
        });
      }
      chosenGemini = model;
      return { stream, model };
    } catch (e: any) {
      lastErr = e;
      console.error(`[gen] ${model} stream failed:`, e?.message || e);
    }
  }
  throw lastErr;
}

/**
 * A web-grounded answer from Groq's compound-mini model, which searches the
 * web itself. Two things learned the hard way: it only reaches for the search
 * tool when the prompt is an explicit English "Search the web for: ...", and
 * each call carries several thousand tokens of search results against a tight
 * per-minute budget, so results are cached and the lookup is used sparingly.
 */
const webCache = new Map<string, string>();

export async function webLookup(englishQuery: string, maxTokens = 220): Promise<string> {
  if (!groqKey()) return '';
  const q = englishQuery.trim();
  if (!q) return '';
  const hit = webCache.get(q.toLowerCase());
  if (hit !== undefined) return hit;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 4500);
  try {
    const r = await fetch(GROQ_URL, {
      method: 'POST',
      signal: ctrl.signal,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${groqKey()}` },
      body: JSON.stringify({
        model: 'groq/compound-mini',
        messages: [{
          role: 'user',
          content: `Search the web for: ${q}. Answer in 2 to 4 factual sentences with the source URL in parentheses. If nothing reliable is found, reply exactly: NO RELIABLE SOURCE.`,
        }],
        max_tokens: maxTokens,
        temperature: 0,
      }),
    });
    if (!r.ok) { console.error('[web]', r.status, (await r.text()).slice(0, 160)); return ''; }
    const data = await r.json();
    const text = String(data?.choices?.[0]?.message?.content || '').trim();
    const out = /NO RELIABLE SOURCE|not familiar|don't have reliable/i.test(text) ? '' : text;
    webCache.set(q.toLowerCase(), out);
    return out;
  } catch (e: any) {
    console.error('[web]', e?.name === 'AbortError' ? 'timed out' : (e?.message || e));
    return '';
  } finally {
    clearTimeout(timer);
  }
}
