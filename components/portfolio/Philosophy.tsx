import mineImg from '@/imge/mine.jpg';

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
          <header style={{ marginBottom: '4rem' }}>
            <div className="mono" style={{ color: 'var(--text-tertiary)', marginBottom: '1rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.8rem' }}>
              01 / Introduction
            </div>
            <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 800, lineHeight: '1.1', marginBottom: '2rem' }}>
              Building the Future,<br />
              <span style={{ color: 'var(--text-tertiary)' }}>One system at a time.</span>
            </h1>
          </header>

          <div style={{ display: 'grid', gap: '3rem', maxWidth: '600px' }}>
            <div>
              <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                I am a full-stack systems engineer based in Bangkok, specializing in building robust,
                scalable applications that bridge the gap between complex backend logic and seamless user experiences.
              </p>
            </div>

            <div className="stagger-item">
              <h3 className="mono" style={{ marginBottom: '1.5rem', fontSize: '1rem', textTransform: 'uppercase', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>Core Philosophy</h3>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <p style={{ fontSize: '1rem' }}>
                  <strong style={{ display: 'block', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>Clarity over Cleverness</strong>
                  I prioritize readable, maintainable code over obscure abstractions. A system is only as good as its weakest link, which is often its maintainability.
                </p>
                <p style={{ fontSize: '1rem' }}>
                  <strong style={{ display: 'block', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>Impact-Driven Engineering</strong>
                  Every technical decision—from database schema to infrastructure—must serve a clear user need and advance the business goals.
                </p>
              </div>
            </div>

            <div className="stagger-item contact-section" style={{ marginTop: '2rem' }}>
              <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginBottom: '1rem' }}>Available for contracts & consulting</div>
              <a href="mailto:hello@watcharapon.dev"
                style={{
                  fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontWeight: 700,
                  borderBottom: '2px solid black',
                  paddingBottom: '4px'
                }}>
                hello@watcharapon.dev
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

