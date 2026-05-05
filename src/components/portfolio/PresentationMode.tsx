import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbX, TbArrowDown, TbBrandGithub, TbMail, TbPhone, TbMapPin, TbArrowRight } from 'react-icons/tb';
import minePhoto from '../../imge/mine.jpg';
import picGeo     from '../project/geomap/LINE_20260324_213523.jpg';
import picKafka   from '../project/kafka/kafka1.png';
import picMonitor from '../project/cpu/download.png';

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
};

// Framed image — border wraps the actual image size (no black bars)
function FramedImg({ src, caption }: { src: string; caption: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '0 2.5rem' }}>
      <div style={{ display: 'inline-block', border: '1px solid rgba(255,255,255,0.18)', overflow: 'hidden', maxWidth: '100%' }}>
        <img
          src={src}
          alt={caption}
          style={{ display: 'block', maxWidth: 'min(900px, calc(100vw - 5rem))', maxHeight: '78vh', objectFit: 'contain' }}
          loading="lazy"
        />
        <div className="mono" style={{ padding: '0.55rem 1.2rem', fontSize: '0.52rem', color: 'rgba(255,255,255,0.22)', borderTop: '1px solid rgba(255,255,255,0.08)', letterSpacing: '0.18em', textAlign: 'center', background: 'rgba(0,0,0,0.4)' }}>
          {caption}
        </div>
      </div>
    </div>
  );
}

// Centred text block
function Desc({ title, paras, specs, links }: {
  title?: string;
  paras: string[];
  specs?: string[];
  links?: { label: string; url: string }[];
}) {
  return (
    <div style={{ padding: '2rem 2.5rem 3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      {title && <div className="mono" style={{ fontSize: '0.58rem', color: '#e63f6a', fontWeight: 900, letterSpacing: '0.25em', marginBottom: '1rem' }}>{title}</div>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxWidth: '700px', marginBottom: specs || links ? '1.6rem' : 0 }}>
        {paras.map((p, i) => (
          <p key={i} style={{ fontSize: 'clamp(0.86rem, 1.8vw, 0.96rem)', color: 'rgba(255,255,255,0.62)', lineHeight: 1.85, fontWeight: 300, margin: 0 }}>{p}</p>
        ))}
      </div>
      {specs && (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.4rem', marginBottom: links ? '1.4rem' : 0 }}>
          {specs.map(s => (
            <span key={s} className="mono" style={{ fontSize: '0.52rem', fontWeight: 900, border: '1px solid rgba(255,255,255,0.15)', padding: '0.2rem 0.6rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>{s}</span>
          ))}
        </div>
      )}
      {links && (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.6rem' }}>
          {links.map(g => (
            <a key={g.url} href={g.url} target="_blank" rel="noreferrer" className="mono"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 1.1rem', background: '#fff', color: '#000', textDecoration: 'none', fontSize: '0.6rem', fontWeight: 900, letterSpacing: '0.12em', transition: 'all 0.2s' }}
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
function Hdr({ index, label, title, subtitle }: { index: string; label: string; title: string; subtitle: string }) {
  return (
    <div style={{ padding: '3.5rem 2.5rem 1.8rem', textAlign: 'center' }}>
      <span className="mono" style={{ fontSize: 'clamp(3rem, 9vw, 6rem)', fontWeight: 950, color: 'rgba(255,255,255,0.04)', lineHeight: 1, letterSpacing: '-0.06em', display: 'block', marginBottom: '0.4rem' }}>{index}</span>
      <div className="mono" style={{ fontSize: '0.53rem', color: '#e63f6a', fontWeight: 900, letterSpacing: '0.28em', marginBottom: '0.5rem' }}>{label}</div>
      <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.6rem)', fontWeight: 950, color: '#fff', letterSpacing: '-0.04em', textTransform: 'uppercase', lineHeight: 1.05, marginBottom: '0.5rem' }}>{title}</h2>
      <div className="mono" style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.28)', fontWeight: 700, letterSpacing: '0.14em' }}>{subtitle}</div>
    </div>
  );
}

// Thin divider between sub-sections
function SubLabel({ text }: { text: string }) {
  return (
    <div style={{ padding: '1.2rem 2.5rem 0.8rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="mono" style={{ fontSize: '0.52rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.22em' }}>{text}</div>
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
        <motion.div key="pres" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.4 } }}
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

          {/* Body */}
          <div ref={scrollRef} onScroll={handleScroll} style={{ flex: 1, overflowY: 'auto' }}>

            {/* ── 00 IDENTITY ── */}
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <Hdr index="00" label="IDENTITY" title="WATCHARAPON THOD" subtitle="FULL-STACK AI ENGINEER · COMPUTER SCIENCE · KASETSART UNIVERSITY" />
              <div style={{ padding: '0 2.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.4rem' }}>
                <div style={{ width: '190px', height: '190px', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.2)', flexShrink: 0 }}>
                  <img src={minePhoto} alt="Watcharapon" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.45rem' }}>
                  {[{ icon: <TbMail size={13}/>, text:'watcharapon.thod@gmail.com' },
                    { icon: <TbPhone size={13}/>, text:'094-453-2072' },
                    { icon: <TbMapPin size={13}/>, text:'Bangkok, Thailand' }].map(({ icon, text }) => (
                    <div key={text} style={{ display:'flex', alignItems:'center', gap:'0.55rem', color:'rgba(255,255,255,0.45)', fontSize:'0.84rem', fontWeight:300 }}>
                      <span style={{ color:'rgba(255,255,255,0.22)' }}>{icon}</span>{text}
                    </div>
                  ))}
                </div>
                <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'0.4rem' }}>
                  {['IMMEDIATE AVAILABILITY','B.SC. COMPUTER SCIENCE','KASETSART UNIVERSITY','2025'].map(s=>(
                    <span key={s} className="mono" style={{ fontSize:'0.52rem', fontWeight:900, border:'1px solid rgba(255,255,255,0.15)', padding:'0.18rem 0.6rem', color:'rgba(255,255,255,0.35)', letterSpacing:'0.1em' }}>{s}</span>
                  ))}
                </div>
                <a href="https://github.com/watcharaponthod-code" target="_blank" rel="noreferrer" className="mono"
                  style={{ display:'inline-flex', alignItems:'center', gap:'0.4rem', padding:'0.5rem 1.1rem', background:'#fff', color:'#000', textDecoration:'none', fontSize:'0.6rem', fontWeight:900, letterSpacing:'0.12em', transition:'all 0.2s' }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='#e63f6a';(e.currentTarget as HTMLElement).style.color='#fff';}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='#fff';(e.currentTarget as HTMLElement).style.color='#000';}}
                >
                  <TbBrandGithub size={12}/> VIEW GITHUB
                </a>
              </div>
              <div style={{ padding:'0 2.5rem 3.5rem', display:'flex', flexDirection:'column', alignItems:'center' }}>
                <div className="mono" style={{ fontSize:'0.58rem', color:'#e63f6a', fontWeight:900, letterSpacing:'0.25em', marginBottom:'1.2rem' }}>ABOUT_ME</div>
                <div style={{ display:'flex', flexDirection:'column', gap:'0.95rem', maxWidth:'700px', textAlign:'center' }}>
                  {[
                    'I graduated in Computer Science from Kasetsart University and developed a strong interest in AI and Large Language Models from my second year — studying model fundamentals, research papers, and real-world deployment patterns continuously since.',
                    'In my final year I built an AI-powered English learning application using LLM APIs. That project was a turning point: it forced me to think beyond model accuracy and consider response time, cost per request, and user-perceived quality — shifting my view of AI from a research problem to a systems design problem.',
                    'I extended into DevOps and infrastructure to understand production environments more deeply: building a distributed data synchronisation system for high-throughput workloads, and owning system reliability — logging, metrics, and alerting — giving me end-to-end visibility from the application layer to the operational layer.',
                    'During my internship I worked across both DevOps and AI systems, specialising in RAG and Context-Augmented Generation (CAG). I designed pipelines connecting the data layer to the model layer and managed real production trade-offs between latency, retrieval quality, and infrastructure cost.',
                    'Today I develop and deploy AI systems both API-based and via local inference — using Ollama for on-premise deployments — while designing monitoring and cost-control layers that enable teams to operate sustainably at scale.',
                    'For me, moving from DevOps into AI is the convergence of infrastructure knowledge, scalability thinking, and AI application design. I build systems that can be genuinely deployed, scaled, and maintained within the real constraints of a team and a business.',
                  ].map((p,i)=>(
                    <p key={i} style={{ fontSize:'clamp(0.86rem,1.8vw,0.96rem)', color:'rgba(255,255,255,0.6)', lineHeight:1.85, fontWeight:300, margin:0 }}>{p}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* ── 01 RAG ECOSYSTEM ── */}
            <div style={{ borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
              <Hdr index="01" label="FEATURED · AI & RAG" title="ENTERPRISE RAG ECOSYSTEM" subtitle="VECTOR DOCS (embedding_rag) + WEBCLIENT AI WORKSPACE (rag-chat)" />
              <SubLabel text="SYSTEM_01 // VECTOR DOCS — embedding_rag" />
              <FramedImg src={MEDIA.EMB_DIAGRAM} caption="VECTOR_DOCS // THREE INGESTION PIPELINES → BGE-M3 EMBEDDINGS → HYBRID RRF RETRIEVAL → CROSS-ENCODER RERANKING" />
              <Desc title="VECTOR DOCS — WHAT IT DOES"
                paras={[
                  'Vector Docs is a 100% on-premises corporate knowledge base. Documents (PDF, PPTX, DOCX) enter through three ingestion pipelines: manual file upload, automated email capture via n8n webhooks, and pre-processed data from an external embedding service.',
                  'Each document is parsed for both text and images. Text chunks are embedded using BGE-M3 (1024D, cross-lingual Thai/English). Images are described by a vision model and embedded separately — enabling image-aware retrieval even when surrounding text does not mention the image.',
                  'At query time: vector cosine similarity (pgvector) and PostgreSQL full-text search run in parallel, results are merged by Reciprocal Rank Fusion (RRF), then re-scored by BGE-Reranker-v2-m3 cross-encoder. Final answer generated by self-hosted Llama3 / Qwen via Ollama. Zero external API calls.',
                ]}
                specs={['BGE-M3 1024D','HYBRID RRF','CROSS-ENCODER','VISION-ENHANCED','100% ON-PREM']}
                links={[{ label:'VECTOR DOCS REPO', url:'https://github.com/watcharaponthod-code/embedding_rag' }]}
              />
              <SubLabel text="SYSTEM_02 // WEBCLIENT AI WORKSPACE — rag-chat" />
              <FramedImg src={MEDIA.RAG_DIAGRAM} caption="RAG_CHAT // LANGGRAPH INTENT ROUTING → DOCUMENT · IMAGE · LIVE SQL → OLLAMA LLM ANSWER" />
              <Desc title="WEBCLIENT AI WORKSPACE — WHAT IT DOES"
                paras={[
                  'WebClient AI adds a LangGraph state-machine on top of the same retrieval stack. The agent classifies query intent first — document question, image question, or structured data query — then routes to the right tool.',
                  'Bug tracker queries are converted to SQL and executed against a live Mantis MySQL instance in real time. Document and image queries go through HyDE query expansion and multi-query rewriting. Every reasoning step streams to the client via SSE.',
                  'Multi-user session management with per-department document scoping. Dynamic GPU model swapping runs 4 LLMs concurrently on 16GB VRAM by cycling models between GPU and RAM.',
                ]}
                specs={['LANGRAPH AGENTS','HYDE EXPANSION','LIVE SQL · MANTIS','SSE STREAMING','4 MODELS / 16GB']}
                links={[{ label:'RAG CHAT REPO', url:'https://github.com/watcharaponthod-code/rag-chat' }]}
              />
            </div>

            {/* ── 02 BITCOIN ML ── */}
            <div style={{ borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
              <Hdr index="02" label="FEATURED · ML RESEARCH" title="BITCOIN ML PREDICTION" subtitle="LSTM 87.81% · XGBOOST · RANDOM FOREST · 12 YEARS DATA" />
              <FramedImg src={MEDIA.BITCOIN_ARCH} caption="MODEL_ARCHITECTURE // LSTM (128→64→32) + XGBOOST + RANDOM FOREST · 18 TECHNICAL INDICATORS" />
              <Desc paras={[
                'Three-model ensemble trained on 12 years of BTC-USD OHLCV data (2013–2025, 4,200+ samples). LSTM handles continuous price regression with a 90-day lookback; XGBoost and Random Forest handle directional classification.',
                'LSTM: 3 stacked layers (128→64→32), Dropout(0.2), Huber loss for outlier robustness. Result: 87.81% accuracy (MAPE-based), MAE $2,847, RMSE $5,219 on held-out test data.',
                '18 engineered indicators: trend (MA7/30/50, EMA12/26), momentum, volatility (Bollinger Bands), oscillators (RSI, MACD), and volume ratios. Top XGBoost features: RSI, MACD Histogram, 7-day Volatility.',
              ]}
                specs={['87.81% LSTM ACC','18 INDICATORS','12 YEARS DATA','90-DAY LOOKBACK','HUBER LOSS']}
                links={[{ label:'BITCOIN ML REPO', url:'https://github.com/watcharaponthod-code/bitcoin-ml-prediction' }]}
              />
            </div>

            {/* ── 03 NINJA FRUIT ── */}
            <div style={{ borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
              <Hdr index="03" label="FEATURED · COMPUTER VISION" title="NINJA FRUIT" subtitle="YOLOV8 POSE DETECTION · 30+ FPS · 3-PLAYER SIMULTANEOUS" />
              <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem', paddingBottom:'0.5rem' }}>
                <FramedImg src={MEDIA.NINJA1} caption="DEMO_01 // SINGLE PLAYER — WRIST SLASH DETECTION AT 30+ FPS" />
                <FramedImg src={MEDIA.NINJA2} caption="DEMO_02 // MULTIPLAYER — UP TO 3 SIMULTANEOUS PLAYERS" />
                <FramedImg src={MEDIA.NINJA3} caption="DEMO_03 // FRUIT SLICING + BOMB AVOIDANCE — COMBO SCORING" />
              </div>
              <Desc paras={[
                'Fruit Ninja-style game controlled entirely by your body — webcam only. YOLOv8 Pose (yolov8n-pose.pt) tracks up to 3 players simultaneously, assigning each by horizontal position.',
                'Hand History Buffer stores 6 frames of wrist keypoints per player. When wrist displacement exceeds 15px, a slash vector is emitted and checked against all active fruit/bomb hitboxes using line-segment to circle distance.',
                'Score: +1/fruit, combo bonus every 3 cuts, -5 for bombs. Particle effects on every cut. 60-second countdown composited over live webcam feed at 30+ FPS via Pygame.',
              ]}
                specs={['30+ FPS','17 KEYPOINTS/PERSON','3-PLAYER','WEBCAM ONLY','YOLOV8 + BYTETRACK']}
                links={[{ label:'NINJA FRUIT REPO', url:'https://github.com/watcharaponthod-code/Ninja_fruit' }]}
              />
            </div>

            {/* ── 04 SUBWAY KIDS ── */}
            <div style={{ borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
              <Hdr index="04" label="FEATURED · COMPUTER VISION" title="SUBWAY KIDS RUNNER" subtitle="MEDIAPIPE BLAZEPOSE · 60 FPS · LOCAL PYGAME + WEB FASTAPI" />
              <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem', paddingBottom:'0.5rem' }}>
                <FramedImg src={MEDIA.SUBWAY1} caption="DEMO_01 // BODY-CONTROLLED LANE SWITCHING AT 60 FPS" />
                <FramedImg src={MEDIA.SUBWAY2} caption="DEMO_02 // JUMP + OBSTACLE AVOIDANCE GESTURES" />
                <FramedImg src={MEDIA.SUBWAY_ML} caption="ML_PIPELINE // MEDIAPIPE 33-LANDMARK → HIP-CENTRE LANE CLASSIFIER → GAME" />
              </div>
              <Desc paras={[
                'Subway Surfers-style runner controlled by body gestures. MediaPipe Pose Lite detects 33 landmarks at 60 FPS with <10ms CPU inference.',
                'Lane: hip-centre x < 0.38 = Left, 0.38–0.62 = Centre, > 0.62 = Right. Jump: nose y < 0.30. Debounce 200ms prevents false positives.',
                'Dual mode: Local Pygame at 60 FPS, or Web mode — browser streams frames over WebSocket to FastAPI server which returns lane/jump commands. Fully Dockerised with docker-compose.',
              ]}
                specs={['60 FPS','33 LANDMARKS','<10ms CPU','LOCAL + WEB','DOCKER + FASTAPI']}
                links={[{ label:'SUBWAY KIDS REPO', url:'https://github.com/watcharaponthod-code/subway-kids' }]}
              />
            </div>

            {/* ── 05 ALGOTRADE ── */}
            <div style={{ borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
              <Hdr index="05" label="FULL-STACK" title="ALGOTRADE DASHBOARD" subtitle="NEXT.JS 16 · TYPESCRIPT · WEBSOCKET · REAL-TIME CHARTS" />
              <FramedImg src={MEDIA.TRADING} caption="ALGOTRADE // REAL-TIME PRICE FEEDS · STRATEGY MONITORING · BACKTESTING VIEWS" />
              <Desc paras={[
                'Full-stack algorithmic trading dashboard built on Next.js 16 + TypeScript. Live WebSocket price feeds, interactive performance charts, strategy P&L breakdowns, and backtesting result views.',
                'Designed for real-time monitoring of multiple trading strategies simultaneously. Chart components use canvas-based rendering for smooth 60 FPS updates even with high-frequency tick data.',
              ]}
                specs={['NEXT.JS 16','TYPESCRIPT','WEBSOCKET','REAL-TIME','TAILWIND CSS']}
                links={[{ label:'ALGOTRADE REPO', url:'https://github.com/watcharaponthod-code/trading' }]}
              />
            </div>

            {/* ── 06 GeoMap ── */}
            <div style={{ borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
              <Hdr index="06" label="FULL-STACK · DATA VIZ" title="BANK EDC VISUALIZER" subtitle="LEAFLET.JS · FASTAPI · POSTGRESQL · REAL-TIME MAP" />
              <FramedImg src={picGeo} caption="GEO_MAP // INTERACTIVE MAP OF ALL BANK EDC TERMINALS ACROSS THAILAND" />
              <Desc paras={[
                "Interactive map of every bank EDC terminal across Thailand. Built for internal operations teams to monitor terminal health, filter by province, region, type, and status in real time.",
                'Stack: Leaflet.js for map rendering, Chart.js for live analytics panels, FastAPI + PostgreSQL backend. Supports thousands of simultaneous markers with cluster-based rendering for performance.',
              ]}
                specs={['LEAFLET.JS','FASTAPI','POSTGRESQL','CHART.JS','REAL-TIME FILTER']}
              />
            </div>

            {/* ── 07 KAFKA ── */}
            <div style={{ borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
              <Hdr index="07" label="SYSTEMS · MICROSERVICE" title="KAFKA-TO-API CONNECTOR" subtitle="JAVA 21 · SPRING BOOT · AT-LEAST-ONCE DELIVERY · DLQ" />
              <FramedImg src={picKafka} caption="KAFKA_CONNECTOR // EVENT-DRIVEN DATA SYNCHRONISATION WITH AUDIT TRAIL" />
              <Desc paras={[
                'Production microservice managing Kafka → REST API data synchronisation for high-throughput workloads. Guarantees at-least-once delivery with a Dead-Letter Queue for failed events and a full audit trail for every message.',
                'Built on Java 21 + Spring Boot. Handles back-pressure, automatic retry with exponential backoff, and configurable consumer group management. Integrated alerting via Prometheus metrics exported on every consumer lag spike.',
              ]}
                specs={['JAVA 21','SPRING BOOT','APACHE KAFKA','POSTGRESQL','AT-LEAST-ONCE']}
                links={[{ label:'KAFKA REPO', url:'https://github.com/watcharaponthod-code/elic' }]}
              />
            </div>

            {/* ── 08 VM MONITOR ── */}
            <div style={{ borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
              <Hdr index="08" label="SYSTEMS · INFRASTRUCTURE" title="VM AUTO-SCALING & MONITORING" subtitle="PROMETHEUS · GRAFANA · KUBERNETES · < 3 MIN PROVISION" />
              <FramedImg src={picMonitor} caption="VM_MONITOR // PROMETHEUS METRICS → AUTO-SCALER → NEW NODE PROVISIONED IN < 3 MIN" />
              <Desc paras={[
                'Proactive VM auto-scaling system that provisions new nodes before CPU or RAM saturation causes degradation. Prometheus scrapes metrics every 15s; when either CPU or RAM exceeds 90%, the provisioner fires automatically.',
                'Provision time under 3 minutes. Grafana dashboards show real-time cluster health with custom alerting rules. All provisioning scripts are idempotent and logged with full audit trails.',
              ]}
                specs={['PROMETHEUS','GRAFANA','KUBERNETES','PYTHON','< 3 MIN PROVISION']}
              />
            </div>

            {/* ── 09 ELIC ── */}
            <div style={{ borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
              <Hdr index="09" label="AI · CAPSTONE PROJECT" title="ELIC — AI ENGLISH TUTOR" subtitle="REACT NATIVE · EXPO · LANGCHAIN · REAL-TIME GRAMMAR CORRECTION" />
              <Desc paras={[
                'Conversational AI English tutor built for Thai learners as a Kasetsart University senior capstone project. Provides real-time grammar correction with context, multi-turn session memory, and streaming responses via LangChain.',
                'The project was the first time I used LLMs in a production-facing application and directly informed my later work on RAG systems — understanding how context management, prompt engineering, and latency trade-offs affect real user experience.',
                'Built with React Native + Expo for cross-platform mobile delivery. LangChain orchestrates conversation history, grammar analysis chain, and corrective feedback generation in a single pipeline.',
              ]}
                specs={['REACT NATIVE','EXPO','LANGCHAIN','TYPESCRIPT','CAPSTONE 2025']}
                links={[{ label:'ELIC REPO', url:'https://github.com/watcharaponthod-code/elic' }]}
              />
            </div>

            {/* ── ENTER SITE CTA ── */}
            <div style={{ padding:'5rem 2.5rem', display:'flex', flexDirection:'column', alignItems:'center', gap:'2rem', textAlign:'center', background:'rgba(255,255,255,0.01)' }}>
              <div className="mono" style={{ fontSize:'0.52rem', color:'rgba(255,255,255,0.18)', letterSpacing:'0.3em' }}>END_OF_PROFILE // 09 PROJECTS COVERED</div>
              <h3 style={{ fontSize:'clamp(1.8rem,5.5vw,3.5rem)', fontWeight:950, color:'#fff', letterSpacing:'-0.04em', textTransform:'uppercase', lineHeight:1, margin:0 }}>
                Ready to explore<br />the work in detail?
              </h3>
              <p style={{ fontSize:'clamp(0.88rem,2vw,1rem)', color:'rgba(255,255,255,0.45)', fontWeight:300, maxWidth:'500px', lineHeight:1.7, margin:0 }}>
                Each project has a full case study — architecture diagrams, technical deep-dives, live GIF demos, and the full stack breakdown. Click any card on the site to open it.
              </p>
              <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap', justifyContent:'center' }}>
                <motion.button
                  onClick={handleClose}
                  animate={reachedEnd ? { scale:[1,1.04,1] } : {}}
                  transition={{ repeat: reachedEnd ? Infinity : 0, duration:1.6 }}
                  className="mono"
                  style={{ background: reachedEnd ? '#fff' : 'rgba(255,255,255,0.1)', color: reachedEnd ? '#000' : '#fff', border: reachedEnd ? 'none' : '1px solid rgba(255,255,255,0.2)', padding:'1rem 3rem', fontSize:'0.82rem', fontWeight:950, letterSpacing:'0.2em', cursor:'pointer', transition:'all 0.35s', display:'flex', alignItems:'center', gap:'0.5rem' }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='#e63f6a';(e.currentTarget as HTMLElement).style.color='#fff';}}
                  onMouseLeave={e=>{ const el=e.currentTarget as HTMLElement; el.style.background=reachedEnd?'#fff':'rgba(255,255,255,0.1)'; el.style.color=reachedEnd?'#000':'#fff'; }}
                >
                  ENTER SITE <TbArrowRight size={16}/>
                </motion.button>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.5rem', marginTop:'0.5rem' }}>
                <span className="mono" style={{ fontSize:'0.52rem', color:'rgba(255,255,255,0.18)', letterSpacing:'0.15em' }}>
                  {reachedEnd ? 'SCROLL COMPLETE ✓ — CLICK TO ENTER' : 'SCROLL TO UNLOCK · THEN ENTER'}
                </span>
                <span style={{ fontSize:'0.82rem', color:'rgba(255,255,255,0.25)', fontWeight:300 }}>
                  💡 กดที่การ์ดโปรเจ็คใดก็ได้เพื่อดู case study แบบละเอียด
                </span>
              </div>
            </div>

          </div>

          {/* Scroll hint */}
          {progress < 0.02 && (
            <div style={{ position:'absolute', bottom:'4rem', left:'50%', transform:'translateX(-50%)', zIndex:20, pointerEvents:'none' }}>
              <motion.div animate={{ y:[0,7,0] }} transition={{ repeat:Infinity, duration:1.4 }}>
                <TbArrowDown size={20} color="rgba(255,255,255,0.3)" />
              </motion.div>
            </div>
          )}

          {/* Progress bar */}
          <div style={{ flexShrink:0, height:'3px', background:'rgba(255,255,255,0.06)' }}>
            <motion.div style={{ height:'100%', background:'#e63f6a', transformOrigin:'left', scaleX:progress }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
