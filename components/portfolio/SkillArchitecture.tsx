
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
} from 'react-icons/tb';
import { FaDatabase, FaProjectDiagram } from 'react-icons/fa';
import { VscSettings } from 'react-icons/vsc';
import { BsLayersHalf } from 'react-icons/bs';
import GlitchText from '../visuals/GlitchText';
import SectionHeader from './SectionHeader';

export default function SkillArchitecture() {
  const domains = [
    {
      title: "Frontend & Mobile",
      skills: [
        { name: "React / Next.js / TypeScript", icon: <SiReact /> },
        { name: "React Native (iOS & Android)", icon: <TbBrandReactNative /> },
        { name: "Tailwind CSS / Figma / UX/UI", icon: <SiFigma /> },
        { name: "Next.js App Router / SSR", icon: <SiNextdotjs /> },
        { name: "TypeScript / Strong Typing", icon: <SiTypescript /> }
      ]
    },
    {
      title: "Backend & Infrastructure",
      skills: [
        { name: "NestJS / FastAPI / Node.js", icon: <SiNodedotjs /> },
        { name: "Java 21 / Spring Boot", icon: <SiSpringboot /> },
        { name: "Docker / Kubernetes (K8s)", icon: <SiDocker /> },
        { name: "GitLab CI/CD + Auto Rollback", icon: <SiGit /> },
        { name: "Apache Kafka / ELK Stack", icon: <SiApachekafka /> }
      ]
    },
    {
      title: "AI & RAG Engineering",
      skills: [
        { name: "LangChain / LangGraph / LlamaIndex", icon: <TbBrain /> },
        { name: "Hybrid Search + Re-ranking (pgvector)", icon: <BsLayersHalf /> },
        { name: "Gemini API / Hugging Face / n8n", icon: <FaProjectDiagram /> },
        { name: "GPU VRAM Optimization & Model Swap", icon: <VscSettings /> },
        { name: "Prompt Engineering & Agentic RAG", icon: <FaDatabase /> }
      ]
    },
    {
      title: "Database & Security",
      skills: [
        { name: "PostgreSQL / MySQL / MongoDB", icon: <SiPostgresql /> },
        { name: "Firebase / Redis / Qdrant", icon: <SiRedis /> },
        { name: "Python / PHP / SQL Backend", icon: <SiPython /> },
        { name: "Penetration Testing & Vuln Analysis", icon: <TbShieldLock /> },
        { name: "Power BI / Geospatial Dashboards", icon: <TbServer /> }
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

        <div className="tech-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {domains.map((domain, i) => (
            <div key={i} className="tech-card stagger-item" style={{
              background: 'white',
              border: '1px solid var(--border-light)',
              padding: '2.5rem',
              position: 'relative',
              transition: 'all 0.3s ease'
            }}>
              {/* Card Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
                <h3 className="mono" style={{ fontSize: '1.2rem', fontWeight: 700, textTransform: 'uppercase', margin: 0 }}>
                  {domain.title}
                </h3>
                <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                  {`0${i + 1}`}
                </span>
              </div>

              {/* Skills List */}
              <ul style={{ padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {domain.skills.map((skill, j) => (
                  <li key={j} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    color: 'var(--text-secondary)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9rem'
                  }}>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      background: 'var(--bg-secondary)',
                      color: 'black',
                      borderRadius: '4px',
                      fontSize: '1.1rem'
                    }}>
                      {skill.icon}
                    </span>
                    {skill.name}
                  </li>
                ))}
              </ul>

              {/* Hover Line */}
              <div className="hover-line" />
            </div>
          ))}
        </div>

        <div className="skill-footer" style={{ marginTop: '5rem', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem' }}>
          <div className="mono" style={{ fontSize: '0.7rem', opacity: 0.4 }}>
            SYSTEM VALIDATION: PASS
          </div>
          <div className="mono" style={{ fontSize: '0.7rem', opacity: 0.4 }}>
            UPTIME: 99.99%
          </div>
        </div>
      </div>

      <style>{`
        .tech-card:hover {
          border-color: black;
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }
        
        .hover-line {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 3px;
          background: black;
          transition: width 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        
        .tech-card:hover .hover-line {
          width: 100%;
        }

        @media (max-width: 768px) {
          .tech-grid {
             grid-template-columns: 1fr;
             gap: 1.5rem;
          }
          .tech-card {
            padding: 2rem 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}

