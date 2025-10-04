'use client';

import { motion } from 'framer-motion';
import { SYNTHLANG_SYMBOLS } from '@/lib/synthlang';

export default function SymbolReference() {
  return (
    <div className="space-y-6 relative z-[50]">
      <div className="flex items-center gap-2 relative z-[50]">
        <div className="px-4 py-2 rounded-lg text-sm font-semibold bg-primary-600 text-white shadow-lg shadow-primary-500/30">
          All Symbols
        </div>
        <span className="text-dark-400 text-sm">({SYNTHLANG_SYMBOLS.length} total)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto scrollbar-thin pr-2">
        {SYNTHLANG_SYMBOLS.map((symbol, index) => (
          <motion.div
            key={symbol.symbol}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.01, duration: 0.3 }}
            className="card p-4 hover:bg-dark-800/70 hover:border-primary-500/30 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="text-3xl font-mono">{symbol.symbol}</div>
              <div className="flex-1 min-w-0">
                <div className="text-dark-100 font-semibold text-sm truncate">{symbol.concept}</div>
                <div className="text-dark-400 text-xs">{symbol.description}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
