import GlitchText from '../visuals/GlitchText';

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
        <header style={{ marginBottom: '5rem' }}>
          <div className="mono" style={{ color: 'var(--text-tertiary)', marginBottom: '1rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.8rem' }}>
            04 / Selected Works
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1 }}>
            <GlitchText text="Deep Dives &" /><br />
            <GlitchText text="Case Studies." />
          </h1>
        </header>

        <div style={{ display: 'grid', gap: '4rem' }}>
          {projects.map((p, i) => (
            <div key={i} className="stagger-item project-row" style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr',
              gap: '2rem',
              borderTop: '1px solid var(--border-light)',
              paddingTop: '3rem'
            }}>
              <div className="mono project-number" style={{ fontSize: '1.5rem', fontWeight: 700, opacity: 0.2 }}>
                {`0${i + 1}`}
              </div>

              <div style={{ display: 'grid', gap: '2rem' }}>
                <div className="project-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '1rem' }}>
                  <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, margin: 0 }}>{p.title}</h2>
                  <span className="mono role-label" style={{
                    fontSize: '0.7rem',
                    padding: '0.25rem 0.75rem',
                    border: '1px solid black',
                    fontWeight: 600,
                    whiteSpace: 'nowrap'
                  }}>
                    {p.role}
                  </span>
                </div>

                <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: 'var(--text-secondary)', maxWidth: '800px' }}>
                  {p.desc}
                </p>

                <div className="project-details-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', background: 'var(--bg-secondary)', padding: '2rem' }}>
                  <div>
                    <div className="label" style={{ marginBottom: '0.75rem' }}>TECHNOLOGY STACK</div>
                    <div className="mono" style={{ fontSize: '0.8rem', letterSpacing: '0.05em' }}>
                      {p.stack.join(' // ')}
                    </div>
                  </div>
                  <div>
                    <div className="label" style={{ marginBottom: '0.75rem' }}>KEY PERFORMANCE METRIC</div>
                    <div className="mono" style={{ fontSize: '1.2rem', fontWeight: 700, color: 'black' }}>
                      {p.metrics}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .project-row {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          .project-number {
            font-size: 1rem !important;
          }
          .project-header {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .project-details-grid {
            padding: 1.5rem !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}

