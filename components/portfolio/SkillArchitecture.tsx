
import {
  SiReact,
  SiTypescript,
  SiThreedotjs,
  SiNodedotjs,
  SiGo,
  SiDocker,
  SiRedis,
  SiPostgresql,
  SiApachekafka,
  SiOpenai,
  SiGooglecloud,
} from 'react-icons/si';
import {
  TbPuzzle,
  TbActivity,
  TbApi,
  TbServer
} from 'react-icons/tb';
import { FaDatabase, FaProjectDiagram } from 'react-icons/fa';
import { VscSettings } from 'react-icons/vsc';
import { BsLayersHalf } from 'react-icons/bs';

export default function SkillArchitecture() {
  const domains = [
    {
      title: "Frontend Architecture",
      skills: [
        { name: "React 19 / Meta-frameworks", icon: <SiReact /> },
        { name: "TypeScript / Strong Typing", icon: <SiTypescript /> },
        { name: "Micro-frontends & Module Federation", icon: <TbPuzzle /> },
        { name: "Performance Profiling & V8 Opt", icon: <TbActivity /> },
        { name: "WebGL / Three.js Visualization", icon: <SiThreedotjs /> }
      ]
    },
    {
      title: "Backend Infrastructure",
      skills: [
        { name: "Distributed Node.js / Bun Runtime", icon: <SiNodedotjs /> },
        { name: "Go / High Performance Services", icon: <SiGo /> },
        { name: "Container Orchestration (K8s)", icon: <SiDocker /> },
        { name: "Redis Distributed Caching", icon: <SiRedis /> },
        { name: "gRPC & Protocol Buffers", icon: <TbApi /> }
      ]
    },
    {
      title: "AI & ML Integration",
      skills: [
        { name: "Enterprise RAG Pipelines", icon: <FaDatabase /> },
        { name: "Vector Search (Pinecone/Weaviate)", icon: <BsLayersHalf /> },
        { name: "LLM Orchestration & Prompt Eng", icon: <SiOpenai /> },
        { name: "Parameter-Efficient Fine-Tuning", icon: <VscSettings /> },
        { name: "Reasoning & Agentic Workflows", icon: <FaProjectDiagram /> }
      ]
    },
    {
      title: "Data Engineering",
      skills: [
        { name: "PostgreSQL High Availability", icon: <SiPostgresql /> },
        { name: "Event Sourcing via Kafka", icon: <SiApachekafka /> },
        { name: "Scalable ETL Pipelines", icon: <TbServer /> },
        { name: "Cloud Data Warehouse Solutions", icon: <SiGooglecloud /> }
      ]
    }
  ];

  return (
    <div className="section container" style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="animate-enter">
        <header className="skill-header" style={{ marginBottom: '5rem', borderLeft: '4px solid black', paddingLeft: '2rem' }}>
          <div className="mono" style={{ color: 'var(--text-tertiary)', marginBottom: '1rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.8rem' }}>
            02 / Engineering Competency
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1 }}>
            Architecture &<br />
            Technical Stack.
          </h1>
          <p className="mono" style={{ marginTop: '1.5rem', color: 'var(--text-secondary)', maxWidth: '500px' }}>
            Industrial-grade implementation strategies for scalable systems and complex data processing.
          </p>
        </header>

        <div className="skills-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1px',
          background: 'var(--border-light)',
          border: '1px solid var(--border-light)'
        }}>
          {domains.map((domain, i) => (
            <div key={i} className="skill-card stagger-item" style={{
              background: 'white',
              padding: '3rem 2rem'
            }}>
              <h3 className="mono" style={{
                color: 'var(--accent-primary)',
                marginBottom: '2rem',
                fontSize: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ fontSize: '0.7rem', opacity: 0.4 }}>{`[ 0${i + 1} ]`}</span>
                {domain.title}
              </h3>
              <ul style={{ padding: 0, listStyle: 'none', display: 'grid', gap: '0' }}>
                {domain.skills.map((skill, j) => (
                  <li key={j} style={{
                    padding: '1rem 0',
                    borderBottom: '1px solid var(--bg-secondary)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    color: 'var(--text-secondary)'
                  }}>
                    <span style={{
                      color: 'var(--text-primary)',
                      fontSize: '1.1rem',
                      display: 'flex',
                      alignItems: 'center',
                      opacity: 0.6
                    }}>
                      {skill.icon}
                    </span>
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="skill-footer" style={{ marginTop: '4rem', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-light)', paddingTop: '2rem' }}>
          <div className="mono" style={{ fontSize: '0.75rem', opacity: 0.5 }}>
            ISO / IEC 27001 CONFORMANT
          </div>
          <div className="mono" style={{ fontSize: '0.75rem', opacity: 0.5 }}>
            BUILD VERSION: 2026.02.08
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .skill-header {
            margin-bottom: 3rem !important;
            padding-left: 1.5rem !important;
          }
          .skill-card {
            padding: 2rem 1.5rem !important;
          }
          .skill-footer {
            flex-direction: column !important;
            gap: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}

