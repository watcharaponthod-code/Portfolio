import { useState, useRef, useEffect } from 'react';
import SectionHeader from './SectionHeader';
import { TbArrowRight } from 'react-icons/tb';
import { useUI } from '../../lib/state';

import picGeo     from '../project/geomap/LINE_20260324_213523.jpg';
import picKafka   from '../project/kafka/kafka1.png';
import picMonitor from '../project/cpu/download.png';

const EMB_DIAGRAM   = 'https://raw.githubusercontent.com/watcharaponthod-code/embedding_rag/main/diagram/diagram.png';
const BITCOIN_ARCH  = 'https://raw.githubusercontent.com/watcharaponthod-code/bitcoin-ml-prediction/main/architecture_diagram.png';
const TRADING_DASH  = 'https://raw.githubusercontent.com/watcharaponthod-code/trading/main/public/dashboard.png';
const NINJA_GIF     = 'https://raw.githubusercontent.com/watcharaponthod-code/Ninja_fruit/main/demo/demo-gameplay.gif';
const SUBWAY_GIF    = 'https://raw.githubusercontent.com/watcharaponthod-code/subway-kids/main/demo/demo-gameplay.gif';
const RAG_CHAT_DIAG = 'https://raw.githubusercontent.com/watcharaponthod-code/rag-chat/main/diagram/diagram.png';

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

type Category = 'ALL' | 'AI & RAG' | 'FULL-STACK' | 'SYSTEMS' | 'COMPUTER VISION';

interface Project {
  title: string;
  role: string;
  desc: string;
  stack: string[];
  metrics: string;
  category: Category;
  image?: string;
  isGif?: boolean;
  internalLink: string;
  featured?: boolean;
}

const ALL_PROJECTS: Project[] = [
  // ── FEATURED ──────────────────────────────────────────────────────────────
  {
    title: 'Enterprise RAG Ecosystem',
    role: 'FULL-STACK AI ENGINEER',
    desc: 'Two production-grade RAG systems built for enterprises that cannot send data to external cloud APIs. Vector Docs handles document ingestion + hybrid RRF retrieval. WebClient AI adds LangGraph agentic orchestration + live Mantis bug-tracker SQL.',
    stack: ['LangGraph', 'BGE-M3', 'pgvector', 'Ollama', 'Kubernetes'],
    metrics: '100% ON-PREMISES',
    category: 'AI & RAG',
    internalLink: 'project-rag-ecosystem',
    image: RAG_CHAT_DIAG,
    featured: true,
  },
  {
    title: 'Vector Docs (embedding_rag)',
    role: 'ENTERPRISE RAG SYSTEM',
    desc: 'On-premises document knowledge base: three ingestion pipelines (manual, email, external), BGE-M3 1024D embeddings, vision-enhanced image indexing, and hybrid RRF retrieval with BGE cross-encoder re-ranking.',
    stack: ['Python', 'BGE-M3', 'pgvector', 'RRF', 'Ollama'],
    metrics: 'HYBRID + RRF',
    category: 'AI & RAG',
    internalLink: 'project-embedding-rag',
    image: EMB_DIAGRAM,
    featured: true,
  },
  {
    title: 'Bitcoin ML Prediction',
    role: 'MACHINE LEARNING ENGINEER',
    desc: 'Multi-model ensemble for Bitcoin price prediction: LSTM (87.81% accuracy), XGBoost, and Random Forest. Trained on 12 years of BTC-USD OHLCV data with 18 engineered technical indicators (RSI, MACD, Bollinger Bands, EMA).',
    stack: ['Python', 'TensorFlow', 'XGBoost', 'scikit-learn'],
    metrics: '87.81% ACCURACY',
    category: 'AI & RAG',
    internalLink: 'project-bitcoin',
    image: BITCOIN_ARCH,
    featured: true,
  },
  {
    title: 'AlgoTrade Dashboard',
    role: 'OPEN SOURCE · FULL-STACK',
    desc: 'Full-stack algorithmic trading dashboard with real-time market data charts, strategy monitoring, and backtesting views. Built on Next.js 16 with full TypeScript and WebSocket live data feeds.',
    stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'WebSocket'],
    metrics: 'REAL-TIME DATA',
    category: 'FULL-STACK',
    internalLink: 'project-trading',
    image: TRADING_DASH,
    featured: true,
  },
  {
    title: 'Ninja Fruit — Pose Game',
    role: 'COMPUTER VISION',
    desc: 'Fruit Ninja-style game controlled by real-time body movement via webcam only. YOLOv8 Pose Detection tracks 17 wrist keypoints per frame to detect slash trajectories at 30+ FPS. Supports up to 3 simultaneous players.',
    stack: ['Python', 'YOLOv8', 'OpenCV', 'Pygame'],
    metrics: '30+ FPS',
    category: 'COMPUTER VISION',
    internalLink: 'project-ninja',
    image: NINJA_GIF,
    isGif: true,
    featured: true,
  },
  {
    title: 'Subway Kids Runner',
    role: 'COMPUTER VISION',
    desc: 'Subway Surfers-style endless runner controlled by full-body pose. MediaPipe BlazePose tracks 33 landmarks for lane-switch and jump gestures. Deployable as Pygame (local) or browser + FastAPI WebSocket (web mode).',
    stack: ['Python', 'MediaPipe', 'Pygame', 'FastAPI', 'WebSocket'],
    metrics: '60 FPS · WEBCAM',
    category: 'COMPUTER VISION',
    internalLink: 'project-subway',
    image: SUBWAY_GIF,
    isGif: true,
    featured: true,
  },
  // ── OTHER ─────────────────────────────────────────────────────────────────
  {
    title: "Bank's EDC Visualizer",
    role: 'DATA VISUALIZATION ENGINEER',
    desc: 'Interactive map of all EDC terminals across Thailand. Real-time filtering by province, region, type, and status. Built for internal bank operations teams.',
    stack: ['FastAPI', 'Leaflet.js', 'Chart.js', 'PostgreSQL'],
    metrics: 'REAL-TIME MAP',
    category: 'FULL-STACK',
    internalLink: 'project-geomap',
    image: picGeo,
  },
  {
    title: 'Kafka-to-API Connector',
    role: 'MICROSERVICE ENGINEER',
    desc: 'Production microservice managing Kafka → REST API data synchronization with at-least-once delivery, DLQ, and full audit trail. Java 21 + Spring Boot.',
    stack: ['Java 21', 'Spring Boot', 'Apache Kafka', 'PostgreSQL'],
    metrics: 'EVENT-DRIVEN',
    category: 'SYSTEMS',
    internalLink: 'project-kafka',
    image: picKafka,
  },
  {
    title: 'VM Auto-Scaling & Monitoring',
    role: 'INFRASTRUCTURE ENGINEER',
    desc: 'Proactive VM auto-scaling system that provisions new nodes before CPU/RAM saturation. Prometheus + Grafana + automated provisioning scripts with < 3 min provision time.',
    stack: ['Prometheus', 'Grafana', 'Python', 'Cloud VM API'],
    metrics: '< 3 MIN PROVISION',
    category: 'SYSTEMS',
    internalLink: 'project-monitoring',
    image: picMonitor,
  },
  {
    title: 'ELIC — AI English Tutor',
    role: 'SENIOR PROJECT · KU',
    desc: 'Conversational AI English tutor for Thai learners. Real-time grammar correction, multi-turn session memory, and streaming responses via LangChain. Capstone 2025.',
    stack: ['React Native', 'Expo', 'LangChain', 'TypeScript'],
    metrics: 'CAPSTONE 2025',
    category: 'AI & RAG',
    internalLink: 'project-elic',
  },
];

const CATEGORIES: Category[] = ['ALL', 'AI & RAG', 'FULL-STACK', 'SYSTEMS', 'COMPUTER VISION'];

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const { setView } = useUI();
  const { ref, inView } = useInView(0.06);

  return (
    <div
      ref={ref}
      className="project-card"
      onClick={() => setView(p.internalLink as any)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.6s ease ${index * 0.06}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.06}s`,
        cursor: 'pointer',
      }}
    >
      {p.image && (
        <div className="project-thumb-box">
          <img
            src={p.image}
            alt={p.title}
            className="project-thumb-img"
            loading="lazy"
            style={{ imageRendering: p.isGif ? 'auto' : undefined }}
          />
          <div className="thumb-overlay" />
          {p.isGif && (
            <div className="gif-badge mono">LIVE DEMO</div>
          )}
        </div>
      )}

      <div className="project-content-wrap">
        <div className="project-header">
          <span className="project-number mono">{String(index + 1).padStart(2, '0')}</span>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' }}>
            <span className="project-role mono">{p.role}</span>
            <span className="category-badge mono">{p.category}</span>
          </div>
        </div>

        <h2 className="project-title">{p.title}</h2>
        <p className="project-desc">{p.desc}</p>

        <div className="project-stack-section">
          <div className="project-stack-label mono">STACK</div>
          <div className="project-stack-tags">
            {p.stack.map(t => <span key={t} className="stack-tag mono">{t}</span>)}
          </div>
        </div>

        <div className="project-footer">
          <div className="project-metrics">
            <div className="project-metric-label mono">IMPACT</div>
            <div className="project-metric-value mono">{p.metrics}</div>
          </div>
          <button className="project-detail-btn mono">
            CASE STUDY <TbArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [active, setActive] = useState<Category>('ALL');
  const { ref: hRef, inView: hInView } = useInView(0.12);
  const filtered = ALL_PROJECTS.filter(p => active === 'ALL' || p.category === active);
  const featured = filtered.filter(p => p.featured);
  const others = filtered.filter(p => !p.featured);

  return (
    <div className="section container" style={{ minHeight: '100vh', paddingTop: '6rem', paddingBottom: '8rem' }}>
      <div ref={hRef} style={{ opacity: hInView ? 1 : 0, transform: hInView ? 'none' : 'translateY(28px)', transition: 'all 0.7s ease' }}>
        <SectionHeader
          subtitle="02 / SELECTED WORKS"
          titleLines={['Deep Dives &', 'Case Studies.']}
          description="Production systems, research projects, and open-source work. Filter by discipline — click any card for the full case study."
        />
      </div>

      <div className="category-filter">
        {CATEGORIES.map(cat => (
          <button key={cat} className={`filter-btn mono ${active === cat ? 'active' : ''}`} onClick={() => setActive(cat)}>{cat}</button>
        ))}
      </div>

      {featured.length > 0 && (
        <>
          <div className="subsection-label mono">FEATURED</div>
          <div className="projects-grid featured-grid">
            {featured.map((p, i) => <ProjectCard key={p.title} p={p} index={i} />)}
          </div>
        </>
      )}

      {others.length > 0 && (
        <>
          <div className="subsection-label mono" style={{ marginTop: featured.length > 0 ? '5rem' : 0 }}>
            {featured.length > 0 ? 'OTHER PROJECTS' : 'ALL PROJECTS'}
          </div>
          <div className="projects-grid">
            {others.map((p, i) => <ProjectCard key={p.title} p={p} index={i} />)}
          </div>
        </>
      )}

      <style>{`
        .category-filter {
          display: flex; flex-wrap: wrap; gap: 0.5rem;
          margin-bottom: 3rem; margin-top: 0.5rem;
        }
        .filter-btn {
          background: transparent; border: 1px solid #d0d0d0;
          padding: 0.45rem 1.1rem; font-size: 0.62rem; font-weight: 900;
          letter-spacing: 0.1em; cursor: pointer; color: #999;
          transition: all 0.25s ease;
        }
        .filter-btn:hover { border-color: #000; color: #000; }
        .filter-btn.active { background: #000; color: #fff; border-color: #000; }

        .subsection-label {
          font-size: 0.58rem; font-weight: 900; color: #aaa;
          letter-spacing: 0.28em; margin-bottom: 1.8rem;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 1.8rem;
        }
        .featured-grid {
          grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
          gap: 2rem;
        }

        /* Card */
        .project-card {
          background: #fff; border: 1px solid #e8e8e8;
          display: flex; flex-direction: column; overflow: hidden;
          transition:
            box-shadow 0.4s ease,
            transform 0.4s cubic-bezier(0.16,1,0.3,1),
            border-color 0.3s ease;
        }
        .project-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 32px 72px rgba(0,0,0,0.13);
          border-color: #bbb;
        }

        /* Thumbnail — NO greyscale, full colour */
        .project-thumb-box {
          height: 220px; overflow: hidden;
          background: #000; position: relative;
          border-bottom: 1px solid #e8e8e8;
        }
        .project-thumb-img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .project-card:hover .project-thumb-img { transform: scale(1.05); }
        .thumb-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.3));
        }

        /* GIF badge */
        .gif-badge {
          position: absolute; top: 0.8rem; right: 0.8rem;
          background: rgba(0,0,0,0.75); color: #fff;
          padding: 0.25rem 0.65rem; font-size: 0.52rem; font-weight: 900;
          letter-spacing: 0.14em;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .project-content-wrap {
          padding: 1.8rem; flex: 1; display: flex; flex-direction: column;
        }
        .project-header {
          display: flex; justify-content: space-between;
          align-items: flex-start; margin-bottom: 1rem;
        }
        .project-number {
          font-size: 1.9rem; font-weight: 900; opacity: 0.07; color: #000; line-height: 1;
        }
        .project-role {
          font-size: 0.57rem; font-weight: 900;
          border: 1.5px solid #111; padding: 0.2rem 0.6rem; letter-spacing: 0.08em;
        }
        .category-badge {
          font-size: 0.51rem; font-weight: 900;
          background: #f2f2f2; padding: 0.16rem 0.5rem;
          color: #888; letter-spacing: 0.1em;
        }
        .project-title {
          font-size: 1.18rem; font-weight: 950; letter-spacing: -0.04em;
          margin-bottom: 0.7rem; text-transform: uppercase;
        }
        .project-desc {
          font-size: 0.87rem; line-height: 1.68; color: #444;
          margin-bottom: 1.4rem; flex: 1;
        }

        .project-stack-label {
          font-size: 0.57rem; font-weight: 900; color: #bbb; margin-bottom: 0.5rem;
        }
        .project-stack-tags { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 1.4rem; }
        .stack-tag {
          background: #f5f5f5; padding: 0.14rem 0.5rem;
          font-size: 0.57rem; font-weight: 800; color: #888;
        }

        .project-footer {
          border-top: 1px solid #ebebeb; padding-top: 1.2rem;
          display: flex; justify-content: space-between; align-items: flex-end;
        }
        .project-metric-label { font-size: 0.52rem; font-weight: 900; color: #bbb; margin-bottom: 0.18rem; }
        .project-metric-value { font-size: 0.9rem; font-weight: 950; }

        .project-detail-btn {
          background: #fff; color: #000; border: 1.5px solid #111;
          padding: 0.5rem 1rem; font-family: var(--font-mono); font-size: 0.61rem;
          font-weight: 900; display: flex; align-items: center; gap: 0.4rem;
          letter-spacing: 0.08em; cursor: pointer;
          transition: background 0.25s, color 0.25s, border-color 0.25s;
        }
        .project-card:hover .project-detail-btn {
          background: #000; color: #fff; border-color: #000;
        }

        @media (max-width: 900px) {
          .projects-grid, .featured-grid {
            grid-template-columns: 1fr; gap: 1.2rem;
          }
          .project-thumb-box { height: 200px; }
        }
        @media (max-width: 640px) {
          .project-content-wrap { padding: 1.3rem; }
          .project-title { font-size: 1.05rem; }
          .filter-btn { padding: 0.3rem 0.7rem; font-size: 0.58rem; }
        }
      `}</style>
    </div>
  );
}
