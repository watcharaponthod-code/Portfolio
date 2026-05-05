import { useState, useRef, useEffect } from 'react';
import SectionHeader from './SectionHeader';
import { TbExternalLink, TbBrandGithub, TbArrowRight } from 'react-icons/tb';
import { useUI } from '../../lib/state';

// Local thumbnails
import picSycapt from '../project/ai_RAG/Picture3.png';
import picGeo from '../project/geomap/LINE_20260324_213523.jpg';
import picKafka from '../project/kafka/kafka1.png';
import picMonitor from '../project/cpu/download.png';

// Remote thumbnails (GitHub raw)
const RAG_CHAT_DIAGRAM = 'https://raw.githubusercontent.com/watcharaponthod-code/rag-chat/main/diagram/diagram.png';
const TRADING_DASH = 'https://raw.githubusercontent.com/watcharaponthod-code/trading/main/public/dashboard.png';

// ── Intersection Observer hook for scroll-triggered reveal ───────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ── Data ─────────────────────────────────────────────────────────
type Category = 'ALL' | 'AI & RAG' | 'FULL-STACK' | 'SYSTEMS' | 'COMPUTER VISION';

interface Project {
  title: string;
  role: string;
  desc: string;
  stack: string[];
  metrics: string;
  accent: string;
  category: Category;
  image?: string;
  internalLink?: string | null;
  link?: string | null;
  githubLink?: string | null;
  featured?: boolean;
}

const ALL_PROJECTS: Project[] = [
  // ── Production & Academic ────────────────────────────────────
  {
    title: "AI Enterprise",
    role: "FULL-STACK AI ENGINEER",
    desc: "100% on-premises corporate knowledge management. Ingests PDF/DOCX/PPTX, converts to vectors via bge-m3, and enables natural language querying with Agentic RAG featuring Hybrid Search and Re-ranking.",
    stack: ["Next.js", "NestJS", "Python", "LangGraph", "LlamaIndex", "pgvector", "Kubernetes"],
    metrics: "100% ON-PREMISES",
    accent: "#000",
    category: "AI & RAG",
    internalLink: 'project-sycapt',
    image: picSycapt,
    featured: true,
  },
  {
    title: "Bank's EDC Ecosystem Visualizer",
    role: "DATA VIZ ENGINEER",
    desc: "Interactive map visualizing bank EDC terminals across Thailand in real-time. Supports province/region/type filtering, CSV export, and live Chart.js analytics.",
    stack: ["FastAPI", "SQLAlchemy", "Leaflet.js", "Chart.js", "PostgreSQL"],
    metrics: "REAL-TIME MAP",
    accent: "#000",
    category: "FULL-STACK",
    internalLink: 'project-geomap',
    image: picGeo,
    featured: true,
  },
  {
    title: "VM Auto-Scaling & Infrastructure Monitoring",
    role: "INFRASTRUCTURE ENGINEER",
    desc: "Auto-scaling rules for VM instances based on CPU/RAM patterns. Pro-active resource provisioning during critical load spikes (90%+), ensuring high-availability without manual intervention.",
    stack: ["Prometheus", "Grafana", "Python", "Cloud Scaling", "VM Management"],
    metrics: "AUTOSCALING SYSTEM",
    accent: "#000",
    category: "SYSTEMS",
    internalLink: 'project-monitoring',
    image: picMonitor,
  },
  {
    title: "Kafka-to-API Connector Service",
    role: "MICROSERVICE ENGINEER",
    desc: "Scalable microservice managing scheduled data synchronization between Kafka topics and partner API endpoints. Built with Java 21 and Spring Boot for high-availability event streams.",
    stack: ["Java 21", "Spring Boot", "Apache Kafka", "PostgreSQL", "Docker"],
    metrics: "EVENT-DRIVEN",
    accent: "#000",
    category: "SYSTEMS",
    internalLink: 'project-kafka',
    image: picKafka,
  },
  {
    title: "GPU VRAM Model Swapping",
    role: "SYSTEMS ENGINEER",
    desc: "Engineered a solution to run 4 different LLMs on a server with only 16GB VRAM. Designed a Model Swapping system that cycles models in/out of GPU memory using RAM as a buffer pool.",
    stack: ["Python", "CUDA", "LangChain", "RAM Buffer Mgmt"],
    metrics: "4 LLMs / 16GB VRAM",
    accent: "#000",
    category: "AI & RAG",
  },
  {
    title: "ELIC — AI English Learning App",
    role: "SENIOR PROJECT · KU CHALERMPHRAKIAT",
    desc: "Graduation capstone: conversational AI tutor for Thai learners of English. Features grammar correction, session-based progress tracking, and a natural chat UX designed for daily practice.",
    stack: ["React Native", "Expo", "LangChain", "TypeScript"],
    metrics: "CAPSTONE 2025",
    accent: "#000",
    category: "AI & RAG",
    link: "https://github.com/watcharaponthod-code/elic",
    githubLink: "https://github.com/watcharaponthod-code/elic",
  },
  // ── Open Source ──────────────────────────────────────────────
  {
    title: "WebClient AI Workspace",
    role: "OPEN SOURCE · AGENTIC RAG",
    desc: "Enterprise-grade chat platform for document retrieval and bug tracking. 3-stage Agentic RAG pipeline: intent analysis → hybrid retrieval (vector + FTS + SQL) → semantic re-ranking. Runs 100% on Ollama.",
    stack: ["LangGraph", "LangChain", "Ollama", "pgvector", "React", "Node.js"],
    metrics: "FULLY LOCAL",
    accent: "#000",
    category: "AI & RAG",
    image: RAG_CHAT_DIAGRAM,
    githubLink: "https://github.com/watcharaponthod-code/rag-chat",
    featured: true,
  },
  {
    title: "AlgoTrade Dashboard",
    role: "OPEN SOURCE · FULL-STACK",
    desc: "Full-stack algorithmic trading dashboard with real-time market data visualization and algorithm monitoring. Interactive performance charts, backtesting results, and a fully type-safe Next.js 16 codebase.",
    stack: ["Next.js 16", "TypeScript", "Tailwind CSS", "React"],
    metrics: "REAL-TIME DATA",
    accent: "#000",
    category: "FULL-STACK",
    image: TRADING_DASH,
    githubLink: "https://github.com/watcharaponthod-code/trading",
  },
  {
    title: "Ninja Fruit — AI Pose Game",
    role: "OPEN SOURCE · COMPUTER VISION",
    desc: "Fruit Ninja-style game controlled entirely by body movement via webcam. YOLOv8 Pose Detection tracks hand keypoints in real-time to detect slash trajectories — no controller required.",
    stack: ["Python", "YOLOv8", "OpenCV", "Pose Detection"],
    metrics: "REAL-TIME POSE",
    accent: "#000",
    category: "COMPUTER VISION",
    githubLink: "https://github.com/watcharaponthod-code/Ninja_fruit",
  },
  {
    title: "Subway Kids Runner",
    role: "OPEN SOURCE · COMPUTER VISION",
    desc: "Subway Surfers-style endless runner controlled by body movement via webcam. Jump, duck, and shift lanes using natural pose gestures — only a laptop camera required.",
    stack: ["Python", "MediaPipe", "Pygame", "OpenCV"],
    metrics: "GESTURE CONTROL",
    accent: "#000",
    category: "COMPUTER VISION",
    githubLink: "https://github.com/watcharaponthod-code/subway-kids",
  },
];

const CATEGORIES: Category[] = ['ALL', 'AI & RAG', 'FULL-STACK', 'SYSTEMS', 'COMPUTER VISION'];

// ── Card component with scroll-reveal ───────────────────────────
function ProjectCard({ p, index }: { p: Project; index: number }) {
  const { setView } = useUI();
  const { ref, inView } = useInView(0.1);

  const handleClick = () => {
    if (p.internalLink) { setView(p.internalLink as any); return; }
    if (p.link) window.open(p.link, '_blank', 'noopener,noreferrer');
  };

  const isClickable = !!(p.internalLink || p.link);

  return (
    <div
      ref={ref}
      className={`project-card ${isClickable ? 'clickable-card' : ''}`}
      onClick={isClickable ? handleClick : undefined}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s`,
      }}
    >
      {/* Thumbnail */}
      {p.image && (
        <div className="project-thumb-box">
          <img src={p.image} alt={p.title} className="project-thumb-img" />
          <div className="thumb-overlay" />
        </div>
      )}

      <div className="project-content-wrap">
        {/* Header row */}
        <div className="project-header">
          <span className="project-number mono">{String(index + 1).padStart(2, '0')}</span>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
            <span className="project-role mono">{p.role}</span>
            <span className="category-badge mono">{p.category}</span>
          </div>
        </div>

        <h2 className="project-title">{p.title}</h2>
        <p className="project-desc">{p.desc}</p>

        {/* Stack */}
        <div className="project-stack-section">
          <div className="project-stack-label mono">STACK</div>
          <div className="project-stack-tags">
            {p.stack.map(tech => (
              <span key={tech} className="stack-tag mono">{tech}</span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="project-footer">
          <div className="project-metrics">
            <div className="project-metric-label mono">IMPACT</div>
            <div className="project-metric-value mono">{p.metrics}</div>
          </div>
          <div className="project-actions">
            {p.githubLink && (
              <a
                href={p.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="github-btn mono"
                onClick={e => e.stopPropagation()}
              >
                <TbBrandGithub size={14} /> GITHUB
              </a>
            )}
            {(p.internalLink || (p.link && !p.githubLink)) && (
              <button className="project-detail-btn mono">
                VIEW_DETAILS <TbArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main export ──────────────────────────────────────────────────
export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<Category>('ALL');
  const { ref: headerRef, inView: headerInView } = useInView(0.2);

  const featured = ALL_PROJECTS.filter(p => p.featured && (activeCategory === 'ALL' || p.category === activeCategory));
  const others = ALL_PROJECTS.filter(p => !p.featured && (activeCategory === 'ALL' || p.category === activeCategory));

  return (
    <div className="section container" style={{ minHeight: '100vh', paddingTop: '6rem', paddingBottom: '6rem' }}>

      {/* Section header */}
      <div
        ref={headerRef}
        style={{
          opacity: headerInView ? 1 : 0,
          transform: headerInView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        <SectionHeader
          subtitle="02 / SELECTED WORKS"
          titleLines={["Deep Dives &", "Case Studies."]}
          description="Production systems, research projects, and open-source work. Filter by discipline or click any card for a deep-dive."
        />
      </div>

      {/* Category filter */}
      <div className="category-filter">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`filter-btn mono ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured row */}
      {featured.length > 0 && (
        <>
          <div className="subsection-label mono">FEATURED</div>
          <div className="projects-grid featured-grid">
            {featured.map((p, i) => <ProjectCard key={p.title} p={p} index={i} />)}
          </div>
        </>
      )}

      {/* Other projects */}
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

      {ALL_PROJECTS.filter(p => activeCategory === 'ALL' || p.category === activeCategory).length === 0 && (
        <div className="mono" style={{ textAlign: 'center', padding: '4rem', opacity: 0.4, fontSize: '0.85rem' }}>
          NO PROJECTS IN THIS CATEGORY
        </div>
      )}

      <style>{`
        .category-filter {
          display: flex; flex-wrap: wrap; gap: 0.6rem;
          margin-bottom: 3rem; margin-top: 0.5rem;
        }
        .filter-btn {
          background: transparent; border: 1.5px solid #ddd;
          padding: 0.45rem 1.1rem; font-size: 0.65rem; font-weight: 900;
          letter-spacing: 0.1em; cursor: pointer; color: #888;
          transition: all 0.2s ease;
        }
        .filter-btn:hover { border-color: #000; color: #000; }
        .filter-btn.active { background: #000; color: #fff; border-color: #000; }

        .subsection-label {
          font-size: 0.6rem; font-weight: 900; color: #bbb;
          letter-spacing: 0.2em; margin-bottom: 1.5rem;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 2rem;
        }
        .featured-grid {
          grid-template-columns: repeat(auto-fill, minmax(440px, 1fr));
          gap: 2.5rem;
        }

        .project-card {
          background: #fff; border: 1px solid #111;
          display: flex; flex-direction: column;
          transition: box-shadow 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1);
          overflow: hidden;
        }
        .clickable-card { cursor: pointer; }
        .clickable-card:hover { transform: translateY(-8px); box-shadow: 0 32px 80px rgba(0,0,0,0.12); }

        .project-thumb-box {
          height: 220px; overflow: hidden;
          background: #000; position: relative;
          border-bottom: 1px solid #111;
        }
        .project-thumb-img {
          width: 100%; height: 100%; object-fit: cover;
          filter: grayscale(1) brightness(0.85);
          transition: filter 0.5s ease, transform 0.5s ease;
        }
        .project-card:hover .project-thumb-img {
          filter: grayscale(0) brightness(1);
          transform: scale(1.04);
        }
        .thumb-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.45));
        }

        .project-content-wrap {
          padding: 2rem; flex: 1; display: flex; flex-direction: column;
        }
        .project-header {
          display: flex; justify-content: space-between; align-items: flex-start;
          margin-bottom: 1.2rem;
        }
        .project-number { font-size: 2.2rem; font-weight: 900; opacity: 0.08; color: #000; line-height: 1; }
        .project-role { font-size: 0.6rem; font-weight: 900; border: 1.5px solid #000; padding: 0.25rem 0.7rem; letter-spacing: 0.08em; }
        .category-badge {
          font-size: 0.55rem; font-weight: 900; background: #f5f5f5;
          padding: 0.2rem 0.6rem; color: #666; letter-spacing: 0.1em;
        }
        .project-title { font-size: 1.3rem; font-weight: 950; letter-spacing: -0.04em; margin-bottom: 0.8rem; text-transform: uppercase; }
        .project-desc { font-size: 0.9rem; line-height: 1.65; color: #444; margin-bottom: 1.6rem; flex: 1; }

        .project-stack-label { font-size: 0.6rem; font-weight: 900; color: #aaa; margin-bottom: 0.6rem; }
        .project-stack-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.6rem; }
        .stack-tag { background: #f5f5f5; padding: 0.15rem 0.55rem; font-size: 0.6rem; font-weight: 800; color: #666; }

        .project-footer {
          border-top: 1px solid #eee; padding-top: 1.5rem;
          display: flex; justify-content: space-between; align-items: flex-end;
        }
        .project-metric-label { font-size: 0.55rem; font-weight: 900; color: #aaa; margin-bottom: 0.2rem; }
        .project-metric-value { font-size: 1rem; font-weight: 950; }

        .project-actions { display: flex; gap: 0.5rem; align-items: center; }
        .github-btn {
          background: transparent; color: #000; border: 1.5px solid #ddd;
          padding: 0.6rem 1rem; font-family: var(--font-mono); font-size: 0.65rem;
          font-weight: 900; display: flex; align-items: center; gap: 0.4rem;
          letter-spacing: 0.08em; text-decoration: none; cursor: pointer;
          transition: all 0.25s ease;
        }
        .github-btn:hover { background: #000; color: #fff; border-color: #000; }

        .project-detail-btn {
          background: #000; color: #fff; border: 1.5px solid #000;
          padding: 0.6rem 1.2rem; font-family: var(--font-mono); font-size: 0.65rem;
          font-weight: 900; display: flex; align-items: center; gap: 0.4rem;
          letter-spacing: 0.08em; cursor: pointer; transition: all 0.25s ease;
        }
        .project-card:hover .project-detail-btn { background: #fff; color: #000; }

        @media (max-width: 900px) {
          .projects-grid, .featured-grid { grid-template-columns: 1fr; gap: 1.5rem; }
          .project-thumb-box { height: 190px; }
        }
        @media (max-width: 640px) {
          .project-content-wrap { padding: 1.5rem; }
          .project-number { font-size: 1.8rem; }
          .project-title { font-size: 1.1rem; }
          .category-filter { gap: 0.4rem; }
          .filter-btn { padding: 0.35rem 0.8rem; font-size: 0.6rem; }
        }
      `}</style>
    </div>
  );
}
