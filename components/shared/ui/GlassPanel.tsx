'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { GlassIntensity } from '@/types/design-system';
import { DESIGN_TOKENS } from '@/lib/design-tokens';

interface GlassPanelProps extends HTMLMotionProps<'div'> {
  intensity?: GlassIntensity;
  hoverEffect?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  intensity = 'medium',
  hoverEffect = false,
  children,
  className = '',
  ...props
}) => {
  const intensityClass = DESIGN_TOKENS.glass[intensity];

  return (
    <motion.div
      whileHover={hoverEffect ? { y: -4, transition: DESIGN_TOKENS.motion.springFast } : undefined}
      className={`rounded-[32px] p-6 shadow-xs transition-colors duration-300 ${intensityClass} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};