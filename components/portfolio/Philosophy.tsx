import mineImg from '@/imge/mine.jpg';
import GlitchText from '../visuals/GlitchText';
import SectionHeader from './SectionHeader';

export default function Philosophy() {
  return (
    <div className="section container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="animate-enter philosophy-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.5fr', gap: '6rem', alignItems: 'start' }}>

        {/* Left Column: Image with accent border */}
        <div className="stagger-item philosophy-image-container" style={{ position: 'relative' }}>
          <div className="accent-border" style={{
            position: 'absolute',
            top: '30px',
            left: '30px',
            right: '-30px',
            bottom: '-30px',
            border: '1px solid var(--text-primary)',
            zIndex: 0,
            opacity: 0.2
          }} />
          <div style={{ overflow: 'hidden', position: 'relative', zIndex: 1 }}>
            <img
              src={mineImg}
              alt="Watcharapon"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                filter: 'grayscale(100%) contrast(1.1)',
                transition: 'transform 0.5s ease'
              }}
            />
          </div>
        </div>

        {/* Right Column: Narrative */}
        <div className="stagger-item">
          <SectionHeader
            subtitle="01 / INTRODUCTION"
            titleLines={["Building the Future,", "One system at a time."]}
          />

          <div style={{ display: 'grid', gap: '3rem', maxWidth: '600px' }}>
            <div>
              <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                I'm a Full-Stack Developer and AI Engineer from Thailand, currently completing my B.Sc. in Computer Science
                (Co-op Program) at Kasetsart University. My co-op at Sycapt Co., Ltd. gave me real enterprise experience —
                from building On-Premises RAG systems to solving hardware constraints creatively,
                like running 4 LLMs on just 16GB of VRAM.
              </p>
            </div>

            <div className="stagger-item">
              <h3 className="mono" style={{ marginBottom: '1.5rem', fontSize: '1rem', textTransform: 'uppercase', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>Core Philosophy</h3>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <p style={{ fontSize: '1rem' }}>
                  <strong style={{ display: 'block', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>Clarity over Cleverness</strong>
                  Readable, maintainable code over obscure abstractions. A system is only as good as its weakest link — and that's often maintainability.
                </p>
                <p style={{ fontSize: '1rem' }}>
                  <strong style={{ display: 'block', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>Impact-Driven Engineering</strong>
                  Every decision — database schema, infrastructure, AI model choice — must serve a clear user need and real business goals.
                </p>
                <p style={{ fontSize: '1rem' }}>
                  <strong style={{ display: 'block', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>Constraint-Driven Innovation</strong>
                  My best solutions came from hard limits. When you only have 16GB VRAM but need 4 LLMs, you don't give up — you design a smarter system.
                </p>
              </div>
            </div>

            <div className="stagger-item contact-section" style={{ marginTop: '2rem' }}>
              <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginBottom: '1rem' }}>Open to Full-Time & Freelance opportunities</div>
              <a href="mailto:watcharapon.thod@gmail.com"
                style={{
                  fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontWeight: 700,
                  borderBottom: '2px solid black',
                  paddingBottom: '4px'
                }}>
                watcharapon.thod@gmail.com
              </a>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 1024px) {
          .philosophy-grid {
            grid-template-columns: 1fr !important;
            gap: 4rem !important;
          }
          .accent-border {
            display: none;
          }
          .philosophy-image-container {
            max-width: 500px;
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  );
}

