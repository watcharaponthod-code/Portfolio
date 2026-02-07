import { useState } from 'react';

export default function SystemBrain() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const nodes = [
    { id: 'frontend', x: 400, y: 100, label: 'CLIENT ENGINE', details: 'React 19, TypeScript, WebSocket subroutines, Framer Motion logic.' },
    { id: 'api', x: 400, y: 300, label: 'API GATEWAY', details: 'Distributed Rate Limiting, JWT Auth, dynamic request routing.' },
    { id: 'ai', x: 650, y: 300, label: 'AI CORE (GEMINI)', details: 'Multimodal streaming inference, Function calling, Vector retrieval.' },
    { id: 'db', x: 150, y: 300, label: 'DATA PERSISTENCE', details: 'PostgreSQL, Vector Embeddings (pgvector), Redis L2 Cache.' },
    { id: 'worker', x: 400, y: 500, label: 'ASYNC WORKERS', details: 'In-memory job queues, heavy data processing pipelines.' },
  ];

  const connections = [
    { from: 'frontend', to: 'api' },
    { from: 'api', to: 'ai' },
    { from: 'api', to: 'db' },
    { from: 'api', to: 'worker' },
  ];

  return (
    <div className="section container" style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="animate-enter">
        <header style={{ marginBottom: '4rem' }}>
          <div className="mono" style={{ color: 'var(--text-tertiary)', marginBottom: '1rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.8rem' }}>
            03 / System Architecture
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800 }}>
            Interactive System<br />
            Flow Map.
          </h1>
        </header>

        {/* Desktop Diagram */}
        <div className="desktop-diagram" style={{
          position: 'relative',
          height: '600px',
          border: '1px solid black',
          background: '#0a0a0a',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(#333 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            opacity: 0.3
          }} />

          <svg width="100%" height="100%" viewBox="0 0 800 600" style={{ overflow: 'visible', position: 'relative', zIndex: 1 }}>
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="25" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#666" />
              </marker>
            </defs>

            {connections.map((conn, i) => {
              const start = nodes.find(n => n.id === conn.from)!;
              const end = nodes.find(n => n.id === conn.to)!;
              return (
                <line
                  key={i}
                  x1={start.x} y1={start.y}
                  x2={end.x} y2={end.y}
                  stroke="#333"
                  strokeWidth="1"
                  markerEnd="url(#arrow)"
                  style={{ transition: 'stroke 0.3s ease' }}
                />
              );
            })}

            {nodes.map(node => (
              <g
                key={node.id}
                className="system-node"
                transform={`translate(${node.x},${node.y})`}
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
                style={{ cursor: 'pointer' }}
              >
                <rect
                  x="-85" y="-30" width="170" height="60"
                  fill={activeNode === node.id ? 'white' : 'black'}
                  stroke={activeNode === node.id ? 'white' : '#444'}
                  strokeWidth="1"
                  style={{ transition: 'all 0.3s ease' }}
                />
                <text
                  x="0" y="5"
                  textAnchor="middle"
                  className="mono"
                  fill={activeNode === node.id ? 'black' : 'white'}
                  style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', transition: 'fill 0.3s' }}
                >
                  {node.label}
                </text>
              </g>
            ))}
          </svg>

          {activeNode && (
            <div style={{
              position: 'absolute',
              bottom: '30px',
              left: '30px',
              width: '300px',
              background: 'white',
              padding: '2rem',
              border: '1px solid black',
              zIndex: 10,
              animation: 'slideUp 0.3s ease-out'
            }}>
              <div className="label" style={{ fontSize: '0.65rem', color: '#666', borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '1rem' }}>NODE_SPECIFICATIONS</div>
              <h4 className="mono" style={{ margin: '0 0 1rem 0', fontSize: '1rem' }}>{nodes.find(n => n.id === activeNode)?.label}</h4>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.5', color: '#444' }}>{nodes.find(n => n.id === activeNode)?.details}</p>
            </div>
          )}

          <div className="mono" style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '0.7rem', color: '#444' }}>
            STATUS: OPS_NORMAL // LATENCY: 14MS
          </div>
        </div>

        {/* Mobile View */}
        <div className="mobile-system-list" style={{ display: 'none', flexDirection: 'column', gap: '1rem' }}>
          {nodes.map(node => (
            <div
              key={node.id}
              onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
              style={{
                background: activeNode === node.id ? 'black' : 'white',
                color: activeNode === node.id ? 'white' : 'black',
                border: '1px solid black',
                padding: '1.5rem',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="mono" style={{ fontSize: '0.8rem', fontWeight: 700 }}>{node.label}</span>
                <span className="mono" style={{ opacity: 0.5 }}>{activeNode === node.id ? '-' : '+'}</span>
              </div>
              {activeNode === node.id && (
                <div style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: 0.8, lineHeight: '1.4' }}>
                  {node.details}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .desktop-diagram {
            display: none !important;
          }
          .mobile-system-list {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}

