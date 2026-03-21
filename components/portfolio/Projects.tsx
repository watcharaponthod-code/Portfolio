import GlitchText from '../visuals/GlitchText';
import SectionHeader from './SectionHeader';
import { TbExternalLink } from 'react-icons/tb';

export default function Projects() {
  const projects = [
    {
      title: "Sycapt AI Enterprise",
      role: "FULL-STACK AI ENGINEER",
      desc: "Built a 100% On-Premises corporate knowledge management system at Sycapt Co., Ltd. Ingests PDF/DOCX/PPTX, converts to vectors via bge-m3, and enables natural language querying with Agentic RAG Pipeline featuring Hybrid Search (Vector + Full-Text) and Re-ranking. Deployed on Kubernetes.",
      stack: ["Next.js", "NestJS", "Python", "LangGraph", "LlamaIndex", "pgvector", "Kubernetes"],
      metrics: "100% ON-PREMISES · HYBRID SEARCH + RE-RANKING",
      link: null
    },
    {
      title: "EDC Geo Map Dashboard",
      role: "DATA VIZ ENGINEER",
      desc: "Interactive web application visualizing 15,423 Bangkok Bank EDC machines across Thailand on a real-time map. Supports filtering by province, region, machine type, and status. Features CSV export and live Chart.js analytics.",
      stack: ["FastAPI", "SQLAlchemy", "Leaflet.js", "Chart.js", "PostgreSQL"],
      metrics: "15,423 MACHINES · NATIONWIDE COVERAGE",
      link: null
    },
    {
      title: "GPU VRAM Model Swapping",
      role: "SYSTEMS ENGINEER",
      desc: "Engineered a solution to run 4 different LLMs on a server with only 16GB VRAM. Designed a Model Swapping system that cycles models in/out of GPU memory, using 120GB RAM as a buffer pool — enabling multi-model inference without hardware upgrades.",
      stack: ["Python", "CUDA", "LangChain", "RAM Buffer Management"],
      metrics: "4 LLMs ON 16GB VRAM · ZERO HARDWARE UPGRADE",
      link: null
    },
    {
      title: "VHQ SOM Kafka Connector",
      role: "MICROSERVICE ENGINEER",
      desc: "Developed an Event-Driven microservice connecting Apache Kafka message queues to VHQ API in a 3-phase flow: receive job → send batch → return result. Integrated ELK Stack for centralized logging and observability.",
      stack: ["Java 21", "Spring Boot", "Apache Kafka", "PostgreSQL", "Docker", "ELK Stack"],
      metrics: "EVENT-DRIVEN · 3-PHASE PIPELINE",
      link: null
    },
    {
      title: "React Native AI Workshop App",
      role: "MOBILE DEVELOPER + LECTURER",
      desc: "Built a cross-platform mobile app connecting to Gemini API for AI features on iOS/Android, developed as hands-on educational material for a university workshop. Delivered React Native + Gemini API lecture (7,500 THB) and Git/GitHub workshop (5,000 THB) at Kasetsart University.",
      stack: ["React Native", "Gemini API", "JavaScript"],
      metrics: "INVITED LECTURER · KU CHALERMPHRAKIAT 2025",
      link: null
    },
    {
      title: "Donlaya Makeup Portfolio",
      role: "FREELANCE DEVELOPER",
      desc: "Freelance project via Fastwork: built a fully responsive portfolio website for a professional makeup artist. Delivered on-time with complete Responsive Design support across all devices, within a 3,000 THB budget.",
      stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      metrics: "DELIVERED ON-TIME · WITHIN BUDGET",
      link: null
    },
    {
      title: "ELIC Application",
      role: "SENIOR PROJECT (โปรเจ็คจบ)",
      desc: "Graduation senior project developed as part of the B.Sc. Computer Science Co-op Program at Kasetsart University Chalermphrakiat. A full-stack application built and presented as the final capstone project, demonstrating end-to-end system design and implementation skills.",
      stack: ["React", "TypeScript", "Full-Stack", "Kasetsart University"],
      metrics: "SENIOR PROJECT · KU CHALERMPHRAKIAT 2025",
      link: "https://sites.google.com/view/elicapplication/%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B9%81%E0%B8%A3%E0%B8%81"
    }
  ];

  return (
    <div className="section container" style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="animate-enter">
        <SectionHeader
          subtitle="04 / SELECTED WORKS"
          titleLines={["Deep Dives &", "Case Studies."]}
        />

        <div className="projects-grid" style={{ display: 'grid', gap: '2rem' }}>
          {projects.map((p, i) => (
            <div key={i} className="cyber-card stagger-item" style={{
              position: 'relative',
              background: 'white',
              border: '1px solid var(--border-strong)',
              padding: '2.5rem',
              transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
              overflow: 'hidden'
            }}>
              {/* Decorative Corner */}
              <div style={{
                position: 'absolute', top: 0, right: 0, width: '20px', height: '20px',
                background: 'linear-gradient(45deg, transparent 50%, black 50%)', opacity: 0.1
              }} />

              <div className="card-content" style={{ position: 'relative', zIndex: 1 }}>
                {/* Header: Number & Role */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <span className="mono" style={{ fontSize: '3rem', fontWeight: 800, opacity: 0.1, lineHeight: 1 }}>
                    {`0${i + 1}`}
                  </span>
                  <span className="mono" style={{
                    fontSize: '0.7rem', padding: '0.3rem 0.8rem', border: '1px solid black',
                    fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em'
                  }}>
                    {p.role}
                  </span>
                </div>

                {/* Title & Desc */}
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', textTransform: 'uppercase' }}>
                  {p.title}
                </h2>
                <p style={{ fontSize: '1rem', lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '2.5rem', minHeight: '80px' }}>
                  {p.desc}
                </p>

                {/* Tech Stack */}
                <div style={{ marginBottom: '2rem' }}>
                  <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                    Core Architecture
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {p.stack.map(tech => (
                      <span key={tech} className="mono" style={{
                        fontSize: '0.75rem', background: 'var(--bg-secondary)', padding: '0.25rem 0.6rem',
                        color: 'var(--text-primary)', border: '1px solid transparent'
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer: Metrics + Link */}
                <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', marginBottom: '0.25rem' }}>
                      IMPACT METRIC
                    </div>
                    <div className="mono" style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                      {p.metrics}
                    </div>
                  </div>
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mono"
                      style={{
                        display: 'flex', alignItems: 'center', gap: '0.4rem',
                        fontSize: '0.75rem', color: 'var(--text-primary)',
                        textDecoration: 'none', padding: '0.4rem 0.8rem',
                        border: '1px solid black', fontWeight: 700,
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = 'black';
                        (e.currentTarget as HTMLElement).style.color = 'white';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = 'transparent';
                        (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                      }}
                    >
                      VIEW PROJECT <TbExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="hover-glow" />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .projects-grid {
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        }
        
        .cyber-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          border-color: black;
        }

        .cyber-card:hover .mono {
          color: black;
        }
        
        .hover-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(0,0,0,0.03) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        
        .cyber-card:hover .hover-glow {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
          .cyber-card {
            padding: 2rem 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}

