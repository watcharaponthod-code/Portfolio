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
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            padding: '2.5rem 4rem', display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', zIndex: 100, borderBottom: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div className="mono" style={{ fontSize: '0.9rem', fontWeight: 950, color: '#fff', letterSpacing: '0.2rem' }}>
              WATCHARAPON_THOD<span style={{ opacity: 0.3 }}> // INITIAL_SEQUENCE</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3.5rem' }}>
              <div style={{ display: 'flex', gap: '15px' }}>
                {SECTIONS.map((_, i) => (
                  <motion.div key={i}
                    animate={{ width: i === currentIdx ? '40px' : '6px', background: i <= currentIdx ? '#fff' : 'rgba(255,255,255,0.1)' }}
                    style={{ height: '2px' }}
                  />
                ))}
              </div>
              <span className="mono" style={{ fontSize: '0.85rem', fontWeight: 900 }}>
                {String(currentIdx + 1).padStart(2, '0')} / {String(SECTIONS.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Main Stage */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 8rem', position: 'relative', zIndex: 10 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIdx}
                initial={{ opacity: 0, x: 100, filter: 'blur(20px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -100, filter: 'blur(20px)' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ width: '100%', maxWidth: '1400px' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12rem', alignItems: 'center' }}>
                  
                  {/* Left Column: Info */}
                  <div style={{ textAlign: 'left' }}>
                    <div className="mono" style={{ 
                        fontSize: '9rem', fontWeight: 950, lineHeight: 0.8, 
                        marginBottom: '2.5rem', color: '#fff', 
                        opacity: 1, letterSpacing: '-0.1em'
                      }}>
                       {current.index}
                    </div>
                    
                    <h2 style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 950, color: '#fff', letterSpacing: '-0.06em', lineHeight: 0.85, textTransform: 'uppercase', marginBottom: '2rem' }}>
                      <GlitchTitle text={current.title} trigger={glitch} />
                    </h2>
                    <div className="mono" style={{ fontSize: '1rem', color: '#fff', fontWeight: 800, letterSpacing: '0.45em', opacity: 0.6, borderLeft: '4px solid #fff', paddingLeft: '2rem' }}>
                      {current.subtitle}
                    </div>

                    <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                      {current.description.map((line, i) => (
                        <motion.p key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 0.8, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
                          style={{ fontSize: '1.4rem', color: '#fff', fontWeight: 300, lineHeight: 1.4 }}>
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
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '1rem',
                          marginTop: '3.5rem', padding: '1rem 2.5rem', 
                          border: '1px solid rgba(255,255,255,0.3)', color: '#fff',
                          textDecoration: 'none', fontFamily: 'var(--font-mono)',
                          fontSize: '0.9rem', fontWeight: 900, textTransform: 'uppercase',
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
                  <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ position: 'relative', width: '85%' }}>
                      <div className="mono" style={{ position: 'absolute', top: '-1.5rem', left: '0', fontSize: '0.62rem', color: '#fff', opacity: 0.3, letterSpacing: '0.45em' }}>
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

                    <div style={{ marginTop: '5rem', width: '85%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '4rem' }}>
                      {current.specs.map((spec, i) => (
                        <div key={i} className="mono" style={{ fontSize: '0.8rem', borderLeft: '2px solid #fff', paddingLeft: '1.5rem', letterSpacing: '0.15rem', fontWeight: 800, opacity: 0.3 }}>
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
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '3rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 }}>
            <div className="mono" style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.2rem' }}>
              WATCHARAPON.THOD :: SYSTEMS_ARCHITECTURE_v4.0
            </div>
            <motion.button
              whileHover={{ scale: 1.05, background: '#fff', color: '#000' }} whileTap={{ scale: 0.95 }} onClick={advance}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 950, color: '#fff', border: '1px solid #fff',
                background: 'transparent', padding: '1.2rem 5rem', cursor: 'pointer', letterSpacing: '0.4rem', textTransform: 'uppercase',
                transition: 'all 0.4s'
              }}
            >
              {isLast ? 'INITIALIZE SITE' : 'NEXT MODULE'}
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
