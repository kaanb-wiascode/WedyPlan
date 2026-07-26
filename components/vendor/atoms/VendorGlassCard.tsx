'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface VendorGlassCardProps extends HTMLMotionProps<'div'> {
  interactive?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const VendorGlassCard: React.FC<VendorGlassCardProps> = ({
  interactive = false,
  className = '',
  children,
  ...props
}) => {
  return (
    <motion.div
      whileHover={interactive ? { y: -3, transition: { duration: 0.2 } } : undefined}
      className={`bg-white/40 backdrop-blur-3xl border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.03)] rounded-[24px] text-[#1D1D1F] overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};