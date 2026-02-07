
import { useUI, ViewType } from '@/lib/state';
import classNames from 'classnames';
import { useState, useEffect } from 'react';
import { TbMenu2, TbX } from 'react-icons/tb';

export default function NavBar() {
  const { currentView, setView, heroAnimationComplete } = useUI();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const navItems: { id: ViewType; label: string }[] = [
    { id: 'landing', label: 'Home' },
    { id: 'system', label: 'Brain' },
    { id: 'skills', label: 'Stack' },
    { id: 'playground', label: 'Sandbox' },
    { id: 'projects', label: 'Works' },
    { id: 'philosophy', label: 'Story' },
  ];

  const handleNav = (id: ViewType) => {
    setView(id);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav className={classNames('navbar', { 'visible': isReady || heroAnimationComplete || currentView !== 'landing' })}>
        <div className="logo mono" style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.05em' }}>
          WATCHARAPON<span style={{ color: 'var(--accent-primary)', opacity: 0.5 }}>.DEV</span>
        </div>

        {/* Desktop Links */}
        <div className="nav-links">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={classNames('nav-item', { active: currentView === item.id })}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ display: 'none', fontSize: '1.5rem', padding: '0.5rem' }}
        >
          {isMobileMenuOpen ? <TbX /> : <TbMenu2 />}
        </button>
      </nav>

      {/* Modern Mobile Menu Overlay */}
      <div className={classNames('mobile-menu-overlay', { active: isMobileMenuOpen })}>
        <div className="mobile-menu-content">
          <div className="label" style={{ marginBottom: '2rem', textAlign: 'center' }}>Navigation / Menu</div>
          <div className="mobile-nav-list">
            {navItems.map((item, i) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={classNames('mobile-nav-item mono', { active: currentView === item.id })}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <span style={{ fontSize: '0.7rem', opacity: 0.3, marginRight: '1rem' }}>0{i + 1}</span>
                {item.label.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .mobile-toggle {
            display: block !important;
            z-index: 2001;
          }
        }

        .mobile-menu-overlay {
          position: fixed;
          inset: 0;
          background: white;
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          transform: translateY(-100%);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mobile-menu-overlay.active {
          transform: translateY(0);
        }

        .mobile-nav-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .mobile-nav-item {
          font-size: 2.5rem;
          font-weight: 800;
          text-align: left;
          background: none;
          border: none;
          cursor: pointer;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.5s ease;
        }

        .mobile-menu-overlay.active .mobile-nav-item {
          opacity: 1;
          transform: translateY(0);
        }

        .mobile-nav-item.active {
          color: black;
        }
        
        .mobile-nav-item:not(.active) {
          color: #ccc;
        }
      `}</style>
    </>
  );
}
