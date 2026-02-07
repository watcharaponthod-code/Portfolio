import { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { getRelevantContext } from '@/lib/knowledge';

export default function AIPlayground() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [useRAG, setUseRAG] = useState(true);
  const [latency, setLatency] = useState<number | null>(null);
  const [traceStep, setTraceStep] = useState<number>(0);

  const bottomRef = useRef<HTMLDivElement>(null);

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
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1rem' }}>AI System Sandbox</h1>
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
