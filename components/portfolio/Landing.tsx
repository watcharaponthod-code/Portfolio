import { useEffect, useRef, useState } from 'react';
import { useUI } from '@/lib/state';
import { TbCpu, TbApps, TbUserCircle, TbTerminal, TbMessageCircle, TbX } from 'react-icons/tb';

// Sections
import Philosophy from './Philosophy';
import SkillArchitecture from './SkillArchitecture';
import SystemBrain from './SystemBrain';
import Projects from './Projects';
import LiveAIDemo from './LiveAIDemo';

export default function Landing() {
  const { setHeroAnimationComplete } = useUI();
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

    // Start typing Name after 500ms
    const startTyping = setTimeout(() => {
      nameTimer = setInterval(() => {
        setNameText(fullName.slice(0, nameIndex + 1));
        nameIndex++;
        if (nameIndex === fullName.length) {
          clearInterval(nameTimer);
          setStage(1);

          // Start typing Role after Name finishes + 200ms
          setTimeout(() => {
            roleTimer = setInterval(() => {
              setRoleText(fullRole.slice(0, roleIndex + 1));
              roleIndex++;
              if (roleIndex === fullRole.length) {
                clearInterval(roleTimer);
                setStage(2);
              }
            }, 30); // Faster for role
          }, 200);
        }
      }, 70); // Slower for name
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

  // Scramble/Glitch Animation every 2s (1-2 chars)
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

  // Matrix Rain Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    updateSize();

    const binary = '10';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      // Trail color depends on hero background
      ctx.fillStyle = isHeroDark ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = binary.charAt(Math.floor(Math.random() * binary.length));

        ctx.fillStyle = isHeroDark ? '#404040' : '#d4d4d4';
        if (Math.random() > 0.95) ctx.fillStyle = isHeroDark ? '#ffffff' : '#000000';

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    window.addEventListener('resize', updateSize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', updateSize);
    };
  }, [isHeroDark]);

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

    return () => observer.disconnect();
  }, []);


  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="landing-page" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* ... Hero Section ... */}
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

        <canvas ref={canvasRef} className="matrix-canvas" style={{ position: 'absolute', top: 0, left: 0, zIndex: 0, opacity: 0.8 }} />
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

        <div className="container hero-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', height: '100vh', paddingTop: 0, position: 'relative', zIndex: 2 }}>

          {/* Glitchy/Typewriter Name */}
          <h1 className="hero-name-container" style={{ marginBottom: '1rem', width: '100%', minHeight: 'auto' }}>
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

          {/* Subtitle */}
          <div className="hero-subtitle" style={{
            fontSize: 'clamp(0.875rem, 2.5vw, 1.5rem)',
            fontWeight: 400,
            color: 'inherit',
            opacity: 0.8,
            fontFamily: 'var(--font-mono)',
            marginTop: '0.5rem',
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

        </div>
      </div>

      <style>{`
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
        }
      `}</style>


      {/* --- STORY SECTIONS (White Theme) --- */}

      <div id="philosophy" className="scroll-reveal reveal-left" style={{ position: 'relative', zIndex: 10, background: 'var(--bg-primary)', borderTop: '1px solid #333' }}>
        <Philosophy />
      </div>

      <div id="skills" className="scroll-reveal reveal-right" style={{ position: 'relative', zIndex: 10, background: 'var(--bg-secondary)' }}>
        <SkillArchitecture />
      </div>

      <div id="system" className="scroll-reveal reveal-left" style={{ position: 'relative', zIndex: 10, background: 'var(--bg-primary)' }}>
        <div className="container section">
          <h2 style={{ marginBottom: '2rem' }}>System Architecture</h2>
          <SystemBrain />
        </div>
      </div>

      <div id="projects" className="scroll-reveal reveal-right" style={{ position: 'relative', zIndex: 10, background: 'var(--bg-secondary)' }}>
        <Projects />
      </div>

      {/* --- LIVE AI FAB --- */}
      <button
        className="floating-ai-btn"
        onClick={() => setShowAi(!showAi)}
        title="Chat with AI"
      >
        {showAi ? (
          <TbX size={28} />
        ) : (
          <svg width="34" height="34" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="45" r="9" fill="white" />
            <circle cx="70" cy="45" r="9" fill="white" />
            <rect x="30" y="65" width="40" height="10" rx="5" fill="white" />
          </svg>
        )}
      </button>

      {/* --- LIVE AI MINITAB --- */}
      {showAi && (
        <div className="ai-minitab">
          <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-secondary)' }}>
            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Live AI Assistant</span>
            <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>Gemini 2.0 Flash</span>
          </div>
          <div style={{ height: '400px', overflow: 'hidden', position: 'relative' }}>
            {/* Scale down the demo to fit the mini tab */}
            <div style={{ transform: 'scale(0.7)', transformOrigin: 'top center', height: '100%' }}>
              <LiveAIDemo />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
