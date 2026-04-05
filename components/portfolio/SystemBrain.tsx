import { useState, useMemo } from 'react';
import { TbBrandReact, TbCloudComputing, TbDatabase, TbSettingsAutomation, TbCpu } from 'react-icons/tb';
import GlitchText from '../visuals/GlitchText';
import SectionHeader from './SectionHeader';

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
      details: 'Next.js + React frontend for AI Enterprise. Document upload interface (PDF/DOCX/PPTX), chat UI with streaming responses, and EDC Geo Map dashboard with Leaflet.js real-time visualization.',
      tech: ['Next.js', 'React', 'TypeScript', 'Leaflet.js', 'Chart.js']
    },
    {
      id: 'api', x: 400, y: 280,
      label: 'GATEWAY_ORCHESTRATOR',
      icon: <TbCloudComputing size={24} />,
      details: 'NestJS API Gateway handling all request routing, JWT auth, file processing pipelines, and Kafka event publishing. Deployed on Kubernetes with automated CI/CD pipelines.',
      tech: ['NestJS', 'FastAPI', 'JWT Auth', 'Kubernetes', 'CI/CD']
    },
    {
      id: 'ai', x: 700, y: 280,
      label: 'NEURAL_CORE',
      icon: <TbCpu size={24} />,
      details: 'Agentic RAG Pipeline using LangGraph state machine + LlamaIndex. bge-m3 for embeddings, Hybrid Search (vector + BM25 full-text) with Re-ranking. GPU VRAM constraint solved by Model Swapping (4 LLMs / 16GB).',
      tech: ['LangGraph', 'LlamaIndex', 'LangChain', 'bge-m3', 'Gemini API']
    },
    {
      id: 'db', x: 100, y: 280,
      label: 'KNOWLEDGE_VAULT',
      icon: <TbDatabase size={24} />,
      details: 'PostgreSQL + pgvector for hybrid vector & relational storage. MongoDB for document metadata. Redis for session caching. Qdrant for high-throughput vector similarity search.',
      tech: ['PostgreSQL', 'pgvector', 'MongoDB', 'Redis', 'Qdrant']
    },
    {
      id: 'worker', x: 400, y: 490,
      label: 'ASYNC_SUBSYSTEMS',
      icon: <TbSettingsAutomation size={24} />,
      details: 'Apache Kafka event-driven microservices (VHQ SOM Connector — 3-phase pipeline). ELK Stack for centralized logging. Prometheus + Grafana for system observability and alerting.',
      tech: ['Apache Kafka', 'Java 21', 'Spring Boot', 'ELK Stack', 'Docker']
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
      <SectionHeader
        subtitle="02 / WORK EXPERIENCE"
        titleLines={["Co-op Full-Stack &", "AI Engineer."]}
        description="Sycapt Co., Ltd. (Dec 2024 - Mar 2025)"
      />

      {/* HR-Friendly Experience Description */}
      <div className="experience-details" style={{ marginBottom: '3rem', padding: '2rem', border: '1px solid var(--border-light)', background: 'white' }}>
        <h3 className="mono" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Key Achievements & Responsibilities</h3>
        <ul style={{ listStyleType: 'square', paddingLeft: '1.5rem', lineHeight: '1.8', color: '#444' }}>
          <li>Designed and implemented an <strong>On-Premises Agentic RAG Pipeline</strong> using LangGraph and LlamaIndex for enterprise knowledge management.</li>
          <li>Engineered a <strong>Model Swapping system</strong> to run 4 large language models sequentially on a server with only 16GB VRAM, avoiding hardware upgrades.</li>
          <li>Developed a robust <strong>NestJS API Gateway</strong> handling JWT auth, file processing pipelines, and Kafka event publishing, deployed on Kubernetes.</li>
          <li>Built interactive Next.js dashboards and tools, including a real-time EDC device mapping system supporting over 15,000 devices natively.</li>
        </ul>
      </div>

      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 className="mono" style={{ fontSize: '0.85rem', color: 'rgba(0,0,0,0.5)', letterSpacing: '0.1em' }}>OPTIONAL: VIEW TECHNICAL ARCHITECTURE</h3>
      </div>

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
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.8
        }} />

        <svg width="100%" height="100%" viewBox="0 0 800 600" style={{ overflow: 'visible', position: 'relative', zIndex: 1, padding: '40px' }}>
          {/* Connection Lines with Animated Flow */}
          {connections.map((conn, i) => {
            const start = nodes.find(n => n.id === conn.from)!;
            const end = nodes.find(n => n.id === conn.to)!;
            const isActive = activeNode === start.id || activeNode === end.id;

            return (
              <g key={i}>
                <line
                  x1={start.x} y1={start.y} x2={end.x} y2={end.y}
                  stroke={isActive ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)'}
                  strokeWidth={isActive ? '2' : '1'}
                  strokeDasharray={isActive ? "none" : "4 4"}
                  style={{ transition: 'all 0.4s ease' }}
                />
                <circle r="3" fill="rgba(255,255,255,0.6)" style={{
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

