
import React, { useState, useEffect } from 'react';

interface GlitchTextProps {
    text: string;
    className?: string;
    style?: React.CSSProperties;
    intervalMs?: number;
    glitchChance?: number;
}

const GLITCH_CHARS = "!@#$%^&*()_+{}[]:;<>?/";

export default function GlitchText({
    text,
    className,
    style,
    intervalMs = 2500,
    glitchChance = 0.3
}: GlitchTextProps) {
    const [displayText, setDisplayText] = useState(text);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > glitchChance) return;

            const textArray = text.split('');
            const glitchCount = Math.random() > 0.5 ? 2 : 1;

            const indices: number[] = [];
            for (let i = 0; i < glitchCount; i++) {
                const idx = Math.floor(Math.random() * text.length);
                if (text[idx] !== ' ') {
                    indices.push(idx);
                }
            }

            const glitchedArray = [...textArray];
            indices.forEach(idx => {
                glitchedArray[idx] = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
            });

            setDisplayText(glitchedArray.join(''));

            // Revert back after a short duration
            setTimeout(() => setDisplayText(text), 150 + Math.random() * 200);
        }, intervalMs);

        return () => clearInterval(interval);
    }, [text, intervalMs, glitchChance]);

    // Update if text prop changes
    useEffect(() => {
        setDisplayText(text);
    }, [text]);

    return (
        <span className={className} style={style}>
            {displayText}
        </span>
    );
}
