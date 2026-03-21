import { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { TbMessageCircle, TbTerminal, TbCpu, TbSend, TbToggleRight, TbToggleLeft, TbBolt } from 'react-icons/tb';
import { getRelevantContext } from '@/lib/knowledge';
import GlitchText from '../visuals/GlitchText';

export default function AIPlayground() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [useRAG, setUseRAG] = useState(true);
  const [latency, setLatency] = useState<number | null>(null);
  const [traceStep, setTraceStep] = useState<number>(0);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const generate = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setOutput('');
    setLatency(null);
    setTraceStep(1);

    const startTime = Date.now();

    try {
      const apiKey = process.env.GEMINI_API_KEY || '';
      const ai = new GoogleGenAI({ apiKey });

      setTimeout(() => setTraceStep(2), 200);
      setTimeout(() => setTraceStep(3), 600);

      const systemPrompt = "You are a technical assistant helping recruiters learn about Watcharapon (Oat) Thodraksa. Be concise, direct, and factual. Answer based ONLY on the provided context.";
      const context = useRAG ? getRelevantContext(input) : "";
      const finalPrompt = useRAG
        ? `Context:\n${context}\n\nQuestion: ${input}`
        : input;

      const response = await ai.models.generateContentStream({
        model: 'gemini-2.0-flash',
        contents: [{ role: 'user', parts: [{ text: finalPrompt }] }],
        config: { systemInstruction: systemPrompt }
      });

      let fullText = '';
      for await (const chunk of response) {
        if (chunk.text) {
          fullText += chunk.text;
          setOutput(prev => prev + chunk.text);
          if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }

      const endTime = Date.now();
      setLatency(endTime - startTime);
      setTraceStep(4);

    } catch (error) {
      console.error(error);
      setOutput('Error: Could not generate response. Check API configuration.');
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "What AI projects did Oat build?",
    "Tell me about the GPU VRAM solution",
    "What's Oat's tech stack?",
    "Any hackathon awards?",
  ];

  return (
    <div className="section container" style={{ minHeight: '100vh', paddingTop: '4rem', paddingBottom: '4rem' }}>

      {/* Header */}
      <div className="animate-enter sandbox-header">
        <div>
          <div className="mono sandbox-subtitle-label">05 / AI SYSTEM SANDBOX</div>
          <h1 className="sandbox-title">
            <GlitchText text="Live RAG Demo" />
          </h1>
          <p className="mono sandbox-desc">
            Test the retrieval-augmented generation pipeline. Ask anything about Oat's background, skills, or projects.
          </p>
        </div>
      </div>

      {/* Main layout */}
      <div className="animate-enter sandbox-layout">

        {/* Left: Terminal */}
        <div className="sandbox-terminal-col">
          {/* Terminal window */}
          <div className="terminal-window">
            {/* Terminal chrome */}
            <div className="terminal-chrome">
              <div className="terminal-dots">
                <div className="terminal-dot dot-red" />
                <div className="terminal-dot dot-yellow" />
                <div className="terminal-dot dot-green" />
              </div>
              <div className="mono terminal-title">watcharapon-ai // gemini-2.0-flash</div>
              <div className="terminal-status-dot" />
            </div>

            {/* Output area */}
            <div className="terminal-output">
              {!output && !isLoading && (
                <div className="terminal-idle">
                  <div className="mono" style={{ color: 'rgba(16,185,129,0.5)', fontSize: '0.8rem' }}>
                    $ system ready — RAG pipeline initialized
                  </div>
                  <div className="mono" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                    {`>`} Ask me anything about Watcharapon's background...
                  </div>
                  {/* Suggestions */}
                  <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div className="mono" style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginBottom: '0.3rem', letterSpacing: '0.1em' }}>QUICK QUERIES:</div>
                    {suggestions.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => setInput(s)}
                        className="suggestion-btn mono"
                      >
                        <span style={{ color: 'rgba(16,185,129,0.7)', marginRight: '0.5rem' }}>{'>'}</span>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {isLoading && !output && (
                <div className="mono" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                  <span className="loading-dots">Processing</span>
                </div>
              )}

              {output && (
                <div className="terminal-response">
                  <div className="mono" style={{ color: '#10b981', fontSize: '0.75rem', marginBottom: '0.75rem' }}>
                    $ AI &gt; response:
                  </div>
                  <div className="mono terminal-text">{output}</div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input area */}
            <div className="terminal-input-area">
              <span className="mono" style={{ color: '#10b981', flexShrink: 0 }}>{`$>`}</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !isLoading && generate()}
                placeholder="Ask about skills, projects, achievements..."
                className="terminal-input mono"
                disabled={isLoading}
              />
              <button
                onClick={generate}
                disabled={isLoading}
                className="terminal-send-btn"
              >
                {isLoading ? <span className="loading-spinner" /> : <TbSend size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Observability panel */}
        <div className="sandbox-obs-col">

          {/* RAG toggle */}
          <div className="obs-card">
            <div className="mono obs-card-title">Configuration</div>
            <div className="obs-config-row">
              <div>
                <div className="mono obs-config-label">RAG Mode</div>
                <div className="mono obs-config-sublabel">Context-aware retrieval</div>
              </div>
              <button
                onClick={() => setUseRAG(!useRAG)}
                className="rag-toggle"
                style={{ color: useRAG ? '#10b981' : 'var(--text-tertiary)' }}
              >
                {useRAG ? <TbToggleRight size={32} /> : <TbToggleLeft size={32} />}
              </button>
            </div>
          </div>

          {/* Trace lifecycle */}
          <div className="obs-card">
            <div className="mono obs-card-title">Request Lifecycle</div>
            <div className="trace-list">
              <TraceItem step={1} active={traceStep >= 1} label="Ingest" desc="User query received" />
              <TraceItem step={2} active={traceStep >= 2} label="Retrieval" desc="Knowledge base search" />
              <TraceItem step={3} active={traceStep >= 3} label="Inference" desc="Gemini model call" />
              <TraceItem step={4} active={traceStep >= 4} label="Stream" desc="Streaming output" />
            </div>
          </div>

          {/* Metrics */}
          <div className="obs-card">
            <div className="mono obs-card-title">Metrics</div>
            <div className="metrics-grid">
              <div className="metric-item">
                <div className="mono metric-label">
                  <TbBolt size={11} style={{ marginRight: '0.3rem' }} />
                  LATENCY
                </div>
                <div className="mono metric-value">{latency ? `${latency}ms` : '--'}</div>
              </div>
              <div className="metric-item">
                <div className="mono metric-label">MODEL</div>
                <div className="mono metric-value" style={{ fontSize: '0.8rem' }}>2.0-FLASH</div>
              </div>
              <div className="metric-item">
                <div className="mono metric-label">MODE</div>
                <div className="mono metric-value" style={{ fontSize: '0.8rem' }}>{useRAG ? 'RAG' : 'DIRECT'}</div>
              </div>
              <div className="metric-item">
                <div className="mono metric-label">STATUS</div>
                <div className="mono metric-value" style={{ fontSize: '0.8rem', color: '#10b981' }}>
                  {isLoading ? 'RUNNING' : 'IDLE'}
                </div>
              </div>
            </div>
          </div>

          {/* Payload debug */}
          <div className="obs-card obs-card-dark">
            <div className="mono obs-card-title" style={{ color: 'rgba(255,255,255,0.5)' }}>System Payload</div>
            <div className="mono payload-view">
              {useRAG
                ? `query: "${input || '...'}"
mode: RAG + context
context: [${getRelevantContext(input || 'about').substring(0, 40)}...]`
                : `query: "${input || '...'}"
mode: direct`
              }
            </div>
          </div>
        </div>
      </div>

      {/* --- HOW IT WORKS --- */}
      <div className="scroll-reveal reveal-left" style={{ marginTop: '6rem', paddingTop: '4rem', borderTop: '1px solid var(--border-light)' }}>
        <div className="how-it-works-header">
          <div className="mono how-it-works-label">System Architecture</div>
          <h2 className="how-it-works-title">How this RAG works</h2>
        </div>

        <div className="rag-steps-grid">
          {[
            { step: '01', icon: <TbMessageCircle size={28} />, label: 'INPUT', desc: 'User asks a question via the terminal UI.' },
            { step: '02', icon: <TbTerminal size={28} />, label: 'RETRIEVAL', desc: 'System searches the site-wide Knowledge Database by keyword.' },
            { step: '03', icon: <TbCpu size={28} />, label: 'CONTEXT', desc: 'Retrieved data is injected into the Gemini prompt.' },
            { step: '04', icon: (
              <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
                <circle cx="30" cy="45" r="9" fill="currentColor" />
                <circle cx="70" cy="45" r="9" fill="currentColor" />
                <rect x="30" y="65" width="40" height="10" rx="5" fill="currentColor" />
              </svg>
            ), label: 'GENERATE', desc: 'Gemini 2.0 Flash generates a grounded, factual answer.' },
          ].map((item, i) => (
            <div key={i} className="rag-step">
              <div className="rag-step-connector" />
              <div className="rag-step-icon">{item.icon}</div>
              <div className="mono rag-step-label">{item.step} / {item.label}</div>
              <p className="rag-step-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="arch-notes">
          {[
            { title: "// The Knowledge Base", body: "A structured local knowledge base indexed by semantic keywords covering every section of this portfolio — projects, philosophy, skills, and experience." },
            { title: "// Contextual Retrieval", body: "Multi-stage retrieval analyzes the user query, extracts intent, and fetches only the most relevant context blocks, reducing hallucinations and improving accuracy." },
            { title: "// Decision Logic", body: "A deterministic keyword matrix maps intent to knowledge sections — if query contains 'projects', technical specs are pulled; if 'identity', philosophical context is retrieved." },
          ].map((note, i) => (
            <div key={i} className="arch-note">
              <div className="mono arch-note-title">{note.title}</div>
              <p className="arch-note-body">{note.body}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .sandbox-header {
          margin-bottom: 3rem;
        }

        .sandbox-subtitle-label {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--text-tertiary);
          margin-bottom: 0.75rem;
          text-transform: uppercase;
        }

        .sandbox-title {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: -0.04em;
          margin-bottom: 1rem;
        }

        .sandbox-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          max-width: 600px;
        }

        .sandbox-layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 2rem;
          align-items: start;
        }

        /* Terminal */
        .terminal-window {
          background: #0d1117;
          border: 1px solid #21262d;
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          min-height: 480px;
        }

        .terminal-chrome {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          background: #161b22;
          border-bottom: 1px solid #21262d;
        }

        .terminal-dots {
          display: flex;
          gap: 6px;
        }

        .terminal-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .dot-red { background: #ff5f56; }
        .dot-yellow { background: #ffbd2e; }
        .dot-green { background: #27c93f; }

        .terminal-title {
          font-size: 0.72rem;
          color: rgba(255,255,255,0.4);
          flex: 1;
          text-align: center;
          letter-spacing: 0.05em;
        }

        .terminal-status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #27c93f;
          animation: pulse-green 2s infinite;
        }

        @keyframes pulse-green {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .terminal-output {
          flex: 1;
          padding: 1.5rem;
          overflow-y: auto;
          min-height: 320px;
          max-height: 400px;
        }

        .terminal-idle {}

        .suggestion-btn {
          display: block;
          text-align: left;
          background: none;
          border: none;
          padding: 0.3rem 0;
          font-size: 0.78rem;
          color: rgba(255,255,255,0.4);
          cursor: pointer;
          transition: color 0.2s;
          width: 100%;
        }

        .suggestion-btn:hover {
          color: rgba(16,185,129,0.9);
        }

        .terminal-response {
          color: rgba(255,255,255,0.85);
        }

        .terminal-text {
          font-size: 0.88rem;
          line-height: 1.7;
          white-space: pre-wrap;
          color: rgba(255,255,255,0.8);
        }

        .terminal-input-area {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-top: 1px solid #21262d;
          background: #0d1117;
        }

        .terminal-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: rgba(255,255,255,0.9);
          font-size: 0.88rem;
          caret-color: #10b981;
        }

        .terminal-input::placeholder {
          color: rgba(255,255,255,0.25);
        }

        .terminal-input:disabled {
          opacity: 0.5;
        }

        .terminal-send-btn {
          width: 32px;
          height: 32px;
          background: #10b981;
          border: none;
          border-radius: 4px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
          flex-shrink: 0;
        }

        .terminal-send-btn:hover {
          background: #059669;
        }

        .terminal-send-btn:disabled {
          background: #374151;
          cursor: not-allowed;
        }

        .loading-spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          display: inline-block;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .loading-dots::after {
          content: '...';
          animation: dots 1.5s infinite;
        }

        @keyframes dots {
          0%, 20% { content: '.'; }
          40% { content: '..'; }
          60%, 100% { content: '...'; }
        }

        /* Observability panel */
        .obs-card {
          background: white;
          border: 1px solid var(--border-light);
          padding: 1.5rem;
          margin-bottom: 1rem;
        }

        .obs-card-dark {
          background: #0d1117;
          border-color: #21262d;
        }

        .obs-card-title {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-tertiary);
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--border-light);
        }

        .obs-config-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .obs-config-label {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.15rem;
        }

        .obs-config-sublabel {
          font-size: 0.7rem;
          color: var(--text-tertiary);
        }

        .rag-toggle {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .rag-toggle:hover {
          opacity: 0.8;
        }

        .trace-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .metric-item {
          padding: 0.75rem;
          background: var(--bg-secondary);
          border-radius: 4px;
        }

        .metric-label {
          font-size: 0.6rem;
          font-weight: 700;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          margin-bottom: 0.3rem;
          display: flex;
          align-items: center;
        }

        .metric-value {
          font-size: 1rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .payload-view {
          font-size: 0.72rem;
          color: #10b981;
          background: rgba(16,185,129,0.05);
          padding: 0.75rem;
          border-radius: 4px;
          white-space: pre-wrap;
          line-height: 1.6;
        }

        /* How it works */
        .how-it-works-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .how-it-works-label {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--text-tertiary);
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }

        .how-it-works-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: -0.03em;
        }

        .rag-steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          position: relative;
          margin-bottom: 4rem;
        }

        .rag-step {
          position: relative;
          text-align: center;
        }

        .rag-step-connector {
          display: none;
        }

        .rag-step-icon {
          width: 64px;
          height: 64px;
          background: black;
          color: white;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          transition: transform 0.2s;
        }

        .rag-step:nth-child(2) .rag-step-icon,
        .rag-step:nth-child(3) .rag-step-icon {
          background: white;
          color: black;
          border: 2px solid black;
        }

        .rag-step-icon:hover {
          transform: translateY(-4px);
        }

        .rag-step-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }

        .rag-step-desc {
          font-size: 0.82rem;
          color: var(--text-secondary);
          line-height: 1.5;
          max-width: 180px;
          margin: 0 auto;
        }

        .arch-notes {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .arch-note {
          padding: 2rem;
          background: var(--bg-secondary);
          border-left: 3px solid black;
        }

        .arch-note-title {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }

        .arch-note-body {
          font-size: 0.9rem;
          line-height: 1.65;
          color: var(--text-secondary);
          margin: 0;
          max-width: none;
        }

        @media (max-width: 1100px) {
          .sandbox-layout {
            grid-template-columns: 1fr;
          }

          .sandbox-obs-col {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
          }
        }

        .trace-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .trace-indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 4px;
          transition: all 0.3s;
        }

        @media (max-width: 1100px) {
          .sandbox-layout {
            grid-template-columns: 1fr;
          }

          .sandbox-obs-col {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
          }
        }

        @media (max-width: 768px) {
          .rag-steps-grid {
            grid-template-columns: 1fr 1fr;
          }

          .arch-notes {
            grid-template-columns: 1fr;
          }

          .sandbox-obs-col {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

function TraceItem({ step, active, label, desc }: { step: number, active: boolean, label: string, desc: string }) {
  return (
    <div className="trace-item" style={{ opacity: active ? 1 : 0.35, transition: 'opacity 0.3s' }}>
      <div className="trace-indicator" style={{ background: active ? '#10b981' : 'var(--border-strong)', boxShadow: active ? '0 0 8px rgba(16,185,129,0.5)' : 'none' }} />
      <div>
        <div className="mono" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          {step}. {label}
        </div>
        <div className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>{desc}</div>
      </div>
    </div>
  );
}
