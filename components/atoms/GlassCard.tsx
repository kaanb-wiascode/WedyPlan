'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface GlassCardProps extends HTMLMotionProps<'div'> {
  as?: 'div' | 'section' | 'article' | 'aside';
  interactive?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  as = 'div',
  interactive = false,
  children,
  className = '',
  ...props
}) => {
  const Component = motion(as as any);

  const baseClasses = 'bg-white/35 backdrop-blur-3xl border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.03)] rounded-[32px] text-[#1D1D1F] overflow-hidden';

  return (
    <Component
      whileHover={interactive ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={`${baseClasses} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};