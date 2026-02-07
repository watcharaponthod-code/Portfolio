
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
import LiveAIDemo from './components/portfolio/LiveAIDemo';
import AIPlayground from './components/portfolio/AIPlayground';

const API_KEY = process.env.GEMINI_API_KEY as string;
if (typeof API_KEY !== 'string') {
  throw new Error('Missing required environment variable: REACT_APP_GEMINI_API_KEY');
}

function App() {
  const { currentView } = useUI();

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
        </main>

      </LiveAPIProvider>
    </div>
  );
}

export default App;
