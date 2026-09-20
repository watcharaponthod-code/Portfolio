// Server-side retrieval for the assistant. Runs inside the Vercel functions
// (api/chat.ts, api/brain.ts); never imported by the browser bundle.
//
// The knowledge base is chunked and embedded once per function instance with
// gemini-embedding-001 and kept in memory as a small vector index. A cold
// instance pays one batched embedding call (~40 chunks, well under a second);
// every request after that is one query embedding plus a cosine scan, which is
// a few milliseconds. If the embedding call ever fails, retrieval falls back to
// keyword overlap so the assistant still answers.
import { GoogleGenAI } from '@google/genai';
import { KNOWLEDGE_BASE } from '../knowledge.js';
import { IDENTITY_CONTEXT_STRING } from '../identity.js';

export const EMBED_MODEL = 'gemini-embedding-001';
const DIM = 768;
const MAX_CHUNK_CHARS = 700;

export interface Chunk {
  id: string;
  title: string;
  text: string;
  keywords: string[];
}

interface Indexed extends Chunk { vec: Float32Array | null }

function splitSentences(text: string): string[] {
  return text.split(/(?<=[.!?])\s+(?=[A-Z0-9"(])/).map(s => s.trim()).filter(Boolean);
}

function chunkSection(id: string, title: string, content: string, keywords: string[]): Chunk[] {
  if (content.length <= MAX_CHUNK_CHARS) return [{ id, title, text: content, keywords }];
  const out: Chunk[] = [];
  let buf = '';
  let n = 0;
  for (const s of splitSentences(content)) {
    if ((buf + ' ' + s).length > MAX_CHUNK_CHARS && buf) {
      out.push({ id: `${id}#${n++}`, title, text: buf.trim(), keywords });
      buf = s;
    } else {
      buf = buf ? `${buf} ${s}` : s;
    }
  }
  if (buf) out.push({ id: `${id}#${n++}`, title, text: buf.trim(), keywords });
  return out;
}

export function buildChunks(): Chunk[] {
  const chunks: Chunk[] = [
    { id: 'identity', title: 'Identity and contact', text: IDENTITY_CONTEXT_STRING.trim(), keywords: ['who', 'contact', 'email', 'phone', 'role', 'identity', 'about'] },
  ];
  for (const s of KNOWLEDGE_BASE) chunks.push(...chunkSection(s.id, s.title, s.content, s.keywords));
  return chunks;
}

let indexPromise: Promise<Indexed[]> | null = null;

async function embedAll(ai: GoogleGenAI, texts: string[], taskType: 'RETRIEVAL_DOCUMENT' | 'RETRIEVAL_QUERY'): Promise<Float32Array[]> {
  const out: Float32Array[] = [];
  // the API accepts batches; keep them modest so one bad batch does not sink the rest
  for (let i = 0; i < texts.length; i += 32) {
    const batch = texts.slice(i, i + 32);
    const r = await ai.models.embedContent({
      model: EMBED_MODEL,
      contents: batch,
      config: { taskType, outputDimensionality: DIM },
    });
    for (const e of r.embeddings || []) out.push(normalize(Float32Array.from(e.values || [])));
  }
  return out;
}

function normalize(v: Float32Array): Float32Array {
  let n = 0;
  for (let i = 0; i < v.length; i++) n += v[i] * v[i];
  n = Math.sqrt(n) || 1;
  for (let i = 0; i < v.length; i++) v[i] /= n;
  return v;
}

function dot(a: Float32Array, b: Float32Array): number {
  let s = 0;
  for (let i = 0; i < a.length && i < b.length; i++) s += a[i] * b[i];
  return s;
}

export function getIndex(ai: GoogleGenAI): Promise<Indexed[]> {
  if (!indexPromise) {
    const chunks = buildChunks();
    indexPromise = embedAll(ai, chunks.map(c => `${c.title}\n${c.text}`), 'RETRIEVAL_DOCUMENT')
      .then(vecs => chunks.map((c, i) => ({ ...c, vec: vecs[i] || null })))
      .catch(e => {
        console.error('[rag] embedding the knowledge base failed, using keyword retrieval:', e?.message || e);
        indexPromise = null; // try again on the next request
        return chunks.map(c => ({ ...c, vec: null }));
      });
  }
  return indexPromise;
}

function keywordScore(q: string, c: Chunk): number {
  const ql = q.toLowerCase();
  let s = 0;
  for (const k of c.keywords) if (ql.includes(k.toLowerCase())) s += 1;
  if (ql.includes(c.title.toLowerCase().slice(0, 12))) s += 1;
  return s;
}

export interface Hit { chunk: Chunk; score: number; method: 'vector' | 'keyword' }

export async function retrieve(ai: GoogleGenAI, query: string, k = 5): Promise<Hit[]> {
  const index = await getIndex(ai);
  const usable = index.filter(c => c.vec);
  if (usable.length) {
    try {
      const [qv] = await embedAll(ai, [query], 'RETRIEVAL_QUERY');
      const scored = usable.map(c => ({ chunk: c, score: dot(qv, c.vec!), method: 'vector' as const }));
      scored.sort((a, b) => b.score - a.score);
      // always keep identity within reach for who/contact style questions
      const top = scored.slice(0, k);
      if (!top.some(h => h.chunk.id === 'identity') && /who|contact|email|phone|ใคร|ติดต่อ|อีเมล|เบอร์/i.test(query)) {
        const idn = scored.find(h => h.chunk.id === 'identity');
        if (idn) top.push(idn);
      }
      return top;
    } catch (e: any) {
      console.error('[rag] query embedding failed, using keyword retrieval:', e?.message || e);
    }
  }
  const scored = index.map(c => ({ chunk: c, score: keywordScore(query, c), method: 'keyword' as const }));
  scored.sort((a, b) => b.score - a.score);
  const top = scored.filter(h => h.score > 0).slice(0, k);
  return top.length ? top : scored.slice(0, 2);
}

export function formatContext(hits: Hit[]): string {
  return hits.map((h, i) => `[${i + 1}] ${h.chunk.title}\n${h.chunk.text}`).join('\n\n');
}
