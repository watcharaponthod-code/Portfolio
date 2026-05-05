import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbX, TbArrowDown, TbBrandGithub } from 'react-icons/tb';
import minePhoto from '../../imge/mine.jpg';

interface Props { onComplete: () => void; }

const B = 'https://raw.githubusercontent.com/watcharaponthod-code';

const MEDIA = {
  EMB_DIAGRAM:    `${B}/embedding_rag/main/diagram/diagram.png`,
  RAG_DIAGRAM:    `${B}/rag-chat/main/diagram/diagram.png`,
  BITCOIN_ARCH:   `${B}/bitcoin-ml-prediction/main/architecture_diagram.png`,
  NINJA_GIF1:     `${B}/Ninja_fruit/main/demo/demo-gameplay.gif`,
  NINJA_GIF2:     `${B}/Ninja_fruit/main/demo/demo-gameplay-2.gif`,
  NINJA_GIF3:     `${B}/Ninja_fruit/main/demo/demo-gameplay-3.gif`,
  SUBWAY_GIF1:    `${B}/subway-kids/main/demo/demo-gameplay.gif`,
  SUBWAY_GIF2:    `${B}/subway-kids/main/demo/demo-gameplay-2.gif`,
  SUBWAY_ML:      `${B}/subway-kids/main/docs/ml-dataflow.svg`,
  TRADING_DASH:   `${B}/trading/main/public/dashboard.png`,
};

interface MediaItem { src: string; caption: string; }
interface Section {
  index: string;
  label: string;
  title: string;
  subtitle: string;
  media: MediaItem[];
  body: string[];
  specs: string[];
  githubLinks?: { label: string; url: string }[];
  isHero?: boolean;
}

const SECTIONS: Section[] = [
  {
    index: '00',
    label: 'IDENTITY',
    title: 'WATCHARAPON',
    subtitle: 'FULL-STACK AI ENGINEER',
    media: [{ src: minePhoto, caption: 'PROFILE_IDENTITY // WATCHARAPON THOD' }],
    body: [
      'Systems engineer specialising in AI, RAG systems, DevOps, Full-Stack, and Data Science.',
      'Building production-grade systems that run 100% on-premises — no external cloud AI dependency.',
      'watcharapon.thod@gmail.com  ·  094-453-2072  ·  Bangkok, Thailand',
    ],
    specs: ['IMMEDIATE AVAILABILITY', 'LOCATION: BKK', 'B.SC. COMPUTER SCIENCE'],
    githubLinks: [{ label: 'VIEW GITHUB', url: 'https://github.com/watcharaponthod-code' }],
    isHero: true,
  },
  {
    index: '01',
    label: 'FEATURED · AI & RAG',
    title: 'ENTERPRISE RAG ECOSYSTEM',
    subtitle: 'VECTOR DOCS + WEBCLIENT AI WORKSPACE',
    media: [
      { src: MEDIA.EMB_DIAGRAM,  caption: 'VECTOR_DOCS // THREE INGESTION PIPELINES → HYBRID RRF RETRIEVAL' },
      { src: MEDIA.RAG_DIAGRAM,  caption: 'RAG_CHAT // AGENTIC LANGRAPH PIPELINE → LIVE SQL + DOCUMENT QA' },
    ],
    body: [
      'Two production-grade RAG systems built for enterprises that cannot send internal data to external cloud APIs.',
      'Vector Docs (embedding_rag): PDF/PPTX/DOCX ingestion via 3 pipelines, BGE-M3 1024D embeddings, vision-enhanced image indexing, and hybrid RRF retrieval with BGE cross-encoder re-ranking. 100% on-premises.',
      'WebClient AI Workspace (rag-chat): LangGraph state-machine routes queries to document search, image retrieval, or dynamic SQL against Mantis Bug Tracker. HyDE + multi-query rewriting for ambiguous inputs. Self-hosted Ollama (Llama3 + Qwen).',
    ],
    specs: ['100% ON-PREMISES', 'BGE-M3 1024D', 'HYBRID + RRF', 'LANGRAPH AGENTS', '4 MODELS / 16GB VRAM'],
    githubLinks: [
      { label: 'VECTOR DOCS',  url: 'https://github.com/watcharaponthod-code/embedding_rag' },
      { label: 'RAG CHAT',     url: 'https://github.com/watcharaponthod-code/rag-chat' },
    ],
  },
  {
    index: '02',
    label: 'FEATURED · ML RESEARCH',
    title: 'BITCOIN ML PREDICTION',
    subtitle: 'LSTM 87.81% ACCURACY · XGBOOST · RANDOM FOREST',
    media: [
      { src: MEDIA.BITCOIN_ARCH, caption: 'MODEL_ARCHITECTURE // LSTM + XGBOOST + RANDOM FOREST ENSEMBLE' },
    ],
    body: [
      'Multi-model ensemble for Bitcoin price prediction trained on 12 years of BTC-USD OHLCV data (2013–2025, 4,200+ samples).',
      'LSTM (3-layer: 128→64→32 units, Dropout 0.2, Huber loss): 87.81% accuracy with 90-day lookback window. XGBoost and Random Forest for directional classification.',
      '18 engineered technical indicators across 5 categories: trend (MA7/30/50, EMA12/26), momentum, volatility (Bollinger Bands), oscillators (RSI, MACD), and volume ratios.',
    ],
    specs: ['87.81% LSTM ACC', '18 INDICATORS', '12 YEARS DATA', '90-DAY LOOKBACK', '3-MODEL ENSEMBLE'],
    githubLinks: [{ label: 'BITCOIN ML', url: 'https://github.com/watcharaponthod-code/bitcoin-ml-prediction' }],
  },
  {
    index: '03',
    label: 'FEATURED · COMPUTER VISION',
    title: 'NINJA FRUIT',
    subtitle: 'YOLOV8 POSE DETECTION · 30+ FPS · 3-PLAYER',
    media: [
      { src: MEDIA.NINJA_GIF1, caption: 'DEMO_01 // SINGLE PLAYER SLASH DETECTION AT 30+ FPS' },
      { src: MEDIA.NINJA_GIF2, caption: 'DEMO_02 // MULTIPLAYER — UP TO 3 SIMULTANEOUS PLAYERS' },
      { src: MEDIA.NINJA_GIF3, caption: 'DEMO_03 // FRUIT SLICING + BOMB AVOIDANCE GAMEPLAY' },
    ],
    body: [
      'Fruit Ninja-style game controlled entirely by your body — webcam only, no controllers or keyboard.',
      'YOLOv8 Pose model detects up to 3 players and tracks 17 COCO keypoints per person per frame. The Hand History buffer stores 6 frames of wrist positions; when wrist displacement exceeds 15px, a slash vector is emitted.',
      'Collision engine checks each slash trajectory against all active fruit/bomb hitboxes using line-segment to circle distance. Score system: +1/fruit, combo bonus every 3 cuts, -5 for bombs. All rendering via Pygame at 30+ FPS.',
    ],
    specs: ['30+ FPS INFERENCE', '17 KEYPOINTS/PERSON', '3-PLAYER SIMULTANEOUS', 'WEBCAM ONLY'],
    githubLinks: [{ label: 'NINJA FRUIT', url: 'https://github.com/watcharaponthod-code/Ninja_fruit' }],
  },
  {
    index: '04',
    label: 'FEATURED · COMPUTER VISION',
    title: 'SUBWAY KIDS RUNNER',
    subtitle: 'MEDIAPIPE BLAZEPOSE · 60 FPS · LOCAL + WEB MODE',
    media: [
      { src: MEDIA.SUBWAY_GIF1, caption: 'DEMO_01 // BODY-CONTROLLED LANE SWITCHING AT 60 FPS' },
      { src: MEDIA.SUBWAY_GIF2, caption: 'DEMO_02 // JUMP + OBSTACLE AVOIDANCE GESTURES' },
      { src: MEDIA.SUBWAY_ML,   caption: 'ML_PIPELINE // MEDIAPIPE 33-LANDMARK → LANE CLASSIFIER → GAME' },
    ],
    body: [
      'Subway Surfers-style endless runner controlled entirely by body gestures via webcam. MediaPipe Pose Lite detects 33 full-body landmarks at 60 FPS (<10ms inference on CPU).',
      'Lane classification: hip-centre x-coordinate normalised to frame width. < 0.38 = Left, 0.38–0.62 = Centre, > 0.62 = Right. Jump: nose landmark rises above y < 0.30. Debounce filtering prevents false positives.',
      'Dual deployment: Local mode runs Pygame at 60 FPS. Web mode streams browser camera frames over WebSocket to a FastAPI server which runs pose estimation and returns lane + jump commands. Fully Dockerised.',
    ],
    specs: ['60 FPS GAMEPLAY', '33 LANDMARKS', '<10ms INFERENCE', 'LOCAL + WEB MODE', 'DOCKER + FASTAPI'],
    githubLinks: [{ label: 'SUBWAY KIDS', url: 'https://github.com/watcharaponthod-code/subway-kids' }],
  },
  {
    index: '05',
    label: 'FULL-STACK · SYSTEMS',
    title: 'ALGOTRADE + INFRASTRUCTURE',
    subtitle: 'NEXT.JS · KAFKA · PROMETHEUS · KUBERNETES',
    media: [
      { src: MEDIA.TRADING_DASH, caption: 'ALGOTRADE_DASHBOARD // REAL-TIME CHARTS + BACKTESTING VIEWS' },
    ],
    body: [
      'AlgoTrade: Real-time algorithmic trading dashboard built on Next.js 16 + TypeScript. Live WebSocket price feeds, interactive performance charts, strategy monitoring, and backtesting result views.',
      "Bank EDC Visualizer: Leaflet.js interactive map of all bank EDC terminals across Thailand. Real-time filter by province, type, and status. Built for internal bank operations teams using FastAPI + PostgreSQL.",
      'Kafka → API Connector: Java 21 + Spring Boot microservice with at-least-once delivery, DLQ, and audit trail. VM Auto-Scaler: Prometheus-triggered provisioning at 90% CPU/RAM threshold, < 3 min provision time.',
    ],
    specs: ['NEXT.JS 16 · TS', 'JAVA 21 · KAFKA', 'PROMETHEUS · GRAFANA', 'KUBERNETES', 'LEAFLET.JS'],
    githubLinks: [{ label: 'ALGOTRADE', url: 'https://github.com/watcharaponthod-code/trading' }],
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
    setReachedEnd(p > 0.92);
  };

  const handleClose = () => {
    setVisible(false);
    setTimeout(onComplete, 500);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="pres"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
          style={{ position: 'fixed', inset: 0, zIndex: 9000, background: '#0f0f0f', display: 'flex', flexDirection: 'column' }}
        >
          {/* ── Top bar ── */}
          <div style={{ flexShrink: 0, borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(15,15,15,0.98)', backdropFilter: 'blur(12px)', zIndex: 10 }}>
            <span className="mono" style={{ fontSize: '0.6rem', fontWeight: 900, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.22em' }}>
              WATCHARAPON_THOD <span style={{ opacity: 0.3 }}>// PORTFOLIO_v4</span>
            </span>
            <button
              onClick={handleClose}
              className="mono"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '0.4rem 1rem', fontSize: '0.6rem', fontWeight: 900, letterSpacing: '0.15em', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'all 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; (e.currentTarget as HTMLElement).style.color = '#000'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
            >
              <TbX size={11} /> SKIP
            </button>
          </div>

          {/* ── Scrollable content ── */}
          <div ref={scrollRef} onScroll={handleScroll} style={{ flex: 1, overflowY: 'auto' }}>

            {SECTIONS.map((sec) => (
              <div key={sec.index} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>

                {/* Section header */}
                <div style={{ padding: '3rem 2.5rem 2rem', maxWidth: '900px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '1.2rem' }}>
                    <span className="mono" style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', fontWeight: 950, color: 'rgba(255,255,255,0.04)', lineHeight: 1, letterSpacing: '-0.06em', flexShrink: 0 }}>{sec.index}</span>
                    <div>
                      <div className="mono" style={{ fontSize: '0.55rem', color: '#e63f6a', fontWeight: 900, letterSpacing: '0.28em', marginBottom: '0.4rem' }}>{sec.label}</div>
                      <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 950, color: '#fff', letterSpacing: '-0.04em', textTransform: 'uppercase', lineHeight: 1, marginBottom: '0.4rem' }}>{sec.title}</h2>
                      <div className="mono" style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.3)', fontWeight: 700, letterSpacing: '0.18em' }}>{sec.subtitle}</div>
                    </div>
                  </div>
                </div>

                {/* ── Media: full-width stacked ── */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {sec.media.map((m, i) => (
                    <div key={i} style={{ position: 'relative', background: '#000' }}>
                      <img
                        src={m.src}
                        alt={m.caption}
                        style={{ width: '100%', display: 'block', maxHeight: sec.isHero ? '70vh' : '85vh', objectFit: sec.isHero ? 'cover' : 'contain', objectPosition: sec.isHero ? 'top center' : 'center' }}
                        loading="lazy"
                      />
                      <div className="mono" style={{ padding: '0.6rem 1.2rem', fontSize: '0.52rem', color: 'rgba(255,255,255,0.22)', borderTop: '1px solid rgba(255,255,255,0.06)', letterSpacing: '0.2em', background: 'rgba(0,0,0,0.6)' }}>
                        {m.caption}
                      </div>
                    </div>
                  ))}
                </div>

                {/* ── Text + specs + links ── */}
                <div style={{ padding: '2.5rem 2.5rem 3rem', maxWidth: '860px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '2rem' }}>
                    {sec.body.map((line, i) => (
                      <p key={i} style={{ fontSize: 'clamp(0.88rem, 2vw, 1rem)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, fontWeight: 300, margin: 0 }}>{line}</p>
                    ))}
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.8rem' }}>
                    {sec.specs.map(s => (
                      <span key={s} className="mono" style={{ fontSize: '0.54rem', fontWeight: 900, border: '1px solid rgba(255,255,255,0.15)', padding: '0.22rem 0.7rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>{s}</span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                    {sec.githubLinks?.map(g => (
                      <a key={g.url} href={g.url} target="_blank" rel="noreferrer" className="mono"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.5rem 1.1rem', background: '#fff', color: '#000', textDecoration: 'none', fontSize: '0.6rem', fontWeight: 900, letterSpacing: '0.13em', transition: 'all 0.2s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#e63f6a'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; (e.currentTarget as HTMLElement).style.color = '#000'; }}
                      >
                        <TbBrandGithub size={12} /> {g.label}
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            ))}

            {/* ── Enter CTA ── */}
            <div style={{ padding: '5rem 2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', textAlign: 'center' }}>
              <div className="mono" style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.3em' }}>END_OF_PROFILE // EXPLORE_CASE_STUDIES</div>
              <h3 style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 950, color: '#fff', letterSpacing: '-0.04em', textTransform: 'uppercase', lineHeight: 1, margin: 0 }}>
                Ready to explore<br />the work?
              </h3>
              <motion.button
                onClick={handleClose}
                animate={reachedEnd ? { scale: [1, 1.04, 1] } : {}}
                transition={{ repeat: reachedEnd ? Infinity : 0, duration: 1.6 }}
                className="mono"
                style={{ background: reachedEnd ? '#fff' : 'rgba(255,255,255,0.1)', color: reachedEnd ? '#000' : '#fff', border: reachedEnd ? 'none' : '1px solid rgba(255,255,255,0.2)', padding: '1.1rem 3.5rem', fontSize: '0.85rem', fontWeight: 950, letterSpacing: '0.22em', cursor: 'pointer', transition: 'all 0.35s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#e63f6a'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = reachedEnd ? '#fff' : 'rgba(255,255,255,0.1)'; el.style.color = reachedEnd ? '#000' : '#fff'; }}
              >
                ENTER SITE →
              </motion.button>
              <span className="mono" style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.15em' }}>
                {reachedEnd ? 'SCROLL COMPLETE ✓' : 'SCROLL TO UNLOCK'}
              </span>
            </div>

          </div>

          {/* Scroll down hint */}
          {progress < 0.03 && (
            <div style={{ position: 'absolute', bottom: '4rem', left: '50%', transform: 'translateX(-50%)', zIndex: 20, pointerEvents: 'none' }}>
              <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}>
                <TbArrowDown size={20} color="rgba(255,255,255,0.3)" />
              </motion.div>
            </div>
          )}

          {/* Progress bar */}
          <div style={{ flexShrink: 0, height: '3px', background: 'rgba(255,255,255,0.06)' }}>
            <motion.div style={{ height: '100%', background: '#e63f6a', transformOrigin: 'left', scaleX: progress }} />
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
