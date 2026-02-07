
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
        const fontSize = 14;
        const colStep = 10; // Much denser columns
        const columns = Math.floor(canvas.width / colStep);
        const drops: number[] = [];

        for (let x = 0; x < columns; x++) {
            drops[x] = Math.random() * -100;
        }

        const draw = () => {
            // Lower alpha clear for longer trails, higher contrast
            ctx.fillStyle = isDark ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `bold ${fontSize}px var(--font-mono)`;

            for (let i = 0; i < drops.length; i++) {
                const text = binary.charAt(Math.floor(Math.random() * binary.length));

                // High contrast base color
                ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0, 0, 0, 0.35)';

                // Highlight 25% of the characters for 'clearly visible' effect
                if (Math.random() > 0.75) {
                    ctx.fillStyle = isDark ? '#ffffff' : '#000000';
                }

                ctx.fillText(text, i * colStep, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.985) {
                    drops[i] = 0;
                }

                drops[i] += 1.2; // Faster speed
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
