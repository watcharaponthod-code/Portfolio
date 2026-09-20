import { useEffect, useRef, useState } from 'react';
import { TbSend, TbMicrophone, TbMessage, TbSparkles, TbRefresh } from 'react-icons/tb';
import LiveAIDemo from './LiveAIDemo';
import { useLang, type Lang } from '../../lib/i18n';

type Mode = 'chat' | 'voice';
interface Msg { id: number; role: 'user' | 'assistant'; content: string; sources?: string[]; ms?: number; error?: boolean }

const SUGGESTIONS: Record<Lang, string[]> = {
  th: [
    'ทำงานอะไรที่โรงงานน้ำตาล',
    'CropScan แม่นแค่ไหน วัดกับอะไร',
    'RAG ที่ทำตอนฝึกงานเป็นยังไง',
    'ติดต่อคุณวัชรพลได้ทางไหน',
  ],
  en: [
    'What does he build at the sugar mill?',
    'How accurate is CropScan, and against what?',
    'Tell me about the on-prem RAG systems',
    'How do I contact Watcharapon?',
  ],
};

const GREETING: Record<Lang, string> = {
  th: 'สวัสดีครับ ผมเป็นผู้ช่วย AI ของคุณวัชรพล ถามเรื่องงาน โปรเจกต์ ตัวเลขผลลัพธ์ หรือทักษะได้เลยครับ ถ้าอยากคุยด้วยเสียง กดโหมด VOICE ด้านบน',
  en: 'Hi, I am Watcharapon\'s assistant. Ask about his projects, results, stack or background. For a voice conversation, switch to VOICE above.',
};

let nextId = 1;

export default function AssistantPanel() {
  const [mode, setMode] = useState<Mode>('chat');
  const { lang, setLang } = useLang();
  const [messages, setMessages] = useState<Msg[]>(() => [{ id: nextId++, role: 'assistant', content: GREETING[lang] }]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, busy]);

  useEffect(() => {
    if (mode === 'chat') inputRef.current?.focus();
  }, [mode]);

  // The language is global (site-wide toggle in the NavBar and the TH/EN buttons here).
  // Whenever it changes, and the chat is still only the greeting, swap the greeting.
  useEffect(() => {
    setMessages(m => (m.length === 1 && m[0].role === 'assistant') ? [{ id: nextId++, role: 'assistant', content: GREETING[lang] }] : m);
  }, [lang]);

  const switchLang = (l: Lang) => {
    if (l === lang) return;
    setLang(l);
  };

  const reset = () => {
    abortRef.current?.abort();
    setBusy(false);
    setMessages([{ id: nextId++, role: 'assistant', content: GREETING[lang] }]);
  };

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || busy) return;
    setInput('');
    const userMsg: Msg = { id: nextId++, role: 'user', content: q };
    const draftId = nextId++;
    const history = [...messages.filter(m => !m.error), userMsg];
    setMessages([...history, { id: draftId, role: 'assistant', content: '' }]);
    setBusy(true);
    const t0 = performance.now();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: ctrl.signal,
        body: JSON.stringify({
          lang,
          messages: history.slice(-12).map(m => ({ role: m.role, content: m.content })),
        }),
      });
      if (!r.ok || !r.body) throw new Error(`chat endpoint returned ${r.status}`);
      const sources = (r.headers.get('X-Sources') || '').split(',').filter(Boolean);
      const reader = r.body.getReader();
      const dec = new TextDecoder();
      let acc = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        const snapshot = acc;
        setMessages(m => m.map(x => x.id === draftId ? { ...x, content: snapshot } : x));
      }
      const ms = Math.round(performance.now() - t0);
      setMessages(m => m.map(x => x.id === draftId ? { ...x, content: acc.trim() || (lang === 'th' ? 'ไม่มีข้อมูลเรื่องนี้ครับ' : 'No information on that.'), sources, ms } : x));
    } catch (e: any) {
      if (e?.name === 'AbortError') return;
      const msg = lang === 'th'
        ? 'ตอนนี้ต่อระบบตอบคำถามไม่ได้ครับ ลองใหม่อีกครั้ง หรือกดโหมด VOICE'
        : 'The answer service is unreachable right now. Try again, or switch to VOICE.';
      setMessages(m => m.map(x => x.id === draftId ? { ...x, content: msg, error: true } : x));
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); }
  };

  const showChips = messages.length <= 1;

  return (
    <div className="asst">
      {/* mode + language bar */}
      <div className="asst-bar">
        <div className="asst-modes" role="tablist">
          <button role="tab" aria-selected={mode === 'chat'} className={`asst-mode mono ${mode === 'chat' ? 'on' : ''}`} onClick={() => setMode('chat')}>
            <TbMessage size={14} /> CHAT
          </button>
          <button role="tab" aria-selected={mode === 'voice'} className={`asst-mode mono ${mode === 'voice' ? 'on' : ''}`} onClick={() => setMode('voice')}>
            <TbMicrophone size={14} /> VOICE
          </button>
        </div>
        <div className="asst-langs">
          <button className={`asst-lang mono ${lang === 'th' ? 'on' : ''}`} onClick={() => switchLang('th')}>TH</button>
          <button className={`asst-lang mono ${lang === 'en' ? 'on' : ''}`} onClick={() => switchLang('en')}>EN</button>
        </div>
      </div>

      {mode === 'voice' ? (
        <div className="asst-voice">
          <LiveAIDemo lang={lang} />
        </div>
      ) : (
        <>
          <div className="asst-list" ref={listRef}>
            {messages.map(m => (
              <div key={m.id} className={`asst-row ${m.role}`}>
                {m.role === 'assistant' && <div className="asst-avatar"><TbSparkles size={13} /></div>}
                <div className={`asst-bubble ${m.role} ${m.error ? 'err' : ''}`}>
                  {m.content
                    ? m.content.split('\n').map((line, i) => <p key={i}>{line || ' '}</p>)
                    : <span className="asst-dots"><i /><i /><i /></span>}
                  {m.role === 'assistant' && m.ms !== undefined && (
                    <div className="asst-meta mono">
                      RAG · {m.sources?.length || 0} {lang === 'th' ? 'แหล่งข้อมูล' : 'sources'} · {m.ms} ms
                    </div>
                  )}
                </div>
              </div>
            ))}
            {showChips && (
              <div className="asst-chips">
                {SUGGESTIONS[lang].map(s => (
                  <button key={s} className="asst-chip" onClick={() => send(s)}>{s}</button>
                ))}
              </div>
            )}
          </div>

          <div className="asst-input">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
              rows={1}
              placeholder={lang === 'th' ? 'ถามเรื่องงานหรือโปรเจกต์…' : 'Ask about his work or projects…'}
              disabled={busy}
            />
            <button className="asst-send" onClick={() => send(input)} disabled={busy || !input.trim()} aria-label="Send">
              <TbSend size={16} />
            </button>
          </div>
          <div className="asst-foot mono">
            <span>gemini-2.5-flash-lite · vector retrieval on server</span>
            <button className="asst-reset" onClick={reset} title={lang === 'th' ? 'เริ่มใหม่' : 'New chat'}><TbRefresh size={12} /> {lang === 'th' ? 'เริ่มใหม่' : 'NEW'}</button>
          </div>
        </>
      )}

      <style>{`
        .asst { position: absolute; inset: 0; display: flex; flex-direction: column; background: #fff; color: #000; }
        .asst-bar { display: flex; justify-content: space-between; align-items: center; padding: 0.6rem 0.8rem; border-bottom: 1px solid #e6e6e6; background: #fafafa; }
        .asst-modes { display: flex; border: 1px solid #000; }
        .asst-mode { display: flex; align-items: center; gap: 0.4rem; padding: 0.4rem 0.8rem; background: #fff; color: #000; border: none; cursor: pointer; font-size: 0.6rem; font-weight: 900; letter-spacing: 0.18em; transition: background 0.2s, color 0.2s; }
        .asst-mode.on { background: #000; color: #fff; }
        .asst-langs { display: flex; gap: 0.25rem; }
        .asst-lang { padding: 0.3rem 0.55rem; font-size: 0.6rem; font-weight: 900; letter-spacing: 0.1em; border: 1px solid transparent; background: transparent; color: #888; cursor: pointer; border-radius: 999px; }
        .asst-lang.on { color: #000; border-color: #000; }
        .asst-voice { flex: 1; position: relative; min-height: 0; }
        .asst-list { flex: 1; overflow-y: auto; padding: 1rem 0.9rem; display: flex; flex-direction: column; gap: 0.7rem; scroll-behavior: smooth; }
        .asst-row { display: flex; gap: 0.5rem; align-items: flex-end; }
        .asst-row.user { justify-content: flex-end; }
        .asst-avatar { width: 24px; height: 24px; border-radius: 50%; background: #000; color: #fff; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .asst-bubble { max-width: 82%; padding: 0.65rem 0.85rem; font-size: 0.86rem; line-height: 1.55; border-radius: 14px; }
        .asst-bubble p { margin: 0; }
        .asst-bubble p + p { margin-top: 0.35rem; }
        .asst-bubble.assistant { background: #f3f3f1; color: #111; border-bottom-left-radius: 4px; }
        .asst-bubble.user { background: #000; color: #fff; border-bottom-right-radius: 4px; }
        .asst-bubble.err { background: #fff3f3; color: #8a1f1f; border: 1px solid #f0c4c4; }
        .asst-meta { margin-top: 0.45rem; font-size: 0.55rem; letter-spacing: 0.12em; color: #8a8a8a; }
        .asst-dots { display: inline-flex; gap: 4px; padding: 0.2rem 0; }
        .asst-dots i { width: 6px; height: 6px; border-radius: 50%; background: #555; animation: asstDot 1s infinite ease-in-out; }
        .asst-dots i:nth-child(2) { animation-delay: 0.15s; }
        .asst-dots i:nth-child(3) { animation-delay: 0.3s; }
        @keyframes asstDot { 0%, 80%, 100% { transform: translateY(0); opacity: 0.4; } 40% { transform: translateY(-4px); opacity: 1; } }
        .asst-chips { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.4rem; padding-left: 2rem; }
        .asst-chip { background: #fff; border: 1px solid #d9d9d9; color: #222; padding: 0.4rem 0.7rem; border-radius: 999px; font-size: 0.75rem; cursor: pointer; transition: all 0.2s; text-align: left; }
        .asst-chip:hover { border-color: #000; background: #000; color: #fff; }
        .asst-input { display: flex; align-items: flex-end; gap: 0.5rem; padding: 0.6rem 0.8rem; border-top: 1px solid #e6e6e6; background: #fff; }
        .asst-input textarea { flex: 1; resize: none; border: 1px solid #d0d0d0; border-radius: 12px; padding: 0.6rem 0.8rem; font: inherit; font-size: 0.86rem; line-height: 1.4; max-height: 110px; outline: none; background: #fff; color: #000; }
        .asst-input textarea:focus { border-color: #000; }
        .asst-input textarea:disabled { opacity: 0.6; }
        .asst-send { width: 40px; height: 40px; border-radius: 50%; border: none; background: #000; color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.15s, opacity 0.2s; flex-shrink: 0; }
        .asst-send:hover:not(:disabled) { transform: scale(1.06); }
        .asst-send:disabled { opacity: 0.35; cursor: default; }
        .asst-foot { display: flex; justify-content: space-between; align-items: center; padding: 0.35rem 0.9rem 0.55rem; font-size: 0.52rem; letter-spacing: 0.12em; color: #9a9a9a; }
        .asst-reset { display: inline-flex; align-items: center; gap: 0.3rem; background: none; border: none; color: #666; cursor: pointer; font: inherit; letter-spacing: inherit; }
        .asst-reset:hover { color: #000; }
      `}</style>
    </div>
  );
}
