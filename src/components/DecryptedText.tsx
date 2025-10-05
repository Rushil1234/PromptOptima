'use client';

import { useState, useEffect } from 'react';

interface DecryptedTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

export default function DecryptedText({
  text,
  className = '',
  speed = 50,
  delay = 0,
  onComplete
}: DecryptedTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let currentIteration = 0;
    const maxIterations = text.length;

    const interval = setInterval(() => {
      setDisplayedText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < currentIteration) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      if (currentIteration >= maxIterations) {
        clearInterval(interval);
        setDisplayedText(text);
        if (onComplete) {
          onComplete();
        }
      }

      currentIteration += 1 / 3;
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, started, onComplete]);

  return <span className={className}>{displayedText || text.split('').map(() => ' ').join('')}</span>;
}
