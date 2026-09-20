import { useEffect, useRef, useState } from 'react';
import { TbSend, TbSparkles, TbRefresh, TbArrowUpRight, TbExternalLink, TbCopy, TbCheck } from 'react-icons/tb';
import { useLang, type Lang } from '../../lib/i18n';
import { useUI } from '../../lib/state';
import type { ChatAction } from '../../lib/server/actions';
import type { Memory } from '../../lib/server/agent';
import { ACTION_MARKER } from '../../lib/server/actions';

interface Msg { id: number; role: 'user' | 'assistant'; content: string; sources?: string[]; ms?: number; error?: boolean; actions?: ChatAction[] }

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

const MEM_KEY = 'asst-memory-v1';

function loadMemory(): Memory {
  try { return JSON.parse(localStorage.getItem(MEM_KEY) || '{}'); } catch { return {}; }
}
function saveMemory(m: Memory) {
  try { localStorage.setItem(MEM_KEY, JSON.stringify(m)); } catch { /* private window */ }
}

/**
 * The model sometimes answers with light markdown (bullets and bold) even when
 * asked not to. Rather than showing the asterisks, render the few marks it
 * actually uses. Text only: nothing here is parsed as HTML.
 */
function renderInline(text: string, keyBase: string) {
  const out: React.ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|`([^`]+)`/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) out.push(<strong key={`${keyBase}-b${m.index}`}>{m[1]}</strong>);
    else out.push(<code key={`${keyBase}-c${m.index}`}>{m[2]}</code>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function renderAnswer(content: string) {
  const blocks: React.ReactNode[] = [];
  let bullets: string[] = [];
  const flush = (key: string) => {
    if (!bullets.length) return;
    blocks.push(
      <ul className="asst-list-ul" key={`ul-${key}`}>
        {bullets.map((b, i) => <li key={i}>{renderInline(b, `${key}-${i}`)}</li>)}
      </ul>,
    );
    bullets = [];
  };
  content.split('\n').forEach((raw, i) => {
    const line = raw.trim();
    if (/^[-*\u2013\u2022]\s+/.test(line)) { bullets.push(line.replace(/^[-*\u2013\u2022]\s+/, '')); return; }
    flush(String(i));
    if (!line) return;
    const heading = /^#{1,4}\s+/.test(line);
    blocks.push(
      heading
        ? <p className="asst-h" key={i}>{renderInline(line.replace(/^#{1,4}\s+/, ''), String(i))}</p>
        : <p key={i}>{renderInline(line, String(i))}</p>,
    );
  });
  flush('end');
  return blocks;
}

let nextId = 1;

export default function AssistantPanel() {
  const { lang, setLang } = useLang();
  const { setView } = useUI();
  const [copied, setCopied] = useState<string | null>(null);
  const memoryRef = useRef<Memory>({});
  useEffect(() => { memoryRef.current = loadMemory(); }, []);
  const [messages, setMessages] = useState<Msg[]>(() => [{ id: nextId++, role: 'assistant', content: GREETING[lang] }]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, busy]);

  useEffect(() => { inputRef.current?.focus(); }, []);

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
    const { visitor } = memoryRef.current;
    memoryRef.current = visitor ? { visitor } : {};
    saveMemory(memoryRef.current);
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
          memory: memoryRef.current,
          messages: history.slice(-12).map(m => ({ role: m.role, content: m.content })),
        }),
      });
      if (r.status === 429) throw new Error('quota');
      if (!r.ok || !r.body) throw new Error(`chat endpoint returned ${r.status}`);
      const sources = (r.headers.get('X-Sources') || '').split(',').filter(Boolean);
      const reader = r.body.getReader();
      const dec = new TextDecoder();
      let acc = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        const snapshot = acc.split(ACTION_MARKER)[0];
        setMessages(m => m.map(x => x.id === draftId ? { ...x, content: snapshot } : x));
      }
      const ms = Math.round(performance.now() - t0);
      let body = acc;
      let actions: ChatAction[] | undefined;
      const cut = acc.indexOf(ACTION_MARKER);
      if (cut >= 0) {
        body = acc.slice(0, cut);
        try {
          const tail = JSON.parse(acc.slice(cut + ACTION_MARKER.length));
          actions = Array.isArray(tail) ? tail : tail.actions;
          if (tail && tail.memory) { memoryRef.current = tail.memory; saveMemory(tail.memory); }
        } catch { /* keep the answer */ }
      }
      setMessages(m => m.map(x => x.id === draftId ? { ...x, content: body.trim() || (lang === 'th' ? 'ไม่มีข้อมูลเรื่องนี้ครับ' : 'No information on that.'), sources, ms, actions } : x));
    } catch (e: any) {
      if (e?.name === 'AbortError') return;
      const quota = e?.message === 'quota';
      const msg = quota
        ? (lang === 'th'
            ? 'วันนี้โควตาของผู้ช่วย AI เต็มแล้วครับ ระบบจะกลับมาตอบได้เมื่อโควตารีเซ็ต ระหว่างนี้กดดูกรณีศึกษาได้ตามปกติ'
            : 'The assistant has used up its quota for now. It will answer again once the quota resets; the case studies are all still open to read.')
        : (lang === 'th'
            ? 'ตอนนี้ต่อระบบตอบคำถามไม่ได้ครับ ลองใหม่อีกครั้ง'
            : 'The answer service is unreachable right now. Please try again.');
      setMessages(m => m.map(x => x.id === draftId ? { ...x, content: msg, error: true } : x));
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  };

  const runAction = (a: ChatAction) => {
    if (a.kind === 'view' && a.view) { setView(a.view as any); return; }
    if (a.kind === 'link' && a.url) { window.open(a.url, a.url.startsWith('mailto:') ? '_self' : '_blank', 'noopener,noreferrer'); return; }
    if (a.kind === 'copy' && a.value) {
      navigator.clipboard?.writeText(a.value).then(() => {
        setCopied(a.value!);
        setTimeout(() => setCopied(null), 1800);
      }).catch(() => {});
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
        <div className="asst-title mono">{lang === 'th' ? 'ถามเรื่องงานของวัชรพล' : 'ASK ABOUT THE WORK'}</div>
        <div className="asst-langs">
          <button className={`asst-lang mono ${lang === 'th' ? 'on' : ''}`} onClick={() => switchLang('th')}>TH</button>
          <button className={`asst-lang mono ${lang === 'en' ? 'on' : ''}`} onClick={() => switchLang('en')}>EN</button>
        </div>
      </div>

          <div className="asst-list" ref={listRef}>
            {messages.map(m => (
              <div key={m.id} className={`asst-row ${m.role}`}>
                {m.role === 'assistant' && <div className="asst-avatar"><TbSparkles size={13} /></div>}
                <div className={`asst-bubble ${m.role} ${m.error ? 'err' : ''}`}>
                  {m.content
                    ? m.content.split('\n').map((line, i) => <p key={i}>{line || ' '}</p>)
                    : <span className="asst-dots"><i /><i /><i /></span>}
                  {m.role === 'assistant' && m.actions && m.actions.length > 0 && (
                    <div className="asst-actions">
                      {m.actions.map((a, i) => (
                        <button
                          key={i}
                          className={`asst-action${a.image ? ' has-image' : ''}`}
                          onClick={() => runAction(a)}
                        >
                          {a.image && <img className="asst-action-img" src={a.image} alt="" loading="lazy" />}
                          <span className="asst-action-label">
                            {a.label[lang]}
                            {a.kind === 'view' && <TbArrowUpRight size={13} />}
                            {a.kind === 'link' && <TbExternalLink size={13} />}
                            {a.kind === 'copy' && (copied === a.value ? <TbCheck size={13} /> : <TbCopy size={13} />)}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
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

      <style>{`
        .asst { position: absolute; inset: 0; display: flex; flex-direction: column; background: #fff; color: #000; }
        .asst-title { font-size: 0.6rem; font-weight: 900; letter-spacing: 0.18em; color: #111; }
        .asst-actions { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.45rem; margin-top: 0.7rem; }
        .asst-action {
          display: flex; flex-direction: column; align-items: stretch; gap: 0;
          background: #fff; border: 1px solid #ddd; color: #111; border-radius: 10px;
          overflow: hidden; padding: 0; font: inherit; font-size: 0.72rem; font-weight: 600;
          cursor: pointer; text-align: left; transition: border-color 0.18s, transform 0.18s, box-shadow 0.18s;
        }
        .asst-action:hover { border-color: #111; transform: translateY(-2px); box-shadow: 0 6px 18px rgba(0,0,0,0.10); }
        .asst-action-img { width: 100%; height: 74px; object-fit: cover; display: block; background: #f3f3f1; }
        .asst-action-label { display: flex; align-items: center; justify-content: space-between; gap: 0.35rem; padding: 0.45rem 0.55rem; line-height: 1.3; }
        .asst-action:not(.has-image) { grid-column: span 1; }
        .asst-action:not(.has-image) .asst-action-label { padding: 0.5rem 0.6rem; }
        @media (max-width: 420px) { .asst-actions { grid-template-columns: 1fr; } }
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
        .asst-bubble p + p { margin-top: 0.45rem; }
        .asst-bubble .asst-h { font-weight: 800; }
        .asst-list-ul { margin: 0.4rem 0 0; padding-left: 1.05rem; }
        .asst-list-ul li { margin: 0.22rem 0; }
        .asst-bubble code { font-family: var(--font-mono); font-size: 0.82em; background: rgba(0,0,0,0.06); padding: 0 0.25em; border-radius: 3px; }
        .asst-bubble.user code { background: rgba(255,255,255,0.18); }
        .asst-bubble.assistant { background: #f3f3f1; color: #111; border-bottom-left-radius: 4px; }
        .asst-bubble.user { background: #000; border-bottom-right-radius: 4px; }
        .asst-bubble.user,
        .asst-bubble.user p,
        .asst-bubble.user * { color: #fff; }
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
