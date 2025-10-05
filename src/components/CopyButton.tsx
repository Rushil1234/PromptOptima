'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface CopyButtonProps {
  text: string;
  onCopy?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function CopyButton({ text, onCopy, className = '', size = 'md' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const sizes = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base'
  };

  return (
    <motion.button
      onClick={handleCopy}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`${sizes[size]} flex items-center justify-center rounded-lg bg-dark-700/50 hover:bg-dark-600/50 border border-dark-600 hover:border-primary-500/50 transition-all duration-200 relative z-50 ${className}`}
      style={{ zIndex: 50 }}
      title="Copy to clipboard"
    >
      {copied ? (
        <span className="text-emerald-400">✓</span>
      ) : (
        <svg
          className="w-4 h-4 text-dark-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      )}
    </motion.button>
  );
}
