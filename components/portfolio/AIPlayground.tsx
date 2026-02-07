import { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { TbMessageCircle, TbTerminal, TbCpu } from 'react-icons/tb';
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

  // Scroll Reveal Observer
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
    setTraceStep(1); // Start Trace

    const startTime = Date.now();

    try {
      const apiKey = process.env.GEMINI_API_KEY || '';
      const ai = new GoogleGenAI({ apiKey });

      // Simulate System Latency for Visualization
      setTimeout(() => setTraceStep(2), 200); // Embedding/Retrieval
      setTimeout(() => setTraceStep(3), 600); // Model Inference Start

      // Construct Prompt
      const systemPrompt = "You are a technical assistant. Be concise. Answer based on the provided context about Watcharapon.";
      const context = useRAG ? getRelevantContext(input) : "";
      const finalPrompt = useRAG
        ? `Context:\n${context}\n\nUser Question: ${input}`
        : input;

      const response = await ai.models.generateContentStream({
        model: 'gemini-3-flash-preview',
        contents: [
          { role: 'user', parts: [{ text: finalPrompt }] }
        ],
        config: {
          systemInstruction: systemPrompt,
        }
      });

      let fullText = '';
      for await (const chunk of response) {
        if (chunk.text) {
          fullText += chunk.text;
          setOutput(prev => prev + chunk.text);
          // Auto scroll
          if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }

      const endTime = Date.now();
      setLatency(endTime - startTime);
      setTraceStep(4); // Complete

    } catch (error) {
      console.error(error);
      setOutput('Error: Could not generate response. Check API configuration.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="section container" style={{ minHeight: '100vh', paddingTop: '4rem', paddingBottom: '4rem' }}>
      <div className="animate-enter playground-layout" style={{ display: 'flex', gap: '2rem' }}>

        {/* Left Column: Interaction */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1rem' }}>
              <GlitchText text="AI System Sandbox" />
            </h1>
            <p className="mono" style={{ fontSize: '0.9rem' }}>
              Test the retrieval-augmented generation pipeline.
            </p>
          </div>

          <div style={{
            minHeight: '400px',
            background: 'white',
            border: '1px solid var(--border-light)',
            borderRadius: '8px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem' }} className="mono">
              {output ? (
                <div style={{ whiteSpace: 'pre-wrap', color: 'var(--text-primary)' }}>
                  <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>AI &gt; </span>
                  {output}
                </div>
              ) : (
                <div style={{ color: 'var(--text-tertiary)' }}>
                  System ready. Awaiting input stream...
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid var(--bg-secondary)', paddingTop: '1rem' }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !isLoading && generate()}
                placeholder="Ask skills..."
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  borderRadius: '4px',
                  border: '1px solid var(--border-strong)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '16px' // Prevent zoom on iOS
                }}
                disabled={isLoading}
              />
              <button
                className="btn-primary"
                onClick={generate}
                disabled={isLoading}
                style={{ opacity: isLoading ? 0.7 : 1, padding: '0.75rem 1rem' }}
              >
                {isLoading ? '...' : 'EXECUTE'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Observability */}
        <div style={{ flex: 0.8, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

          {/* Controls */}
          <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
            <div className="label" style={{ marginBottom: '1rem' }}>Configuration</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="mono">RAG Mode</span>
              <button
                onClick={() => setUseRAG(!useRAG)}
                style={{
                  background: useRAG ? 'var(--accent-primary)' : 'var(--border-strong)',
                  width: '40px', height: '20px', borderRadius: '10px', position: 'relative',
                  transition: 'background 0.3s'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '2px', left: useRAG ? '22px' : '2px',
                  width: '16px', height: '16px',
                  background: 'white', borderRadius: '50%',
                  transition: 'left 0.3s'
                }} />
              </button>
            </div>
          </div>

          {/* Trace Viz */}
          <div style={{ flex: 1, border: '1px solid var(--border-light)', borderRadius: '8px', padding: '1.5rem' }}>
            <div className="label" style={{ marginBottom: '1.5rem' }}>Request Lifecycle Trace</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <TraceItem active={traceStep >= 1} label="1. Ingest" />
              <TraceItem active={traceStep >= 2} label="2. Retrieval" />
              <TraceItem active={traceStep >= 3} label="3. Inference" />
              <TraceItem active={traceStep >= 4} label="4. Stream" />
            </div>

            {/* Metrics */}
            <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '4px' }}>
                <div className="label">Latency</div>
                <div className="mono" style={{ fontSize: '1.2rem', marginTop: '0.25rem' }}>
                  {latency ? `${latency}ms` : '--'}
                </div>
              </div>
              <div style={{ padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '4px' }}>
                <div className="label">Ref</div>
                <div className="mono" style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>
                  3-FLASH
                </div>
              </div>
            </div>

            {/* Debug View */}
            <div style={{ marginTop: '2rem' }}>
              <div className="label">System Payload</div>
              <div className="mono" style={{
                marginTop: '0.5rem',
                fontSize: '0.7rem',
                background: '#111827',
                color: '#10b981',
                padding: '1rem',
                borderRadius: '4px',
                overflowX: 'auto',
                maxHeight: '150px'
              }}>
                {useRAG
                  ? `User: ${input}\n+ Context: [${getRelevantContext(input).substring(0, 50)}...]`
                  : `User: ${input}`
                }
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .playground-layout {
            flex-direction: column !important;
          }
        }
      `}</style>

      {/* --- RAG ARCHITECTURE DIAGRAM --- */}
      <div className="scroll-reveal reveal-left" style={{ marginTop: '6rem', borderTop: '1px solid var(--border-light)', paddingTop: '4rem' }}>
        <div className="label" style={{ marginBottom: '1rem', textAlign: 'center' }}>System Intelligence</div>
        <h2 style={{ textAlign: 'center', marginBottom: '4rem' }}>How this RAG works</h2>

        <div style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto', padding: '2rem', background: 'var(--bg-secondary)', borderRadius: '16px' }}>
          <div className="diagram-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', position: 'relative', zIndex: 1 }}>

            {/* Step 1: User Query */}
            <div className="diagram-node" style={{ textAlign: 'center' }}>
              <div className="node-icon" style={{ width: '60px', height: '60px', background: 'black', borderRadius: '12px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <TbMessageCircle size={30} />
              </div>
              <div className="mono" style={{ fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.5rem' }}>1. INPUT</div>
              <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>User asks a question via UI.</p>
            </div>

            {/* Step 2: Retrieval */}
            <div className="diagram-node" style={{ textAlign: 'center' }}>
              <div className="node-icon" style={{ width: '60px', height: '60px', background: 'white', border: '2px solid black', borderRadius: '12px', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <TbTerminal size={30} />
              </div>
              <div className="mono" style={{ fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.5rem' }}>2. RETRIEVAL</div>
              <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>System searches Site-wide Knowledge Database.</p>
            </div>

            {/* Step 3: Augmentation */}
            <div className="diagram-node" style={{ textAlign: 'center' }}>
              <div className="node-icon" style={{ width: '60px', height: '60px', background: 'white', border: '2px solid black', borderRadius: '12px', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <TbCpu size={30} />
              </div>
              <div className="mono" style={{ fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.5rem' }}>3. CONTEXT</div>
              <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>Retrieved data is injected into the AI prompt.</p>
            </div>

            {/* Step 4: Generation */}
            <div className="diagram-node" style={{ textAlign: 'center' }}>
              <div className="node-icon" style={{ width: '60px', height: '60px', background: 'black', borderRadius: '12px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <svg width="30" height="30" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="30" cy="45" r="9" fill="white" />
                  <circle cx="70" cy="45" r="9" fill="white" />
                  <rect x="30" y="65" width="40" height="10" rx="5" fill="white" />
                </svg>
              </div>
              <div className="mono" style={{ fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.5rem' }}>4. GENERATE</div>
              <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>Gemini generates answer based ONLY on context.</p>
            </div>
          </div>

          {/* Connection Lines (Desktop Only) */}
          <div className="diagram-lines" style={{ position: 'absolute', top: '50px', left: '15%', right: '15%', height: '2px', background: 'rgba(0,0,0,0.1)', zIndex: 0 }}>
            <div className="flow-dot" style={{ position: 'absolute', width: '8px', height: '8px', background: 'black', borderRadius: '50%', top: '-3px' }}></div>
          </div>
        </div>

        <div style={{ marginTop: '4rem', maxWidth: '900px', margin: '4rem auto 0' }}>
          <h3 className="mono" style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Architecture Deep Dive</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', textAlign: 'left' }}>
            <div>
              <h4 className="mono" style={{ fontSize: '0.9rem', color: 'var(--accent-primary)', marginBottom: '1rem' }}>// The Knowledge Base</h4>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                The system utilizes a structured local knowledge base indexed by semantic keywords. This index covers every section of this portfolio—from project metrics to engineering philosophies—ensuring the AI has a comprehensive understanding of the developer's background.
              </p>
            </div>
            <div>
              <h4 className="mono" style={{ fontSize: '0.9rem', color: 'var(--accent-primary)', marginBottom: '1rem' }}>// Contextual Retrieval</h4>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                Instead of generic prompting, the system performs a multi-stage retrieval process. It analyzes the user query, extracts intent, and fetches only the most relevant context blocks. This "Augmentation" phase significantly reduces hallucinations and ensures factual accuracy.
              </p>
            </div>
            <div>
              <h4 className="mono" style={{ fontSize: '0.9rem', color: 'var(--accent-primary)', marginBottom: '1rem' }}>// Decision Logic</h4>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                The engine uses a deterministic matching algorithm. It parses the user query for specific "Intents" which are mapped against a Keyword Matrix of the entire site. If a query matches "Projects", the system pulls technical specs; if it relates to "Identity", it pulls philosophical context. This ensures the AI always speaks with the "Ground Truth" of this portfolio.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '3rem', padding: '1.5rem', borderLeft: '2px solid black', background: 'white' }}>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: 0 }}>
              "By combining Gemini 1.5 Flash's inference capabilities with a precision-tuned local retrieval engine, we achieve a high-performance RAG pipeline that delivers sub-second, context-aware responses without the overhead of heavy vector databases."
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .flow-dot {
          animation: moveDot 4s linear infinite;
        }
        @keyframes moveDot {
          0% { left: 0%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @media (max-width: 768px) {
          .diagram-grid {
            grid-template-columns: 1fr !important;
          }
          .diagram-lines {
            display: none;
          }
        }
      `}</style>
    </div>

  );
}

function TraceItem({ active, label }: { active: boolean, label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', opacity: active ? 1 : 0.3, transition: 'opacity 0.3s' }}>
      <div style={{
        width: '12px', height: '12px',
        borderRadius: '50%',
        background: active ? 'var(--success)' : 'var(--border-strong)',
        boxShadow: active ? '0 0 10px var(--success)' : 'none'
      }} />
      <span className="mono" style={{ fontSize: '0.9rem' }}>{label}</span>
    </div>
  );
}
