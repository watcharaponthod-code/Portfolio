import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PresentationMode from './PresentationMode';
import Philosophy from './Philosophy';
import SkillArchitecture from './SkillArchitecture';
import Projects from './Projects';
import MatrixRain from '../visuals/MatrixRain';
import ScrambleText from '../visuals/ScrambleText';

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
        position: 'fixed', inset: 0, zIndex: 99999, background: '#000',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: 'clamp(1.5rem, 8vw, 5rem)', overflow: 'hidden'
      }}
    >
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
        <div style={{ fontSize: 'clamp(2rem, 8vw, 6rem)', fontWeight: 950, color: '#fff', marginBottom: 'clamp(1.5rem, 4vw, 3rem)', letterSpacing: '-0.04em' }}>
          BOOT_SEQUENCER
        </div>
        <div className="mono" style={{ fontSize: '1rem', lineHeight: '2.5', color: 'rgba(255,255,255,0.3)' }}>
          {lines.map((line, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
              <span style={{ color: '#fff', marginRight: '1.5rem', opacity: 0.5 }}>#</span>{line}
            </motion.div>
          ))}
          <span className="cursor-blink" style={{ color: '#fff' }}>█</span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Hero Section (Restoring Stage 0/1/2) ────────────────────────
function HeroSection({ onAboutMe }: { onAboutMe: () => void }) {
  const [stage, setStage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  useEffect(() => {
    // Stage logic
    const t1 = setTimeout(() => setStage(1), 500);
    const t2 = setTimeout(() => setStage(2), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <section ref={containerRef} id="hero" style={{ position: 'relative', height: '130vh', background: '#000' }}>
      <motion.div className="hero-sticky-wrap">
        <div style={{ position: 'absolute', inset: 0, opacity: 0.25, zIndex: 0 }}>
          <MatrixRain opacity={1} isDark />
        </div>

        <motion.div className="container" style={{
          position: 'relative', zIndex: 2, textAlign: 'center', scale: scale, y: yParallax
        }}>
          <h1 style={{
            fontSize: 'clamp(4rem, 14vw, 11rem)',
            fontWeight: 950,
            color: '#fff',
            lineHeight: 0.85,
            letterSpacing: '-0.06em',
            marginBottom: '1.2rem',
            opacity: stage >= 1 ? 1 : 0,
            transition: 'opacity 1.2s'
          }}>
            {stage >= 1 && <ScrambleText text="Watcharapon" delay={100} duration={1500} />}
          </h1>

          <div style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.45rem)',
            color: 'rgba(255,255,255,0.58)',
            fontFamily: 'var(--font-mono)',
            opacity: stage >= 1 ? 1 : 0,
            transition: 'opacity 1s 0.2s',
            fontWeight: 700,
            letterSpacing: '0.1em',
            marginBottom: '0.6rem'
          }}>
            <ScrambleText text="AI Engineer" delay={700} duration={1200} chars="01" />
            <span className="cursor-blink" style={{ color: '#fff' }}>_</span>
          </div>

          <motion.div className="hero-buttons" style={{
            display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: 'clamp(2.5rem, 6vw, 4rem)',
            opacity: stage >= 2 ? 1 : 0,
            y: stage >= 2 ? 0 : 30,
            flexWrap: 'wrap'
          }} transition={{ duration: 1 }}>
            <a href={RESUME_DOWNLOAD_URL} className="btn-monochrome-primary">Resume</a>
            <button type="button" onClick={onAboutMe} className="btn-monochrome-outline">About_Me</button>
          </motion.div>
        </motion.div>
      </motion.div>

      <style>{`
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
          background: #fff;
          color: #000;
          padding: 1.25rem 3.5rem;
          text-decoration: none;
          font-family: var(--font-mono);
          font-weight: 900;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.25rem;
          transition: all 0.4s;
          border: 1px solid #fff;
        }
        .btn-monochrome-primary:hover {
          background: #000;
          color: #fff;
          transform: translateY(-5px);
        }
        .btn-monochrome-outline {
          border: 1px solid rgba(255,255,255,0.24);
          background: rgba(255,255,255,0.04);
          color: #fff;
          padding: 1.25rem 3.5rem;
          font-family: var(--font-mono); font-weight: 900;
          font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.25rem; transition: all 0.4s;
          cursor: pointer;
          backdrop-filter: blur(12px);
        }
        .btn-monochrome-outline:hover {
          border-color: #fff;
          box-shadow: 0 0 30px rgba(255,255,255,0.1);
          transform: translateY(-5px);
          background: rgba(255,255,255,0.1);
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

  return (
    <div className="landing-page">
      {!preloaderDone && <HackerPreloader onDone={() => { setPreloaderDone(true); setShowPresentation(true); }} />}

      {showPresentation && !presentationDone && (
        <PresentationMode onComplete={handleComplete} />
      )}

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

      {/* 03 / Skills Architecture */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <div id="skills"><SkillArchitecture /></div>
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
