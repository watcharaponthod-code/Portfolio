import { LiveAPIProvider } from './contexts/LiveAPIContext';
import NavBar from './components/NavBar';
import Landing from './components/portfolio/Landing';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { TbX, TbMessageChatbot, TbVolume } from 'react-icons/tb';
import LiveAIDemo from './components/portfolio/LiveAIDemo';
import { useUI } from './lib/state';
import SycaptAIProject from './components/portfolio/SycaptAIProject';
import GeoMapProject from './components/portfolio/GeoMapProject';
import KafkaConnectorProject from './components/portfolio/KafkaConnectorProject';
import SystemMonitoringProject from './components/portfolio/SystemMonitoringProject';
import { AnimatePresence, motion } from 'framer-motion';

const API_KEY = process.env.GEMINI_API_KEY as string;
if (typeof API_KEY !== 'string') {
  throw new Error('Missing required environment variable: REACT_APP_GEMINI_API_KEY');
}

function App() {
  const { currentView, setView } = useUI();
  const [showAi, setShowAi] = useState(false);
  const [isPresenting, setIsPresenting] = useState(true);
  const [showAiHint, setShowAiHint] = useState(false);

  useEffect(() => {
    const handlePresComplete = () => {
      setIsPresenting(false);
      // Give a small delay before showing hint
      setTimeout(() => setShowAiHint(true), 2000);
      // Hide hint after 10 seconds
      setTimeout(() => setShowAiHint(false), 12000);
    };
    window.addEventListener('presentation-complete', handlePresComplete);
    return () => window.removeEventListener('presentation-complete', handlePresComplete);
  }, []);

  // Project Detail Mapper
  const projectOverlay = useMemo(() => {
    switch (currentView) {
      case 'project-sycapt': return <SycaptAIProject />;
      case 'project-geomap': return <GeoMapProject />;
      case 'project-kafka': return <KafkaConnectorProject />;
      case 'project-monitoring': return <SystemMonitoringProject />;
      default: return null;
    }
  }, [currentView]);

  useEffect(() => {
    if (projectOverlay) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [projectOverlay]);

  return (
    <div className="App" style={{ background: '#000' }}>
      <LiveAPIProvider apiKey={API_KEY}>
        <NavBar />
        <main>
          <Landing onPresentationComplete={() => {
            setIsPresenting(false);
            const ev = new CustomEvent('presentation-complete');
            window.dispatchEvent(ev);
          }} />
        </main>

        {/* Project Detail Overlay (Full Screen) */}
        {projectOverlay && (
          <div className="project-detail-overlay">
            <div className="project-detail-window">
              <div className="project-detail-header-float">
                <button 
                  onClick={() => setView('landing')}
                  className="project-close-btn"
                >
                  <TbX size={20} /> CLOSE
                </button>
              </div>
              <div className="project-detail-inner-content">
                {projectOverlay}
              </div>
            </div>
          </div>
        )}

        {/* AI Interface & Hint Container (Bottom Right Mini-Menu Style) */}
        {!isPresenting && (
          <div className="ai-widget-root">
            <AnimatePresence>
              {/* Hint Box */}
              {showAiHint && !showAi && (
                <motion.div 
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="ai-hint-box mono"
                  onClick={() => { setShowAi(true); setShowAiHint(false); }}
                >
                  <div className="hint-header">
                    <TbVolume size={18} /> <span>SYSTEM_BROADCAST</span>
                  </div>
                  <p>Try my AI Voice Assistant! Ask about my skills or projects.</p>
                  <div className="hint-action">CLICK TO INITIALIZE</div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              className={`floating-ai-toggle ${showAi ? 'active' : ''}`}
              onClick={() => { setShowAi(!showAi); setShowAiHint(false); }}
              aria-label="Toggle AI Assistant"
            >
              {showAi ? <TbX size={28} /> : <TbMessageChatbot size={28} />}
            </button>

            <AnimatePresence>
              {showAi && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 40, transformOrigin: 'bottom right' }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 40 }}
                  className="ai-mini-window"
                >
                  <div className="ai-mini-header">
                    <div className="mono title">CORE_AI_INTERFACE</div>
                    <div className="status-blink" />
                  </div>
                  <div className="ai-mini-body">
                    <LiveAIDemo />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </LiveAPIProvider>

      <style>{`
        .project-detail-overlay {
          position: fixed; inset: 0; z-index: 5000;
          background: rgba(0,0,0,0.95); backdrop-filter: blur(20px);
          overflow: hidden; display: flex; justify-content: center; padding: 2rem;
        }
        .project-detail-window {
          background: #000; border: 1px solid rgba(255,255,255,0.1);
          width: 100%; max-width: 1400px; height: 100%;
          position: relative; display: flex; flexDirection: column;
        }
        .project-detail-header-float { position: absolute; top: 1.5rem; right: 2rem; z-index: 10; }
        .project-close-btn {
          background: #fff; color: #000; border: none; padding: 0.8rem 1.5rem;
          font-family: var(--font-mono); font-weight: 800; font-size: 0.75rem;
          cursor: pointer; display: flex; align-items: center; gap: 0.5rem;
          letter-spacing: 0.1em; transition: all 0.3s;
        }
        .project-detail-inner-content { flex: 1; overflow-y: auto; }

        /* AI Mini-Menu Widget */
        .ai-widget-root {
          position: fixed; bottom: 2rem; right: 2rem; z-index: 9999;
          display: flex; flex-direction: column; align-items: flex-end; gap: 1rem;
        }
        .ai-hint-box {
          background: #fff; color: #000; padding: 1.5rem; width: 300px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.4); border-radius: 4px;
          cursor: pointer; position: relative;
        }
        .ai-hint-box .hint-header {
          display: flex; align-items: center; gap: 0.5rem; font-weight: 950;
          font-size: 0.65rem; margin-bottom: 0.8rem; border-bottom: 1px solid rgba(0,0,0,0.1);
          padding-bottom: 0.5rem;
        }
        .ai-hint-box p { font-size: 0.85rem; line-height: 1.5; margin-bottom: 1rem; color: #000; font-weight: 500; }
        .ai-hint-box .hint-action { font-size: 0.7rem; font-weight: 950; text-decoration: underline; text-align: right; }

        .floating-ai-toggle {
          width: 64px; height: 64px; background: #000; color: #fff;
          border: 1px solid #fff; border-radius: 50%; display: flex;
          align-items: center; justify-content: center; cursor: pointer;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3); transition: all 0.4s;
        }
        .floating-ai-toggle:hover { transform: scale(1.1); background: #fff; color: #000; }
        .floating-ai-toggle.active { background: #fff; color: #000; }

        .ai-mini-window {
          position: absolute; bottom: 85px; right: 0;
          width: 450px; height: 650px; background: #000;
          border: 1px solid #fff; box-shadow: 0 40px 100px rgba(0,0,0,0.8);
          display: flex; flex-direction: column; overflow: hidden;
        }
        .ai-mini-header {
          padding: 1rem 1.5rem; background: #fff; color: #000;
          display: flex; justify-content: space-between; align-items: center;
        }
        .ai-mini-header .title { font-weight: 950; font-size: 0.7rem; letter-spacing: 0.2rem; }
        .status-blink { width: 8px; height: 8px; background: #000; border-radius: 50%; animation: blink 1s infinite; }
        .ai-mini-body { flex: 1; position: relative; }
        
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

        @media (max-width: 600px) {
          .ai-mini-window { width: calc(100vw - 2rem); height: 80vh; right: -1rem; }
          .ai-widget-root { bottom: 1rem; right: 1rem; }
        }
      `}</style>
    </div>
  );
}

export default App;
