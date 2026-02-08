import GlitchText from '../visuals/GlitchText';
import SectionHeader from './SectionHeader';

export default function Projects() {
  const projects = [
    {
      title: "Enterprise RAG Platform",
      role: "SYSTEM ARCHITECT",
      desc: "Architected a retrieval-augmented generation system for high-stakes legal discovery. Engineered a custom vector processing pipeline that achieved a 94% reduction in document retrieval time.",
      stack: ["Python", "LangChain", "Pinecone", "Next.js"],
      metrics: "500K+ DOCUMENTS PROCESSED"
    },
    {
      title: "High-Latency Trading UI",
      role: "SENIOR UI ENGINEER",
      desc: "Optimized a high-frequency trading interface. Leveraged WebSocket subroutines and custom V8-optimized rendering to maintain sub-50ms data visualization latency.",
      stack: ["React", "D3.js", "WebSockets", "Rust"],
      metrics: "< 40MS REFRESH FREQUENCY"
    },
    {
      title: "AI Agent Orchestrator",
      role: "FULL STACK ENGINEER",
      desc: "Developed a distributed framework for autonomous multi-agent task collaboration. Implemented complex state-machine logic for self-healing agent routines.",
      stack: ["TypeScript", "Docker", "Gemini API", "PostgreSQL"],
      metrics: "60% INCREASE IN QA VELOCITY"
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

                {/* Footer: Metrics */}
                <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)' }}>
                  <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', marginBottom: '0.25rem' }}>
                    IMPACT METRIC
                  </div>
                  <div className="mono" style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                    {p.metrics}
                  </div>
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

