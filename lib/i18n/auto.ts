// Automatic Thai for the long-form content that is only written in English
// (case studies, project descriptions). Hand-written Thai in projects.th.ts
// wins; anything missing is translated once by /api/translate and then cached
// in localStorage, so a returning visitor pays nothing and the English text is
// shown while the first translation is in flight.
import { useEffect, useMemo, useState } from 'react';
import { useLang } from './index';

const STORE_KEY = 'site-th-cache-v1';
const MAX_BATCH = 40;

let memory: Record<string, string> | null = null;
const inflight = new Map<string, Promise<void>>();
const listeners = new Set<() => void>();

function load(): Record<string, string> {
  if (memory) return memory;
  try {
    const raw = localStorage.getItem(STORE_KEY);
    memory = raw ? JSON.parse(raw) : {};
  } catch {
    memory = {};
  }
  return memory!;
}

function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(memory || {})); } catch {}
}

function notify() { listeners.forEach(fn => fn()); }

async function fetchBatch(texts: string[]) {
  const store = load();
  const missing = texts.filter(t => t && !store[t]);
  if (!missing.length) return;
  for (let i = 0; i < missing.length; i += MAX_BATCH) {
    const slice = missing.slice(i, i + MAX_BATCH);
    const key = slice.join('\u0000');
    if (inflight.has(key)) { await inflight.get(key); continue; }
    const p = (async () => {
      try {
        const r = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ texts: slice, lang: 'th' }),
        });
        if (!r.ok) return;
        const data = await r.json();
        if (!Array.isArray(data.texts)) return;
        const store2 = load();
        slice.forEach((src, k) => {
          const v = data.texts[k];
          if (typeof v === 'string' && v.trim()) store2[src] = v.trim();
        });
        save();
        notify();
      } catch {
        /* keep English */
      } finally {
        inflight.delete(key);
      }
    })();
    inflight.set(key, p);
    await p;
  }
}

/**
 * Give it the English strings a component renders. In English it returns them
 * unchanged. In Thai it returns the hand-written or cached Thai, falling back
 * to English until the translation arrives.
 */
export function useAuto(texts: (string | undefined)[]): (s: string | undefined) => string {
  const { lang } = useLang();
  const [, bump] = useState(0);
  const wanted = useMemo(
    () => Array.from(new Set(texts.filter((t): t is string => typeof t === 'string' && t.trim().length > 1))),
    [texts.join('\u0001')],
  );

  useEffect(() => {
    if (lang !== 'th' || !wanted.length) return;
    const fn = () => bump(n => n + 1);
    listeners.add(fn);
    fetchBatch(wanted);
    return () => { listeners.delete(fn); };
  }, [lang, wanted]);

  return (s?: string) => {
    if (!s) return s || '';
    if (lang !== 'th') return s;
    const store = load();
    return store[s] || s;
  };
}
