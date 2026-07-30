'use client';

import React from 'react';
import Image from 'next/image';

interface BrandLogoProps {
  variant?: 'main' | 'default' | 'admin' | 'couple' | 'vendor' | 'marketplace';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  width?: number;
  height?: number;
}

export function BrandLogo({ 
  variant = 'main', 
  className = 'h-10 w-auto',
  width = 180,
  height = 48
}: BrandLogoProps) {
  const logoPaths: Record<string, string> = {
    main: '/assets/branding/logo-main.svg',
    default: '/assets/branding/logo-main.svg',
    admin: '/assets/branding/logo-admin.svg',
    couple: '/assets/branding/logo-couple.svg',
    vendor: '/assets/branding/logo-vendor.svg',
    marketplace: '/assets/branding/logo-marketplace.svg',
  };

  const selectedPath = logoPaths[variant] || logoPaths.main;

  return (
    <div className={`relative inline-block ${className}`}>
      <Image
        src={selectedPath}
        alt={`WedyPlan ${variant}`}
        width={width}
        height={height}
        className="object-contain"
        priority
      />
    </div>
  );
}

export default BrandLogo;