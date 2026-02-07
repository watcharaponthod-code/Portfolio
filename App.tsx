
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { LiveAPIProvider } from './contexts/LiveAPIContext';
import { useUI } from './lib/state';
import NavBar from './components/NavBar';
import ErrorScreen from './components/demo/ErrorSreen';

// Views
import Landing from './components/portfolio/Landing';
import SystemBrain from './components/portfolio/SystemBrain';
import SkillArchitecture from './components/portfolio/SkillArchitecture';
import Projects from './components/portfolio/Projects';
import Philosophy from './components/portfolio/Philosophy';
import { TbX } from 'react-icons/tb';
import { useState, useEffect } from 'react';
import LiveAIDemo from './components/portfolio/LiveAIDemo';
import AIPlayground from './components/portfolio/AIPlayground';
import MatrixRain from './components/visuals/MatrixRain';
import GlitchText from './components/visuals/GlitchText';

const API_KEY = process.env.GEMINI_API_KEY as string;
if (typeof API_KEY !== 'string') {
  throw new Error('Missing required environment variable: REACT_APP_GEMINI_API_KEY');
}

function App() {
  const { currentView } = useUI();
  const [showAi, setShowAi] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      // If within 100px of the bottom
      if (scrollTop + clientHeight >= scrollHeight - 300) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('toggle-ai-assistant', () => setShowAi(true));
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('toggle-ai-assistant', () => setShowAi(true));
    };
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'landing': return <Landing />;
      case 'system': return <SystemBrain />;
      case 'skills': return <SkillArchitecture />;
      case 'projects': return <Projects />;
      case 'philosophy': return <Philosophy />;
      case 'live-ai': return <LiveAIDemo />;
      case 'playground': return <AIPlayground />;
      default: return <Landing />;
    }
  };

  return (
    <div className="App">
      <LiveAPIProvider apiKey={API_KEY}>
        <div className="grid-bg" />
        <ErrorScreen />
        <NavBar />

        <main className={currentView !== 'landing' ? 'page-wrapper' : ''}>
          {renderView()}

          {/* Global Bottom CTA */}
          <footer style={{
            padding: '10rem 0',
            background: 'black',
            color: 'white',
            borderTop: '1px solid #333',
            textAlign: 'center',
            position: 'relative',
            zIndex: 10,
            overflow: 'hidden'
          }}>
            <MatrixRain opacity={0.8} isDark={true} />
            <div
              style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                background: 'radial-gradient(circle at center, transparent 0%, black 90%)',
                zIndex: 1,
              }}
            />

            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
              <div className="mono" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                End of Page
              </div>
              <h1 style={{ marginBottom: '1rem', fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'white' }}>
                <GlitchText text="Talk with My AI" />
              </h1>
              <p style={{ margin: '0 auto 3rem', maxWidth: '600px', color: 'rgba(255,255,255,0.7)' }}>
                Have specific questions about my experience or technical choices?
                My AI twin is trained on my entire career history and project data.
              </p>

              <button
                onClick={() => setShowAi(true)}
                className="btn-glass-primary"
                style={{
                  padding: '1.5rem 4rem',
                  fontSize: '1.2rem',
                  borderRadius: '0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  cursor: 'pointer'
                }}
              >
                Start Live Conversation
              </button>
            </div>
          </footer>
        </main>

        {/* Global Floating AI Button - Only shows when NOT at bottom and AI is hidden */}
        {!showAi && !isAtBottom && (
          <button
            className="floating-ai-btn"
            onClick={() => setShowAi(true)}
            style={{
              opacity: 1,
              visibility: 'visible',
              transition: 'all 0.3s ease'
            }}
          >
            <svg width="34" height="34" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="30" cy="45" r="9" fill="white" />
              <circle cx="70" cy="45" r="9" fill="white" />
              <rect x="30" y="65" width="40" height="10" rx="5" fill="white" />
            </svg>
          </button>
        )}

        {/* Global AI Overlay */}
        {showAi && (
          <div className="ai-overlay-container" style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div className="ai-overlay-content" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '1.5rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)' }}>
                <div className="mono" style={{ fontWeight: 800 }}>LIVE_AI_AGENT // V2.0</div>
                <button onClick={() => setShowAi(false)} style={{ fontSize: '2rem' }}><TbX size={32} /></button>
              </div>
              <div style={{ flex: 1 }}>
                <LiveAIDemo />
              </div>
            </div>
          </div>
        )}

      </LiveAPIProvider>
    </div>
  );
}

export default App;
