import { useState, useEffect } from 'react';

interface ScrambleTextProps {
  text: string;
  delay?: number;
  duration?: number;
  chars?: string;
}

export default function ScrambleText({ 
  text, 
  delay = 0, 
  duration = 800,
  chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>' 
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    timeout = setTimeout(() => {
      let iteration = 0;
      const maxIterations = text.length;

      interval = setInterval(() => {
        setDisplayText((prev) => {
          let newText = '';
          for (let i = 0; i < text.length; i++) {
            if (i < iteration) {
              newText += text[i];
            } else if (text[i] === ' ') {
              newText += ' ';
            } else {
              newText += chars[Math.floor(Math.random() * chars.length)];
            }
          }
          return newText;
        });

        iteration += 1 / (duration / (text.length * 30));

        if (iteration >= maxIterations) {
          clearInterval(interval);
          setDisplayText(text);
          setIsRevealed(true);
        }
      }, 30);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay, duration, chars]);

  return (
    <span style={{ 
      fontFamily: isRevealed ? 'inherit' : 'var(--font-mono)', 
      opacity: displayText ? 1 : 0,
      transition: 'opacity 0.2s'
    }}>
      {displayText}
    </span>
  );
}
