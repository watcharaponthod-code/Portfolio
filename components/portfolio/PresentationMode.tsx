import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbBrandGithub } from 'react-icons/tb';

// Imported Media
import minePhoto from '../../imge/mine.jpg';
import aiRAG from '../project/ai_RAG/Picture3.png';
import geomap from '../project/geomap/LINE_20260324_213523.jpg';
import kafka from '../project/kafka/kafka1.png';
import cpuMonitor from '../project/cpu/download.png';

interface Section {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string[];
  specs: string[];
  accentChar: string;
  image?: string;
  visualLabel?: string;
  isIdentity?: boolean;
}

const SECTIONS: Section[] = [
  {
    id: 'hero',
    index: '00',
    title: 'WATCHARAPON',
    subtitle: 'THE MODERN ARCHITECT',
    description: [
      'Systems engineer with knowledge in DevOps, AI Engineering, Full-Stack, Mobile Apps, and Data Science.',
      'Focused on the practical application of technology to solve complex production challenges.',
      'Contact: watcharapon.thod@gmail.com | 094-453-2072'
    ],
    specs: ['IDENTITY: FULL-STACK AI ENGINEER', 'LOCATION: BKK', 'AVAILABILITY: IMMEDIATE'],
    accentChar: 'W',
    image: minePhoto,
    visualLabel: 'PROFILE_IDENTITY',
    isIdentity: true
  },
  {
    id: 'ai',
    index: '01',
    title: 'AI SPECIALIST',
    subtitle: 'AGENTIC INTELLIGENCE',
    description: [
      'Orchestrating autonomous pipelines. Mastering Agentic RAG and Hybrid Retrieval.',
      'Deploying secure 100% on-premises solutions behind corporate firewalls.',
      'Specialized in LangGraph, LlamaIndex, and high-performance vector DB optimization.'
    ],
    specs: ['RAG ARCHITECTURE', 'KNOWLEDGE MGMT', 'VECTOR EMBEDDING'],
    accentChar: 'A',
    image: aiRAG,
    visualLabel: 'ARCHITECTURE_OVERVIEW'
  },
  {
    id: 'fullstack',
    index: '02',
    title: 'VISUALIZER',
    subtitle: 'DYNAMIC DATA INTERACTION',
    description: [
      'Real-time visualization of massive datasets with zero latency.',
      'Crafting hyper-responsive UIs for critical operational monitoring systems.',
      'Merging aesthetic excellence with production-grade data engineering.'
    ],
    specs: ['REAL-TIME MAPS', 'D3 / LEAFLET / GL', 'UI PERFORMANCE'],
    accentChar: 'V',
    image: geomap,
    visualLabel: 'SYSTEM_DASHBOARD'
  },
  {
    id: 'infra',
    index: '03',
    title: 'ARCHITECT',
    subtitle: 'SCALABLE FOUNDATION',
    description: [
      'Building robust data bridges with Kafka and microservice orchestration (Java 21/Spring).',
      'Scaling services to handle high-concurrency event streams with 100% reliability.',
      'Managing infrastructure through Kubernetes, Docker, and Automated Pipelines.'
    ],
    specs: ['JAVA-KAFKA ENGINE', 'EVENT-DRIVEN ARCH', 'DOCKER / K8S'],
    accentChar: 'R',
    image: kafka,
    visualLabel: 'INFRA_DIAGRAM'
  },
  {
    id: 'infrastructure_scaling',
    index: '04',
    title: 'INFRASTRUCTURE',
    subtitle: 'VM AUTO-SCALING ENGINE',
    description: [
      'Orchestrating high-availability clusters with pro-active scaling rules.',
      'Analyzing real-time CPU spikes (90%+) to trigger instance provision cycles.',
      'Capable of managing enterprise resource pools and optimizing cloud costs.'
    ],
    specs: ['VM_SCALING_RULES', 'INFRA_OPTIMIZATION', 'STABILITY_MGMT'],
    accentChar: 'I',
    image: cpuMonitor,
    visualLabel: 'CPU_SCALING_LOGIC'
  }
];

function GlitchTitle({ text, trigger }: { text: string; trigger: boolean }) {
  const [glitchText, setGlitchText] = useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

  useEffect(() => {
    if (!trigger) { setGlitchText(text); return; }
    let frame = 0;
    const interval = setInterval(() => {
      setGlitchText(text.split('').map((char, i) => {
        if (char === ' ') return ' ';
        return Math.random() > 0.08 ? char : chars[Math.floor(Math.random() * chars.length)];
      }).join(''));
      if (frame++ > 15) { clearInterval(interval); setGlitchText(text); }
    }, 40);
    return () => clearInterval(interval);
  }, [trigger, text]);

  return <>{glitchText}</>;
}

interface Props {
  onComplete: () => void;
}

export default function PresentationMode({ onComplete }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const isLast = currentIdx === SECTIONS.length - 1;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.scrollTo({ top: 0 });
    return () => { document.body.style.overflow = ''; };
  }, []);

  const advance = useCallback(() => {
    if (isExiting) return;
    setGlitch(true);
    setTimeout(() => {
      setGlitch(false);
      if (isLast) {
        setIsExiting(true);
        setTimeout(onComplete, 1200);
      } else {
        setCurrentIdx(prev => prev + 1);
      }
    }, 350);
  }, [isExiting, isLast, onComplete]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (['Space', 'ArrowRight', 'ArrowDown', 'Enter'].includes(e.code)) {
        e.preventDefault(); advance();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [advance]);

  const current = SECTIONS[currentIdx];

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(30px)' }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9000,
            background: '#000', display: 'flex', flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div className="presentation-header" style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            padding: '1.5rem clamp(1rem, 5vw, 4rem)', display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', zIndex: 100, borderBottom: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div className="mono presentation-header-title" style={{ fontSize: 'clamp(0.6rem, 2.5vw, 0.8rem)', fontWeight: 950, color: '#fff', letterSpacing: '0.15rem', textAlign: 'center' }}>
              WATCHARAPON_THOD<span style={{ opacity: 0.3 }} className="hide-mobile"> // INITIAL_SEQUENCE</span>
            </div>
            <div className="presentation-nav" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1rem, 5vw, 3.5rem)' }}>
              <div style={{ display: 'flex', gap: 'clamp(5px, 2vw, 15px)' }}>
                {SECTIONS.map((_, i) => (
                  <motion.div key={i}
                    animate={{ width: i === currentIdx ? 'clamp(20px, 5vw, 40px)' : '6px', background: i <= currentIdx ? '#fff' : 'rgba(255,255,255,0.1)' }}
                    style={{ height: '2px' }}
                  />
                ))}
              </div>
              <span className="mono" style={{ fontSize: '0.75rem', fontWeight: 900 }}>
                {String(currentIdx + 1).padStart(2, '0')} / {String(SECTIONS.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Main Stage */}
          <div className="presentation-body" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem clamp(1rem, 5vw, 8rem)', position: 'relative', zIndex: 10, overflowY: 'auto' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIdx}
                initial={{ opacity: 0, x: 100, filter: 'blur(20px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -100, filter: 'blur(20px)' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ width: '100%', maxWidth: '1400px', padding: '6rem 0' }}
              >
                <div className="presentation-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem, 8vw, 12rem)', alignItems: 'center' }}>
                  
                  {/* Left Column: Info */}
                  <div style={{ textAlign: 'left' }}>
                    <div className="mono presentation-index" style={{ 
                        fontSize: 'clamp(4rem, 15vw, 9rem)', fontWeight: 950, lineHeight: 0.8, 
                        marginBottom: 'clamp(1rem, 3vw, 2.5rem)', color: '#fff', 
                        opacity: 1, letterSpacing: '-0.1em'
                      }}>
                       {current.index}
                    </div>
                    
                    <h2 className="presentation-title" style={{ fontSize: 'clamp(2rem, 10vw, 6rem)', fontWeight: 950, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1, textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                      <GlitchTitle text={current.title} trigger={glitch} />
                    </h2>
                    <div className="mono presentation-subtitle" style={{ fontSize: 'clamp(0.65rem, 2vw, 0.9rem)', color: '#fff', fontWeight: 800, letterSpacing: '0.3em', opacity: 0.6, borderLeft: '3px solid #fff', paddingLeft: '1.2rem' }}>
                      {current.subtitle}
                    </div>

                    <div className="presentation-desc-group" style={{ marginTop: 'clamp(1.5rem, 4vw, 3rem)', display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2vw, 2rem)' }}>
                      {current.description.map((line, i) => (
                        <motion.p key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 0.8, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
                          style={{ fontSize: 'clamp(0.95rem, 3vw, 1.3rem)', color: '#fff', fontWeight: 300, lineHeight: 1.5 }}>
                          {line}
                        </motion.p>
                      ))}
                    </div>

                    {/* GitHub Button (Identity Section only) */}
                    {current.isIdentity && (
                      <motion.a
                        href="https://github.com/watcharaponthod-code"
                        target="_blank"
                        rel="noreferrer"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="presentation-github-btn"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '1rem',
                          marginTop: '2.5rem', padding: '0.8rem 2rem', 
                          border: '1px solid rgba(255,255,255,0.3)', color: '#fff',
                          textDecoration: 'none', fontFamily: 'var(--font-mono)',
                          fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase',
                          letterSpacing: '0.2rem', transition: 'all 0.4s'
                        }}
                        onMouseEnter={e => { (e.currentTarget as any).style.background = '#fff'; (e.currentTarget as any).style.color = '#000'; }}
                        onMouseLeave={e => { (e.currentTarget as any).style.background = 'transparent'; (e.currentTarget as any).style.color = '#fff'; }}
                      >
                        <TbBrandGithub size={20} /> VIEW_GITHUB
                      </motion.a>
                    )}
                  </div>

                  {/* Right Column: Visuals */}
                    <div className="presentation-visuals" style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                      <div style={{ position: 'relative', width: 'clamp(85%, 90%, 100%)' }}>
                        <div className="mono visual-label-top" style={{ position: 'absolute', top: '-1.5rem', left: '0', fontSize: '0.6rem', color: '#fff', opacity: 0.3, letterSpacing: '0.45em' }}>
                          {current.visualLabel} // CORE_ENG
                        </div>
                      
                      {current.image ? (
                        <motion.div
                          initial={{ scale: 1.1, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.4, duration: 1 }}
                          style={{
                            width: '100%', aspectRatio: '1.2/1', background: 'rgba(255,255,255,0.02)',
                            border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', padding: '1.5rem',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                          }}
                        >
                          <img
                            src={current.image}
                            alt={current.title}
                            style={{
                              width: '100%', height: '100%', objectFit: 'contain',
                              filter: 'grayscale(0) brightness(1) contrast(1)', // Preserve color for technical graph
                            }}
                          />
                        </motion.div>
                      ) : (
                        <div style={{
                          width: '100%', aspectRatio: '1.2/1', background: 'rgba(255,255,255,0.01)',
                          border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          padding: '3rem', flexFlow: 'column'
                        }}>
                          <motion.div
                            animate={{ opacity: [0.1, 0.4, 0.1] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                            className="mono" style={{ fontSize: '0.65rem', textAlign: 'center', lineHeight: 2, letterSpacing: '0.3em' }}
                          >
                            [SYSTEM PERFORMANCE LOG]<br/>
                            VRAM_MGMT: OPTIMIZED<br/>
                            LATENCY: 12ms<br/>
                            LOAD: 2.1%<br/>
                            CORE_READY: ENABLED
                          </motion.div>
                        </div>
                      )}
                    </div>

                      <div className="presentation-specs" style={{ marginTop: 'clamp(2rem, 5vw, 5rem)', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2.5rem' }}>
                        {current.specs.map((spec, i) => (
                          <div key={i} className="mono" style={{ fontSize: '0.7rem', borderLeft: '2px solid #fff', paddingLeft: '1.2rem', letterSpacing: '0.15rem', fontWeight: 800, opacity: 0.3 }}>
                            {spec}
                          </div>
                        ))}
                      </div>
                    </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer Bar */}
          <div className="presentation-footer" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem clamp(1rem, 5vw, 4rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100, borderTop: '1px solid rgba(255,255,255,0.05)', background: 'black' }}>
            <div className="mono presentation-footer-meta" style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.2rem' }}>
              WATCHARAPON.THOD :: ARCHITECTURE_v4.0
            </div>
            <motion.button
              whileHover={{ scale: 1.05, background: '#fff', color: '#000' }} whileTap={{ scale: 0.95 }} onClick={advance}
              className="presentation-next-btn"
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 950, color: '#fff', border: '1px solid #fff',
                background: 'transparent', padding: '1rem 3rem', cursor: 'pointer', letterSpacing: '0.3rem', textTransform: 'uppercase',
                transition: 'all 0.4s'
              }}
            >
              {isLast ? 'INITIALIZE SITE' : 'NEXT MODULE'}
            </motion.button>
          </div>

          <style>{`
            @media (max-width: 1024px) {
              .presentation-grid {
                grid-template-columns: 1fr !important;
                gap: 4rem !important;
              }
              .presentation-body {
                padding-top: 6rem !important;
                padding-bottom: 7rem !important;
              }
            }
            @media (max-width: 640px) {
              .presentation-header {
                 padding: 1.2rem !important;
                 background: rgba(0,0,0,0.8);
                 backdrop-filter: blur(10px);
              }
              .hide-mobile { display: none; }
              .presentation-nav {
                 width: 100%;
                 justify-content: center;
                 gap: 1rem !important;
              }
              .presentation-footer {
                 padding: 1.2rem !important;
                 background: #000 !important;
              }
              .presentation-footer-meta {
                display: none;
              }
              .presentation-next-btn {
                width: 100%;
                padding: 1rem !important;
                font-size: 0.75rem !important;
                letter-spacing: 0.2rem !important;
              }
              .presentation-index {
                display: none;
              }
              .presentation-grid {
                gap: 2.5rem !important;
                padding-bottom: 2rem;
              }
              .presentation-visuals {
                width: 100% !important;
              }
              .presentation-specs {
                grid-template-columns: 1fr !important;
                gap: 1rem !important;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
