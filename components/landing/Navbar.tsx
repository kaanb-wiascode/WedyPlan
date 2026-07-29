'use client';

import React from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/ui/brand-logo';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#F9F8F6]/90 backdrop-blur-md border-b border-[#E8DFD8]">
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2">
          {/* Güncellenmiş BrandLogo props kullanımı */}
          <BrandLogo variant="main" width={170} height={38} />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          <li>
            <Link href="/firmalar" className="text-sm font-medium text-[#1A1A1A] hover:text-[#C5A059] transition-colors">
              Düğün Mekanları
            </Link>
          </li>
          <li>
            <Link href="/kategori/fotografci" className="text-sm font-medium text-[#1A1A1A] hover:text-[#C5A059] transition-colors">
              Tedarikçiler
            </Link>
          </li>
          <li>
            <Link href="/ai-asistan" className="flex items-center gap-1.5 text-sm font-semibold text-[#6E7A6E] hover:opacity-80 transition-opacity">
              <span>✨ AI Düğün Asistanı</span>
            </Link>
          </li>
          <li>
            <Link href="/blog" className="text-sm font-medium text-[#1A1A1A] hover:text-[#C5A059] transition-colors">
              İlham & Dergi
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <Link
            href="/giris"
            className="text-sm font-medium text-[#1A1A1A] hover:text-[#C5A059] transition-colors px-3 py-2"
          >
            Giriş Yap
          </Link>
          <Link
            href="/kayit"
            className="bg-[#1A1A1A] text-[#F9F8F6] text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#333333] transition-all shadow-sm"
          >
            Ücretsiz Planla
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;