'use client';

import { motion } from 'framer-motion';

interface StrategyCardProps {
  title: string;
  description: string;
  icon: string;
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
        backdrop-blur-2xl border overflow-hidden
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
        <div className={`text-5xl flex-shrink-0 transition-transform duration-500 ${selected ? 'scale-110' : ''}`}>
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
              <span className="text-dark-400">📊</span>
              <span className="font-bold">{compression}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-400/20 text-cyan-300 backdrop-blur-xl">
              <span className="text-dark-400">🎯</span>
              <span className="font-semibold">{bestFor}</span>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
