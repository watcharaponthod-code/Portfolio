// Text chat for the assistant panel. A small LangGraph state machine decides
// whether the turn needs the knowledge base, retrieves when it does, and keeps
// a short memory of the visitor so follow-up questions land in context.
// Streams plain text; the actions and the updated memory follow the answer
// after a marker so the panel can render buttons and remember the thread.
import { GoogleGenAI } from '@google/genai';
import { streamText } from '../lib/server/generate.js';
import { actionsFor, ACTION_MARKER } from '../lib/server/actions.js';
import { buildGraph, systemPrompt, updateMemory, type Memory } from '../lib/server/agent.js';

export const config = { runtime: 'nodejs' };

const MAX_TURNS = 8;
const MAX_MSG_CHARS = 2000;

type Msg = { role: 'user' | 'assistant'; content: string };

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
  const lang: 'th' | 'en' = body.lang === 'en' ? 'en' : 'th';
  const raw: Msg[] = Array.isArray(body.messages) ? body.messages : [];
  const messages = raw
    .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map(m => ({ role: m.role, content: m.content.slice(0, MAX_MSG_CHARS) }))
    .slice(-MAX_TURNS * 2);
  const last = [...messages].reverse().find(m => m.role === 'user');
  if (!last || !last.content.trim()) return res.status(400).json({ error: 'a user message is required' });

  const memory: Memory = (body.memory && typeof body.memory === 'object') ? body.memory : {};
  const t0 = Date.now();
  try {
    const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;
    const graph = buildGraph(ai);
    const state = await graph.invoke({
      question: last.content,
      lang,
      history: messages,
      memory,
    });
    const tRetrieve = Date.now() - t0;
    const hits = state.hits || [];

    const { stream, model } = await streamText(ai, {
      system: systemPrompt(lang, state.context || '', memory),
      contents: messages.map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.content }] })),
      maxOutputTokens: 1400,
    });

    res.status(200);
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Sources', hits.map(h => h.chunk.id).join(','));
    res.setHeader('X-Retrieval', `${state.needsFacts ? (hits[0]?.method || 'none') : 'skipped'};${tRetrieve}ms`);
    res.setHeader('X-Plan', String((state.plan || []).length));
    res.setHeader('X-Model', model);

    let answer = '';
    for await (const chunk of stream) {
      if (chunk.text) { answer += chunk.text; res.write(chunk.text); }
    }

    // Retrieval always returns its top five, but the tail of that list is
    // often unrelated. Offer buttons only for the chunks that scored close to
    // the best one, so a question about the satellite work does not come back
    // with a trading link.
    const top = hits[0]?.score ?? 0;
    const strong = hits.filter(h => h.score >= top * 0.6 && h.score > 0).slice(0, 3);
    const actions = actionsFor(last.content, strong.map(h => h.chunk.id));
    const nextMemory = await updateMemory(ai, memory, last.content, answer);
    res.write(ACTION_MARKER + JSON.stringify({ actions, memory: nextMemory }));
    res.end();
  } catch (e: any) {
    console.error('[chat]', e?.stack || e?.message || e);
    const quota = /429|exceeded your current quota|RESOURCE_EXHAUSTED/i.test(String(e?.message || e));
    if (!res.headersSent) res.status(quota ? 429 : 502).json({ error: quota ? 'quota' : 'chat failed' });
    else res.end();
  }
}

function safeJson(s: string) {
  try { return JSON.parse(s); } catch { return {}; }
}
