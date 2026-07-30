'use client';

import React from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/ui/brand-logo';

interface AuthCardLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthCardLayout({ children, title, subtitle }: AuthCardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#E5E5E5] flex flex-col justify-center items-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-[#EFEFEF] border border-[#D5D5D5] rounded-3xl p-8 shadow-sm space-y-6">
        {/* Üst Logo */}
        <div className="flex flex-col items-center justify-center text-center space-y-3">
          <BrandLogo variant="main" width={180} height={40} />
          <h1 className="text-2xl font-serif font-bold text-[#111111] mt-2">{title}</h1>
          <p className="text-xs text-[#666666]">{subtitle}</p>
        </div>

        {/* Form İçeriği */}
        <div className="space-y-4">
          {children}
        </div>

        {/* Alt Dönüş Linki */}
        <div className="text-center pt-4 border-t border-[#E0E0E0]">
          <Link href="/" className="text-xs text-[#666666] hover:text-[#111111] transition-colors">
            ← Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AuthCardLayout;