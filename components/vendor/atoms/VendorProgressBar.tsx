'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface VendorProgressBarProps {
  progress: number; // 0 - 100
  className?: string;
}

export const VendorProgressBar: React.FC<VendorProgressBarProps> = ({ progress, className = '' }) => {
  const safeProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={`w-full bg-black/5 rounded-full h-2 overflow-hidden border border-white/60 ${className}`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${safeProgress}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`h-full rounded-full ${
          safeProgress >= 80 ? 'bg-emerald-500' : safeProgress >= 40 ? 'bg-[#D4AF37]' : 'bg-amber-500'
        }`}
      />
    </div>
  );
};