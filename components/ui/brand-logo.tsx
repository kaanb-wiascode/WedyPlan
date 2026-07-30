'use client';

import React from 'react';
import Image from 'next/image';

interface BrandLogoProps {
  variant?: 'main' | 'admin' | 'couple' | 'vendor' | 'marketplace';
  className?: string;
}

export default function BrandLogo({ variant = 'main', className = 'h-10 w-auto' }: BrandLogoProps) {
  const logoPaths = {
    main: '/assets/branding/logo-main.svg',
    admin: '/assets/branding/logo-admin.svg',
    couple: '/assets/branding/logo-couple.svg',
    vendor: '/assets/branding/logo-vendor.svg',
    marketplace: '/assets/branding/logo-marketplace.svg',
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <Image
        src={logoPaths[variant]}
        alt={`WedyPlan ${variant}`}
        width={180}
        height={48}
        className="object-contain"
        priority
      />
    </div>
  );
}