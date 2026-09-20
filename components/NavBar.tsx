import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbMenu2, TbX } from 'react-icons/tb';
import { useLang, type I18nKey, type Lang } from '../lib/i18n';

const RESUME_DOWNLOAD_URL = 'https://drive.google.com/uc?export=download&id=1s46ejC-br7Ykct-bP4PO1dYdWCkItDXq';

const NAV_ITEMS: { id: string; key: I18nKey }[] = [
  { id: 'hero',       key: 'nav.home' },
  { id: 'philosophy', key: 'nav.about' },
  { id: 'projects',   key: 'nav.projects' },
  { id: 'skills',     key: 'nav.skills' },
  { id: 'contact',    key: 'nav.contact' },
];

const LANGS: Lang[] = ['th', 'en'];

function LangToggle({ mobile = false }: { mobile?: boolean }) {
  const { lang, setLang, t } = useLang();
  return (
    <div className={`nav-lang-toggle mono${mobile ? ' mobile' : ''}`} role="group" aria-label={t('nav.lang.label')}>
      {LANGS.map((l, i) => (
        <span key={l} style={{ display: 'inline-flex', alignItems: 'center' }}>
          {i > 0 && <span className="nav-lang-sep">|</span>}
          <button
            type="button"
            className={`nav-lang-btn${lang === l ? ' on' : ''}`}
            aria-pressed={lang === l}
            onClick={() => setLang(l)}
          >
            {l.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}

export default function NavBar() {
  const { t } = useLang();
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
          padding: '0 clamp(1rem, 5vw, 3rem)', background: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(15px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.1)' : 'none',
          transition: 'background 0.4s ease, border-color 0.4s ease',
        }}
      >
        <button onClick={() => scrollTo('hero')} style={{
          fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '1.1rem',
          letterSpacing: '-0.04em', color: '#000', background: 'none', border: 'none', cursor: 'pointer'
        }}>
          watcharapon
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="nav-desktop-links">
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => scrollTo(item.id)} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: activeSection === item.id ? '#000' : 'rgba(0,0,0,0.4)',
              background: 'none', border: 'none', cursor: 'pointer',
              position: 'relative', transition: 'color 0.3s'
            }}>
              {t(item.key)}
              {activeSection === item.id && (
                <motion.div layoutId="nav-underline" style={{
                  position: 'absolute', bottom: -5, left: 0, right: 0, height: '1px', background: '#000'
                }} />
              )}
            </button>
          ))}
          <a href={RESUME_DOWNLOAD_URL} className="nav-resume-btn">{t('nav.resume')}</a>
          <LangToggle />
        </div>

        <div className="nav-mobile-right" style={{ display: 'none', alignItems: 'center', gap: '0.75rem' }}>
          <LangToggle />
          <button className="nav-burger" onClick={() => setMenuOpen(!menuOpen)} style={{
            background: 'none', border: '1px solid rgba(0,0,0,0.2)', color: '#000',
            padding: '0.4rem 0.6rem', cursor: 'pointer'
          }}>
            {menuOpen ? <TbX size={22} /> : <TbMenu2 size={22} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{
            position: 'fixed', inset: 0, background: '#fff', zIndex: 999,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
          }}>
            {NAV_ITEMS.map((item, i) => (
              <motion.button key={item.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(item.id)} style={{
                  fontSize: '2.5rem', fontWeight: 800, color: activeSection === item.id ? '#000' : 'rgba(0,0,0,0.2)',
                  background: 'none', border: 'none', marginBottom: '1.5rem', textTransform: 'uppercase'
              }}>
                {t(item.key)}
              </motion.button>
            ))}
            <motion.a
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: NAV_ITEMS.length * 0.05 }}
              href={RESUME_DOWNLOAD_URL}
              className="nav-mobile-resume-btn"
              onClick={() => setMenuOpen(false)}
            >
              {t('nav.resume')}
            </motion.a>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: (NAV_ITEMS.length + 1) * 0.05 }}
              style={{ marginTop: '1.5rem' }}
            >
              <LangToggle mobile />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-resume-btn {
          font-family: var(--font-mono); font-size: 0.72rem; font-weight: 800;
          color: #fff; background: #000; padding: 0.45rem 1.2rem; text-decoration: none;
          transition: all 0.3s;
        }
        .nav-resume-btn:hover { background: #ccc; }
        .nav-mobile-resume-btn {
          margin-top: 1rem;
          padding: 0.85rem 1.6rem;
          border: 1px solid rgba(0,0,0,0.22);
          color: #000;
          text-decoration: none;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }
        .nav-mobile-resume-btn:hover {
          border-color: #000;
          background: rgba(0,0,0,0.08);
        }
        .nav-lang-toggle {
          display: inline-flex; align-items: center;
          border: 1px solid rgba(0,0,0,0.22);
          padding: 0.2rem 0.35rem;
          font-size: 0.68rem; font-weight: 800; letter-spacing: 0.1em;
          color: #000; background: #fff;
        }
        .nav-lang-toggle.mobile { font-size: 0.9rem; padding: 0.4rem 0.7rem; }
        .nav-lang-btn {
          background: none; border: none; cursor: pointer;
          font: inherit; letter-spacing: inherit;
          color: rgba(0,0,0,0.35); padding: 0.15rem 0.35rem;
          transition: color 0.2s;
        }
        .nav-lang-btn:hover { color: #000; }
        .nav-lang-btn.on { color: #000; text-decoration: underline; text-underline-offset: 3px; }
        .nav-lang-sep { color: rgba(0,0,0,0.25); font-weight: 400; }
        @media (max-width: 900px) {
          .nav-desktop-links { display: none !important; }
          .nav-mobile-right { display: flex !important; }
        }
      `}</style>
    </>
  );
}
