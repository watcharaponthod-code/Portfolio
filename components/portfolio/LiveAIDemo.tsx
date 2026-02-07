import { useEffect, useRef, useState } from 'react';
import { Modality } from '@google/genai';
import { useLiveAPIContext } from '@/contexts/LiveAPIContext';
import { useAgent, useUser } from '@/lib/state';
import { createSystemInstructions } from '@/lib/prompts';
import ControlTray from '@/components/console/control-tray/ControlTray';
import BasicFace from '@/components/demo/basic-face/BasicFace';

export default function LiveAIDemo() {
  const { client, connected, setConfig } = useLiveAPIContext();
  const user = useUser();
  const { current } = useAgent();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lang, setLang] = useState<'th' | 'en'>('th');

  useEffect(() => {
    const baseInstructions = createSystemInstructions(current, user);

    const thaiInstruction = `
    IMPORTANT OVERRIDE:
    1. You MUST speak in Thai Language (ภาษาไทย) only.
    2. Adopt a "Thai Teenager / Tech Bro" persona (วัยรุ่นสายเทค).
    3. Use slang words like: "คับผม", "สุดยอด", "เจ๋งเป้ง", "ตึงๆ", "เอาเรื่อง", "อาจารย์", "เทพซ่า".
    4. When explaining tech, use "Thailish" (Thai mixed with English technical terms).
    5. Be energetic, friendly, and act like a cool junior developer friend.
    6. Refer to Watcharapon as "พี่โอ๊ต" (P'Oat).
    7. ใช้เสียงแบบโทนต่ำดูเหนื่อย คำพูด toxic นิดๆ
    `;

    const englishInstruction = `
    IMPORTANT OVERRIDE:
    1. You MUST speak in English only.
    2. Adopt a "Cool Tech Bro" persona.
    3. Be energetic, friendly, and act like a cool junior developer friend.
    4. Refer to Watcharapon as "Oat".
    5. Use slightly tired but cool tone.
    `;

    setConfig({
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: current.voice },
        },
      },
      systemInstruction: {
        parts: [
          {
            text: baseInstructions + (lang === 'th' ? thaiInstruction : englishInstruction),
          },
        ],
      },
    });
  }, [setConfig, user, current, lang]);

  useEffect(() => {
    const beginSession = async () => {
      if (!connected) return;
      const msg = lang === 'th'
        ? 'กล่าวทักทายแบบวัยรุ่นไทยเท่ๆ แนะนำตัวว่าเป็น AI ของพี่โอ๊ต แล้วถามว่าอยากรู้อะไรเกี่ยวกับความเทพของพี่เขาบ้าง'
        : 'Say hello in a cool way, introduce yourself as Oat\'s AI assistant, and ask what they want to know about his skills.';
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
        background: 'rgba(0,0,0,0.05)',
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
      </div>

      <div style={{ padding: '1rem', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
        <ControlTray />
      </div>
    </div>
  );
}
