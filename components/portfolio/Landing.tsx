import { useEffect, useRef, useState } from 'react';
import { useUI } from '@/lib/state';
import { TbArrowDown, TbBrandGithub, TbMail } from 'react-icons/tb';

// Sections
import Philosophy from './Philosophy';
import SkillArchitecture from './SkillArchitecture';
import SystemBrain from './SystemBrain';
import Projects from './Projects';
import MatrixRain from '../visuals/MatrixRain';

export default function Landing() {
  const { setHeroAnimationComplete, setView } = useUI();
  const [showAi, setShowAi] = useState(false);

  // Typewriter State
  const [nameText, setNameText] = useState('');
  const [roleText, setRoleText] = useState('');
  const [stage, setStage] = useState(0); // 0: start, 1: name done, 2: role done

  useEffect(() => {
    if (stage === 2) {
      setHeroAnimationComplete(true);
    }
  }, [stage, setHeroAnimationComplete]);

  const fullName = "Watcharapon";
  const fullRole = "Full Stack Systems Engineer";

  // Typewriter Effect
  useEffect(() => {
    let nameIndex = 0;
    let roleIndex = 0;
    let nameTimer: NodeJS.Timeout;
    let roleTimer: NodeJS.Timeout;

    const startTyping = setTimeout(() => {
      nameTimer = setInterval(() => {
        setNameText(fullName.slice(0, nameIndex + 1));
        nameIndex++;
        if (nameIndex === fullName.length) {
          clearInterval(nameTimer);
          setStage(1);
          setTimeout(() => {
            roleTimer = setInterval(() => {
              setRoleText(fullRole.slice(0, roleIndex + 1));
              roleIndex++;
              if (roleIndex === fullRole.length) {
                clearInterval(roleTimer);
                setStage(2);
              }
            }, 30);
          }, 200);
        }
      }, 70);
    }, 300);

    return () => {
      clearTimeout(startTyping);
      clearInterval(nameTimer);
      clearInterval(roleTimer);
    };
  }, []);

  // Glitch State
  const [isHeroDark, setIsHeroDark] = useState(true);
  const [glitchName, setGlitchName] = useState(fullName);
  const glitchChars = "!@#$%^&*()_+{}[]:;<>?";

  // Auto-switch Hero Theme (Every 3s)
  useEffect(() => {
    const interval = setInterval(() => {
      setIsHeroDark(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Scramble/Glitch Animation every 2s
  useEffect(() => {
    if (stage === 0 && nameText.length < fullName.length) return;

    const interval = setInterval(() => {
      const nameArray = fullName.split('');
      const glitchCount = Math.random() > 0.2 ? 2 : 1;

      const indices: number[] = [];
      while (indices.length < glitchCount) {
        const r = Math.floor(Math.random() * fullName.length);
        if (!indices.includes(r)) indices.push(r);
      }

      indices.forEach(idx => {
        nameArray[idx] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
      });

      setGlitchName(nameArray.join(''));
      setTimeout(() => setGlitchName(fullName), 300);
    }, 2000);

    return () => clearInterval(interval);
  }, [stage, nameText]);

  // Scroll Reveal Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));

    const handleToggle = () => {
      setShowAi(true);
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }, 100);
    };
    window.addEventListener('toggle-ai-assistant', handleToggle);

    return () => {
      observer.disconnect();
      window.removeEventListener('toggle-ai-assistant', handleToggle);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const heroStats = [
    { value: "B.Sc. CS", label: "KU CO-OP" },
    { value: "5+", label: "Enterprise Proj" },
    { value: "3", label: "Hackathons" },
    { value: "Available", label: "For Hire" },
  ];

  return (
    <div className="landing-page" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Hero Section */}
      <div
        className="hero-section"
        style={{
          minHeight: '100vh',
          position: 'relative',
          background: isHeroDark ? 'black' : 'white',
          color: isHeroDark ? 'white' : 'black',
          transition: 'background 0.5s ease, color 0.5s ease'
        }}
      >
        <MatrixRain isDark={isHeroDark} opacity={isHeroDark ? 0.7 : 0.4} />
        <div
          className="hero-overlay"
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: isHeroDark
              ? 'radial-gradient(circle at center, transparent 0%, black 80%)'
              : 'radial-gradient(circle at center, transparent 0%, white 80%)',
            zIndex: 1,
            transition: 'background 0.5s ease'
          }}
        />

        <div className="container hero-content" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          height: '100vh',
          paddingTop: 0,
          position: 'relative',
          zIndex: 2
        }}>
          {/* Location badge */}
          <div className="hero-location-badge mono" style={{
            marginBottom: '2rem',
            opacity: stage >= 1 ? 1 : 0,
            transition: 'opacity 0.5s ease',
            color: 'inherit',
          }}>
            <span style={{ opacity: 0.5, marginRight: '0.5rem' }}>●</span>
            Bangkok, Thailand
          </div>

          {/* Name */}
          <h1 className="hero-name-container" style={{ marginBottom: '0.5rem', width: '100%', minHeight: 'auto' }}>
            <div className="mono hero-name" style={{
              fontSize: 'clamp(2.5rem, 12vw, 8rem)',
              fontWeight: 800,
              letterSpacing: '-0.05em',
              lineHeight: '0.9',
              color: 'inherit',
              wordWrap: 'break-word'
            }}>
              {stage < 1 ? nameText : glitchName}
              {stage === 0 && <span className="cursor-blink">_</span>}
            </div>
          </h1>

          {/* Role subtitle */}
          <div className="hero-subtitle" style={{
            fontSize: 'clamp(0.875rem, 2.5vw, 1.5rem)',
            fontWeight: 400,
            color: 'inherit',
            opacity: 0.8,
            fontFamily: 'var(--font-mono)',
            marginTop: '0.75rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            minHeight: '1.5rem'
          }}>
            {stage >= 1 && (
              <>
                <span className="hero-prompt-char" style={{ opacity: 0.9, marginRight: '8px' }}>&gt;</span>
                {roleText}
                <span className="cursor-blink">_</span>
              </>
            )}
          </div>

          {/* CTA buttons */}
          {stage >= 2 && (
            <div className="hero-ctas" style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '3rem',
              opacity: 1,
              animation: 'fadeInUp 0.6s ease forwards',
            }}>
              <button
                onClick={() => scrollToSection('projects')}
                className="hero-cta-primary mono"
                style={{
                  background: isHeroDark ? 'white' : 'black',
                  color: isHeroDark ? 'black' : 'white',
                  border: 'none',
                  padding: '0.85rem 2rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s',
                }}
              >
                VIEW WORKS
              </button>
              <button
                onClick={() => scrollToSection('philosophy')}
                className="hero-cta-secondary mono"
                style={{
                  background: 'transparent',
                  color: 'inherit',
                  border: `1px solid ${isHeroDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'}`,
                  padding: '0.85rem 2rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                MY STORY
              </button>
            </div>
          )}

          {/* Quick stats row */}
          {stage >= 2 && (
            <div className="hero-stats-row" style={{
              position: 'absolute',
              bottom: '6rem',
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              gap: '0',
              padding: '0 4rem',
              animation: 'fadeInUp 0.8s 0.3s ease forwards',
              opacity: 0,
            }}>
              {heroStats.map((s, i) => (
                <div key={i} className="hero-stat-item" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '1rem 2rem',
                  borderRight: i < heroStats.length - 1 ? `1px solid ${isHeroDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'}` : 'none',
                }}>
                  <span className="mono" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'inherit' }}>{s.value}</span>
                  <span className="mono" style={{ fontSize: '0.6rem', color: 'inherit', opacity: 0.5, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.2rem' }}>{s.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Scroll indicator */}
          {stage >= 2 && (
            <div
              onClick={() => scrollToSection('philosophy')}
              style={{
                position: 'absolute',
                bottom: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                animation: 'fadeInUp 1s 0.5s ease forwards',
                opacity: 0,
                color: 'inherit',
              }}
            >
              <span className="mono" style={{ fontSize: '0.6rem', opacity: 0.4, letterSpacing: '0.15em', textTransform: 'uppercase' }}>scroll</span>
              <TbArrowDown size={16} style={{ opacity: 0.4, animation: 'bounce 2s infinite' }} />
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
          60% { transform: translateY(-3px); }
        }

        .hero-cta-primary:hover {
          opacity: 0.85 !important;
        }

        .hero-cta-secondary:hover {
          border-opacity: 0.8 !important;
          background: rgba(255,255,255,0.05) !important;
        }

        @media (max-width: 768px) {
          .hero-name {
            font-size: clamp(2.5rem, 10vw, 4rem) !important;
            letter-spacing: -0.01em !important;
          }
          .hero-name-container {
            min-height: 5rem !important;
          }
          .hero-subtitle {
            font-size: 0.9rem !important;
            letter-spacing: 0.05em !important;
          }
          .hero-prompt-char {
            display: none;
          }
          .hero-stats-row {
            padding: 0 1rem !important;
            gap: 0 !important;
          }
          .hero-stat-item {
            padding: 0.75rem 1rem !important;
          }
          .hero-ctas {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>

      {/* --- STORY SECTIONS --- */}
      <div id="philosophy" className="scroll-reveal reveal-left" style={{ position: 'relative', zIndex: 10, background: 'var(--bg-primary)', borderTop: '1px solid #e5e7eb' }}>
        <Philosophy />
      </div>

      <div id="skills" className="scroll-reveal reveal-right" style={{ position: 'relative', zIndex: 10, background: 'var(--bg-secondary)' }}>
        <SkillArchitecture />
      </div>

      <div id="system" className="scroll-reveal reveal-left" style={{ position: 'relative', zIndex: 10, background: 'var(--bg-primary)' }}>
        <div className="container section">
          <SystemBrain />
        </div>
      </div>

      <div id="projects" className="scroll-reveal reveal-right" style={{ position: 'relative', zIndex: 10, background: 'var(--bg-secondary)' }}>
        <Projects />
      </div>
    </div>
  );
}
