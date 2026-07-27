'use client';

import React from 'react';
import { TypographyVariant } from '@/types/design-system';

interface TypographyProps {
  variant?: TypographyVariant;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  as,
  children,
  className = ''
}) => {
  const variantStyles: Record<TypographyVariant, string> = {
    'serif-hero': 'font-serif font-normal text-[36px] sm:text-[56px] leading-tight tracking-tight text-[#1D1D1F] dark:text-white',
    'serif-heading': 'font-serif font-bold text-[28px] sm:text-[36px] leading-snug text-[#1D1D1F] dark:text-white',
    h1: 'font-serif font-bold text-[32px] sm:text-[42px] text-[#1D1D1F] dark:text-white',
    h2: 'font-serif font-semibold text-[24px] sm:text-[30px] text-[#1D1D1F] dark:text-white',
    h3: 'font-bold text-[20px] text-[#1D1D1F] dark:text-white',
    h4: 'font-bold text-[16px] text-[#1D1D1F] dark:text-white',
    body: 'text-[14px] sm:text-[15px] font-light text-[#6E6E73] dark:text-zinc-300 leading-relaxed',
    'body-sm': 'text-[12px] sm:text-[13px] text-[#6E6E73] dark:text-zinc-400 leading-normal',
    caption: 'text-[11px] font-bold text-[#86868B] dark:text-zinc-400 uppercase tracking-wider',
  };

  const defaultElementMap: Record<TypographyVariant, React.ElementType> = {
    'serif-hero': 'h1',
    'serif-heading': 'h2',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    body: 'p',
    'body-sm': 'p',
    caption: 'span',
  };

  const Component = as || defaultElementMap[variant];

  return (
    <Component className={`${variantStyles[variant]} ${className}`}>
      {children}
    </Component>
  );
};