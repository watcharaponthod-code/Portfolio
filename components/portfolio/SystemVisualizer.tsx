
import { useRef, useEffect } from 'react';
import { useLiveAPIContext } from '@/contexts/LiveAPIContext';

export default function SystemVisualizer() {
  const { volume } = useLiveAPIContext();
  const coreRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (coreRef.current) {
      // Scale based on volume, clamped minimal movement
      const scale = 1 + Math.min(volume * 1.5, 0.5);
      const opacity = 0.5 + Math.min(volume * 2, 0.5);
      
      coreRef.current.style.transform = `scale(${scale})`;
      coreRef.current.style.boxShadow = `0 0 ${20 + volume * 100}px rgba(37, 99, 235, ${opacity * 0.4})`;
      coreRef.current.style.borderColor = `rgba(37, 99, 235, ${opacity})`;
    }
  }, [volume]);

  return (
    <div className="visualizer-container animate-enter">
      <div className="system-core" ref={coreRef}>
        <div className="core-inner"></div>
        <div className="ripple" style={{ width: '150%', height: '150%', animation: 'ripple 2s infinite linear' }} />
        <div className="ripple" style={{ width: '200%', height: '200%', animation: 'ripple 2s infinite linear 1s' }} />
      </div>
      
      <div style={{ position: 'absolute', bottom: '2rem', textAlign: 'center' }}>
        <div className="label" style={{ opacity: volume > 0.01 ? 1 : 0.5 }}>
          {volume > 0.01 ? 'SYSTEM ACTIVE // VOICE DETECTED' : 'SYSTEM STANDBY'}
        </div>
        <div className="mono" style={{ fontSize: '10px', marginTop: '5px', color: 'var(--text-tertiary)' }}>
          LATENCY: 45ms | BUFFER: OK
        </div>
      </div>

      <style>{`
        @keyframes ripple {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
