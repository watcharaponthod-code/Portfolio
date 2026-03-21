
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiDocker,
  SiRedis,
  SiPostgresql,
  SiApachekafka,
  SiSpringboot,
  SiFigma,
  SiGit,
} from 'react-icons/si';
import {
  TbBrandReactNative,
  TbApi,
  TbServer,
  TbBrain,
  TbShieldLock,
  TbChartBar,
} from 'react-icons/tb';
import { FaDatabase, FaProjectDiagram } from 'react-icons/fa';
import { VscSettings } from 'react-icons/vsc';
import { BsLayersHalf } from 'react-icons/bs';
import SectionHeader from './SectionHeader';

export default function SkillArchitecture() {
  const domains = [
    {
      title: "Frontend & Mobile",
      subtitle: "UI systems, SPAs, native apps",
      color: "#000",
      skills: [
        { name: "React / Next.js / TypeScript", icon: <SiReact />, level: 95 },
        { name: "React Native (iOS & Android)", icon: <TbBrandReactNative />, level: 85 },
        { name: "Tailwind CSS / Figma / UX/UI", icon: <SiFigma />, level: 80 },
        { name: "Next.js App Router / SSR", icon: <SiNextdotjs />, level: 90 },
        { name: "TypeScript / Strong Typing", icon: <SiTypescript />, level: 88 }
      ]
    },
    {
      title: "Backend & Infrastructure",
      subtitle: "APIs, microservices, DevOps",
      color: "#111",
      skills: [
        { name: "NestJS / FastAPI / Node.js", icon: <SiNodedotjs />, level: 90 },
        { name: "Java 21 / Spring Boot", icon: <SiSpringboot />, level: 80 },
        { name: "Docker / Kubernetes (K8s)", icon: <SiDocker />, level: 85 },
        { name: "GitLab CI/CD + Auto Rollback", icon: <SiGit />, level: 80 },
        { name: "Apache Kafka / ELK Stack", icon: <SiApachekafka />, level: 75 }
      ]
    },
    {
      title: "AI & RAG Engineering",
      subtitle: "LLMs, pipelines, vector search",
      color: "#0a0a0a",
      skills: [
        { name: "LangChain / LangGraph / LlamaIndex", icon: <TbBrain />, level: 90 },
        { name: "Hybrid Search + Re-ranking", icon: <BsLayersHalf />, level: 85 },
        { name: "Gemini API / Hugging Face / n8n", icon: <FaProjectDiagram />, level: 82 },
        { name: "GPU VRAM Optimization & Model Swap", icon: <VscSettings />, level: 80 },
        { name: "Prompt Engineering & Agentic RAG", icon: <FaDatabase />, level: 88 }
      ]
    },
    {
      title: "Database & Security",
      subtitle: "Storage, performance, pentesting",
      color: "#0d0d0d",
      skills: [
        { name: "PostgreSQL / MySQL / MongoDB", icon: <SiPostgresql />, level: 88 },
        { name: "Firebase / Redis / Qdrant", icon: <SiRedis />, level: 82 },
        { name: "Python / PHP / SQL Backend", icon: <SiPython />, level: 90 },
        { name: "Penetration Testing & Vuln Analysis", icon: <TbShieldLock />, level: 72 },
        { name: "Power BI / Geospatial Dashboards", icon: <TbChartBar />, level: 78 }
      ]
    }
  ];

  return (
    <div className="section container" style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="animate-enter">
        <SectionHeader
          subtitle="02 / ENGINEERING COMPETENCY"
          titleLines={["Architecture &", "Technical Stack."]}
          description="Industrial-grade implementation strategies for scalable systems and complex data processing."
        />

        <div className="skills-domains-grid">
          {domains.map((domain, i) => (
            <div key={i} className="domain-card stagger-item">
              {/* Header */}
              <div className="domain-header">
                <div className="domain-header-left">
                  <span className="domain-num mono">0{i + 1}</span>
                  <div>
                    <h3 className="domain-title mono">{domain.title}</h3>
                    <p className="domain-subtitle mono">{domain.subtitle}</p>
                  </div>
                </div>
                <div className="domain-count mono">{domain.skills.length} skills</div>
              </div>

              {/* Skills */}
              <div className="domain-skills">
                {domain.skills.map((skill, j) => (
                  <div key={j} className="skill-row">
                    <div className="skill-row-left">
                      <span className="skill-icon">{skill.icon}</span>
                      <span className="skill-name mono">{skill.name}</span>
                    </div>
                    <div className="skill-bar-wrap">
                      <div
                        className="skill-bar-fill"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer row */}
        <div className="skills-footer-row">
          <div className="skills-footer-stat">
            <span className="mono footer-stat-num">20+</span>
            <span className="mono footer-stat-label">Technologies</span>
          </div>
          <div className="skills-footer-stat">
            <span className="mono footer-stat-num">4</span>
            <span className="mono footer-stat-label">Domains</span>
          </div>
          <div className="skills-footer-stat">
            <span className="mono footer-stat-num">3+</span>
            <span className="mono footer-stat-label">Years XP</span>
          </div>
          <div className="skills-footer-divider" />
          <div className="mono skills-footer-note">
            SYSTEM VALIDATION: PASS — UPTIME: 99.99%
          </div>
        </div>
      </div>

      <style>{`
        .skills-domains-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .domain-card {
          background: white;
          border: 1px solid var(--border-light);
          padding: 2.5rem;
          position: relative;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .domain-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: black;
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .domain-card:hover::before {
          transform: scaleY(1);
        }

        .domain-card:hover {
          border-color: black;
          box-shadow: 0 12px 40px rgba(0,0,0,0.08);
        }

        .domain-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--border-light);
        }

        .domain-header-left {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .domain-num {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--text-primary);
          opacity: 0.06;
          line-height: 1;
          flex-shrink: 0;
          margin-top: -4px;
          transition: opacity 0.3s;
        }

        .domain-card:hover .domain-num {
          opacity: 0.12;
        }

        .domain-title {
          font-size: 1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-primary);
          margin: 0 0 0.2rem;
        }

        .domain-subtitle {
          font-size: 0.7rem;
          color: var(--text-tertiary);
          margin: 0;
          max-width: none;
        }

        .domain-count {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          border: 1px solid var(--border-strong);
          padding: 0.2rem 0.5rem;
          flex-shrink: 0;
        }

        .domain-skills {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }

        .skill-row {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .skill-row-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex: 1;
          min-width: 0;
        }

        .skill-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          background: var(--bg-secondary);
          color: black;
          border-radius: 4px;
          font-size: 1rem;
          flex-shrink: 0;
          transition: background 0.2s;
        }

        .domain-card:hover .skill-icon {
          background: #f0f0f0;
        }

        .skill-name {
          font-size: 0.82rem;
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.2s;
        }

        .domain-card:hover .skill-name {
          color: var(--text-primary);
        }

        .skill-bar-wrap {
          width: 60px;
          height: 3px;
          background: var(--border-light);
          flex-shrink: 0;
          overflow: hidden;
          border-radius: 2px;
        }

        .skill-bar-fill {
          height: 100%;
          background: black;
          border-radius: 2px;
          transition: width 1s cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* Footer */
        .skills-footer-row {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding: 1.5rem 0;
          border-top: 1px solid var(--border-light);
        }

        .skills-footer-stat {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }

        .footer-stat-num {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
        }

        .footer-stat-label {
          font-size: 0.6rem;
          font-weight: 700;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .skills-footer-divider {
          width: 1px;
          height: 40px;
          background: var(--border-strong);
          margin: 0 0.5rem;
        }

        .skills-footer-note {
          font-size: 0.65rem;
          color: var(--text-tertiary);
          letter-spacing: 0.08em;
          margin-left: auto;
        }

        @media (max-width: 900px) {
          .skills-domains-grid {
            grid-template-columns: 1fr;
          }
          .domain-card {
            padding: 2rem 1.5rem;
          }
          .skill-bar-wrap {
            width: 40px;
          }
          .skills-footer-note {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
