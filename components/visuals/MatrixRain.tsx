
import { useEffect, useRef } from 'react';

interface MatrixRainProps {
    isDark?: boolean;
    opacity?: number;
}

export default function MatrixRain({ isDark = true, opacity = 0.4 }: MatrixRainProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const updateSize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
            }
        };
        updateSize();

        const binary = '10';
        const fontSize = 16;
        const columns = Math.floor(canvas.width / fontSize);
        const drops: number[] = [];

        for (let x = 0; x < columns; x++) {
            drops[x] = Math.random() * -100; // Staggered start
        }

        const draw = () => {
            ctx.fillStyle = isDark ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = binary.charAt(Math.floor(Math.random() * binary.length));

                ctx.fillStyle = isDark ? '#404040' : '#d4d4d4';
                if (Math.random() > 0.95) ctx.fillStyle = isDark ? '#ffffff' : '#000000';

                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);
        window.addEventListener('resize', updateSize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', updateSize);
        };
    }, [isDark]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                opacity: opacity,
                pointerEvents: 'none'
            }}
        />
    );
}
