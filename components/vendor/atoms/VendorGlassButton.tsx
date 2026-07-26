'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export interface VendorGlassButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'gold' | 'danger';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

export const VendorGlassButton: React.FC<VendorGlassButtonProps> = ({
  variant = 'primary',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'relative inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-semibold transition-all focus:outline-none min-h-[42px] cursor-pointer selection:bg-none';

  const variants = {
    primary: 'bg-[#1D1D1F] hover:bg-black text-white shadow-md',
    secondary: 'bg-white/60 hover:bg-white/90 backdrop-blur-xl border border-white/80 text-[#1D1D1F] shadow-sm',
    gold: 'bg-[#D4AF37]/25 hover:bg-[#D4AF37]/40 backdrop-blur-2xl border border-[#D4AF37]/50 text-[#1D1D1F] shadow-[0_8px_25px_rgba(212,175,55,0.18)]',
    danger: 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 border border-rose-200/50',
  };

  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.96 } : {}}
      className={`${baseStyles} ${variants[variant]} ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current" />}
      {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </motion.button>
  );
};