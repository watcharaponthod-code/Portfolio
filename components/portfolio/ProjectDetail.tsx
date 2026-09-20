import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
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
  mediaGallery?: { src: string; caption?: string }[];
  sections: ProjectSection[];
  stack: string[];
  metrics: { label: string; value: string }[];
  githubLink?: string;
  liveLink?: string;
}

interface Props {
  data: ProjectDetailData;
}

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, margin: '-60px' } as const;

/** Figure with a 1px border and a mono grey caption; fades in on scroll. */
function Figure({ src, alt, caption, reduce }: { src: string; alt: string; caption?: string; reduce: boolean | null }) {
  return (
    <motion.figure
      className="pd-figure"
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <img src={src} alt={alt} loading="lazy" />
      {caption && <figcaption className="mono">{caption}</figcaption>}
    </motion.figure>
  );
}

export default function ProjectDetail({ data }: Props) {
  const { setView } = useUI();
  const topRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'instant' });
    // a card can ask to open the page at one section (Projects.tsx sets this)
    let target: string | null = null;
    try { target = sessionStorage.getItem('detail-scroll'); sessionStorage.removeItem('detail-scroll'); } catch {}
    if (target) {
      const el = document.querySelector<HTMLElement>(`[data-section="${CSS.escape(target)}"]`);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
    }
  }, []);

  const rise = (delay = 0) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: EASE, delay },
  });

  const sectionOffset = data.keyFeatures ? 3 : 2;

  return (
    <div ref={topRef} className="pd-root">

      {/* ── Top bar ── */}
      <div className="pd-topbar">
        <button onClick={() => setView('landing')} className="pd-btn pd-btn-ghost mono">
          <TbArrowLeft size={14} /> BACK
        </button>
        <div className="pd-topbar-meta mono">{data.role} // {data.year}</div>
        <div className="pd-topbar-actions">
          {data.githubLink && (
            <a href={data.githubLink} target="_blank" rel="noreferrer" className="pd-btn pd-btn-solid mono">
              <TbBrandGithub size={13} /> GITHUB
            </a>
          )}
          {data.liveLink && (
            <a href={data.liveLink} target="_blank" rel="noreferrer" className="pd-btn pd-btn-ghost mono">
              <TbExternalLink size={13} /> LIVE
            </a>
          )}
        </div>
      </div>

      <div className="pd-page">

        {/* ── Hero ── */}
        <header className="pd-hero">
          <motion.div className="pd-eyebrow mono" {...rise(0.05)}>{data.role.toUpperCase()}</motion.div>
          <motion.h1 className="pd-title" {...rise(0.12)}>{data.title}</motion.h1>
          <motion.p className="pd-tagline" {...rise(0.2)}>{data.tagline}</motion.p>
          <motion.div className="pd-metrics" {...rise(0.3)}>
            {data.metrics.map(m => (
              <div key={m.label} className="pd-metric">
                <div className="pd-metric-label mono">{m.label}</div>
                <div className="pd-metric-value mono">{m.value}</div>
              </div>
            ))}
          </motion.div>
        </header>

        {/* ── Media Gallery (full-width, before any text) ── */}
        {data.mediaGallery && data.mediaGallery.length > 0 && (
          <section className="pd-section">
            <div className="pd-eyebrow mono">LIVE_DEMO // MEDIA_GALLERY</div>
            <div className="pd-gallery">
              {data.mediaGallery.map((item, i) => (
                <Figure key={i} src={item.src} alt={item.caption || `media-${i}`} caption={item.caption} reduce={reduce} />
              ))}
            </div>
          </section>
        )}

        {/* ── Overview ── */}
        <section className="pd-section">
          <div className="pd-kicker mono">01 // OVERVIEW</div>
          <p className="pd-lead measure">{data.overview}</p>
        </section>

        {/* ── Key Features ── */}
        {data.keyFeatures && data.keyFeatures.length > 0 && (
          <section className="pd-section">
            <div className="pd-kicker mono">02 // KEY FEATURES</div>
            <div className="pd-features">
              {data.keyFeatures.map((feat, i) => (
                <div key={i} className="pd-feature">
                  <div className="pd-feature-num mono">{String(i + 1).padStart(2, '0')}</div>
                  <p>{feat}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Content Sections: image FIRST (full-width), then text ── */}
        {data.sections.map((sec, i) => (
          <section key={i} data-section={sec.title} className="pd-section pd-content">
            <div className="pd-kicker mono">
              {String(i + sectionOffset).padStart(2, '0')} // {sec.title.toUpperCase()}
            </div>
            <h3 className="pd-h3">{sec.title}</h3>

            {/* Image shown FULL WIDTH first */}
            {sec.image && (
              <Figure src={sec.image} alt={sec.title} caption={sec.imageCaption} reduce={reduce} />
            )}

            {/* Text description below */}
            <p className="pd-body measure">{sec.body}</p>
          </section>
        ))}

        {/* ── Tech Stack ── */}
        <section className="pd-section">
          <div className="pd-kicker mono">STACK</div>
          <div className="pd-stack">
            {data.stack.map(t => (
              <span key={t} className="pd-stack-tag mono">{t}</span>
            ))}
          </div>
        </section>

        {/* ── Footer CTA ── */}
        <footer className="pd-footer">
          <div className="pd-footer-meta mono">END_OF_CASE_STUDY // {data.id.toUpperCase()}</div>
          <div className="pd-footer-actions">
            <button onClick={() => setView('landing')} className="pd-btn pd-btn-solid pd-btn-lg mono">
              ← BACK TO WORKS
            </button>
            {data.githubLink && (
              <a href={data.githubLink} target="_blank" rel="noreferrer" className="pd-btn pd-btn-ghost pd-btn-lg mono">
                <TbBrandGithub size={14} /> GITHUB
              </a>
            )}
          </div>
        </footer>
      </div>

      <style>{`
        .pd-root {
          --pd-accent: #e63f6a;               /* the one existing accent on case-study pages */
          --pd-bg: #f5f5f3;
          --pd-rule: rgba(16,16,20,0.10);
          --pd-gutter: clamp(1.25rem, 5vw, 2.5rem);
          min-height: 100vh; background: var(--pd-bg); color: var(--text-primary);
          font-family: inherit;
        }

        /* ── sticky top bar ── */
        .pd-topbar {
          position: sticky; top: 0; z-index: 50;
          display: flex; align-items: center; justify-content: space-between; gap: var(--space-4);
          padding: var(--space-3) var(--pd-gutter);
          background: rgba(245,245,243,0.88); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--pd-rule);
        }
        .pd-topbar-meta {
          font-size: var(--text-2xs); letter-spacing: 0.2em; color: var(--text-tertiary);
          text-transform: uppercase; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          min-width: 0;
        }
        .pd-topbar-actions { display: flex; gap: var(--space-2); flex: 0 0 auto; }

        /* ── buttons ── */
        .pd-btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.5rem 1.1rem; font-family: var(--font-mono); font-size: var(--text-2xs);
          font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; text-decoration: none;
          cursor: pointer; line-height: 1; white-space: nowrap;
          transition: background var(--dur-fast) ease, color var(--dur-fast) ease, border-color var(--dur-fast) ease;
        }
        .pd-btn-lg { padding: 0.85rem 1.8rem; font-size: 0.68rem; }
        .pd-btn-ghost { background: transparent; color: var(--text-primary); border: 1px solid var(--border-accent); }
        .pd-btn-ghost:hover { background: var(--text-primary); color: #fff; border-color: var(--text-primary); }
        .pd-btn-solid { background: var(--text-primary); color: #fff; border: 1px solid var(--text-primary); }
        .pd-btn-solid:hover { background: var(--pd-accent); border-color: var(--pd-accent); color: #fff; }

        /* ── page column ── */
        .pd-page {
          max-width: 1100px; margin: 0 auto;
          padding: clamp(3rem, 7vw, 5.5rem) var(--pd-gutter) clamp(4rem, 8vw, 6rem);
        }

        /* ── hero ── */
        .pd-hero { padding-bottom: var(--section-gap); }
        .pd-eyebrow {
          font-size: var(--text-2xs); font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase;
          color: var(--pd-accent); margin-bottom: var(--space-5);
        }
        .pd-title {
          font-size: clamp(2.4rem, 1.6rem + 4.5vw, 5rem); font-weight: 900;
          letter-spacing: -0.045em; text-transform: uppercase; line-height: 0.95;
          margin: 0 0 var(--space-5); max-width: 18ch; text-wrap: balance;
        }
        .pd-tagline {
          font-size: var(--text-lg); color: var(--text-secondary);
          font-weight: 300; line-height: 1.6; max-width: 40ch; margin: 0 0 var(--space-7);
        }
        .pd-metrics {
          display: grid; grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: var(--space-5) var(--space-6);
          border-top: 1px solid var(--pd-rule); padding-top: var(--space-5);
        }
        .pd-metric { min-width: 0; }
        .pd-metric-label {
          font-size: 0.55rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--text-tertiary); margin-bottom: var(--space-2);
        }
        .pd-metric-value { font-size: 1.05rem; font-weight: 700; letter-spacing: -0.02em; line-height: 1.25; overflow-wrap: anywhere; }

        /* ── sections: one rhythm, thin rule on top ── */
        .pd-section {
          border-top: 1px solid var(--pd-rule);
          padding-top: var(--section-gap);
          margin-bottom: var(--section-gap);
          scroll-margin-top: 5rem;
        }
        .pd-kicker {
          font-size: var(--text-2xs); letter-spacing: 0.25em; text-transform: uppercase;
          color: var(--text-tertiary); margin-bottom: var(--space-5);
        }
        .pd-h3 {
          font-size: var(--text-h3); font-weight: 900; letter-spacing: -0.03em;
          text-transform: uppercase; line-height: 1.05; margin: 0 0 var(--space-6);
        }
        .pd-lead {
          font-size: var(--text-lg); color: rgba(16,16,20,0.78);
          line-height: 1.75; font-weight: 300;
        }
        .pd-body {
          font-size: var(--text-base); color: var(--text-secondary);
          line-height: 1.8; font-weight: 300;
        }

        /* ── figures ── */
        .pd-figure {
          margin: 0 0 var(--space-6); border: 1px solid var(--pd-rule);
          overflow: hidden; background: #fff;
        }
        .pd-figure img { width: 100%; display: block; }
        .pd-figure figcaption {
          padding: var(--space-3) var(--space-4); font-size: var(--text-2xs);
          color: var(--text-tertiary); letter-spacing: 0.15em; text-transform: uppercase;
          border-top: 1px solid var(--pd-rule); line-height: 1.5;
        }
        .pd-gallery { display: flex; flex-direction: column; gap: var(--space-4); }
        .pd-gallery .pd-figure { margin-bottom: 0; }

        /* ── key features ── */
        .pd-features {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1px; background: var(--pd-rule); border: 1px solid var(--pd-rule);
        }
        .pd-feature { padding: var(--space-5); background: var(--pd-bg); }
        .pd-feature-num { font-size: var(--text-2xs); color: var(--pd-accent); letter-spacing: 0.15em; margin-bottom: var(--space-2); }
        .pd-feature p { font-size: var(--text-sm); color: rgba(16,16,20,0.72); line-height: 1.65; font-weight: 400; margin: 0; }

        /* ── stack ── */
        .pd-stack { display: flex; flex-wrap: wrap; gap: var(--space-2); }
        .pd-stack-tag {
          font-size: 0.68rem; font-weight: 700; border: 1px solid var(--border-accent);
          padding: 0.4rem 0.9rem; color: var(--text-secondary); letter-spacing: 0.1em;
        }

        /* ── footer ── */
        .pd-footer {
          border-top: 1px solid var(--pd-rule); padding-top: var(--space-6);
          display: flex; flex-wrap: wrap; gap: var(--space-4); align-items: center; justify-content: space-between;
        }
        .pd-footer-meta { font-size: var(--text-2xs); color: var(--text-tertiary); letter-spacing: 0.2em; }
        .pd-footer-actions { display: flex; flex-wrap: wrap; gap: var(--space-2); }

        @media (max-width: 900px) {
          .pd-metrics { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 640px) {
          .pd-topbar { padding: var(--space-2) var(--pd-gutter); }
          .pd-topbar-meta { display: none; }
          .pd-btn { padding: 0.5rem 0.9rem; }
          .pd-title { max-width: none; }
          .pd-tagline { margin-bottom: var(--space-6); }
          .pd-metrics { gap: var(--space-4); }
          .pd-features { grid-template-columns: 1fr; }
          .pd-feature { padding: var(--space-4); }
          .pd-footer-actions { width: 100%; }
          .pd-footer-actions .pd-btn { flex: 1 1 auto; justify-content: center; }
        }
      `}</style>
    </div>
  );
}
