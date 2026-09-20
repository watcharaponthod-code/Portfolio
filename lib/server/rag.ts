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

export const EMBED_MODEL = process.env['EMBED_MODEL'] || 'gemini-embedding-001';
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

export function getIndex(ai: GoogleGenAI | null): Promise<Indexed[]> {
  if (!ai) return Promise.resolve(buildChunks().map(c => ({ ...c, vec: null })));
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


// The knowledge base is written in English while visitors often ask in Thai.
// Without embeddings (Gemini key absent or out of quota) retrieval is keyword
// based, so Thai queries would match nothing. Map the domain terms both ways.
const TH_EN: Array<[RegExp, string]> = [
  [/โรงงานน้ำตาล|โรงงาน|หีบอ้อย/, 'sugar mill weighbridge'],
  [/อ้อย/, 'sugarcane cane'],
  [/ดาวเทียม|เรดาร์/, 'satellite radar sentinel'],
  [/ตัด|เก็บเกี่ยว|เกี่ยว/, 'cut harvest'],
  [/ผลผลิต|ตัน|ไร่/, 'yield tonnes rai'],
  [/สุขภาพ|ทรุด|แล้ง/, 'health drought decline'],
  [/เมฆ|ฝน|หน้าฝน/, 'cloud rain wet season gapfill'],
  [/ไฟไหม้|เผา/, 'burnt cane'],
  [/ฝุ่น/, 'dust opacity'],
  [/เสียง|ไมโครโฟน|หิน|ทราย/, 'audio sound sand rock microphone'],
  [/ทะเบียน|ป้าย/, 'licence plate ocr'],
  [/สายพาน/, 'conveyor cane flow'],
  [/แม่น|ความแม่น|วัด|ประเมิน/, 'accuracy precision recall evidence measured'],
  [/เทรน|ฝึก|โมเดล/, 'trained model training'],
  [/ติดต่อ|อีเมล|เบอร์|โทร|จ้าง/, 'contact email phone hire'],
  [/ประสบการณ์|ทำงาน|ฝึกงาน/, 'experience work internship'],
  [/การศึกษา|เรียน|มหาวิทยาลัย/, 'education university'],
  [/รางวัล|แข่ง/, 'award hackathon'],
  [/เกม/, 'game pose'],
  [/แอป|มือถือ/, 'mobile app'],
  [/ภาษาอังกฤษ|เรียนภาษา/, 'english learning tutor'],
  [/ยูทูบ|คลิป|วิดีโอ/, 'youtube shorts video'],
  [/เอกสาร|ค้นหา|ถามตอบ/, 'document retrieval rag search'],
  [/หุ้น|เทรด|บิตคอยน์/, 'trading bitcoin'],
  [/ทักษะ|เครื่องมือ|ใช้อะไร/, 'skills stack tools'],
];

export function hasThai(q: string): boolean {
  for (let i = 0; i < q.length; i++) {
    const c = q.charCodeAt(i);
    if (c >= 0x0e00 && c <= 0x0e7f) return true;
  }
  return false;
}

/** Adds English domain terms for a Thai question so keyword retrieval can work. */
export function expandQuery(q: string): string {
  if (!hasThai(q)) return q;
  const extra = TH_EN.filter(([re]) => re.test(q)).map(([, en]) => en);
  return extra.length ? `${q} ${extra.join(' ')}` : q;
}

// Without embeddings the fallback has to be a real ranking function, not a
// substring count: a question about the satellite work was matching the
// identity chunk simply because a couple of letters appeared in it. BM25 over
// the chunk text, built once per instance, ranks properly.
const K1 = 1.4;
const B = 0.72;

interface Bm25Index {
  docs: { id: number; len: number; tf: Map<string, number> }[];
  df: Map<string, number>;
  avgLen: number;
}

let bm25: Bm25Index | null = null;
let bm25For: Chunk[] | null = null;

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .split(/[^a-z0-9+#.-]+/)
    .map(t => t.replace(/^[.-]+|[.-]+$/g, ''))
    .filter(t => t.length >= 2);
}

function buildBm25(chunks: Chunk[]): Bm25Index {
  const docs = chunks.map((c, id) => {
    // keywords are repeated so a deliberate tag outweighs a passing mention
    const text = `${c.title} ${c.title} ${c.keywords.join(' ')} ${c.keywords.join(' ')} ${c.text}`;
    const toks = tokenize(text);
    const tf = new Map<string, number>();
    for (const t of toks) tf.set(t, (tf.get(t) || 0) + 1);
    return { id, len: toks.length, tf };
  });
  const df = new Map<string, number>();
  for (const d of docs) for (const t of d.tf.keys()) df.set(t, (df.get(t) || 0) + 1);
  const avgLen = docs.reduce((n, d) => n + d.len, 0) / Math.max(docs.length, 1);
  return { docs, df, avgLen };
}

function bm25Score(index: Bm25Index, docId: number, terms: string[]): number {
  const d = index.docs[docId];
  const N = index.docs.length;
  let score = 0;
  for (const t of terms) {
    const f = d.tf.get(t);
    if (!f) continue;
    const n = index.df.get(t) || 0;
    const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5));
    score += idf * ((f * (K1 + 1)) / (f + K1 * (1 - B + (B * d.len) / index.avgLen)));
  }
  return score;
}

export interface Hit { chunk: Chunk; score: number; method: 'vector' | 'keyword' }

export async function retrieve(ai: GoogleGenAI | null, query: string, k = 5): Promise<Hit[]> {
  const index = await getIndex(ai);
  const usable = ai ? index.filter(c => c.vec) : [];
  if (usable.length && ai) {
    try {
      const [qv] = await embedAll(ai!, [query], 'RETRIEVAL_QUERY');
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
  const chunks = index as unknown as Chunk[];
  if (!bm25 || bm25For !== chunks) { bm25 = buildBm25(chunks); bm25For = chunks; }
  const terms = tokenize(expandQuery(query));
  const scored = index.map((c, i) => ({ chunk: c, score: bm25Score(bm25!, i, terms), method: 'keyword' as const }));
  scored.sort((a, b) => b.score - a.score);
  // An answer with no real match is better than an answer built from the
  // nearest unrelated chunk, so weak results are dropped entirely.
  return scored.filter(h => h.score >= 1.5).slice(0, k);
}

export function formatContext(hits: Hit[]): string {
  return hits.map((h, i) => `[${i + 1}] ${h.chunk.title}\n${h.chunk.text}`).join('\n\n');
}
