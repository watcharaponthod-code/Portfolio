import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PresentationMode from './PresentationMode';
import Philosophy from './Philosophy';
import Projects from './Projects';
import MatrixRain from '../visuals/MatrixRain';
import ScrambleText from '../visuals/ScrambleText';
import { useLang } from '../../lib/i18n';

interface LandingProps {
  onPresentationComplete?: () => void;
}

const RESUME_DOWNLOAD_URL = 'https://drive.google.com/uc?export=download&id=1s46ejC-br7Ykct-bP4PO1dYdWCkItDXq';

// ── Hacker Preloader (Monochrome) ──────────────────────────────
function HackerPreloader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  const [lines, setLines] = useState<string[]>([]);
  const [exiting, setExiting] = useState(false);

  const bootLines = [
    '[XBIOS] LOADING CORE KERNEL... DONE',
    '[NETWORK] CRYPTO_SYNC... OK',
    '[AUTH] DECRYPTING IDENTITY: WATCHARAPON_THOD',
    '[SYS] MOUNTING KNOWLEDGE VAULT [v4.0]...',
    '[PKG] RENDERING SYSTEMS_INIT SUCCESSFUL',
  ];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    let idx = 0;
    const addLine = () => {
      if (idx < bootLines.length) {
        setLines(prev => [...prev, bootLines[idx]]);
        idx++;
        setTimeout(addLine, 150 + Math.random() * 100);
      } else {
        setTimeout(() => {
          setExiting(true);
          setTimeout(() => {
            setVisible(false);
            onDone();
          }, 800);
        }, 500);
      }
    };
    addLine();
    return () => { document.body.style.overflow = ''; };
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: exiting ? '-100%' : 0 }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999, background: '#fff',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: 'clamp(1.5rem, 8vw, 5rem)', overflow: 'hidden'
      }}
    >
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
        <div style={{ fontSize: 'clamp(2rem, 8vw, 6rem)', fontWeight: 950, color: '#000', marginBottom: 'clamp(1.5rem, 4vw, 3rem)', letterSpacing: '-0.04em' }}>
          BOOT_SEQUENCER
        </div>
        <div className="mono" style={{ fontSize: '1rem', lineHeight: '2.5', color: 'rgba(0,0,0,0.3)' }}>
          {lines.map((line, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
              <span style={{ color: '#000', marginRight: '1.5rem', opacity: 0.5 }}>#</span>{line}
            </motion.div>
          ))}
          <span className="cursor-blink" style={{ color: '#000' }}>█</span>
        </div>
      </div>
    </motion.div>
  );
}

// Phone-only strip of real project shots under the hero copy (desktop has the portrait).
const SCV = 'https://raw.githubusercontent.com/watcharaponthod-code/sugarcane-cv/main/media';
const HERO_REEL = [
  { src: '/agri/cropscan-fields.png', label: 'CropScan' },
  { src: '/media/burnt-burnt-98.jpg', label: 'Burnt cane grading' },
  { src: `${SCV}/dust_real.gif`, label: 'Dust opacity' },
  { src: '/agri/sar-gapfill.png', label: 'Yield Pro' },
  { src: '/media/plate-ocr.jpg', label: 'Plate OCR' },
  { src: `${SCV}/caneflow_real.gif`, label: 'Conveyor flow' },
  { src: 'https://raw.githubusercontent.com/watcharaponthod-code/canegate-assets/main/screen-live.png', label: 'CaneGate' },
  { src: '/media/shorts-pipeline.jpg', label: 'Shorts AI' },
];

// ── Hero Section (Restoring Stage 0/1/2) ────────────────────────
function HeroSection({ onAboutMe }: { onAboutMe: () => void }) {
  const { lang, t } = useLang();
  const stage = 2; // intro animation removed: content is readable immediately
  const containerRef = useRef<HTMLDivElement>(null);


  return (
    <section ref={containerRef} id="hero" style={{ position: 'relative', minHeight: '100vh', background: '#fff' }}>
      <motion.div className="hero-sticky-wrap">

        <motion.div className="container hero-grid" style={{
          position: 'relative', zIndex: 2
        }}>
          <div className="hero-copy">
            <h1 style={{
              fontSize: 'clamp(2rem, 10vw, 7rem)', // 11 caps must fit one line at 360px
              fontWeight: 950,
              color: 'var(--text-primary)',
              lineHeight: 0.85,
              letterSpacing: '-0.06em',
              marginBottom: '1.2rem',
              opacity: stage >= 1 ? 1 : 0,
              transition: 'opacity 1.2s'
            }}>
              Watcharapon
            </h1>

            <div style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.45rem)',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)',
              opacity: stage >= 1 ? 1 : 0,
              transition: 'opacity 1s 0.2s',
              fontWeight: 700,
              letterSpacing: '0.1em',
              marginBottom: '1.6rem'
            }}>
              {t('hero.role')}
                    </div>

            <p className="hero-blurb" style={{
              opacity: stage >= 2 ? 1 : 0,
              transition: 'opacity 1s 0.3s'
            }}>
              {t('hero.blurb')}
            </p>

            <div className="hero-reel" aria-hidden="true" style={{ opacity: stage >= 2 ? 1 : 0, transition: 'opacity 1s 0.4s' }}>
              <div className="hero-reel-track">
                {[...HERO_REEL, ...HERO_REEL].map((r, i) => (
                  <figure key={i} className="hero-reel-item">
                    <img src={r.src} alt="" loading="lazy" />
                    <figcaption className="mono">{r.label}</figcaption>
                  </figure>
                ))}
              </div>
            </div>

            <motion.div className="hero-buttons" style={{
              display: 'flex', gap: '1.5rem', marginTop: 'clamp(2rem, 4vw, 3rem)',
              opacity: stage >= 2 ? 1 : 0,
              y: stage >= 2 ? 0 : 30,
              flexWrap: 'wrap'
            }} transition={{ duration: 1 }}>
              <a href={RESUME_DOWNLOAD_URL} className="btn-monochrome-primary">{t('hero.resume')}</a>
              <a href="https://github.com/watcharaponthod-code" target="_blank" rel="noreferrer" className="btn-monochrome-outline">GitHub</a>
              <a href="mailto:watcharapon.thod@gmail.com" className="btn-monochrome-outline">Email</a>
              <button type="button" onClick={onAboutMe} className="btn-monochrome-outline">{t('hero.about')}</button>
            </motion.div>
          </div>

          <motion.div
            className="hero-portrait-wrap"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: stage >= 1 ? 1 : 0, y: stage >= 1 ? 0 : 40 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src="/hero-portrait.png" alt="Watcharapon" className="hero-portrait" />
          </motion.div>
        </motion.div>
      </motion.div>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
          align-items: center;
          gap: clamp(2rem, 5vw, 5rem);
          text-align: left;
        }
        .hero-blurb {
          max-width: 46ch;
          font-size: clamp(1rem, 1.5vw, 1.15rem);
          line-height: 1.75;
          color: var(--text-secondary);
        }
        .hero-portrait-wrap {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: flex-end;
        }
        .hero-portrait {
          width: auto;
          max-width: 100%;
          max-height: 74vh;
          height: auto;
          display: block;
          /* one tight shadow; a wide soft one reads as a grey smear on white */
          filter: drop-shadow(0 10px 18px rgba(16,16,20,0.10));
          -webkit-mask-image: linear-gradient(to bottom, #000 96%, rgba(0,0,0,0) 100%);
          mask-image: linear-gradient(to bottom, #000 96%, rgba(0,0,0,0) 100%);
        }
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: minmax(0, 1fr);
            text-align: center;
            gap: 2rem;
          }
          .hero-copy { order: 2; }
          .hero-portrait-wrap { order: 1; }
          .hero-blurb { margin-left: auto; margin-right: auto; }
          .hero-buttons { justify-content: center; }
          .hero-portrait { max-height: 46vh; }
        }
        /* On a phone the portrait pushes the name and the opening line below
           the fold, so the first thing a visitor sees is a photo instead of
           what the work is. Drop it and let the words start at the top. */
        .hero-reel { display: none; }
        .hero-copy { min-width: 0; } /* the max-content reel must not widen the grid column */
        @keyframes hero-reel-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (max-width: 760px) {
          .hero-reel {
            display: block; overflow: hidden; margin: 1.6rem -1rem 0;
            contain: inline-size; /* report zero intrinsic width so the track can't stretch the hero */
            -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
            mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
          }
          .hero-reel-track { display: flex; gap: 0.75rem; width: max-content; animation: hero-reel-scroll 32s linear infinite; }
          .hero-reel-item { margin: 0; width: 62vw; max-width: 260px; flex: none; }
          .hero-reel-item img { width: 100%; aspect-ratio: 16 / 10; object-fit: cover; display: block; border-radius: 10px; background: #f1f1f1; }
          .hero-reel-item figcaption { font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-secondary); margin-top: 0.4rem; }
          .hero-portrait-wrap { display: none; }
          .hero-grid { gap: 0; text-align: left; }
          .hero-blurb { margin-left: 0; margin-right: 0; }
          .hero-buttons { justify-content: flex-start; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-reel { overflow-x: auto; }
          .hero-reel-track { animation: none; }
        }
        @media (max-width: 640px) {
          .btn-monochrome-primary,
          .btn-monochrome-outline {
            padding: 1rem 2rem !important;
            width: 100%;
            text-align: center;
          }
          .hero-buttons {
            flex-direction: column;
            width: 100%;
            max-width: 320px;
            margin-left: auto;
            margin-right: auto;
          }
        }
        .btn-monochrome-primary {
          background: #000;
          color: #fff;
          padding: 1.25rem 3.5rem;
          text-decoration: none;
          font-family: var(--font-mono);
          font-weight: 900;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.25rem;
          transition: all 0.4s;
          border: 1px solid #000;
        }
        .btn-monochrome-primary:hover {
          background: #fff;
          color: #000;
          transform: translateY(-5px);
        }
        .btn-monochrome-outline {
          border: 1px solid rgba(0,0,0,0.24);
          background: rgba(0,0,0,0.04);
          color: #000;
          padding: 1.25rem 3.5rem;
          font-family: var(--font-mono); font-weight: 900;
          font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.25rem; transition: all 0.4s;
          cursor: pointer;
          backdrop-filter: blur(12px);
        }
        .btn-monochrome-outline:hover {
          border-color: #000;
          box-shadow: 0 0 30px rgba(0,0,0,0.1);
          transform: translateY(-5px);
          background: rgba(0,0,0,0.1);
        }
      `}</style>
    </section>
  );
}

// ── Main Component ───────────────────────────────────────────────
export default function Landing({ onPresentationComplete }: LandingProps) {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [presentationDone, setPresentationDone] = useState(false);
  const [showPresentation, setShowPresentation] = useState(false);
  
  // Idle System Refs
  const lastActivityTime = useRef(Date.now());
  const autoPlayPhase = useRef<number>(0); // 0: none, 1: philo, 2: projects, 3: hero
  const autoPlayTimeout = useRef<any>(null);

  const resetIdleTimer = useCallback(() => {
    lastActivityTime.current = Date.now();
    // If we were auto-playing, stop it and wait 1 minute
    if (autoPlayTimeout.current) {
      clearTimeout(autoPlayTimeout.current);
      autoPlayTimeout.current = null;
    }
  }, []);

  useEffect(() => {
    const events = ['scroll', 'mousemove', 'keydown', 'mousedown', 'wheel', 'touchstart'];
    events.forEach(e => window.addEventListener(e, resetIdleTimer, { passive: true }));
    return () => events.forEach(e => window.removeEventListener(e, resetIdleTimer));
  }, [resetIdleTimer]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAutoPlay = useCallback(() => {
    if (!presentationDone) return;

    const idleTime = (Date.now() - lastActivityTime.current) / 1000;
    
    // Check if we reached the idle threshold
    // If moved, wait 60s. If first time after pres, wait 5s.
    const threshold = autoPlayPhase.current > 0 ? 60 : 5;

    if (idleTime >= threshold) {
      // Logic for scrolling phases
      if (autoPlayPhase.current === 0) {
        // Start: Philosophy
        scrollToSection('philosophy');
        autoPlayPhase.current = 1;
        autoPlayTimeout.current = setTimeout(handleAutoPlay, 5000);
      } else if (autoPlayPhase.current === 1) {
        // Step: Projects
        scrollToSection('projects');
        autoPlayPhase.current = 2;
        autoPlayTimeout.current = setTimeout(handleAutoPlay, 8000); // Give 8s for projects
      } else if (autoPlayPhase.current === 2) {
        // Loop back: Hero
        scrollToSection('hero');
        autoPlayPhase.current = 0; // Reset
        autoPlayTimeout.current = setTimeout(handleAutoPlay, 10000); // Long wait at hero
      }
    } else {
      // Re-check every second
      autoPlayTimeout.current = setTimeout(handleAutoPlay, 1000);
    }
  }, [presentationDone]);

  useEffect(() => {
    if (presentationDone) {
      handleAutoPlay();
    }
    return () => { if (autoPlayTimeout.current) clearTimeout(autoPlayTimeout.current); };
  }, [presentationDone, handleAutoPlay]);

  const handleComplete = useCallback(() => {
    setPresentationDone(true);
    setShowPresentation(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.body.style.overflow = '';
    if (onPresentationComplete) onPresentationComplete();
  }, [onPresentationComplete]);

  // no preloader: mark the intro as done on mount
  useEffect(() => { handleComplete(); }, [handleComplete]);

  return (
    <div className="landing-page">
      

      {/* presentation intro removed: it repeated the hero and the case studies */}

      {/* Main Content Sections */}
      <HeroSection onAboutMe={() => scrollToSection('introduction')} />

      {/* 01 / Philosophy (Building the Future) */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <div id="philosophy"><Philosophy /></div>
      </motion.div>

      {/* 02 / Projects */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <div id="projects"><Projects /></div>
      </motion.div>

      <style>{`
        .hero-sticky-wrap {
          position: sticky; top: 0; height: 100vh;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          overflow: hidden;
        }
        .landing-page { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}
