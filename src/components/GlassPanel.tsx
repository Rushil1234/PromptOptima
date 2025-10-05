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
      whileHover={hover ? { scale: 1.01, y: -2 } : {}}
      className={`
        ${hover ? 'card-hover' : 'card'} 
        ${className} 
        p-8
        bg-gradient-to-br from-black/60 via-dark-900/50 to-dark-950/60
        backdrop-blur-3xl
        border border-primary-500/20
        shadow-2xl shadow-primary-500/10
        relative
        z-[1]
        overflow-hidden
        rounded-2xl
        before:absolute before:inset-0 
        before:bg-gradient-to-br before:from-primary-400/8 before:via-purple-500/6 before:to-transparent
        before:opacity-0 hover:before:opacity-100
        before:transition-all before:duration-700
        after:absolute after:inset-0
        after:bg-gradient-to-t after:from-transparent after:via-transparent after:to-white/[0.02]
        after:pointer-events-none
        hover:border-primary-400/40
        hover:shadow-primary-400/20
        transition-all duration-500
        group
      `}
    >
      {/* Subtle animated border glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/20 via-purple-500/20 to-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm" />
      
      {/* Content container */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary-400/30 rounded-tl-2xl" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-primary-400/30 rounded-br-2xl" />
    </motion.div>
  );
}
