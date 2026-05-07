import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbX, TbArrowDown, TbBrandGithub, TbMail, TbPhone, TbMapPin } from 'react-icons/tb';
import minePhoto from '../../imge/mine.jpg';

interface Props { onComplete: () => void; }

const B = 'https://raw.githubusercontent.com/watcharaponthod-code';
const MEDIA = {
  EMB_DIAGRAM:  `${B}/embedding_rag/main/diagram/diagram.png`,
  RAG_DIAGRAM:  `${B}/rag-chat/main/diagram/diagram.png`,
  BITCOIN_ARCH: `${B}/bitcoin-ml-prediction/main/architecture_diagram.png`,
  NINJA1:       `${B}/Ninja_fruit/main/demo/demo-gameplay.gif`,
  NINJA2:       `${B}/Ninja_fruit/main/demo/demo-gameplay-2.gif`,
  NINJA3:       `${B}/Ninja_fruit/main/demo/demo-gameplay-3.gif`,
  SUBWAY1:      `${B}/subway-kids/main/demo/demo-gameplay.gif`,
  SUBWAY2:      `${B}/subway-kids/main/demo/demo-gameplay-2.gif`,
  SUBWAY_ML:    `${B}/subway-kids/main/docs/ml-dataflow.svg`,
  TRADING:      `${B}/trading/main/public/dashboard.png`,
  ELIC_DIAGRAM: `${B}/Portfolio/main/public/elic-usecase.png`,
};

// Framed image component — like project detail cards
function FramedImage({ src, caption, contain = false }: { src: string; caption: string; contain?: boolean }) {
  return (
    <div style={{ padding: '0 2.5rem' }}>
      <div style={{ border: '1px solid rgba(255,255,255,0.15)', overflow: 'hidden', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ background: '#111', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img
            src={src}
            alt={caption}
            style={{
              display: 'block',
              maxWidth: '100%',
              maxHeight: '75vh',
              objectFit: 'contain',
            }}
            loading="lazy"
          />
        </div>
        <div className="mono" style={{ padding: '0.6rem 1.2rem', fontSize: '0.52rem', color: 'rgba(255,255,255,0.22)', borderTop: '1px solid rgba(255,255,255,0.08)', letterSpacing: '0.18em', textAlign: 'center' }}>
          {caption}
        </div>
      </div>
    </div>
  );
}

// Text block below an image — centred
function Caption({ title, paras, specs, links }: {
  title?: string;
  paras: string[];
  specs?: string[];
  links?: { label: string; url: string }[];
}) {
  return (
    <div style={{ padding: '2rem 2.5rem 3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      {title && (
        <div className="mono" style={{ fontSize: '0.6rem', color: '#e63f6a', fontWeight: 900, letterSpacing: '0.25em', marginBottom: '1rem' }}>{title}</div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: specs || links ? '1.8rem' : 0, maxWidth: '720px' }}>
        {paras.map((p, i) => (
          <p key={i} style={{ fontSize: 'clamp(0.87rem, 1.9vw, 0.97rem)', color: 'rgba(255,255,255,0.62)', lineHeight: 1.85, fontWeight: 300, margin: 0 }}>{p}</p>
        ))}
      </div>
      {specs && (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.45rem', marginBottom: links ? '1.4rem' : 0 }}>
          {specs.map(s => (
            <span key={s} className="mono" style={{ fontSize: '0.53rem', fontWeight: 900, border: '1px solid rgba(255,255,255,0.15)', padding: '0.2rem 0.65rem', color: 'rgba(255,255,255,0.38)', letterSpacing: '0.1em' }}>{s}</span>
          ))}
        </div>
      )}
      {links && (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.6rem' }}>
          {links.map(g => (
            <a key={g.url} href={g.url} target="_blank" rel="noreferrer" className="mono"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.5rem 1.1rem', background: '#fff', color: '#000', textDecoration: 'none', fontSize: '0.6rem', fontWeight: 900, letterSpacing: '0.13em', transition: 'all 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#e63f6a'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; (e.currentTarget as HTMLElement).style.color = '#000'; }}
            >
              <TbBrandGithub size={12} /> {g.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// Section header — centred
function SectionHeader({ index, label, title, subtitle }: { index: string; label: string; title: string; subtitle: string }) {
  return (
    <div style={{ padding: '3rem 2.5rem 2rem', textAlign: 'center' }}>
      <span className="mono" style={{ fontSize: 'clamp(3rem, 9vw, 6rem)', fontWeight: 950, color: 'rgba(255,255,255,0.04)', lineHeight: 1, letterSpacing: '-0.06em', display: 'block', marginBottom: '0.5rem' }}>{index}</span>
      <div className="mono" style={{ fontSize: '0.54rem', color: '#e63f6a', fontWeight: 900, letterSpacing: '0.28em', marginBottom: '0.6rem' }}>{label}</div>
      <h2 style={{ fontSize: 'clamp(1.7rem, 4.5vw, 2.8rem)', fontWeight: 950, color: '#fff', letterSpacing: '-0.04em', textTransform: 'uppercase', lineHeight: 1, marginBottom: '0.5rem' }}>{title}</h2>
      <div className="mono" style={{ fontSize: '0.57rem', color: 'rgba(255,255,255,0.28)', fontWeight: 700, letterSpacing: '0.16em' }}>{subtitle}</div>
    </div>
  );
}

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

  const handleClose = () => { setVisible(false); setTimeout(onComplete, 500); };

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
          {/* Top bar */}
          <div style={{ flexShrink: 0, borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(15,15,15,0.98)', backdropFilter: 'blur(12px)', zIndex: 10 }}>
            <span className="mono" style={{ fontSize: '0.6rem', fontWeight: 900, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.22em' }}>
              WATCHARAPON_THOD <span style={{ opacity: 0.3 }}>// PORTFOLIO_v4</span>
            </span>
            <button onClick={handleClose} className="mono"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '0.4rem 1rem', fontSize: '0.6rem', fontWeight: 900, letterSpacing: '0.15em', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'all 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; (e.currentTarget as HTMLElement).style.color = '#000'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
            >
              <TbX size={11} /> SKIP
            </button>
          </div>

          {/* Scrollable body */}
          <div ref={scrollRef} onScroll={handleScroll} style={{ flex: 1, overflowY: 'auto', background: '#080808' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%', background: '#0f0f0f', boxShadow: '0 0 60px rgba(0,0,0,0.8)' }}>

            {/* ── 00 IDENTITY ──────────────────────────────────── */}
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <SectionHeader index="00" label="IDENTITY" title="WATCHARAPON THOD" subtitle="FULL-STACK AI ENGINEER · COMPUTER SCIENCE · KASETSART UNIVERSITY" />

              {/* Circular avatar + contact — centred */}
              <div style={{ padding: '0 2.5rem 2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem' }}>
                <div style={{ width: '200px', height: '200px', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.2)', flexShrink: 0 }}>
                  <img src={minePhoto} alt="Watcharapon" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  {[
                    { icon: <TbMail size={13} />, text: 'watcharapon.thod@gmail.com' },
                    { icon: <TbPhone size={13} />, text: '094-453-2072' },
                    { icon: <TbMapPin size={13} />, text: 'Bangkok, Thailand' },
                  ].map(({ icon, text }) => (
                    <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', fontWeight: 300 }}>
                      <span style={{ color: 'rgba(255,255,255,0.25)' }}>{icon}</span>{text}
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.45rem' }}>
                  {['IMMEDIATE AVAILABILITY', 'B.SC. COMPUTER SCIENCE', 'KASETSART UNIVERSITY', '2025'].map(s => (
                    <span key={s} className="mono" style={{ fontSize: '0.53rem', fontWeight: 900, border: '1px solid rgba(255,255,255,0.15)', padding: '0.2rem 0.65rem', color: 'rgba(255,255,255,0.38)', letterSpacing: '0.1em' }}>{s}</span>
                  ))}
                </div>
                <a href="https://github.com/watcharaponthod-code" target="_blank" rel="noreferrer" className="mono"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.5rem 1.1rem', background: '#fff', color: '#000', textDecoration: 'none', fontSize: '0.6rem', fontWeight: 900, letterSpacing: '0.13em', transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#e63f6a'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; (e.currentTarget as HTMLElement).style.color = '#000'; }}
                >
                  <TbBrandGithub size={12} /> VIEW GITHUB
                </a>
              </div>

              {/* Bio */}
              <div style={{ padding: '0 2.5rem 3.5rem', maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
                <div className="mono" style={{ fontSize: '0.6rem', color: '#e63f6a', fontWeight: 900, letterSpacing: '0.25em', marginBottom: '1.2rem' }}>ABOUT_ME</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    'I graduated in Computer Science from Kasetsart University and developed a strong interest in AI and Large Language Models from my second year — studying model fundamentals, research papers, and real-world deployment patterns continuously since.',
                    'In my final year I built an AI-powered English learning application using LLM APIs. That project was a turning point: it forced me to think beyond model accuracy and consider response time, cost per request, and user-perceived quality — shifting my view of AI from a research problem to a systems design problem.',
                    'I extended into DevOps and infrastructure to understand production environments more deeply: building a distributed data synchronisation system for high-throughput workloads, and taking ownership of system reliability — logging, metrics, and alerting — giving me end-to-end visibility from the application layer to the operational layer.',
                    'During my internship I worked across both DevOps and AI systems, specialising in Retrieval-Augmented Generation (RAG) and Context-Augmented Generation (CAG). I designed pipelines connecting the data layer to the model layer and learned to manage real production trade-offs between latency, retrieval quality, and infrastructure cost.',
                    'Today I can develop and deploy AI systems both API-based and via local inference — using Ollama for on-premise deployments — while designing monitoring and cost-control layers that allow teams to operate sustainably at scale. I am also focused on using AI to improve internal workflows: document processing, automation, and internal tooling that solves real team pain points.',
                    'For me, moving from DevOps into AI is not a career change — it is the convergence of infrastructure knowledge, scalability thinking, and AI application design. I build systems that can be genuinely deployed, scaled, and maintained within the real constraints of a team and a business.',
                  ].map((para, i) => (
                    <p key={i} style={{ fontSize: 'clamp(0.87rem, 1.9vw, 0.97rem)', color: 'rgba(255,255,255,0.62)', lineHeight: 1.85, fontWeight: 300, margin: 0 }}>{para}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* ── 01 RAG ECOSYSTEM ─────────────────────────────── */}
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <SectionHeader index="01" label="FEATURED · AI & RAG" title="ENTERPRISE RAG ECOSYSTEM" subtitle="VECTOR DOCS (embedding_rag) + WEBCLIENT AI WORKSPACE (rag-chat)" />

              {/* Diagram 1 — Vector Docs */}
              <div style={{ padding: '0 2.5rem 0', textAlign: 'center' }}>
                <div className="mono" style={{ fontSize: '0.54rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.22em', marginBottom: '1rem' }}>SYSTEM_01 // VECTOR DOCS — embedding_rag</div>
              </div>
              <FramedImage src={MEDIA.EMB_DIAGRAM} caption="VECTOR_DOCS // THREE INGESTION PIPELINES → BGE-M3 EMBEDDINGS → HYBRID RRF RETRIEVAL → CROSS-ENCODER RERANKING" />
              <Caption
                title="VECTOR DOCS — WHAT IT DOES"
                paras={[
                  'Vector Docs is a 100% on-premises corporate knowledge base. Documents (PDF, PPTX, DOCX) enter through three separate ingestion pipelines: manual file upload, automated email capture via n8n webhooks, and pre-processed data from an external embedding service.',
                  'Each document is parsed for both text and embedded images. Text chunks are embedded using BGE-M3 (1024-dimensional, cross-lingual Thai/English). Images are described by a vision model and embedded separately — enabling image-aware retrieval even when surrounding text does not mention the image content.',
                  'At query time, the system runs vector cosine similarity (pgvector) and PostgreSQL full-text search in parallel, then merges the ranked lists using Reciprocal Rank Fusion (RRF). The top results are re-scored by a BGE-Reranker-v2-m3 cross-encoder before the final answer is generated by a self-hosted Llama3 / Qwen LLM via Ollama. Zero external API calls at any stage.',
                ]}
                specs={['BGE-M3 1024D', 'HYBRID RRF', 'CROSS-ENCODER', 'VISION-ENHANCED', 'OLLAMA · 100% ON-PREM']}
                links={[{ label: 'VECTOR DOCS REPO', url: 'https://github.com/watcharaponthod-code/embedding_rag' }]}
              />

              {/* Diagram 2 — RAG Chat */}
              <div style={{ padding: '1rem 2.5rem 0', borderTop: '1px solid rgba(255,255,255,0.04)', textAlign: 'center' }}>
                <div className="mono" style={{ fontSize: '0.54rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.22em', marginBottom: '1rem' }}>SYSTEM_02 // WEBCLIENT AI WORKSPACE — rag-chat</div>
              </div>
              <FramedImage src={MEDIA.RAG_DIAGRAM} caption="RAG_CHAT // LANGGRAPH INTENT ROUTING → DOCUMENT SEARCH · IMAGE SEARCH · LIVE SQL → OLLAMA LLM ANSWER" />
              <Caption
                title="WEBCLIENT AI WORKSPACE — WHAT IT DOES"
                paras={[
                  'WebClient AI Workspace layers a LangGraph state-machine on top of the same retrieval stack. Rather than routing every query to document search, the agent first classifies intent — is this a document question, an image question, or a structured data question about the live Mantis Bug Tracker?',
                  'Document and image queries go through HyDE (Hypothetical Document Embeddings) query expansion and multi-query rewriting to improve recall on ambiguous inputs. Bug tracker queries are converted to SQL and executed against a live MySQL instance in real time — so the answer reflects current ticket status, not stale indexed data.',
                  'Every reasoning step streams to the client via Server-Sent Events, giving users full visibility into how the answer was assembled. Multi-user session management with per-department document scoping ensures teams only access data they are authorised for.',
                ]}
                specs={['LANGRAPH AGENTS', 'HYDE QUERY EXPANSION', 'LIVE SQL · MANTIS', 'SSE STREAMING', 'MULTI-TENANT']}
                links={[{ label: 'RAG CHAT REPO', url: 'https://github.com/watcharaponthod-code/rag-chat' }]}
              />
            </div>

            {/* ── 02 BITCOIN ML ─────────────────────────────────── */}
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <SectionHeader index="02" label="FEATURED · ML RESEARCH" title="BITCOIN ML PREDICTION" subtitle="LSTM 87.81% · XGBOOST · RANDOM FOREST · 12 YEARS DATA" />
              <FramedImage src={MEDIA.BITCOIN_ARCH} caption="MODEL_ARCHITECTURE // LSTM (128→64→32) + XGBOOST + RANDOM FOREST ENSEMBLE · 18 TECHNICAL INDICATORS" />
              <Caption
                paras={[
                  'A three-model ensemble for Bitcoin price prediction trained on 12 years of BTC-USD OHLCV data (2013–2025, 4,200+ samples). The LSTM handles continuous price regression with a 90-day lookback window; XGBoost and Random Forest handle directional classification.',
                  'The LSTM architecture uses three stacked layers (128 → 64 → 32 units) with Dropout(0.2) between layers and Huber loss for outlier robustness. It achieves 87.81% accuracy (MAPE-based), MAE $2,847, RMSE $5,219 on held-out test data.',
                  '18 engineered technical indicators span five categories: trend (MA7/30/50, EMA12/26), momentum (rate of return, trend strength), volatility (Bollinger Bands, 7/14-day rolling std), oscillators (RSI, MACD, histogram), and volume change ratio. Top XGBoost features: RSI, MACD Histogram, 7-day Volatility.',
                ]}
                specs={['87.81% LSTM ACC', '18 INDICATORS', '12 YEARS DATA', '90-DAY LOOKBACK', 'HUBER LOSS']}
                links={[{ label: 'BITCOIN ML REPO', url: 'https://github.com/watcharaponthod-code/bitcoin-ml-prediction' }]}
              />
            </div>

            {/* ── 03 NINJA FRUIT ───────────────────────────────── */}
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <SectionHeader index="03" label="FEATURED · COMPUTER VISION" title="NINJA FRUIT" subtitle="YOLOV8 POSE DETECTION · 30+ FPS · 3-PLAYER SIMULTANEOUS" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <FramedImage src={MEDIA.NINJA1} caption="DEMO_01 // SINGLE PLAYER — WRIST SLASH DETECTION AT 30+ FPS" />
                <FramedImage src={MEDIA.NINJA2} caption="DEMO_02 // MULTIPLAYER — UP TO 3 SIMULTANEOUS PLAYERS VIA TRACK-ID ASSIGNMENT" />
                <FramedImage src={MEDIA.NINJA3} caption="DEMO_03 // FRUIT SLICING + BOMB AVOIDANCE — COMBO SCORING SYSTEM" />
              </div>
              <Caption
                paras={[
                  'Fruit Ninja-style game controlled entirely by your body — webcam only, no controllers or keyboard required. YOLOv8 Pose (yolov8n-pose.pt) detects and tracks up to 3 players simultaneously, assigning each to a slot by horizontal position: left third = Player 1, centre = Player 2, right = Player 3.',
                  'A Hand History Buffer stores the last 6 frames of wrist keypoints (COCO landmarks 9 and 10) per player. When wrist displacement between the oldest and newest frame exceeds 15 pixels, a slash vector (p1 → p2) is emitted. The collision engine checks each slash against all active fruit/bomb hitboxes using a line-segment to circle distance formula.',
                  'Scoring: +1 per fruit cut, +combo bonus every 3 consecutive cuts, -5 for hitting a bomb. Juice particle effects render on every cut. The 60-second countdown and all sprites are composited over the live mirrored webcam feed at 30+ FPS via Pygame.',
                ]}
                specs={['30+ FPS', '17 KEYPOINTS/PERSON', '3-PLAYER', 'WEBCAM ONLY', 'YOLOV8 + BYTETRACK']}
                links={[{ label: 'NINJA FRUIT REPO', url: 'https://github.com/watcharaponthod-code/Ninja_fruit' }]}
              />
            </div>

            {/* ── 04 SUBWAY KIDS ───────────────────────────────── */}
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <SectionHeader index="04" label="FEATURED · COMPUTER VISION" title="SUBWAY KIDS RUNNER" subtitle="MEDIAPIPE BLAZEPOSE · 60 FPS · LOCAL PYGAME + WEB FASTAPI MODE" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <FramedImage src={MEDIA.SUBWAY1} caption="DEMO_01 // BODY-CONTROLLED LANE SWITCHING AT 60 FPS — WEBCAM ONLY" />
                <FramedImage src={MEDIA.SUBWAY2} caption="DEMO_02 // JUMP GESTURE + OBSTACLE AVOIDANCE — MEDIAPIPE 33-LANDMARK TRACKING" />
                <FramedImage src={MEDIA.SUBWAY_ML} caption="ML_PIPELINE // WEBCAM → MEDIAPIPE POSE → HIP-CENTRE LANE CLASSIFIER → GAME COMMAND" contain />
              </div>
              <Caption
                paras={[
                  'Subway Surfers-style endless runner controlled entirely by body gestures. MediaPipe Pose Lite (model_complexity=0) detects 33 full-body landmarks at 60 FPS with less than 10ms inference on CPU — no GPU required.',
                  'Lane classification uses the horizontal centre of LEFT_HIP (landmark 23) and RIGHT_HIP (landmark 24), normalised to frame width: < 0.38 = Left lane, 0.38–0.62 = Centre, > 0.62 = Right lane. Jump is triggered when the nose landmark rises above y < 0.30. Debounce filtering (200ms) prevents false positives from micro-movements.',
                  'Dual deployment mode: Local mode runs the full game as a Pygame application at 60 FPS — no server needed. Web mode streams browser camera frames over WebSocket to a FastAPI server, which runs pose estimation and returns lane/jump commands back to a Next.js browser game. Fully Dockerised with docker-compose orchestration.',
                ]}
                specs={['60 FPS', '33 LANDMARKS', '<10ms CPU', 'LOCAL + WEB MODE', 'DOCKER + FASTAPI']}
                links={[{ label: 'SUBWAY KIDS REPO', url: 'https://github.com/watcharaponthod-code/subway-kids' }]}
              />
            </div>

            {/* ── 05 ALGOTRADE ─────────────────────────────────── */}
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <SectionHeader index="05" label="AI AUTOMATION · TRADING" title="ALGOTRADE" subtitle="AUTOMATED TRADING ENGINE · VERCEL CRON · REAL-TIME DASHBOARD · TELEGRAM ALERTS" />
              <FramedImage src={MEDIA.TRADING} caption="ALGOTRADE_DASHBOARD // AUTO-TRADER · EQUITY CURVE · OPEN POSITIONS · P&L HISTORY" />
              <Caption
                paras={[
                  'AlgoTrade is an automated trading system that runs its strategy engine every minute through Vercel Cron Jobs, so it does not need a separate always-on server.',
                  'It supports four strategies: Momentum, Mean Reversion, Stat-Arb, and Pairs Trading, with 24/7 crypto trading across BTC, ETH, SOL, AVAX, and DOGE.',
                  'Risk management is built into the execution flow with portfolio heat limits, daily P&L cutoffs, and stale order cleanup to control exposure during fast market moves.',
                  'The real-time dashboard shows portfolio equity, P&L history, and open positions, while Telegram alerts notify every signal and trade execution.',
                ]}
                specs={['VERCEL CRON', '4 STRATEGIES', 'CRYPTO 24/7', 'RISK MANAGEMENT', 'TELEGRAM ALERTS']}
                links={[{ label: 'ALGOTRADE REPO', url: 'https://github.com/watcharaponthod-code/trading' }]}
              />
            </div>

            {/* ── 06 ELIC ───────────────────────────────── */}
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <SectionHeader index="06" label="FEATURED · AI CHATBOT" title="ELIC" subtitle="English Learning App · Google Gemini API · React Native · Expo" />
              <FramedImage src={MEDIA.ELIC_DIAGRAM} caption="ELIC USE CASE DIAGRAM" />
              <Caption
                paras={["AI-powered English learning chatbot mobile app using Google Gemini (gemini-2.0-flash). Runs entirely in the cloud via Gemini API — structured AI responses include conversation reply, vocabulary table, and spelling/grammar correction.", "Supports 6 real-world conversation roles (Hotel, Restaurant, Interview, Doctor, Taxi, New Friend). Includes 3 gamified learning games with Firebase Realtime Database leaderboard, TTS playback, and offline session via AsyncStorage."]}
                specs={['REACT NATIVE', 'EXPO', 'GOOGLE GEMINI', 'FIREBASE', 'ON-DEVICE TTS']}
                links={[{ label: 'ELIC REPO', url: 'https://github.com/watcharaponthod-code/elic' }]}
              />
            </div>
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
          </div>{/* end paper wrapper */}

          {/* Scroll hint */}
          {progress < 0.02 && (
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
