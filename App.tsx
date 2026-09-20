import { LiveAPIProvider } from './contexts/LiveAPIContext';
import { LanguageProvider } from './lib/i18n';
import NavBar from './components/NavBar';
import Landing from './components/portfolio/Landing';
import { useState, useEffect, useMemo } from 'react';
import { TbX, TbMessageChatbot, TbVolume } from 'react-icons/tb';
import AssistantPanel from './components/portfolio/AssistantPanel';
import { useUI } from './lib/state';
import GeoMapProject from './components/portfolio/GeoMapProject';
import KafkaConnectorProject from './components/portfolio/KafkaConnectorProject';
import SystemMonitoringProject from './components/portfolio/SystemMonitoringProject';
import TradingProject from './components/portfolio/TradingProject';
import NinjaFruitProject from './components/portfolio/NinjaFruitProject';
import SubwayKidsProject from './components/portfolio/SubwayKidsProject';
import ElicProject from './components/portfolio/ElicProject';
import EmbeddingRagProject from './components/portfolio/EmbeddingRagProject';
import BitcoinMLProject from './components/portfolio/BitcoinMLProject';
import RAGEcosystemProject from './components/portfolio/RAGEcosystemProject';
import AgriAIProject from './components/portfolio/AgriAIProject';
import CropScanProject from './components/portfolio/CropScanProject';
import YieldProProject from './components/portfolio/YieldProProject';
import ShortsAutomationProject from './components/portfolio/ShortsAutomationProject';
import SugarcaneCVProject from './components/portfolio/SugarcaneCVProject';
import SugarcaneDetectorProject from './components/portfolio/SugarcaneDetectorProject';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const { currentView, setView } = useUI();
  const [showAi, setShowAi] = useState(false);
  const [isPresenting, setIsPresenting] = useState(true);
  const [showAiHint, setShowAiHint] = useState(false);

  useEffect(() => {
    const handlePresComplete = () => {
      setIsPresenting(false);
      setTimeout(() => setShowAiHint(true), 2000);
      setTimeout(() => setShowAiHint(false), 12000);
    };
    window.addEventListener('presentation-complete', handlePresComplete);
    return () => window.removeEventListener('presentation-complete', handlePresComplete);
  }, []);

  // Project Detail Mapper
  const projectOverlay = useMemo(() => {
    switch (currentView) {
      case 'project-rag-ecosystem': return <RAGEcosystemProject />;
      case 'project-embedding-rag': return <EmbeddingRagProject />;
      case 'project-bitcoin': return <BitcoinMLProject />;
      case 'project-geomap': return <GeoMapProject />;
      case 'project-kafka': return <KafkaConnectorProject />;
      case 'project-monitoring': return <SystemMonitoringProject />;
      case 'project-trading': return <TradingProject />;
      case 'project-ninja': return <NinjaFruitProject />;
      case 'project-subway': return <SubwayKidsProject />;
      case 'project-elic': return <ElicProject />;
      case 'project-agri-ai': return <AgriAIProject />;
      case 'project-cropscan': return <CropScanProject />;
      case 'project-yieldpro': return <YieldProProject />;
      case 'project-shorts': return <ShortsAutomationProject />;
      case 'project-sugarcane-cv': return <SugarcaneCVProject />;
      default:
        if (currentView.startsWith('project-scv-')) return <SugarcaneDetectorProject id={currentView.replace('project-', '')} />;
        return null;
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
    <div className="App" style={{ background: '#fff' }}>
      <LanguageProvider>
      <LiveAPIProvider>
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
                  <p>Chat with my AI about the projects, the numbers behind them, or my background. Switch to voice any time.</p>
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
                    <div className="mono title">ASK_WATCHARAPON_AI</div>
                    <div className="status-blink" />
                  </div>
                  <div className="ai-mini-body">
                    <AssistantPanel />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </LiveAPIProvider>
      </LanguageProvider>

      <style>{`
        .project-detail-overlay {
          position: fixed; inset: 0; z-index: 5000;
          background: #f2f2f0;
          overflow: hidden; display: flex; justify-content: center;
        }
        .project-detail-window {
          background: #f2f2f0;
          width: 100%; height: 100%;
          position: relative; display: flex; flex-direction: column;
        }
        .project-detail-inner-content { flex: 1; overflow-y: auto; }

        /* AI Mini-Menu Widget */
        .ai-widget-root {
          position: fixed; bottom: 2rem; right: 2rem; z-index: 9999;
          display: flex; flex-direction: column; align-items: flex-end; gap: 1rem;
        }
        .ai-hint-box {
          background: #101014; color: #fff; padding: 1.25rem 1.5rem; width: 300px;
          box-shadow: 0 16px 40px rgba(16,16,20,0.22); border-radius: 12px;
          cursor: pointer; position: relative;
        }
        .ai-hint-box .hint-header {
          display: flex; align-items: center; gap: 0.5rem; font-weight: 700;
          font-size: 0.65rem; letter-spacing: 0.12em; margin-bottom: 0.75rem;
          border-bottom: 1px solid rgba(255,255,255,0.12); padding-bottom: 0.6rem;
        }
        .ai-hint-box p { font-size: 0.85rem; line-height: 1.55; margin-bottom: 1rem; color: rgba(255,255,255,0.88); font-weight: 400; }
        .ai-hint-box .hint-action { font-size: 0.66rem; font-weight: 700; letter-spacing: 0.1em; text-decoration: underline; text-underline-offset: 3px; text-align: right; }

        .floating-ai-toggle {
          width: 60px; height: 60px; background: #fff; color: #101014;
          border: 1px solid #101014; border-radius: 50%; display: flex;
          align-items: center; justify-content: center; cursor: pointer;
          box-shadow: 0 10px 28px rgba(16,16,20,0.18);
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), background 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
        }
        .floating-ai-toggle:hover { transform: scale(1.06); background: #101014; color: #fff; box-shadow: 0 14px 36px rgba(16,16,20,0.26); }
        .floating-ai-toggle.active { background: #101014; color: #fff; }

        .ai-mini-window {
          position: absolute; bottom: 80px; right: 0;
          width: 440px; height: min(680px, calc(100vh - 8rem)); background: #fff;
          border: 1px solid rgba(16,16,20,0.16); border-radius: 16px;
          box-shadow: 0 24px 64px rgba(16,16,20,0.18), 0 4px 12px rgba(16,16,20,0.08);
          display: flex; flex-direction: column; overflow: hidden;
        }
        .ai-mini-header {
          padding: 0.85rem 1.25rem; background: #101014; color: #fff;
          display: flex; justify-content: space-between; align-items: center; gap: 1rem;
          flex: 0 0 auto;
        }
        .ai-mini-header .title { font-weight: 700; font-size: 0.66rem; letter-spacing: 0.2em; }
        .status-blink { width: 7px; height: 7px; background: #fff; border-radius: 50%; animation: blink 1.4s ease-in-out infinite; flex: 0 0 auto; }
        .ai-mini-body { flex: 1 1 auto; position: relative; min-height: 0; }
        
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

        @media (max-width: 900px) {
          .project-detail-overlay { padding: 0 !important; }
          .project-detail-window { border: none; }
        }

        @media (max-width: 600px) {
          .ai-widget-root { bottom: 0.75rem; right: 0.5rem; }
          .ai-mini-window {
            width: calc(100vw - 1rem);
            height: clamp(480px, 78vh, 700px);
            max-height: calc(100vh - 5.5rem);
            right: 0;
            bottom: 72px;
            border-radius: 14px;
          }
          .ai-hint-box { width: calc(100vw - 1rem); }
          .floating-ai-toggle { width: 54px; height: 54px; }
        }
      `}</style>
    </div>
  );
}

export default App;
