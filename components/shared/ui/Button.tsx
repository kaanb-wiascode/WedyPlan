'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { ComponentSize } from '@/types/design-system';

export type ButtonVariant = 'primary' | 'secondary' | 'glass' | 'ghost' | 'gold' | 'danger';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  size?: ComponentSize;
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-full transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6007E] select-none';

  const sizeStyles: Record<ComponentSize, string> = {
    sm: 'text-[11px] px-3.5 py-1.5 gap-1.5',
    md: 'text-[12px] px-5 py-2.5 gap-2',
    lg: 'text-[13px] px-7 py-3.5 gap-2.5',
    xl: 'text-[14px] px-9 py-4 gap-3',
  };

  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-[#1D1D1F] dark:bg-white hover:bg-black dark:hover:bg-slate-100 text-white dark:text-[#1D1D1F] shadow-md',
    secondary: 'bg-white/80 dark:bg-zinc-800 hover:bg-white text-[#1D1D1F] dark:text-white border border-slate-200 dark:border-zinc-700 shadow-xs',
    glass: 'bg-white/50 dark:bg-zinc-800/50 backdrop-blur-xl border border-white/80 dark:border-zinc-700 text-[#1D1D1F] dark:text-white hover:bg-white/80',
    ghost: 'bg-transparent text-[#6E6E73] dark:text-slate-300 hover:text-[#1D1D1F] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10',
    gold: 'bg-gradient-to-r from-[#D4AF37] to-amber-600 hover:from-[#B8982C] hover:to-amber-700 text-white shadow-md',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-md',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        children
      )}
    </motion.button>
  );
};