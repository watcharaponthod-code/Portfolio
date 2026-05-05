import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbX, TbArrowDown, TbBrandGithub } from 'react-icons/tb';
import minePhoto from '../../imge/mine.jpg';

interface Props { onComplete: () => void; }

// Remote images — real project diagrams
const EMB_RAG_DIAGRAM  = 'https://raw.githubusercontent.com/watcharaponthod-code/embedding_rag/main/diagram/diagram.png';
const RAG_CHAT_DIAGRAM = 'https://raw.githubusercontent.com/watcharaponthod-code/rag-chat/main/diagram/diagram.png';
const BITCOIN_ARCH     = 'https://raw.githubusercontent.com/watcharaponthod-code/bitcoin-ml-prediction/main/architecture_diagram.png';
const TRADING_DASH     = 'https://raw.githubusercontent.com/watcharaponthod-code/trading/main/public/dashboard.png';
const NINJA_GIF        = 'https://raw.githubusercontent.com/watcharaponthod-code/Ninja_fruit/main/demo/demo-gameplay-3.gif';

const SECTIONS = [
  // ── 00  Identity ────────────────────────────────────────────
  {
    index: '00',
    label: 'IDENTITY',
    title: 'WATCHARAPON',
    subtitle: 'FULL-STACK AI ENGINEER',
    body: [
      'Systems engineer specialising in AI, DevOps, Full-Stack, and Data Science.',
      'Focused on building production-grade systems that run on-premises — no external cloud AI dependency.',
      'watcharapon.thod@gmail.com · 094-453-2072 · Bangkok, Thailand',
    ],
    specs: ['IMMEDIATE AVAILABILITY', 'LOCATION: BKK', 'B.SC. COMPUTER SCIENCE'],
    image: minePhoto,
    isHero: true,
    accentLabel: 'PERSONAL_PROFILE',
  },

  // ── 01  RAG Ecosystem (embedding_rag + rag-chat combined) ───
  {
    index: '01',
    label: 'FEATURED PROJECT',
    title: 'RAG ECOSYSTEM',
    subtitle: 'ENTERPRISE KNOWLEDGE AI',
    body: [
      'Two production-grade RAG systems built for organisations that cannot send data to external cloud APIs.',
      'Vector Docs (embedding_rag): Document ingestion pipeline with BGE-M3 embeddings, vision-enhanced image indexing, and hybrid Reciprocal Rank Fusion retrieval.',
      'WebClient AI Workspace (rag-chat): Agentic chat platform that adds intent routing, live Mantis bug-tracker SQL generation, and LangGraph state-machine orchestration on top of the same core.',
    ],
    specs: ['100% ON-PREMISES', 'BGE-M3 EMBEDDINGS', 'HYBRID RETRIEVAL', 'LANGRAPH AGENTS'],
    images: [EMB_RAG_DIAGRAM, RAG_CHAT_DIAGRAM],
    accentLabel: 'ARCHITECTURE_DIAGRAM',
    githubLinks: [
      { label: 'VECTOR DOCS', url: 'https://github.com/watcharaponthod-code/embedding_rag' },
      { label: 'RAG CHAT',    url: 'https://github.com/watcharaponthod-code/rag-chat' },
    ],
  },

  // ── 02  Bitcoin ML ───────────────────────────────────────────
  {
    index: '02',
    label: 'ML RESEARCH',
    title: 'BITCOIN PREDICTION',
    subtitle: 'DEEP LEARNING · 87.81% ACCURACY',
    body: [
      'Multi-model ensemble for Bitcoin price prediction: LSTM (regression), XGBoost, and Random Forest working in combination.',
      'Trained on 12 years of BTC-USD OHLCV data (2013–2025, 4,200+ samples) with 18 engineered technical indicators including RSI, MACD, Bollinger Bands, and EMA.',
      'LSTM achieves 87.81% accuracy (MAPE-based) with a 90-day lookback window and Huber loss for outlier robustness.',
    ],
    specs: ['87.81% LSTM ACCURACY', '18 INDICATORS', '12 YEARS OF DATA', '3-MODEL ENSEMBLE'],
    images: [BITCOIN_ARCH],
    accentLabel: 'MODEL_ARCHITECTURE',
    githubLinks: [
      { label: 'BITCOIN ML', url: 'https://github.com/watcharaponthod-code/bitcoin-ml-prediction' },
    ],
  },

  // ── 03  Computer Vision & Games ──────────────────────────────
  {
    index: '03',
    label: 'COMPUTER VISION',
    title: 'POSE DETECTION GAMES',
    subtitle: 'YOLOV8 · MEDIAPIPE · REAL-TIME',
    body: [
      'Two games that replace controllers with computer vision — webcam only, no additional hardware.',
      'Ninja Fruit: YOLOv8 Pose Detection tracks 17 wrist keypoints per frame to detect slash trajectories at 30+ FPS.',
      'Subway Kids: MediaPipe BlazePose maps 33 full-body landmarks to game actions (jump, duck, lane shift) with debounce filtering to eliminate false positives.',
    ],
    specs: ['30+ FPS INFERENCE', 'YOLOV8 + MEDIAPIPE', 'WEBCAM ONLY', 'REAL-TIME GESTURE'],
    images: [NINJA_GIF],
    accentLabel: 'LIVE_GAMEPLAY_DEMO',
    githubLinks: [
      { label: 'NINJA FRUIT',  url: 'https://github.com/watcharaponthod-code/Ninja_fruit' },
      { label: 'SUBWAY KIDS',  url: 'https://github.com/watcharaponthod-code/subway-kids' },
    ],
  },

  // ── 04  Full-Stack & Systems ─────────────────────────────────
  {
    index: '04',
    label: 'FULL-STACK · SYSTEMS',
    title: 'INFRASTRUCTURE',
    subtitle: 'DATA VIZ · KAFKA · VM SCALING',
    body: [
      'AlgoTrade: Real-time algorithmic trading dashboard built on Next.js 16 + TypeScript with interactive performance charts and backtesting views.',
      "Bank EDC Visualizer: Leaflet.js map of all bank EDC terminals across Thailand — real-time filter by province, type, and status with live Chart.js analytics.",
      'Kafka → API Connector: Java 21 + Spring Boot microservice with at-least-once delivery, DLQ, and full audit trail. VM Auto-Scaler: Prometheus-triggered provisioning at 90% CPU/RAM threshold.',
    ],
    specs: ['NEXT.JS 16 · TS', 'JAVA 21 · KAFKA', 'PROMETHEUS · GRAFANA', 'KUBERNETES'],
    images: [TRADING_DASH],
    accentLabel: 'DASHBOARD_PREVIEW',
    githubLinks: [
      { label: 'ALGOTRADE', url: 'https://github.com/watcharaponthod-code/trading' },
    ],
  },
];

export default function PresentationMode({ onComplete }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => setVisible(true), 80);
    return () => { document.body.style.overflow = ''; clearTimeout(t); };
  }, []);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const p = el.scrollTop / (el.scrollHeight - el.clientHeight);
    setProgress(Math.min(p, 1));
    setReachedEnd(p > 0.86);
  };

  const handleClose = () => {
    setVisible(false);
    setTimeout(onComplete, 600);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="pres"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          style={{ position: 'fixed', inset: 0, zIndex: 9000, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'stretch', justifyContent: 'center' }}
        >
          <motion.div
            initial={{ y: '-3%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-3%', opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: '100%', maxWidth: '980px', height: '100vh', background: '#0f0f0f', display: 'flex', flexDirection: 'column', boxShadow: '0 0 120px rgba(0,0,0,0.9)' }}
          >
            {/* ── Header ── */}
            <div style={{ flexShrink: 0, borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '1.1rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f0f0f' }}>
              <span className="mono" style={{ fontSize: '0.62rem', fontWeight: 900, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.22em' }}>
                WATCHARAPON_THOD <span style={{ opacity: 0.3 }}>// PORTFOLIO_v4.0</span>
              </span>
              <button onClick={handleClose} className="mono"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', color: '#fff', padding: '0.45rem 1.1rem', fontSize: '0.62rem', fontWeight: 900, letterSpacing: '0.15em', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.45rem', transition: 'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; (e.currentTarget as HTMLElement).style.color = '#000'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
              >
                <TbX size={11} /> SKIP
              </button>
            </div>

            {/* ── Scroll body ── */}
            <div ref={scrollRef} onScroll={handleScroll} style={{ flex: 1, overflowY: 'auto' }}>
              {SECTIONS.map((sec, idx) => (
                <div key={sec.index} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: 'clamp(2.5rem, 6vw, 4.5rem) clamp(1.5rem, 5vw, 2.5rem)' }}>

                  {/* Index + label */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '2rem' }}>
                    <span className="mono" style={{ fontSize: 'clamp(3rem, 9vw, 5.5rem)', fontWeight: 950, color: 'rgba(255,255,255,0.05)', lineHeight: 1, letterSpacing: '-0.06em' }}>{sec.index}</span>
                    <div>
                      <div className="mono" style={{ fontSize: '0.55rem', color: '#e63f6a', fontWeight: 900, letterSpacing: '0.28em', marginBottom: '0.3rem' }}>{sec.label}</div>
                      <h2 style={{ fontSize: 'clamp(1.6rem, 5.5vw, 2.8rem)', fontWeight: 950, color: '#fff', letterSpacing: '-0.04em', textTransform: 'uppercase', lineHeight: 1 }}>{sec.title}</h2>
                      <div className="mono" style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.35)', fontWeight: 900, letterSpacing: '0.22em', marginTop: '0.4rem' }}>{sec.subtitle}</div>
                    </div>
                  </div>

                  {/* Main grid: text left, images right */}
                  <div style={{ display: 'grid', gridTemplateColumns: (sec as any).images?.length ? '1fr 1fr' : '1fr', gap: '3rem', alignItems: 'start' }}>

                    {/* Left: body + specs + github links */}
                    <div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                        {sec.body.map((line, i) => (
                          <p key={i} style={{ fontSize: 'clamp(0.88rem, 2.3vw, 1rem)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, fontWeight: 300 }}>{line}</p>
                        ))}
                      </div>

                      {/* Specs pills */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.8rem' }}>
                        {sec.specs.map(s => (
                          <span key={s} className="mono" style={{ fontSize: '0.55rem', fontWeight: 900, border: '1px solid rgba(255,255,255,0.14)', padding: '0.25rem 0.75rem', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em' }}>{s}</span>
                        ))}
                      </div>

                      {/* GitHub links */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                        {(sec as any).githubLinks?.map((g: any) => (
                          <a key={g.url} href={g.url} target="_blank" rel="noreferrer" className="mono"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.55rem 1.2rem', background: '#fff', color: '#000', textDecoration: 'none', fontSize: '0.6rem', fontWeight: 900, letterSpacing: '0.15em', transition: 'all 0.2s' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#e63f6a'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; (e.currentTarget as HTMLElement).style.color = '#000'; }}
                          >
                            <TbBrandGithub size={12} /> {g.label}
                          </a>
                        ))}
                        {(sec as any).isHero && (
                          <a href="https://github.com/watcharaponthod-code" target="_blank" rel="noreferrer" className="mono"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.55rem 1.2rem', background: '#fff', color: '#000', textDecoration: 'none', fontSize: '0.6rem', fontWeight: 900, letterSpacing: '0.15em', transition: 'all 0.2s' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#e63f6a'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; (e.currentTarget as HTMLElement).style.color = '#000'; }}
                          >
                            <TbBrandGithub size={12} /> VIEW GITHUB
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Right: image(s) */}
                    {(sec as any).images && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {(sec as any).images.map((img: string, i: number) => (
                          <div key={i} style={{ border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', background: 'rgba(255,255,255,0.02)', position: 'relative' }}>
                            {img === minePhoto ? (
                              <img src={img} alt="" style={{ width: '100%', display: 'block', maxHeight: '280px', objectFit: 'cover' }} />
                            ) : (
                              <img src={img} alt="" style={{ width: '100%', display: 'block', maxHeight: i === 0 ? '260px' : '200px', objectFit: 'contain', padding: '0.5rem' }} loading="lazy" />
                            )}
                            <div className="mono" style={{ padding: '0.5rem 0.8rem', fontSize: '0.52rem', color: 'rgba(255,255,255,0.25)', borderTop: '1px solid rgba(255,255,255,0.05)', letterSpacing: '0.2em' }}>
                              {(sec as any).accentLabel}{(sec as any).images.length > 1 ? ` // ${i === 0 ? 'VECTOR_DOCS' : 'RAG_CHAT'}` : ''}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Hero: show photo */}
                    {(sec as any).isHero && (
                      <div style={{ border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                        <img src={(sec as any).image} alt="Watcharapon" style={{ width: '100%', display: 'block', maxHeight: '320px', objectFit: 'cover', objectPosition: 'top' }} />
                        <div className="mono" style={{ padding: '0.5rem 0.8rem', fontSize: '0.52rem', color: 'rgba(255,255,255,0.25)', borderTop: '1px solid rgba(255,255,255,0.05)', letterSpacing: '0.2em' }}>PROFILE_IDENTITY</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* ── Enter CTA ── */}
              <div style={{ padding: 'clamp(4rem, 9vw, 6rem) clamp(1.5rem, 5vw, 2.5rem)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.8rem' }}>
                <div className="mono" style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.3em' }}>END_OF_PROFILE // EXPLORE_CASE_STUDIES</div>
                <h3 style={{ fontSize: 'clamp(1.8rem, 6vw, 3.5rem)', fontWeight: 950, color: '#fff', letterSpacing: '-0.04em', textTransform: 'uppercase', lineHeight: 1 }}>Ready to explore<br />the work?</h3>
                <motion.button
                  onClick={handleClose}
                  animate={reachedEnd ? { scale: [1, 1.03, 1] } : {}}
                  transition={{ repeat: reachedEnd ? Infinity : 0, duration: 1.8 }}
                  className="mono"
                  style={{ background: reachedEnd ? '#fff' : 'rgba(255,255,255,0.12)', color: reachedEnd ? '#000' : '#fff', border: reachedEnd ? 'none' : '1px solid rgba(255,255,255,0.2)', padding: '1.1rem 3.2rem', fontSize: '0.85rem', fontWeight: 950, letterSpacing: '0.22em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.4s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#e63f6a'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = reachedEnd ? '#fff' : 'rgba(255,255,255,0.12)'; el.style.color = reachedEnd ? '#000' : '#fff'; }}
                >
                  ENTER SITE →
                </motion.button>
                <span className="mono" style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.15em' }}>{reachedEnd ? 'SCROLL COMPLETE ✓' : 'SCROLL TO UNLOCK'}</span>
              </div>
            </div>

            {/* Scroll hint */}
            {progress < 0.04 && (
              <div style={{ position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)', zIndex: 20, pointerEvents: 'none' }}>
                <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}>
                  <TbArrowDown size={18} color="rgba(255,255,255,0.35)" />
                </motion.div>
              </div>
            )}

            {/* Progress bar */}
            <div style={{ flexShrink: 0, height: '3px', background: 'rgba(255,255,255,0.06)' }}>
              <motion.div style={{ height: '100%', background: '#e63f6a', transformOrigin: 'left', scaleX: progress }} />
            </div>
          </motion.div>

          <style>{`
            @media (max-width: 700px) {
              .pres-grid-2 { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
