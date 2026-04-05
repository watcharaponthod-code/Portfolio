import SectionHeader from './SectionHeader';
import { TbExternalLink, TbStack2, TbBolt, TbArrowRight } from 'react-icons/tb';
import { useUI } from '../../lib/state';

// Imported Thumbnails
import picSycapt from '../project/ai_RAG/Picture3.png';
import picGeo from '../project/geomap/LINE_20260324_213523.jpg';
import picKafka from '../project/kafka/kafka1.png';
import picMonitor from '../project/cpu/download.png';

export default function Projects() {
  const { setView } = useUI();

  const handleProjectNavigation = (project: { internalLink?: string | null; link?: string | null }) => {
    if (project.internalLink) {
      setView(project.internalLink as any);
      return;
    }
    if (project.link) {
      window.open(project.link, '_blank', 'noopener,noreferrer');
    }
  };

  const projects = [
    {
      title: "AI Enterprise",
      role: "FULL-STACK AI ENGINEER",
      desc: "Built a 100% On-Premises corporate knowledge management system. Ingests PDF/DOCX/PPTX, converts to vectors via bge-m3, and enables natural language querying with Agentic RAG Pipeline featuring Hybrid Search (Vector + Full-Text) and Re-ranking.",
      stack: ["Next.js", "NestJS", "Python", "LangGraph", "LlamaIndex", "pgvector", "Kubernetes"],
      metrics: "100% ON-PREMISES",
      subMetric: "HYBRID SEARCH + RE-RANKING",
      accent: "#000",
      link: null,
      internalLink: 'project-sycapt',
      image: picSycapt
    },
    {
      title: "Bank's EDC Ecosystem Visualizer",
      role: "DATA VIZ ENGINEER",
      desc: "Interactive web application visualizing bank EDC terminals across Thailand on a real-time map. Supports filtering by province, region, machine type, and status. Features CSV export and live Chart.js analytics.",
      stack: ["FastAPI", "SQLAlchemy", "Leaflet.js", "Chart.js", "PostgreSQL"],
      metrics: "REAL-TIME MAP",
      subMetric: "BUILT-IN DATA ANALYTICS",
      accent: "#000",
      link: null,
      internalLink: 'project-geomap',
      image: picGeo
    },
    {
      title: "VM Auto-Scaling & Infrastructure Monitoring",
      role: "INFRASTRUCTURE ENGINEER",
      desc: "Designed and implemented auto-scaling rules for VM instances based on CPU/RAM usage patterns. Engineered a pro-active resource management system that provisions additional nodes during critical load spikes (90%+), ensuring high-availability.",
      stack: ["Prometheus", "Grafana", "Python", "Cloud Scaling", "VM Management"],
      metrics: "AUTOSCALING_SYSTEM",
      subMetric: "DYNAMIC_INSTANCE_ORCHESTRATION",
      accent: "#000",
      link: null,
      internalLink: 'project-monitoring',
      image: picMonitor
    },
    {
      title: "Kafka-to-API Connector Service",
      role: "MICROSERVICE ENGINEER",
      desc: "Scalable microservice managing scheduled data synchronization between Kafka topics and partner API endpoints. Built with Java 21 and Spring Boot for high-availability event streams.",
      stack: ["Java 21", "Spring Boot", "Apache Kafka", "PostgreSQL", "Docker"],
      metrics: "EVENT-DRIVEN",
      subMetric: "3-PHASE PIPELINE",
      accent: "#000",
      link: null,
      internalLink: 'project-kafka',
      image: picKafka
    },
    {
      title: "GPU VRAM Model Swapping",
      role: "SYSTEMS ENGINEER",
      desc: "Engineered a solution to run 4 different LLMs on a server with only 16GB VRAM. Designed a Model Swapping system that cycles models in/out of GPU memory, using RAM as a buffer pool.",
      stack: ["Python", "CUDA", "LangChain", "RAM Buffer Mgmt"],
      metrics: "4 LLMs / 16GB VRAM",
      subMetric: "RESOURCE OPTIMIZED",
      accent: "#000",
      link: null
    },
    {
      title: "ELIC Application",
      role: "SENIOR PROJECT",
      desc: "Graduation senior project developed as part of the B.Sc. Computer Science Co-op Program at Kasetsart University Chalermphrakiat. Demonstrating end-to-end system design and implementation skills.",
      stack: ["React", "TypeScript", "Full-Stack", "Kasetsart University"],
      metrics: "CAPSTONE PROJECT",
      subMetric: "KU CHALERMPHRAKIAT 2025",
      accent: "#000",
      link: "https://sites.google.com/view/elicapplication/...",
      internalLink: null
    }
  ];

  return (
    <div className="section container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '6rem', paddingBottom: '6rem' }}>
      <div className="animate-enter">
        <SectionHeader
          subtitle="02 / SELECTED WORKS"
          titleLines={["Deep Dives &", "Case Studies."]}
          description="High-performance systems and production-grade implementations. Click cards to view deep-dive documentation."
        />

        <div className="projects-grid">
          {projects.map((p, i) => (
            <div 
              key={i} 
              className={`project-card stagger-item ${(p.internalLink || p.link) ? 'clickable-card' : ''}`}
              onClick={(p.internalLink || p.link) ? () => handleProjectNavigation(p) : undefined}
            >
              {/* Thumbnail (New) */}
              {p.image && (
                <div className="project-thumb-box">
                  <img src={p.image} alt={p.title} className="project-thumb-img" />
                  <div className="thumb-overlay" />
                </div>
              )}

              <div className="project-content-wrap">
                <div className="project-header">
                  <span className="project-number mono">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="project-role mono">
                    {p.role}
                  </span>
                </div>

                <h2 className="project-title">{p.title}</h2>
                <p className="project-desc">{p.desc}</p>

                <div className="project-stack-section">
                  <div className="project-stack-label mono">STACK</div>
                  <div className="project-stack-tags">
                    {p.stack.map(tech => (
                      <span key={tech} className="stack-tag mono">{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="project-footer">
                  <div className="project-metrics">
                    <div className="project-metric-label mono">IMPACT</div>
                    <div className="project-metric-value mono">{p.metrics}</div>
                  </div>
                  { (p.internalLink || p.link) && (
                    <button className="project-detail-btn mono">
                      VIEW_DETAILS <TbArrowRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
          gap: 2.5rem;
        }

        @media (max-width: 1200px) {
          .projects-grid { gap: 1.5rem; }
        }

        @media (max-width: 900px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
           .project-thumb-box {
            height: 200px;
          }
        }

        @media (max-width: 640px) {
          .project-content-wrap {
            padding: 1.5rem;
          }
          .project-number {
             font-size: 2rem;
          }
          .project-title {
            font-size: 1.2rem;
          }
          .project-detail-btn {
            padding: 0.6rem 1.2rem;
            font-size: 0.65rem;
          }
        }
        .project-card {
          background: #fff;
          border: 1px solid #111;
          display: flex;
          flex-direction: column;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }
        .clickable-card { cursor: pointer; }
        .clickable-card:hover { transform: translateY(-10px); box-shadow: 0 40px 100px rgba(0,0,0,0.1); }
        
        .project-thumb-box {
          height: 240px;
          overflow: hidden;
          background: #000;
          position: relative;
          border-bottom: 1px solid #111;
        }
        .project-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(1) brightness(0.85);
          transition: all 0.6s ease;
        }
        .project-card:hover .project-thumb-img {
          filter: grayscale(0) scale(1.05);
        }
        .thumb-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.5));
          opacity: 0.5;
        }

        .project-content-wrap {
          padding: 2.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .project-header {
          display: flex; justify-content: space-between; align-items: flex-start;
          margin-bottom: 1.5rem;
        }
        .project-number { font-size: 2.5rem; font-weight: 900; opacity: 0.1; color: #000; }
        .project-role { font-size: 0.65rem; font-weight: 900; border: 1.5px solid #000; padding: 0.3rem 0.8rem; letter-spacing: 0.1em; }
        .project-title { font-size: 1.4rem; font-weight: 950; letter-spacing: -0.04em; margin-bottom: 1rem; text-transform: uppercase; }
        .project-desc { font-size: 0.95rem; line-height: 1.6; color: #444; margin-bottom: 2rem; flex: 1; }
        
        .project-stack-label { font-size: 0.65rem; font-weight: 900; color: #888; margin-bottom: 0.8rem; }
        .project-stack-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem; }
        .stack-tag { background: #f5f5f5; border: 1px solid #eee; padding: 0.2rem 0.6rem; font-size: 0.65rem; font-weight: 800; color: #666; }
        
        .project-footer { border-top: 1px solid #eee; padding-top: 2rem; display: flex; justify-content: space-between; align-items: flex-end; }
        .project-metric-label { font-size: 0.6rem; font-weight: 900; color: #888; margin-bottom: 0.3rem; }
        .project-metric-value { font-size: 1.1rem; font-weight: 950; }
        
        .project-detail-btn {
          background: #000; color: #fff; border: none; padding: 0.8rem 1.8rem;
          font-family: var(--font-mono); font-size: 0.75rem; font-weight: 900;
          display: flex; alignItems: center; gap: 0.6rem; letter-spacing: 0.1em;
          transition: all 0.3s;
        }
        .project-card:hover .project-detail-btn {
          background: #fff; color: #000; border: 1.5px solid #000;
        }
      `}</style>
    </div>
  );
}
