import { useEffect } from 'react';
import { TbArrowLeft } from 'react-icons/tb';
import { useUI } from '../../lib/state';
import geomapImage from '../project/geomap/LINE_20260324_213523.jpg';

export default function GeoMapProject() {
  const { setView } = useUI();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="section container" style={{ minHeight: '100vh', paddingTop: '6rem', background: '#000', color: '#fff' }}>
      <button
        onClick={() => setView('landing')}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.6rem',
          background: 'none', border: '1px solid rgba(255,255,255,0.2)',
          color: '#fff', cursor: 'pointer', fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase',
          letterSpacing: '0.1rem', marginBottom: '3rem', padding: '0.6rem 1.2rem',
          transition: 'all 0.3s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.borderColor = '#fff'}
        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'}
      >
        <TbArrowLeft size={16} /> EXIT_STORY
      </button>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1,
          marginBottom: '1.5rem', letterSpacing: '-0.04em', fontWeight: 900,
          textTransform: 'uppercase'
        }}>
          EDC ECOSYSTEM VISUALIZER
        </h1>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', opacity: 0.5 }} className="mono">
          <span>DATA VIZ ENGINEER</span><span>//</span><span>REAL-TIME ANALYSIS</span><span>//</span><span>THAI BANKING</span>
        </div>

        <div style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden', marginBottom: '4rem', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
          <img src={geomapImage} alt="Real-time bank EDC map dashboard" width="100%" style={{ filter: 'none' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '4rem', alignItems: 'start' }}>
          <div>
            <h2 className="mono" style={{ fontSize: '1.2rem', marginBottom: '2rem', borderLeft: '3px solid #fff', paddingLeft: '1.5rem' }}>LOGIC_FLOW</h2>
            <p style={{ marginBottom: '2rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, fontSize: '1.1rem' }}>
              The system receives terminal data from massive backend event streams, plotting thousands of points on an interactive high-performance map in real time.
              Operations teams can slice and dice the data by religion, machine status, or terminal ID instantly.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, fontSize: '1.1rem' }}>
              Engineered with FastAPI and Leaflet.js to handle high-frequency updates without UI stuttering, enabling split-second operational decisions during peak banking hours.
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '3rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 className="mono" style={{ fontSize: '0.8rem', marginBottom: '1.5rem', opacity: 0.5 }}>TECH_COMPONENTS</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }} className="mono">
              <li>{'>'} FASTAPI_BACKEND</li>
              <li>{'>'} POSTGRESQL_SPATIAL</li>
              <li>{'>'} LEAFLET_RENDERER</li>
              <li>{'>'} CHART.JS_ANALYTICS</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
