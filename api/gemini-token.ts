// Mints a short-lived token for the browser's Live API session. The real
// GEMINI_API_KEY only ever exists here, on the server.
import { GoogleGenAI } from '@google/genai';

export const config = { runtime: 'nodejs' };

// must match DEFAULT_LIVE_API_MODEL in lib/constants.ts, or the token is refused at connect
const LIVE_MODEL = 'models/gemini-2.5-flash-native-audio-preview-12-2025';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'POST only' });
  }
  const apiKey = process.env['GEMINI_API_KEY']; // bracket form so vite's define cannot replace it in dev
  if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY is not set on the server' });

  try {
    const ai = new GoogleGenAI({ apiKey });
    const now = Date.now();
    const token = await ai.authTokens.create({
      config: {
        uses: 1,                                                        // one connect per token
        expireTime: new Date(now + 30 * 60 * 1000).toISOString(),       // session may run 30 min
        newSessionExpireTime: new Date(now + 2 * 60 * 1000).toISOString(), // but must START within 2 min
        liveConnectConstraints: { model: LIVE_MODEL },                  // token cannot be used for anything else
        httpOptions: { apiVersion: 'v1alpha' },
      },
    });
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ token: token.name, model: LIVE_MODEL });
  } catch (e: any) {
    console.error('[gemini-token]', e?.message || e);
    return res.status(502).json({ error: 'could not mint token' });
  }
}
