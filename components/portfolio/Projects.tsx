import SectionHeader from './SectionHeader';
import { TbExternalLink, TbBrandGithub, TbStack2, TbBolt } from 'react-icons/tb';

export default function Projects() {
  const projects = [
    {
      title: "Sycapt AI Enterprise",
      role: "FULL-STACK AI ENGINEER",
      desc: "Built a 100% On-Premises corporate knowledge management system at Sycapt Co., Ltd. Ingests PDF/DOCX/PPTX, converts to vectors via bge-m3, and enables natural language querying with Agentic RAG Pipeline featuring Hybrid Search (Vector + Full-Text) and Re-ranking. Deployed on Kubernetes.",
      stack: ["Next.js", "NestJS", "Python", "LangGraph", "LlamaIndex", "pgvector", "Kubernetes"],
      metrics: "100% ON-PREMISES",
      subMetric: "HYBRID SEARCH + RE-RANKING",
      accent: "#1a1a2e",
      link: null
    },
    {
      title: "EDC Geo Map Dashboard",
      role: "DATA VIZ ENGINEER",
      desc: "Interactive web application visualizing 15,423 Bangkok Bank EDC machines across Thailand on a real-time map. Supports filtering by province, region, machine type, and status. Features CSV export and live Chart.js analytics.",
      stack: ["FastAPI", "SQLAlchemy", "Leaflet.js", "Chart.js", "PostgreSQL"],
      metrics: "15,423 MACHINES",
      subMetric: "NATIONWIDE COVERAGE",
      accent: "#0f2027",
      link: null
    },
    {
      title: "GPU VRAM Model Swapping",
      role: "SYSTEMS ENGINEER",
      desc: "Engineered a solution to run 4 different LLMs on a server with only 16GB VRAM. Designed a Model Swapping system that cycles models in/out of GPU memory, using 120GB RAM as a buffer pool — enabling multi-model inference without hardware upgrades.",
      stack: ["Python", "CUDA", "LangChain", "RAM Buffer Management"],
      metrics: "4 LLMs / 16GB VRAM",
      subMetric: "ZERO HARDWARE UPGRADE",
      accent: "#0d1117",
      link: null
    },
    {
      title: "VHQ SOM Kafka Connector",
      role: "MICROSERVICE ENGINEER",
      desc: "Developed an Event-Driven microservice connecting Apache Kafka message queues to VHQ API in a 3-phase flow: receive job → send batch → return result. Integrated ELK Stack for centralized logging and observability.",
      stack: ["Java 21", "Spring Boot", "Apache Kafka", "PostgreSQL", "Docker", "ELK Stack"],
      metrics: "EVENT-DRIVEN",
      subMetric: "3-PHASE PIPELINE",
      accent: "#1a1a1a",
      link: null
    },
    {
      title: "React Native AI Workshop App",
      role: "MOBILE DEVELOPER + LECTURER",
      desc: "Built a cross-platform mobile app connecting to Gemini API for AI features on iOS/Android, developed as hands-on educational material for a university workshop. Delivered React Native + Gemini API lecture (7,500 THB) and Git/GitHub workshop (5,000 THB) at Kasetsart University.",
      stack: ["React Native", "Gemini API", "JavaScript"],
      metrics: "INVITED LECTURER",
      subMetric: "KU CHALERMPHRAKIAT 2025",
      accent: "#0f0f23",
      link: null
    },
    {
      title: "Donlaya Makeup Portfolio",
      role: "FREELANCE DEVELOPER",
      desc: "Freelance project via Fastwork: built a fully responsive portfolio website for a professional makeup artist. Delivered on-time with complete Responsive Design support across all devices, within a 3,000 THB budget.",
      stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      metrics: "DELIVERED ON-TIME",
      subMetric: "WITHIN BUDGET",
      accent: "#1a1214",
      link: null
    },
    {
      title: "ELIC Application",
      role: "SENIOR PROJECT (โปรเจ็คจบ)",
      desc: "Graduation senior project developed as part of the B.Sc. Computer Science Co-op Program at Kasetsart University Chalermphrakiat. A full-stack application built and presented as the final capstone project, demonstrating end-to-end system design and implementation skills.",
      stack: ["React", "TypeScript", "Full-Stack", "Kasetsart University"],
      metrics: "SENIOR PROJECT",
      subMetric: "KU CHALERMPHRAKIAT 2025",
      accent: "#0d0d0d",
      link: "https://sites.google.com/view/elicapplication/%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B9%81%E0%B8%A3%E0%B8%81"
    }
  ];

  return (
    <div className="section container" style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="animate-enter">
        <SectionHeader
          subtitle="04 / SELECTED WORKS"
          titleLines={["Deep Dives &", "Case Studies."]}
          description="Production systems built during co-op at Sycapt Co., Ltd., freelance projects, and academic capstone work."
        />

        <div className="projects-grid">
          {projects.map((p, i) => (
            <div key={i} className="project-card stagger-item">
              {/* Top accent bar */}
              <div className="project-accent-bar" />

              {/* Card Header */}
              <div className="project-header">
                <span className="project-number mono">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="project-role mono">
                  {p.role}
                </span>
              </div>

              {/* Title */}
              <h2 className="project-title">{p.title}</h2>

              {/* Description */}
              <p className="project-desc">{p.desc}</p>

              {/* Tech Stack */}
              <div className="project-stack-section">
                <div className="project-stack-label mono">
                  <TbStack2 size={12} style={{ marginRight: '0.4rem' }} />
                  STACK
                </div>
                <div className="project-stack-tags">
                  {p.stack.map(tech => (
                    <span key={tech} className="stack-tag mono">{tech}</span>
                  ))}
                </div>
              </div>

              {/* Footer: Metrics + Link */}
              <div className="project-footer">
                <div className="project-metrics">
                  <div className="project-metric-label mono">
                    <TbBolt size={11} style={{ marginRight: '0.3rem' }} />
                    IMPACT
                  </div>
                  <div className="project-metric-value mono">{p.metrics}</div>
                  <div className="project-sub-metric mono">{p.subMetric}</div>
                </div>
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link mono"
                  >
                    VIEW PROJECT <TbExternalLink size={13} />
                  </a>
                )}
              </div>

              {/* Hover overlay */}
              <div className="project-hover-overlay" />
            </div>
          ))}
        </div>

        {/* Bottom stat bar */}
        <div className="projects-stat-bar">
          <div className="stat-item">
            <span className="mono stat-num">7</span>
            <span className="mono stat-label">PROJECTS</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="mono stat-num">5+</span>
            <span className="mono stat-label">TECH STACKS</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="mono stat-num">2025</span>
            <span className="mono stat-label">LATEST WORK</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="mono stat-num">100%</span>
            <span className="mono stat-label">DELIVERED</span>
          </div>
        </div>
      </div>

      <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 1.5rem;
          margin-bottom: 4rem;
        }

        .project-card {
          position: relative;
          background: white;
          border: 1px solid var(--border-strong);
          padding: 2.5rem;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .project-accent-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: black;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .project-card:hover .project-accent-bar {
          transform: scaleX(1);
        }

        .project-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 48px rgba(0, 0, 0, 0.1);
          border-color: black;
        }

        .project-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        }

        .project-number {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1;
          color: var(--text-primary);
          opacity: 0.07;
          letter-spacing: -0.05em;
          transition: opacity 0.3s;
        }

        .project-card:hover .project-number {
          opacity: 0.12;
        }

        .project-role {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--text-tertiary);
          border: 1px solid var(--border-strong);
          padding: 0.3rem 0.75rem;
          text-transform: uppercase;
          transition: all 0.3s;
        }

        .project-card:hover .project-role {
          border-color: black;
          color: black;
        }

        .project-title {
          font-size: 1.6rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: -0.03em;
          margin-bottom: 1rem;
          line-height: 1.15;
          color: var(--text-primary);
        }

        .project-desc {
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--text-secondary);
          margin-bottom: 2rem;
          flex: 1;
          max-width: none;
        }

        .project-stack-section {
          margin-bottom: 2rem;
        }

        .project-stack-label {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 0.6rem;
          display: flex;
          align-items: center;
        }

        .project-stack-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .stack-tag {
          font-size: 0.7rem;
          background: var(--bg-secondary);
          color: var(--text-secondary);
          padding: 0.2rem 0.6rem;
          border: 1px solid var(--border-light);
          transition: all 0.2s;
        }

        .project-card:hover .stack-tag {
          background: white;
          border-color: var(--border-strong);
        }

        .project-footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-light);
          margin-top: auto;
        }

        .project-metrics {
          flex: 1;
        }

        .project-metric-label {
          font-size: 0.6rem;
          font-weight: 700;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 0.2rem;
          display: flex;
          align-items: center;
        }

        .project-metric-value {
          font-size: 1rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.2;
        }

        .project-sub-metric {
          font-size: 0.7rem;
          color: var(--text-tertiary);
          margin-top: 0.1rem;
        }

        .project-link {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-primary);
          text-decoration: none;
          padding: 0.5rem 1rem;
          border: 1.5px solid black;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .project-link:hover {
          background: black;
          color: white;
        }

        .project-hover-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 0%, rgba(0,0,0,0.02) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .project-card:hover .project-hover-overlay {
          opacity: 1;
        }

        /* Stats bar at bottom */
        .projects-stat-bar {
          display: flex;
          align-items: center;
          gap: 0;
          border: 1px solid var(--border-strong);
          overflow: hidden;
        }

        .stat-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.5rem;
          gap: 0.3rem;
          transition: background 0.2s;
        }

        .stat-item:hover {
          background: var(--bg-secondary);
        }

        .stat-num {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
        }

        .stat-label {
          font-size: 0.6rem;
          font-weight: 700;
          color: var(--text-tertiary);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .stat-divider {
          width: 1px;
          height: 60px;
          background: var(--border-strong);
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
          .project-card {
            padding: 2rem 1.5rem;
          }
          .projects-stat-bar {
            flex-wrap: wrap;
          }
          .stat-item {
            flex: 50%;
          }
          .stat-divider {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
