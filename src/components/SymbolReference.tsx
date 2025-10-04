'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { SYNTHLANG_SYMBOLS } from '@/lib/synthlang';

export default function SymbolReference() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(SYNTHLANG_SYMBOLS.map(s => s.category))];
  const filteredSymbols = selectedCategory
    ? SYNTHLANG_SYMBOLS.filter(s => s.category === selectedCategory)
    : SYNTHLANG_SYMBOLS;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            selectedCategory === null
              ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
              : 'bg-dark-700/50 text-dark-300 hover:bg-dark-700 hover:text-dark-100'
          }`}
        >
          All Symbols
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${
              selectedCategory === category
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                : 'bg-dark-700/50 text-dark-300 hover:bg-dark-700 hover:text-dark-100'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto scrollbar-thin pr-2">
        {filteredSymbols.map((symbol, index) => (
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
