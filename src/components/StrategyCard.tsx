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
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={`card cursor-pointer transition-all duration-300 ${
        selected
          ? 'ring-2 ring-primary-500 bg-primary-500/5 border-primary-500/50'
          : 'hover:border-primary-500/30 hover:bg-dark-800/70'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="text-5xl flex-shrink-0">{icon}</div>
        <div className="flex-1 space-y-3">
          <h3 className="text-lg font-bold text-dark-50">{title}</h3>
          <p className="text-sm text-dark-300 leading-relaxed">{description}</p>
          <div className="flex flex-wrap gap-2">
            <span className="badge">
              <span className="text-dark-400">Compression:</span>
              <span className="ml-1.5 text-emerald-400 font-semibold">{compression}</span>
            </span>
            <span className="badge">
              <span className="text-dark-400">Best for:</span>
              <span className="ml-1.5 text-cyan-400 font-semibold">{bestFor}</span>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
