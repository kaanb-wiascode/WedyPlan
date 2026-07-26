'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export interface GlassButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'gold';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  variant = 'primary',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-[13px] md:text-[14px] font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 overflow-hidden min-h-[44px]';

  const variants = {
    primary: 'bg-white/70 hover:bg-white/95 backdrop-blur-2xl border border-white/90 text-[#1D1D1F] shadow-[0_4px_15px_rgba(0,0,0,0.03)] focus-visible:ring-black/20',
    secondary: 'bg-white/30 hover:bg-white/60 backdrop-blur-xl border border-white/60 text-[#2C2C2E] shadow-sm focus-visible:ring-black/20',
    gold: 'bg-[#D4AF37]/25 hover:bg-[#D4AF37]/40 backdrop-blur-2xl border border-[#D4AF37]/50 text-[#1D1D1F] shadow-[0_10px_30px_rgba(212,175,55,0.18)] focus-visible:ring-[#D4AF37]/50',
  };

  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.97 } : {}}
      className={`${baseStyles} ${variants[variant]} ${isDisabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current" aria-hidden="true" />}
      {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span className="relative z-10">{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </motion.button>
  );
};