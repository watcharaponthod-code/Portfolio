
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
import GlitchText from '../visuals/GlitchText';
import SectionHeader from './SectionHeader';

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

