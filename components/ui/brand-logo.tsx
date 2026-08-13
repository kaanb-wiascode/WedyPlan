'use client';

import React from 'react';
import Image from 'next/image';

type LogoVariant = 'main' | 'default' | 'admin' | 'couple' | 'vendor' | 'marketplace';
type LogoSize = 'sm' | 'md' | 'lg' | 'nav' | 'auth' | 'footer' | 'panel';

interface BrandLogoProps {
  variant?: LogoVariant;
  className?: string;
  size?: LogoSize;
  width?: number;
  height?: number;
}

const SIZE_MAP: Record<LogoSize, { width: number; height: number; className: string }> = {
  sm: { width: 176, height: 40, className: 'h-10 w-auto' },
  md: { width: 220, height: 48, className: 'h-12 w-auto' },
  lg: { width: 264, height: 58, className: 'h-14 w-auto' },
  nav: { width: 196, height: 44, className: 'h-9 w-auto sm:h-10' },
  auth: { width: 260, height: 58, className: 'h-12 w-auto sm:h-14' },
  footer: { width: 248, height: 56, className: 'h-12 w-auto sm:h-14' },
  panel: { width: 228, height: 52, className: 'h-12 w-auto' },
};

const LOGO_PATHS: Record<string, string> = {
  main: '/assets/branding/logo-main.svg',
  default: '/assets/branding/logo-main.svg',
  admin: '/assets/branding/logo-admin.svg',
  couple: '/assets/branding/logo-couple.svg',
  vendor: '/assets/branding/logo-vendor.svg',
  marketplace: '/assets/branding/logo-marketplace.svg',
};

export function BrandLogo({
  variant = 'main',
  className,
  size = 'md',
  width,
  height,
}: BrandLogoProps) {
  const preset = SIZE_MAP[size];
  const w = width ?? preset.width;
  const h = height ?? preset.height;

  return (
    <span className={`relative inline-flex shrink-0 items-center ${className || preset.className}`}>
      <Image
        src={LOGO_PATHS[variant] || LOGO_PATHS.main}
        alt="WedyPlan"
        width={w}
        height={h}
        className="h-full w-auto max-w-none object-contain object-left"
        priority
      />
    </span>
  );
}

export default BrandLogo;
