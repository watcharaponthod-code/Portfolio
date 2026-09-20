import { useEffect, useRef, useState } from 'react';
import { Modality, Type, type FunctionDeclaration, type LiveServerToolCall } from '@google/genai';
import { useLiveAPIContext } from '@/contexts/LiveAPIContext';
import { useAgent, useUser } from '@/lib/state';
import { createSystemInstructions } from '@/lib/prompts';
import { getMemoryString } from '@/lib/memory';
import ControlTray from '@/components/console/control-tray/ControlTray';
import BasicFace from '@/components/demo/basic-face/BasicFace';

// Layer 1 (this file) is the realtime voice model: it listens and speaks.
// Layer 2 (api/brain.ts) holds the full knowledge base and a text model with
// room to reason. Layer 1 reaches it through this tool whenever the visitor
// asks something factual, then reads the answer back.
const ASK_BRAIN: FunctionDeclaration = {
  name: 'ask_brain',
  description: 'Look up any factual question about Watcharapon: his projects, numbers, results, skills, work history, education, contact. Returns a short spoken-style answer to read aloud verbatim. Call this before answering anything about him; never guess.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      question: { type: Type.STRING, description: 'The visitor\'s question, in their own words and language.' },
    },
    required: ['question'],
  },
};

export default function LiveAIDemo() {
  const { client, connected, setConfig, connect } = useLiveAPIContext();
  const [thinking, setThinking] = useState(false);
  const user = useUser();
  const { current } = useAgent();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lang, setLang] = useState<'th' | 'en'>('th');
  const configuredRef = useRef(false);
  const connectAttemptRef = useRef(false);

  useEffect(() => {
    const baseInstructions = createSystemInstructions(current, user);

    const thaiInstruction = `
    IMPORTANT OVERRIDE:
    1. You MUST speak in Thai Language (ภาษาไทย) only.
    2. Adopt a professional, polite, and helpful assistant persona (ผู้ช่วย AI แบบทางการและสุภาพ).
    3. Provide accurate and factual information without exaggerating or boasting (ให้ข้อมูลตามจริง ไม่อวย).
    4. Use formal language with appropriate polite particles (ครับ/ค่ะ).
    5. Refer to Watcharapon as "คุณวัชรพล" (Khun Watcharapon).
    6. Maintain a calm, professional, and clear tone of voice.
    7. Avoid slang or overly informal language.
    `;

    const englishInstruction = `
    IMPORTANT OVERRIDE:
    1. You MUST speak in English only.
    2. Adopt a professional, polite, and helpful assistant persona.
    3. Provide accurate and factual information without exaggerating or boasting.
    4. Use clear, formal, and professional language.
    5. Refer to Watcharapon as "Watcharapon".
    6. Maintain a calm and professional tone of voice.
    7. Avoid slang or informal expressions.
    `;

    const layerInstruction = `
    TWO-LAYER RULE:
    - You are the voice layer. You do not hold the detailed facts yourself.
    - For ANY question about Watcharapon (projects, results, numbers, stack, experience, education, contact), call the ask_brain tool first, then read its answer aloud naturally. Never answer such questions from memory and never invent numbers.
    - While waiting for the tool, say one short phrase like ${lang === 'th' ? '"ขอตรวจสอบข้อมูลสักครู่ครับ"' : '"one moment, let me check"'}, then continue with the tool result.
    - Greetings, small talk and clarifying questions you may handle yourself.
    `;

    const memoryContext = getMemoryString();
    const finalInstructions = baseInstructions +
      (lang === 'th' ? thaiInstruction : englishInstruction) + layerInstruction +
      (memoryContext ? `\n\n--- RECENT CONVERSATION HISTORY (SHORT-TERM MEMORY) ---\n${memoryContext}\n-------------------------------------------------------` : "");

    setConfig({
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: current.voice },
        },
      },
      // VAD config: optimize silence but keep known valid Enums
      realtimeInputConfig: {
        automaticActivityDetection: {
          disabled: false,
          startOfSpeechSensitivity: 'START_SENSITIVITY_HIGH' as any,
          endOfSpeechSensitivity: 'END_SENSITIVITY_HIGH' as any,
          prefixPaddingMs: 20,
          silenceDurationMs: 250,  // balance speed & stability
        },
      } as any,
      systemInstruction: {
        parts: [
          {
            text: finalInstructions,
          },
        ],
      },
      tools: [{ functionDeclarations: [ASK_BRAIN] }],
    });
  }, [setConfig, user, current, lang]);

  // Layer 1 -> Layer 2: answer every ask_brain call through /api/brain.
  useEffect(() => {
    const onToolCall = async (toolCall: LiveServerToolCall) => {
      const calls = toolCall.functionCalls || [];
      if (!calls.length) return;
      setThinking(true);
      const functionResponses = await Promise.all(calls.map(async fc => {
        let response: Record<string, unknown> = { error: 'unknown tool' };
        if (fc.name === 'ask_brain') {
          const question = String((fc.args as any)?.question || '');
          try {
            const r = await fetch('/api/brain', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ question, lang }),
            });
            const data = await r.json();
            response = r.ok && data.answer
              ? { answer: data.answer }
              : { error: 'the knowledge layer is unavailable; tell the visitor you cannot check right now' };
          } catch {
            response = { error: 'the knowledge layer is unavailable; tell the visitor you cannot check right now' };
          }
        }
        return { id: fc.id, name: fc.name, response };
      }));
      setThinking(false);
      client.sendToolResponse({ functionResponses });
    };
    client.on('toolcall', onToolCall);
    return () => { client.off('toolcall', onToolCall); };
  }, [client, lang]);

  useEffect(() => {
    const beginSession = async () => {
      if (!connected) return;
      const msg = lang === 'th'
        ? 'กล่าวทักทายอย่างสุภาพและเป็นทางการ แนะนำตัวว่าเป็นผู้ช่วย AI ของคุณวัชรพล และสอบถามว่ามีข้อมูลด้านใดที่ต้องการทราบเกี่ยวกับการทำงานหรือทักษะของคุณวัชรพลบ้าง'
        : 'Say hello politely and formally, introduce yourself as Watcharapon\'s AI assistant, and ask what professional information they would like to know about his skills or experiences.';
      // Send greeting and mark turn as complete
      client.send({ text: msg }, true);
    };
    beginSession();
  }, [client, connected, lang]);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>

      {/* Language Toggle */}
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        zIndex: 20,
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '20px',
        padding: '4px',
        display: 'flex',
        gap: '4px'
      }}>
        <button
          onClick={() => setLang('th')}
          style={{
            padding: '4px 12px',
            borderRadius: '16px',
            border: 'none',
            background: lang === 'th' ? 'var(--text-primary)' : 'transparent',
            color: lang === 'th' ? 'var(--bg-primary)' : 'var(--text-secondary)',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          TH
        </button>
        <button
          onClick={() => setLang('en')}
          style={{
            padding: '4px 12px',
            borderRadius: '16px',
            border: 'none',
            background: lang === 'en' ? 'var(--text-primary)' : 'transparent',
            color: lang === 'en' ? 'var(--bg-primary)' : 'var(--text-secondary)',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          EN
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
        <BasicFace canvasRef={canvasRef} />
        <div className="mono" style={{
          position: 'absolute', bottom: '8px', left: 0, right: 0, textAlign: 'center',
          fontSize: '0.58rem', letterSpacing: '0.2em', color: 'var(--text-secondary)',
          opacity: thinking ? 1 : 0, transition: 'opacity 0.3s',
        }}>
          LAYER 2 // CONSULTING KNOWLEDGE BASE
        </div>
      </div>

      <div style={{ padding: '1rem', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
        <ControlTray />
      </div>
    </div>
  );
}
