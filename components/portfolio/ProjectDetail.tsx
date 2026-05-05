import { useEffect, useRef } from 'react';
import { useUI } from '../../lib/state';
import { TbArrowLeft, TbBrandGithub, TbExternalLink } from 'react-icons/tb';

export interface ProjectSection {
  title: string;
  body: string;
  image?: string;
  imageCaption?: string;
  fullWidth?: boolean;
}

export interface ProjectDetailData {
  id: string;
  title: string;
  role: string;
  year: string;
  tagline: string;
  overview: string;
  keyFeatures?: string[];
  sections: ProjectSection[];
  stack: string[];
  metrics: { label: string; value: string }[];
  githubLink?: string;
  liveLink?: string;
}

interface Props {
  data: ProjectDetailData;
}

export default function ProjectDetail({ data }: Props) {
  const { setView } = useUI();
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => { topRef.current?.scrollIntoView({ behavior: 'instant' }); }, []);

  return (
    <div ref={topRef} style={{ minHeight: '100vh', background: '#0f0f0f', color: '#fff', fontFamily: 'inherit' }}>

      {/* ── Top bar ── */}
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(15,15,15,0.95)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '1rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={() => setView('landing')}
          className="mono"
          style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '0.5rem 1.2rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.15em', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.25s', textTransform: 'uppercase' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; (e.currentTarget as HTMLElement).style.color = '#000'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
        >
          <TbArrowLeft size={14} /> BACK
        </button>
        <div className="mono" style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em' }}>{data.role} // {data.year}</div>
        <div style={{ display: 'flex', gap: '0.8rem' }}>
          {data.githubLink && (
            <a href={data.githubLink} target="_blank" rel="noreferrer" className="mono"
              style={{ background: '#fff', color: '#000', border: 'none', padding: '0.5rem 1.2rem', fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.15em', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.25s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#e63f6a'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; (e.currentTarget as HTMLElement).style.color = '#000'; }}
            >
              <TbBrandGithub size={13} /> GITHUB
            </a>
          )}
          {data.liveLink && (
            <a href={data.liveLink} target="_blank" rel="noreferrer" className="mono"
              style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.25)', padding: '0.5rem 1.2rem', fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.15em', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.25s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; (e.currentTarget as HTMLElement).style.color = '#000'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
            >
              <TbExternalLink size={13} /> LIVE
            </a>
          )}
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(3rem, 7vw, 6rem) clamp(1.5rem, 5vw, 2.5rem)' }}>

        {/* ── Hero ── */}
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: 'clamp(3rem, 7vw, 5rem)', marginBottom: 'clamp(3rem, 7vw, 5rem)' }}>
          <div className="mono" style={{ fontSize: '0.6rem', color: '#e63f6a', fontWeight: 900, letterSpacing: '0.3em', marginBottom: '1.2rem' }}>{data.role.toUpperCase()}</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 950, letterSpacing: '-0.05em', textTransform: 'uppercase', lineHeight: 0.95, marginBottom: '1.5rem' }}>{data.title}</h1>
          <p style={{ fontSize: 'clamp(1rem, 3vw, 1.3rem)', color: 'rgba(255,255,255,0.55)', fontWeight: 300, lineHeight: 1.6, maxWidth: '640px', marginBottom: '3rem' }}>{data.tagline}</p>

          {/* Metrics row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '2rem' }}>
            {data.metrics.map(m => (
              <div key={m.label}>
                <div className="mono" style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', marginBottom: '0.3rem' }}>{m.label}</div>
                <div className="mono" style={{ fontSize: '1.1rem', fontWeight: 950, letterSpacing: '-0.02em' }}>{m.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Overview ── */}
        <div style={{ marginBottom: 'clamp(3rem, 7vw, 5rem)' }}>
          <div className="mono" style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.25em', marginBottom: '1.2rem' }}>01 // OVERVIEW</div>
          <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, fontWeight: 300, maxWidth: '760px' }}>{data.overview}</p>
        </div>

        {/* ── Key Features (if any) ── */}
        {data.keyFeatures && data.keyFeatures.length > 0 && (
          <div style={{ marginBottom: 'clamp(3rem, 7vw, 5rem)' }}>
            <div className="mono" style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.25em', marginBottom: '1.5rem' }}>02 // KEY FEATURES</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1px', border: '1px solid rgba(255,255,255,0.08)' }}>
              {data.keyFeatures.map((feat, i) => (
                <div key={i} style={{ padding: '1.5rem', borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.08)' : 'none', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="mono" style={{ fontSize: '0.6rem', color: '#e63f6a', marginBottom: '0.5rem' }}>{String(i + 1).padStart(2, '0')}</div>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{feat}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Content Sections ── */}
        {data.sections.map((sec, i) => (
          <div key={i} style={{ marginBottom: 'clamp(3.5rem, 8vw, 6rem)' }}>
            <div className="mono" style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.25em', marginBottom: '1.2rem' }}>
              {String(i + (data.keyFeatures ? 3 : 2)).padStart(2, '0')} // {sec.title.toUpperCase()}
            </div>
            <h3 style={{ fontSize: 'clamp(1.3rem, 4vw, 2rem)', fontWeight: 950, letterSpacing: '-0.03em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>{sec.title}</h3>

            {sec.fullWidth || !sec.image ? (
              <>
                <p style={{ fontSize: 'clamp(0.9rem, 2.2vw, 1.05rem)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, fontWeight: 300, maxWidth: '760px', marginBottom: sec.image ? '2.5rem' : 0 }}>{sec.body}</p>
                {sec.image && (
                  <div style={{ border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', background: 'rgba(255,255,255,0.02)' }}>
                    <img src={sec.image} alt={sec.title} style={{ width: '100%', display: 'block', maxHeight: '560px', objectFit: 'contain' }} loading="lazy" />
                    {sec.imageCaption && <div className="mono" style={{ padding: '0.8rem 1.2rem', fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', borderTop: '1px solid rgba(255,255,255,0.06)', letterSpacing: '0.15em' }}>{sec.imageCaption}</div>}
                  </div>
                )}
              </>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
                <p style={{ fontSize: 'clamp(0.9rem, 2.2vw, 1.05rem)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, fontWeight: 300 }}>{sec.body}</p>
                <div style={{ border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', background: 'rgba(255,255,255,0.02)' }}>
                  <img src={sec.image} alt={sec.title} style={{ width: '100%', display: 'block', objectFit: 'cover', maxHeight: '320px' }} loading="lazy" />
                  {sec.imageCaption && <div className="mono" style={{ padding: '0.7rem 1rem', fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', borderTop: '1px solid rgba(255,255,255,0.06)', letterSpacing: '0.15em' }}>{sec.imageCaption}</div>}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* ── Tech Stack ── */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: 'clamp(3rem, 7vw, 5rem)' }}>
          <div className="mono" style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.25em', marginBottom: '1.5rem' }}>STACK</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {data.stack.map(t => (
              <span key={t} className="mono" style={{ fontSize: '0.7rem', fontWeight: 900, border: '1px solid rgba(255,255,255,0.2)', padding: '0.4rem 1rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em' }}>{t}</span>
            ))}
          </div>
        </div>

        {/* ── Footer CTA ── */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '2.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="mono" style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.2em' }}>END_OF_CASE_STUDY // {data.id.toUpperCase()}</div>
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <button
              onClick={() => setView('landing')}
              className="mono"
              style={{ background: '#fff', color: '#000', border: 'none', padding: '0.8rem 2rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.15em', cursor: 'pointer', transition: 'all 0.25s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#e63f6a'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; (e.currentTarget as HTMLElement).style.color = '#000'; }}
            >
              ← BACK TO WORKS
            </button>
            {data.githubLink && (
              <a href={data.githubLink} target="_blank" rel="noreferrer" className="mono"
                style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.25)', padding: '0.8rem 2rem', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.15em', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem', transition: 'all 0.25s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; (e.currentTarget as HTMLElement).style.color = '#000'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
              >
                <TbBrandGithub size={14} /> GITHUB
              </a>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .detail-grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
