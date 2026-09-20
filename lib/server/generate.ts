// Picks the first model that actually answers. Newer ids are tried first; if the
// deployment's API version does not know one, the next is used. The chosen id is
// remembered for the life of the function instance so only the first call pays.
import { GoogleGenAI } from '@google/genai';

const CANDIDATES = ['gemini-2.5-flash-lite', 'gemini-2.5-flash'];
let chosen: string | null = null;

export interface GenOpts {
  system: string;
  contents: any[];
  maxOutputTokens: number;
  temperature?: number;
}

export async function generateText(ai: GoogleGenAI, o: GenOpts): Promise<{ text: string; model: string }> {
  const order = chosen ? [chosen, ...CANDIDATES.filter(m => m !== chosen)] : CANDIDATES;
  let lastErr: any;
  for (const model of order) {
    try {
      const r = await ai.models.generateContent({
        model,
        contents: o.contents,
        config: {
          systemInstruction: o.system,
          temperature: o.temperature ?? 0.3,
          maxOutputTokens: o.maxOutputTokens,
        },
      });
      chosen = model;
      return { text: (r.text || '').trim(), model };
    } catch (e: any) {
      lastErr = e;
      console.error(`[gen] ${model} failed:`, e?.message || e);
    }
  }
  throw lastErr;
}

export async function streamText(ai: GoogleGenAI, o: GenOpts) {
  const order = chosen ? [chosen, ...CANDIDATES.filter(m => m !== chosen)] : CANDIDATES;
  let lastErr: any;
  for (const model of order) {
    try {
      const stream = await ai.models.generateContentStream({
        model,
        contents: o.contents,
        config: {
          systemInstruction: o.system,
          temperature: o.temperature ?? 0.3,
          maxOutputTokens: o.maxOutputTokens,
        },
      });
      chosen = model;
      return { stream, model };
    } catch (e: any) {
      lastErr = e;
      console.error(`[gen] ${model} stream failed:`, e?.message || e);
    }
  }
  throw lastErr;
}
