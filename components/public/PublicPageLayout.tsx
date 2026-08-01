'use client';

import React from 'react';
import { PublicNavbar } from '@/components/public/PublicNavbar';
import { PublicFooter } from '@/components/public/homepage/PublicFooter';

interface PublicPageLayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
}

export default function PublicPageLayout({ children, hideFooter = false }: PublicPageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1D1D1F] selection:bg-[#E6007E] selection:text-white relative">
      
      {/* 1. YUKARIDA SİLİKLEŞTİRME EFEKTİ (Top Fade) */}
      {/* Navbar'ın arkasında kalır ve sayfa kaydırılırken metinlerin yumuşakça kaybolmasını sağlar */}
      <div className="fixed top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent pointer-events-none z-30" />

      {/* 2. SABİT NAVBAR (Z-index en yüksek) */}
      <PublicNavbar />

      {/* 3. ANA İÇERİK */}
      {/* Navbar'ın altında kalmaması için pt-28 (padding-top) verdik */}
      <main className="pt-28 pb-24 relative z-10">
        {children}
      </main>

      {/* 4. AŞAĞIDA SİLİKLEŞTİRME EFEKTİ (Bottom Fade) */}
      {/* Ekranın en altına doğru içeriklerin silikleşerek kaybolmasını sağlar */}
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent pointer-events-none z-30" />

      {/* 5. FOOTER */}
      {!hideFooter && <PublicFooter />}
      
    </div>
  );
}