import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbX, TbArrowDown, TbBrandGithub } from 'react-icons/tb';

import minePhoto from '../../imge/mine.jpg';
import aiRAG from '../project/ai_RAG/Picture3.png';
import geomap from '../project/geomap/LINE_20260324_213523.jpg';
import kafka from '../project/kafka/kafka1.png';
import cpuMonitor from '../project/cpu/download.png';

interface Props { onComplete: () => void; }

const SECTIONS = [
  {
    index: '00',
    title: 'WATCHARAPON',
    subtitle: 'THE MODERN ARCHITECT',
    body: [
      'Systems engineer with a breadth of knowledge in DevOps, AI Engineering, Full-Stack, Mobile Apps, and Data Science.',
      'Focused on the practical application of technology to solve complex production challenges.',
      'Contact: watcharapon.thod@gmail.com · 094-453-2072',
    ],
    specs: ['FULL-STACK AI ENGINEER', 'LOCATION: BANGKOK', 'AVAILABILITY: IMMEDIATE'],
    image: minePhoto,
    isHero: true,
  },
  {
    index: '01',
    title: 'AI SPECIALIST',
    subtitle: 'AGENTIC INTELLIGENCE',
    body: [
      'Orchestrating autonomous pipelines. Mastering Agentic RAG and Hybrid Retrieval.',
      'Deploying secure 100% on-premises solutions behind corporate firewalls — no data leaves the building.',
      'Specialized in LangGraph, LlamaIndex, and high-performance vector DB optimization with pgvector.',
    ],
    specs: ['RAG ARCHITECTURE', 'KNOWLEDGE MGMT', 'VECTOR EMBEDDING'],
    image: aiRAG,
  },
  {
    index: '02',
    title: 'VISUALIZER',
    subtitle: 'DYNAMIC DATA INTERACTION',
    body: [
      'Real-time visualization of massive datasets with zero latency.',
      'Crafting hyper-responsive UIs for critical operational monitoring systems.',
      'Merging aesthetic precision with production-grade data engineering.',
    ],
    specs: ['REAL-TIME MAPS', 'D3 / LEAFLET', 'UI PERFORMANCE'],
    image: geomap,
  },
  {
    index: '03',
    title: 'ARCHITECT',
    subtitle: 'SCALABLE FOUNDATION',
    body: [
      'Building robust data bridges with Kafka and microservice orchestration (Java 21 / Spring Boot).',
      'Scaling services to handle high-concurrency event streams with 100% reliability.',
      'Managing infrastructure through Kubernetes, Docker, and automated CI/CD pipelines.',
    ],
    specs: ['JAVA-KAFKA ENGINE', 'EVENT-DRIVEN ARCH', 'DOCKER / K8S'],
    image: kafka,
  },
  {
    index: '04',
    title: 'INFRASTRUCTURE',
    subtitle: 'VM AUTO-SCALING ENGINE',
    body: [
      'Orchestrating high-availability clusters with pro-active scaling rules.',
      'Analyzing real-time CPU spikes (90%+) to trigger automated instance provision cycles.',
      'Managing enterprise resource pools and continuously optimizing cloud cost efficiency.',
    ],
    specs: ['VM SCALING', 'INFRA OPTIMIZATION', 'STABILITY MGMT'],
    image: cpuMonitor,
  },
];

export default function PresentationMode({ onComplete }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => setVisible(true), 80);
    return () => { document.body.style.overflow = ''; clearTimeout(t); };
  }, []);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const p = el.scrollTop / (el.scrollHeight - el.clientHeight);
    setProgress(Math.min(p, 1));
    setReachedEnd(p > 0.88);
  };

  const handleClose = () => {
    setVisible(false);
    setTimeout(onComplete, 700);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="pres-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          style={{ position: 'fixed', inset: 0, zIndex: 9000, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '0', overflowY: 'hidden' }}
        >
          {/* Paper / Document modal */}
          <motion.div
            initial={{ y: '-4%', opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: '-4%', opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: '100%', maxWidth: '960px', height: '100vh', background: '#0f0f0f', display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: '0 40px 120px rgba(0,0,0,0.8)' }}
          >
            {/* ── Fixed Header ── */}
            <div style={{ position: 'sticky', top: 0, zIndex: 10, background: '#0f0f0f', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '1.2rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
              <div className="mono" style={{ fontSize: '0.65rem', fontWeight: 900, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.25em' }}>
                WATCHARAPON_THOD <span style={{ opacity: 0.3 }}>// PROFILE_v4.0</span>
              </div>
              <button
                onClick={handleClose}
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '0.5rem 1.2rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.15em', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.25s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; (e.currentTarget as HTMLElement).style.color = '#000'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
              >
                <TbX size={12} /> SKIP
              </button>
            </div>

            {/* ── Scrollable Body ── */}
            <div ref={scrollRef} onScroll={handleScroll} style={{ flex: 1, overflowY: 'auto', scrollBehavior: 'smooth' }}>

              {SECTIONS.map((sec, idx) => (
                <div key={sec.index} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: 'clamp(3rem, 7vw, 5rem) clamp(1.5rem, 5vw, 2.5rem)' }}>
                  {/* Section number + subtitle */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '2.5rem' }}>
                    <span className="mono" style={{ fontSize: 'clamp(3.5rem, 10vw, 6rem)', fontWeight: 950, color: 'rgba(255,255,255,0.06)', lineHeight: 1, letterSpacing: '-0.05em' }}>{sec.index}</span>
                    <div>
                      <div className="mono" style={{ fontSize: '0.6rem', color: '#e63f6a', fontWeight: 900, letterSpacing: '0.25em', marginBottom: '0.4rem' }}>{sec.subtitle}</div>
                      <h2 style={{ fontSize: 'clamp(1.8rem, 6vw, 3.2rem)', fontWeight: 950, color: '#fff', letterSpacing: '-0.04em', textTransform: 'uppercase', lineHeight: 1 }}>{sec.title}</h2>
                    </div>
                  </div>

                  {/* Image + text grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: sec.image ? '1fr 1fr' : '1fr', gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'start' }}>
                    {/* Body text */}
                    <div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2.5rem' }}>
                        {sec.body.map((line, i) => (
                          <p key={i} style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, fontWeight: 300 }}>
                            {line}
                          </p>
                        ))}
                      </div>
                      {/* Specs */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                        {sec.specs.map(s => (
                          <span key={s} className="mono" style={{ fontSize: '0.6rem', fontWeight: 900, border: '1px solid rgba(255,255,255,0.15)', padding: '0.3rem 0.8rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>{s}</span>
                        ))}
                      </div>
                      {sec.isHero && (
                        <a
                          href="https://github.com/watcharaponthod-code"
                          target="_blank" rel="noreferrer"
                          className="mono"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.7rem', marginTop: '2rem', padding: '0.8rem 2rem', background: '#fff', color: '#000', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.2em', transition: 'all 0.3s' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.border = '1px solid #fff'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; (e.currentTarget as HTMLElement).style.color = '#000'; (e.currentTarget as HTMLElement).style.border = '1px solid transparent'; }}
                        >
                          <TbBrandGithub size={16} /> VIEW GITHUB
                        </a>
                      )}
                    </div>

                    {/* Image */}
                    {sec.image && (
                      <div style={{ border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', background: 'rgba(255,255,255,0.02)' }}>
                        <img src={sec.image} alt={sec.title} style={{ width: '100%', display: 'block', objectFit: 'cover', maxHeight: '320px', filter: idx === 0 ? 'none' : 'brightness(0.9) contrast(1.05)' }} />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* ── End / Enter CTA ── */}
              <div style={{ padding: 'clamp(4rem, 10vw, 7rem) clamp(1.5rem, 5vw, 2.5rem)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                <div className="mono" style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.3em' }}>END_OF_PROFILE // EXPLORE_WORKS</div>
                <h3 style={{ fontSize: 'clamp(2rem, 7vw, 4rem)', fontWeight: 950, color: '#fff', letterSpacing: '-0.04em', textTransform: 'uppercase', lineHeight: 1 }}>
                  Ready to explore<br />the work?
                </h3>
                <motion.button
                  onClick={handleClose}
                  animate={reachedEnd ? { scale: [1, 1.04, 1] } : {}}
                  transition={{ repeat: reachedEnd ? Infinity : 0, duration: 1.8 }}
                  style={{
                    background: '#fff', color: '#000', border: 'none',
                    padding: '1.2rem 3.5rem', fontFamily: 'var(--font-mono)',
                    fontSize: '0.9rem', fontWeight: 950, letterSpacing: '0.25em',
                    textTransform: 'uppercase', cursor: 'pointer',
                    transition: 'all 0.3s',
                    opacity: reachedEnd ? 1 : 0.5,
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#e63f6a'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; (e.currentTarget as HTMLElement).style.color = '#000'; }}
                >
                  ENTER SITE →
                </motion.button>
                <p className="mono" style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.15em' }}>
                  {reachedEnd ? 'SCROLL COMPLETE' : 'SCROLL TO UNLOCK'}
                </p>
              </div>
            </div>

            {/* ── Scroll arrow hint (visible at top) ── */}
            {progress < 0.05 && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ position: 'absolute', bottom: '3.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 20, pointerEvents: 'none' }}
              >
                <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                  <TbArrowDown size={20} color="rgba(255,255,255,0.4)" />
                </motion.div>
              </motion.div>
            )}

            {/* ── Fixed progress bar ── */}
            <div style={{ position: 'sticky', bottom: 0, left: 0, right: 0, height: '3px', background: 'rgba(255,255,255,0.07)', flexShrink: 0 }}>
              <motion.div
                style={{ height: '100%', background: '#e63f6a', transformOrigin: 'left' }}
                animate={{ scaleX: progress }}
                transition={{ ease: 'linear', duration: 0.05 }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
