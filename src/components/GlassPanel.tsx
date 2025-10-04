'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassPanel({
  children,
  className = '',
  hover = false,
}: GlassPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{ backgroundColor: '#000' }}
      className={`
        ${hover ? 'card-hover' : 'card'} 
        ${className} 
        p-6
        bg-gradient-to-br from-dark-800/40 via-dark-800/30 to-dark-900/40
        backdrop-blur-2xl
        border border-white/5
        shadow-2xl shadow-black/20
        relative
        z-[1]
        overflow-hidden
        before:absolute before:inset-0 
        before:bg-gradient-to-br before:from-primary-500/5 before:to-transparent
        before:opacity-0 hover:before:opacity-100
        before:transition-opacity before:duration-500
      `}
    >
      {children}
    </motion.div>
  );
}
