import { useState, useMemo } from 'react';
import { TbBrandReact, TbCloudComputing, TbDatabase, TbSettingsAutomation, TbCpu } from 'react-icons/tb';
import GlitchText from '../visuals/GlitchText';

interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
  icon: any;
  details: string;
  tech: string[];
}

export default function SystemBrain() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const nodes: Node[] = [
    {
      id: 'frontend', x: 400, y: 70,
      label: 'CLIENT_ENGINE',
      icon: <TbBrandReact size={24} />,
      details: 'High-performance React 19 interface with sub-16ms frame budgeting. Optimized for V8 to ensure seamless transitions.',
      tech: ['React 19', 'Framer Motion', 'TypeScript']
    },
    {
      id: 'api', x: 400, y: 280,
      label: 'GATEWAY_ORCHESTRATOR',
      icon: <TbCloudComputing size={24} />,
      details: 'Intelligent request routing with distributed rate limiting and JWT validation for secure multi-tenant access.',
      tech: ['Next.js', 'Redis Cache', 'JWT Auth']
    },
    {
      id: 'ai', x: 700, y: 280,
      label: 'NEURAL_CORE',
      icon: <TbCpu size={24} />,
      details: 'Real-time Multimodal LLM integration using Gemini 1.5 Flash. Handles voice, text, and visual data streams.',
      tech: ['Gemini API', 'LangChain', 'Realtime Protocol']
    },
    {
      id: 'db', x: 100, y: 280,
      label: 'KNOWLEDGE_VAULT',
      icon: <TbDatabase size={24} />,
      details: 'Hybrid search architecture combining relational integrity with vector similarity for RAG-enhanced context.',
      tech: ['PostgreSQL', 'pgvector', 'RAG logic']
    },
    {
      id: 'worker', x: 400, y: 490,
      label: 'ASYNC_SUBSYSTEMS',
      icon: <TbSettingsAutomation size={24} />,
      details: 'Distributed background workers managing long-running computational tasks and state synchronization.',
      tech: ['Node.js', 'In-memory Queue', 'Docker']
    },
  ];

  const connections = [
    { from: 'frontend', to: 'api' },
    { from: 'api', to: 'ai' },
    { from: 'api', to: 'db' },
    { from: 'api', to: 'worker' },
  ];

  return (
    <div className="section container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <header style={{ marginBottom: '4rem' }}>
        <div className="mono" style={{ color: 'var(--text-tertiary)', marginBottom: '1rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.8rem' }}>
          03 / System Architecture
        </div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5.5vw, 6rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.04em' }}>
          <GlitchText text="Interactive" /><br />
          <GlitchText text="System Map." />
        </h1>
      </header>

      {/* Desktop Diagram Container */}
      <div className="desktop-diagram" style={{
        position: 'relative',
        height: '650px',
        border: '1px solid black',
        background: '#050505',
        overflow: 'hidden',
        boxShadow: '0 40px 100px rgba(0,0,0,0.1)'
      }}>
        {/* Animated Grid Background */}
        <div className="grid-overlay" style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.5
        }} />

        {/* Scan line effect */}
        <div className="scanline" style={{
          position: 'absolute',
          width: '100%',
          height: '2px',
          background: 'rgba(255,255,255,0.05)',
          top: 0,
          left: 0,
          zIndex: 0,
          animation: 'scan 8s linear infinite'
        }} />

        <svg width="100%" height="100%" viewBox="0 0 800 600" style={{ overflow: 'visible', position: 'relative', zIndex: 1, padding: '40px' }}>
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Pulsing Gradient for Paths */}
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.8)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
            </linearGradient>
          </defs>

          {/* Connection Lines with Animated Flow */}
          {connections.map((conn, i) => {
            const start = nodes.find(n => n.id === conn.from)!;
            const end = nodes.find(n => n.id === conn.to)!;
            const isActive = activeNode === start.id || activeNode === end.id;

            return (
              <g key={i}>
                <line
                  x1={start.x} y1={start.y} x2={end.x} y2={end.y}
                  stroke={isActive ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.15)'}
                  strokeWidth={isActive ? '2' : '1'}
                  style={{ transition: 'all 0.4s ease' }}
                />
                <circle r="3" fill="white" style={{
                  filter: 'url(#glow)',
                  animation: `flowMove ${2 + i}s linear infinite`
                }}>
                  <animateMotion
                    path={`M ${start.x},${start.y} L ${end.x},${end.y}`}
                    dur={`${1.5 + i * 0.5}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}

          {/* Node Components */}
          {nodes.map(node => (
            <g
              key={node.id}
              className="system-node-group"
              transform={`translate(${node.x},${node.y})`}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Node Outer Ring */}
              <circle
                r="45"
                fill="black"
                stroke={activeNode === node.id ? 'white' : 'rgba(255,255,255,0.1)'}
                strokeWidth="1"
                style={{ transition: 'all 0.3s' }}
              />

              {/* Inner Circle (Icon Container) */}
              <circle
                r="30"
                fill={activeNode === node.id ? 'white' : 'rgba(255,255,255,0.05)'}
                style={{ transition: 'all 0.3s' }}
              />

              {/* Icon */}
              <foreignObject x="-12" y="-12" width="24" height="24">
                <div style={{
                  color: activeNode === node.id ? 'black' : 'white',
                  transition: 'color 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {node.icon}
                </div>
              </foreignObject>

              {/* Label */}
              <text
                y="65"
                textAnchor="middle"
                className="mono"
                fill={activeNode === node.id ? 'white' : 'rgba(255,255,255,0.5)'}
                style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', transition: 'fill 0.3s' }}
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>

        {/* Terminal Info Overlay */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          right: '40px',
          width: '320px',
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '1.5rem',
          zIndex: 10,
          transition: 'opacity 0.3s, transform 0.3s',
          opacity: activeNode ? 1 : 0,
          transform: activeNode ? 'translateY(0)' : 'translateY(20px)'
        }}>
          <div className="mono" style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
            NODE_METADATA // READ_ONLY
          </div>
          <h4 className="mono" style={{ margin: '0 0 0.75rem 0', fontSize: '1rem', color: 'white' }}>
            {nodes.find(n => n.id === activeNode)?.label}
          </h4>
          <p style={{ fontSize: '0.85rem', lineHeight: '1.5', color: 'rgba(255,255,255,0.7)', margin: '0 0 1.25rem 0' }}>
            {nodes.find(n => n.id === activeNode)?.details}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {nodes.find(n => n.id === activeNode)?.tech.map(t => (
              <span key={t} className="mono" style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.1)', color: 'white', padding: '0.2rem 0.5rem' }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mono" style={{ position: 'absolute', top: '30px', right: '30px', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }}>
          KERNEL: OPS_SECURE // ARCH: ARM_64
        </div>
      </div>

      {/* Mobile Experience (List Style) */}
      <div className="mobile-system-list" style={{ display: 'none', flexDirection: 'column', gap: '1px', background: 'rgba(0,0,0,0.1)' }}>
        {nodes.map((node, i) => (
          <div
            key={node.id}
            onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
            style={{
              background: 'white',
              padding: '2rem',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.7rem', opacity: 0.3 }} className="mono">0{i + 1}</span>
                <span className="mono" style={{ fontSize: '0.9rem', fontWeight: 800 }}>{node.label}</span>
              </div>
              <span className="mono" style={{ fontSize: '1.2rem' }}>{activeNode === node.id ? '−' : '+'}</span>
            </div>
            {activeNode === node.id && (
              <div style={{ marginTop: '1.5rem', animation: 'fadeInUp 0.4s ease' }}>
                <p style={{ fontSize: '0.95rem', opacity: 0.7, marginBottom: '1rem' }}>{node.details}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {node.tech.map(t => (
                    <span key={t} className="mono" style={{ fontSize: '0.7rem', background: '#f0f0f0', padding: '0.25rem 0.5rem' }}>{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scan {
          from { top: 0%; }
          to { top: 100%; }
        }
        @keyframes flowMove {
          0% { filter: blur(2px) brightness(1); }
          50% { filter: blur(4px) brightness(2.5); }
          100% { filter: blur(2px) brightness(1); }
        }
        @media (max-width: 900px) {
          .desktop-diagram { display: none !important; }
          .mobile-system-list { display: flex !important; }
        }
      `}</style>
    </div>
  );
}

