'use client';

import React from 'react';
import { ColorVariant, ComponentSize } from '@/types/design-system';

interface BadgeProps {
  variant?: ColorVariant;
  size?: 'sm' | 'md';
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  size = 'sm',
  children,
  icon,
  className = ''
}) => {
  const sizeStyles = {
    sm: 'text-[10px] px-2.5 py-0.5 gap-1',
    md: 'text-[11px] px-3 py-1 gap-1.5',
  };

  const variantStyles: Record<ColorVariant, string> = {
    primary: 'bg-[#E6007E]/10 text-[#E6007E] border border-pink-200/80 dark:border-pink-900/50',
    secondary: 'bg-white/80 dark:bg-zinc-800 text-[#1D1D1F] dark:text-zinc-200 border border-slate-200 dark:border-zinc-700',
    accent: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800',
    gold: 'bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30',
    success: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800',
    warning: 'bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200 dark:border-amber-800',
    danger: 'bg-rose-50 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300 border border-rose-200 dark:border-rose-800',
    neutral: 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-700',
  };

  return (
    <span className={`inline-flex items-center font-bold rounded-full border shadow-2xs font-mono uppercase tracking-wider ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {icon}
      <span>{children}</span>
    </span>
  );
};