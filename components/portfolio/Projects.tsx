import { useState, useRef, useEffect } from 'react';
import SectionHeader from './SectionHeader';
import { TbArrowRight } from 'react-icons/tb';
import { useUI } from '../../lib/state';

// Local thumbnails
import picGeo from '../project/geomap/LINE_20260324_213523.jpg';
import picKafka from '../project/kafka/kafka1.png';
import picMonitor from '../project/cpu/download.png';

const EMB_RAG_DIAGRAM = 'https://raw.githubusercontent.com/watcharaponthod-code/embedding_rag/main/diagram/diagram.png';
const BITCOIN_ARCH    = 'https://raw.githubusercontent.com/watcharaponthod-code/bitcoin-ml-prediction/main/architecture_diagram.png';
const TRADING_DASH    = 'https://raw.githubusercontent.com/watcharaponthod-code/trading/main/public/dashboard.png';

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
  internalLink: string;
  featured?: boolean;
}

const ALL_PROJECTS: Project[] = [
  {
    title: 'Enterprise RAG Ecosystem',
    role: 'FULL-STACK AI ENGINEER',
    desc: 'Two complementary RAG systems for enterprises that cannot send data to external APIs. Vector Docs handles document ingestion and hybrid retrieval. WebClient AI Workspace adds agentic LangGraph orchestration, live Mantis bug-tracker SQL, and multi-user chat.',
    stack: ['LangGraph', 'BGE-M3', 'pgvector', 'Ollama', 'Kubernetes'],
    metrics: '100% ON-PREMISES',
    category: 'AI & RAG',
    internalLink: 'project-rag-ecosystem',
    image: EMB_RAG_DIAGRAM,
    featured: true,
  },
  {
    title: 'Vector Docs (embedding_rag)',
    role: 'ENTERPRISE RAG SYSTEM',
    desc: '100% on-premises document knowledge base. Three ingestion pipelines (manual, email, external), BGE-M3 1024D embeddings, vision-enhanced image indexing, and hybrid RRF retrieval with cross-encoder re-ranking.',
    stack: ['Python', 'BGE-M3', 'pgvector', 'RRF', 'Ollama'],
    metrics: 'HYBRID + RRF',
    category: 'AI & RAG',
    internalLink: 'project-embedding-rag',
    image: EMB_RAG_DIAGRAM,
    featured: true,
  },
  {
    title: "Bank's EDC Ecosystem Visualizer",
    role: 'DATA VISUALIZATION ENGINEER',
    desc: 'Interactive map of all EDC terminals across Thailand. Real-time filtering by province, region, type, and status. Built for internal operations teams.',
    stack: ['FastAPI', 'Leaflet.js', 'Chart.js', 'PostgreSQL'],
    metrics: 'REAL-TIME MAP',
    category: 'FULL-STACK',
    internalLink: 'project-geomap',
    image: picGeo,
    featured: true,
  },
  {
    title: 'Bitcoin ML Prediction',
    role: 'MACHINE LEARNING ENGINEER',
    desc: 'Multi-model ensemble for Bitcoin price prediction using LSTM, XGBoost, and Random Forest. LSTM achieves 87.81% accuracy trained on 12 years of BTC-USD data with 18 engineered technical indicators.',
    stack: ['Python', 'TensorFlow', 'XGBoost', 'scikit-learn'],
    metrics: '87.81% ACCURACY',
    category: 'AI & RAG',
    internalLink: 'project-bitcoin',
    image: BITCOIN_ARCH,
    featured: true,
  },
  {
    title: 'Kafka-to-API Connector',
    role: 'MICROSERVICE ENGINEER',
    desc: 'Production microservice managing Kafka → REST API data synchronization with at-least-once delivery, DLQ, and full audit trail. Built on Java 21 + Spring Boot.',
    stack: ['Java 21', 'Spring Boot', 'Apache Kafka', 'PostgreSQL'],
    metrics: 'EVENT-DRIVEN',
    category: 'SYSTEMS',
    internalLink: 'project-kafka',
    image: picKafka,
  },
  {
    title: 'VM Auto-Scaling & Monitoring',
    role: 'INFRASTRUCTURE ENGINEER',
    desc: 'Proactive VM auto-scaling system that provisions new nodes before CPU/RAM saturation causes degradation. Prometheus + Grafana + automated provisioning scripts.',
    stack: ['Prometheus', 'Grafana', 'Python', 'Cloud VM API'],
    metrics: '< 3 MIN PROVISION',
    category: 'SYSTEMS',
    internalLink: 'project-monitoring',
    image: picMonitor,
  },
  {
    title: 'AlgoTrade Dashboard',
    role: 'OPEN SOURCE · FULL-STACK',
    desc: 'Full-stack algorithmic trading dashboard with real-time market data charts, strategy monitoring, and backtesting results — built on Next.js 16 with full TypeScript.',
    stack: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'WebSocket'],
    metrics: 'REAL-TIME DATA',
    category: 'FULL-STACK',
    internalLink: 'project-trading',
    image: TRADING_DASH,
  },
  {
    title: 'ELIC — AI English Tutor',
    role: 'SENIOR PROJECT · KU',
    desc: 'Conversational AI English tutor for Thai learners. Real-time grammar correction with context, multi-turn session memory, and streaming responses via LangChain.',
    stack: ['React Native', 'Expo', 'LangChain', 'TypeScript'],
    metrics: 'CAPSTONE 2025',
    category: 'AI & RAG',
    internalLink: 'project-elic',
  },
  {
    title: 'Ninja Fruit — AI Pose Game',
    role: 'COMPUTER VISION',
    desc: 'Fruit Ninja-style game controlled by real-time body movement via webcam. YOLOv8 Pose Detection tracks hand keypoints for slash detection — 30+ FPS on laptop GPU.',
    stack: ['Python', 'YOLOv8', 'OpenCV', 'Pygame'],
    metrics: '30+ FPS',
    category: 'COMPUTER VISION',
    internalLink: 'project-ninja',
  },
  {
    title: 'Subway Kids Runner',
    role: 'COMPUTER VISION',
    desc: 'Endless runner controlled by full-body gestures: jump, duck, lane-shift — all via MediaPipe pose estimation. Webcam only, no additional hardware required.',
    stack: ['Python', 'MediaPipe', 'Pygame', 'OpenCV'],
    metrics: 'WEBCAM ONLY',
    category: 'COMPUTER VISION',
    internalLink: 'project-subway',
  },
];

const CATEGORIES: Category[] = ['ALL', 'AI & RAG', 'FULL-STACK', 'SYSTEMS', 'COMPUTER VISION'];

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const { setView } = useUI();
  const { ref, inView } = useInView(0.08);

  return (
    <div
      ref={ref}
      className="project-card"
      onClick={() => setView(p.internalLink as any)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(36px)',
        transition: `opacity 0.55s ease ${index * 0.07}s, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${index * 0.07}s`,
        cursor: 'pointer',
      }}
    >
      {p.image && (
        <div className="project-thumb-box">
          <img src={p.image} alt={p.title} className="project-thumb-img" loading="lazy" />
          <div className="thumb-overlay" />
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
            VIEW CASE STUDY <TbArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [active, setActive] = useState<Category>('ALL');
  const { ref: hRef, inView: hInView } = useInView(0.15);
  const filtered = ALL_PROJECTS.filter(p => active === 'ALL' || p.category === active);
  const featured = filtered.filter(p => p.featured);
  const others = filtered.filter(p => !p.featured);

  return (
    <div className="section container" style={{ minHeight: '100vh', paddingTop: '6rem', paddingBottom: '6rem' }}>
      <div ref={hRef} style={{ opacity: hInView ? 1 : 0, transform: hInView ? 'none' : 'translateY(28px)', transition: 'all 0.65s ease' }}>
        <SectionHeader
          subtitle="02 / SELECTED WORKS"
          titleLines={['Deep Dives &', 'Case Studies.']}
          description="Production systems, research projects, and open-source work. Filter by discipline — click any card for the full case study."
        />
      </div>

      {/* Filter */}
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
          <div className="subsection-label mono" style={{ marginTop: featured.length > 0 ? '4rem' : 0 }}>
            {featured.length > 0 ? 'MORE PROJECTS' : 'ALL PROJECTS'}
          </div>
          <div className="projects-grid">
            {others.map((p, i) => <ProjectCard key={p.title} p={p} index={i} />)}
          </div>
        </>
      )}

      <style>{`
        .category-filter { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2.5rem; margin-top: 0.5rem; }
        .filter-btn { background: transparent; border: 1.5px solid #ddd; padding: 0.4rem 1rem; font-size: 0.62rem; font-weight: 900; letter-spacing: 0.1em; cursor: pointer; color: #999; transition: all 0.2s; }
        .filter-btn:hover { border-color: #000; color: #000; }
        .filter-btn.active { background: #000; color: #fff; border-color: #000; }

        .subsection-label { font-size: 0.58rem; font-weight: 900; color: #bbb; letter-spacing: 0.22em; margin-bottom: 1.4rem; }

        .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(370px, 1fr)); gap: 2rem; }
        .featured-grid { grid-template-columns: repeat(auto-fill, minmax(430px, 1fr)); gap: 2.5rem; }

        .project-card { background: #fff; border: 1px solid #111; display: flex; flex-direction: column; overflow: hidden; transition: box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1); }
        .project-card:hover { transform: translateY(-7px); box-shadow: 0 28px 70px rgba(0,0,0,0.11); }

        .project-thumb-box { height: 215px; overflow: hidden; background: #000; position: relative; border-bottom: 1px solid #111; }
        .project-thumb-img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(1) brightness(0.85); transition: filter 0.5s ease, transform 0.5s ease; }
        .project-card:hover .project-thumb-img { filter: grayscale(0) brightness(1); transform: scale(1.04); }
        .thumb-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.4)); }

        .project-content-wrap { padding: 2rem; flex: 1; display: flex; flex-direction: column; }
        .project-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.1rem; }
        .project-number { font-size: 2rem; font-weight: 900; opacity: 0.07; color: #000; line-height: 1; }
        .project-role { font-size: 0.58rem; font-weight: 900; border: 1.5px solid #000; padding: 0.22rem 0.65rem; letter-spacing: 0.08em; }
        .category-badge { font-size: 0.52rem; font-weight: 900; background: #f5f5f5; padding: 0.18rem 0.55rem; color: #777; letter-spacing: 0.1em; }
        .project-title { font-size: 1.25rem; font-weight: 950; letter-spacing: -0.04em; margin-bottom: 0.75rem; text-transform: uppercase; }
        .project-desc { font-size: 0.88rem; line-height: 1.65; color: #444; margin-bottom: 1.5rem; flex: 1; }

        .project-stack-label { font-size: 0.58rem; font-weight: 900; color: #bbb; margin-bottom: 0.55rem; }
        .project-stack-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.5rem; }
        .stack-tag { background: #f5f5f5; padding: 0.15rem 0.5rem; font-size: 0.58rem; font-weight: 800; color: #777; }

        .project-footer { border-top: 1px solid #eee; padding-top: 1.4rem; display: flex; justify-content: space-between; align-items: flex-end; }
        .project-metric-label { font-size: 0.52rem; font-weight: 900; color: #bbb; margin-bottom: 0.2rem; }
        .project-metric-value { font-size: 0.95rem; font-weight: 950; }

        .project-detail-btn {
          background: #fff; color: #000; border: 1.5px solid #000;
          padding: 0.55rem 1.1rem; font-family: var(--font-mono); font-size: 0.62rem;
          font-weight: 900; display: flex; align-items: center; gap: 0.4rem;
          letter-spacing: 0.08em; cursor: pointer; transition: all 0.25s;
        }
        .project-card:hover .project-detail-btn { background: #000; color: #fff; }

        @media (max-width: 900px) { .projects-grid, .featured-grid { grid-template-columns: 1fr; gap: 1.4rem; } .project-thumb-box { height: 185px; } }
        @media (max-width: 640px) { .project-content-wrap { padding: 1.4rem; } .project-title { font-size: 1.1rem; } .filter-btn { padding: 0.3rem 0.7rem; font-size: 0.58rem; } }
      `}</style>
    </div>
  );
}
