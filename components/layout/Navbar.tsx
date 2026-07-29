'use client';

import React from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/ui/brand-logo';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#F9F8F6]/90 backdrop-blur-md border-b border-[#E8DFD8]">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6">
        {/* LOGO BÖLÜMÜ */}
        <Link href="/" className="flex items-center gap-3">
          <BrandLogo variant="main" width={170} height={38} />
        </Link>

        {/* MENÜ LİNKLERİ */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/firmalar"
            className="text-sm font-medium text-[#1A1A1A] hover:text-[#C5A059] transition-colors"
          >
            Düğün Mekanları
          </Link>
          <Link
            href="/kategori/fotografci"
            className="text-sm font-medium text-[#1A1A1A] hover:text-[#C5A059] transition-colors"
          >
            Tedarikçiler
          </Link>
          <Link
            href="/ai-asistan"
            className="flex items-center gap-1.5 text-sm font-semibold text-[#6E7A6E] hover:opacity-80 transition-opacity"
          >
            <span>✨ AI Düğün Asistanı</span>
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium text-[#1A1A1A] hover:text-[#C5A059] transition-colors"
          >
            İlham & Dergi
          </Link>
        </nav>

        {/* SAĞ AKSİYON HIZLI BAŞLANGIÇ */}
        <div className="flex items-center gap-4">
          <Link
            href="/firma-katil"
            className="hidden text-xs uppercase tracking-wider text-[#666666] hover:text-[#1A1A1A] transition-colors sm:inline-block"
          >
            Firma Katılımı
          </Link>
          <Link
            href="/giris"
            className="px-3 py-2 text-sm font-medium text-[#1A1A1A] hover:text-[#C5A059] transition-colors"
          >
            Giriş Yap
          </Link>
          <Link
            href="/kayit"
            className="rounded-full bg-[#1A1A1A] px-5 py-2.5 text-sm font-medium text-[#F9F8F6] shadow-sm hover:bg-[#333333] transition-all"
          >
            Ücretsiz Planla
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;