import { useEffect, useRef } from 'react';

export default function BinaryBackground({ opacity = 0.04 }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const fontSize = 16;
    const columns = Math.ceil(width / fontSize);
    
    // Create an array of drops starting at random off-screen or top-screen positions
    const drops = Array(columns).fill(0).map(() => Math.random() * -100);

    const chars = '01';
    let animationFrameId: number;

    const draw = () => {
      // Paint over the canvas with a transparent white to create the "fading trail" effect
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(0, 0, width, height);

      // Set text style for the 0s and 1s
      ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
      ctx.font = `300 ${fontSize}px "Space Mono", monospace`;
      ctx.textAlign = 'center';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize + fontSize / 2;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Reset drop to the top randomly to keep continuous flow
        if (y > height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        
        // Very slow, smooth increment for professional look (instead of fast blocky jumps)
        drops[i] += 0.25; 
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 1,
        transition: 'opacity 1s ease',
      }}
    />
  );
}
