'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  suffix?: string;
  icon?: ReactNode;
  color?: 'primary' | 'success' | 'info' | 'accent';
}

export default function MetricCard({
  label,
  value,
  suffix = '',
  icon,
  color = 'primary',
}: MetricCardProps) {
  const colorClasses = {
    primary: 'text-primary-400 bg-primary-500/10 border-primary-500/20',
    success: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    info: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    accent: 'text-accent-400 bg-accent-500/10 border-accent-500/20',
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="card p-6 flex flex-col items-center justify-center text-center space-y-2"
    >
      {icon && (
        <div className={`text-4xl p-3 rounded-xl ${colorClasses[color]}`}>
          {icon}
        </div>
      )}
      <div className="text-4xl font-bold text-dark-50">
        {value}
        {suffix && <span className="text-xl ml-1 text-dark-300">{suffix}</span>}
      </div>
      <div className="text-sm text-dark-400 font-medium">{label}</div>
    </motion.div>
  );
}
