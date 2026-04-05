import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbMenu2, TbX } from 'react-icons/tb';
import resumePdf from '@/components/project/Resume.pdf';

const NAV_ITEMS = [
  { id: 'hero',       label: 'Home' },
  { id: 'philosophy', label: 'About' },
  { id: 'projects',   label: 'Projects' },
  { id: 'skills',     label: 'Skills' },
  { id: 'contact',    label: 'Contact' },
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setVisible(y > window.innerHeight * 0.3);

      const sectionIds = NAV_ITEMS.map(n => n.id);
      let current = 'hero';
      for (const id of sectionIds) {
        const el = id === 'hero' ? null : document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    if (id === 'hero') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: '64px',
          zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 clamp(1rem, 5vw, 3rem)', background: scrolled ? 'rgba(0,0,0,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(15px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.1)' : 'none',
          transition: 'background 0.4s ease, border-color 0.4s ease',
        }}
      >
        <button onClick={() => scrollTo('hero')} style={{
          fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '1.1rem',
          letterSpacing: '-0.04em', color: '#fff', background: 'none', border: 'none', cursor: 'pointer'
        }}>
          watcharapon
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="nav-desktop-links">
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => scrollTo(item.id)} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: activeSection === item.id ? '#fff' : 'rgba(255,255,255,0.4)',
              background: 'none', border: 'none', cursor: 'pointer',
              position: 'relative', transition: 'color 0.3s'
            }}>
              {item.label}
              {activeSection === item.id && (
                <motion.div layoutId="nav-underline" style={{
                  position: 'absolute', bottom: -5, left: 0, right: 0, height: '1px', background: '#fff'
                }} />
              )}
            </button>
          ))}
          <a href={resumePdf} download className="nav-resume-btn">Resume</a>
        </div>

        <button className="nav-burger" onClick={() => setMenuOpen(!menuOpen)} style={{
          background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: '#fff',
          padding: '0.4rem 0.6rem', cursor: 'pointer', display: 'none'
        }}>
          {menuOpen ? <TbX size={22} /> : <TbMenu2 size={22} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{
            position: 'fixed', inset: 0, background: '#000', zIndex: 999,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
          }}>
            {NAV_ITEMS.map((item, i) => (
              <motion.button key={item.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(item.id)} style={{
                  fontSize: '2.5rem', fontWeight: 800, color: activeSection === item.id ? '#fff' : 'rgba(255,255,255,0.2)',
                  background: 'none', border: 'none', marginBottom: '1.5rem', textTransform: 'uppercase'
              }}>
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-resume-btn {
          font-family: var(--font-mono); font-size: 0.72rem; font-weight: 800;
          color: #000; background: #fff; padding: 0.45rem 1.2rem; text-decoration: none;
          transition: all 0.3s;
        }
        .nav-resume-btn:hover { background: #ccc; }
        @media (max-width: 900px) {
          .nav-desktop-links { display: none !important; }
          .nav-burger { display: block !important; }
        }
      `}</style>
    </>
  );
}
