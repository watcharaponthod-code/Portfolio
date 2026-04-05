import { useEffect } from 'react';
import { TbArrowLeft } from 'react-icons/tb';
import { useUI } from '../../lib/state';
import cpuGraph from '../project/cpu/download.png';
import cpuDashboard from '../project/cpu/messageImage_1770777506167.jpg';

export default function SystemMonitoringProject() {
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
          marginBottom: '1.5rem', letterSpacing: '-0.04em', fontWeight: 950,
          textTransform: 'uppercase'
        }}>
          VM Infrastructure Auto-Scaling & Monitoring
        </h1>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '4rem', opacity: 0.5 }} className="mono">
          <span>INFRASTRUCTURE ENGINEER</span><span>//</span><span>AUTO-SCALING RULES</span><span>//</span><span>VM_MANAGEMENT</span>
        </div>

        {/* Hero Imagery */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '5rem' }}>
          <div style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0px', overflow: 'hidden', background: '#fff' }}>
            <img src={cpuGraph} alt="CPU Usage Spike Analysis" width="100%" />
          </div>
          <div style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0px', overflow: 'hidden', background: '#000' }}>
            <img src={cpuDashboard} alt="Production Monitoring Dashboard" width="100%" />
          </div>
        </div>

        <div className="project-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 'clamp(2rem, 5vw, 6rem)', alignItems: 'start', paddingBottom: '6rem' }}>
          <div>
            <h2 className="mono" style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', marginBottom: '1.5rem', borderLeft: '3px solid #fff', paddingLeft: '1.5rem' }}>SCALING_STRATEGY</h2>
            <p style={{ marginBottom: '1.5rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)' }}>
              I implemented a comprehensive monitoring solution focused on VM scalability. By analyzing CPU usage patterns and identifying significant spike events (exceeding the 90% threshold), I developed automated rules to scale VM instances horizontally and vertically.
            </p>
            <p style={{ marginBottom: '1.5rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)' }}>
              This system doesn't just alert; it reacts. When the "Main CPU Usage" hits critical levels across the cluster, the system triggers provision cycles for additional nodes, ensuring 99.99% uptime during peak load periods and optimizing costs by scaling down during idle times.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)' }}>
               I am capable of designing, deploying, and maintaining high-availability cloud infrastructure, managing resource pools, and fine-tuning auto-scaling triggers to match specific business workload patterns.
            </p>
          </div>

          <div className="tech-capabilities-box" style={{ background: 'rgba(255,255,255,0.03)', padding: 'clamp(1.5rem, 4vw, 3.5rem)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 className="mono" style={{ fontSize: '0.75rem', marginBottom: '1.5rem', opacity: 0.5 }}>TECH_CAPABILITIES</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }} className="mono">
              <li>{'>'} CLOUD_INFRA_MGMT</li>
              <li>{'>'} VM_AUTO_SCALING_RULES</li>
              <li>{'>'} SPIKE_ANOMALY_TRIGGER</li>
              <li>{'>'} COST_RESOURCE_OPTIMIZER</li>
              <li>{'>'} 24/7_STABILITY_CTRL</li>
            </ul>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .project-detail-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
        @media (max-width: 640px) {
          .tech-capabilities-box {
            padding: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
