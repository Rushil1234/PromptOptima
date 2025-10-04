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
      className={`${hover ? 'card-hover' : 'card'} ${className} p-6`}
    >
      {children}
    </motion.div>
  );
}
