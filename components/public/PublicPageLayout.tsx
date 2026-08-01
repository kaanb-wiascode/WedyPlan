'use client';

import React from 'react';
import PublicNavbar from '@/components/public/PublicNavbar';
import PublicFooter from '@/components/public/homepage/PublicFooter';

interface PublicPageLayoutProps {
  children: React.ReactNode;
}

export default function PublicPageLayout({ children }: PublicPageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-neutral-900 font-sans antialiased">
      {/* Üst Navigasyon */}
      <PublicNavbar mode="public" />

      {/* Sayfa İçeriği */}
      <main className="flex-1 pt-24 md:pt-28">
        {children}
      </main>

      {/* Koyu Temiz Footer */}
      <PublicFooter />
    </div>
  );
}