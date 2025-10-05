'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StrategyCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  compression: string;
  bestFor: string;
  selected: boolean;
  onClick: () => void;
}

export default function StrategyCard({
  title,
  description,
  icon,
  compression,
  bestFor,
  selected,
  onClick,
}: StrategyCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative cursor-pointer transition-all duration-500 p-6 rounded-2xl
        bg-gradient-to-br from-dark-800/40 via-dark-800/30 to-dark-900/40
        backdrop-blur-2xl border overflow-hidden z-[1]
        ${
          selected
            ? 'border-primary-400/50 shadow-2xl shadow-primary-500/20 ring-2 ring-primary-400/30'
            : 'border-white/5 hover:border-primary-400/30 hover:shadow-xl hover:shadow-primary-500/10'
        }
      `}
    >
      {/* Gradient overlay on hover/selection */}
      <div className={`absolute inset-0 bg-gradient-to-br from-primary-500/10 via-purple-500/5 to-transparent transition-opacity duration-500 ${selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />
      
      {/* Shimmer effect on selected */}
      {selected && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_ease-in-out_infinite]" />
      )}
      
      <div className="relative flex items-start gap-4">
        <div className={`flex-shrink-0 transition-transform duration-500 ${selected ? 'scale-110' : ''}`}>
          {icon}
        </div>
        <div className="flex-1 space-y-3">
          <h3 className={`text-lg font-bold transition-colors duration-300 ${selected ? 'bg-gradient-to-r from-primary-300 to-purple-300 bg-clip-text text-transparent' : 'text-white'}`}>
            {title}
          </h3>
          <p className="text-sm text-dark-300 leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border border-emerald-400/20 text-emerald-300 backdrop-blur-xl">
              <svg className="w-3 h-3 text-dark-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="20" x2="18" y2="10"/>
                <line x1="12" y1="20" x2="12" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
              <span className="font-bold">{compression}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-400/20 text-cyan-300 backdrop-blur-xl">
              <svg className="w-3 h-3 text-dark-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                <line x1="9" y1="9" x2="9.01" y2="9"/>
                <line x1="15" y1="9" x2="15.01" y2="9"/>
              </svg>
              <span className="font-semibold">{bestFor}</span>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
