import React, { useEffect } from 'react';
import { useUI } from '../../lib/state';
import { TbArrowLeft } from 'react-icons/tb';

// Imported Images
import pic1 from '../project/ai_RAG/Picture1.png';
import pic2 from '../project/ai_RAG/Picture2.png';
import pic3 from '../project/ai_RAG/Picture3.png';
import pic4 from '../project/ai_RAG/Picture4.png';
import pic5 from '../project/ai_RAG/Picture5.png';
import pic8 from '../project/ai_RAG/Picture8.png';

export default function SycaptAIProject() {
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
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
          lineHeight: '0.9',
          marginBottom: '1.5rem',
          letterSpacing: '-0.05em',
          fontWeight: 950,
          textTransform: 'uppercase',
        }}>
          AI Enterprise
        </h1>
        
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '4rem', opacity: 0.5 }} className="mono">
          <span>AI SYSTEMS ENGINEER</span><span>//</span><span>AGENTIC RAG</span><span>//</span><span>SECURE ON-PREM</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: 'clamp(1.5rem, 3vw, 2.5rem)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 className="mono" style={{ fontSize: '0.8rem', opacity: 0.4, marginBottom: '1.5rem' }}>MISSION_PROFILE</h3>
            <p style={{ lineHeight: 1.6, color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>
              Developed a 100% On-Premises corporate intelligence system for high-security enterprise environments. Orchestrated deep document ingestion with sub-second vector search.
            </p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: 'clamp(1.5rem, 3vw, 2.5rem)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 className="mono" style={{ fontSize: '0.8rem', opacity: 0.4, marginBottom: '1.5rem' }}>CORE_ARCHITECTURE</h3>
            <p style={{ lineHeight: 1.6, color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>
              Agentic RAG pipeline featuring complex LangGraph logic, pgvector storage, and hybrid retrieval strategies for maximum recall.
            </p>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: 'clamp(1.5rem, 3vw, 2.5rem)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 className="mono" style={{ fontSize: '0.8rem', opacity: 0.4, marginBottom: '1.5rem' }}>IMPACT_DELIVERY</h3>
            <p style={{ lineHeight: 1.6, color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>
              Enabled secure internal querying for 10,000+ sensitive corporate documents without ever leaving the organization's firewall.
            </p>
          </div>
        </div>

        {/* High-End Image Showcase */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2.5rem, 6vw, 5rem)', paddingBottom: '5rem' }}>
          {[
            { img: pic1, label: 'KNOWLEDGE UNIFICATION' },
            { img: pic2, label: 'SYSTEM DASHBOARD' },
            { img: pic3, label: 'AGENTIC PIPELINES' },
            { img: pic4, label: 'DATA SEMANTICS' },
            { img: pic5, label: 'VRAM OPTIMIZATION' },
            { img: pic8, label: 'PRODUCTION INTERFACE' }
          ].map((item, i) => (
            <div key={i} className="img-container-premium" style={{ position: 'relative' }}>
              <div className="mono visual-label-project" style={{ position: 'absolute', top: '-1rem', left: '1rem', fontSize: '0.6rem', color: '#fff', opacity: 0.3, letterSpacing: '0.4em' }}>
                {item.label} // v4.0
              </div>
              <img 
                src={item.img} 
                alt={item.label} 
                width="100%" 
                style={{ 
                  borderRadius: '0px', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  filter: 'none', 
                }} 
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .img-container-premium {
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .img-container-premium:hover {
          transform: scale(1.01);
          filter: brightness(1.1);
        }
        @media (max-width: 640px) {
           .visual-label-project {
             display: none;
           }
        }
      `}</style>
    </div>
  );
}