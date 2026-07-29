'use client';

import Link from 'next/link';
import { BrandLogo } from '@/components/ui/brand-logo';

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#F9F8F6]/90 backdrop-blur-md border-b border-[#E8DFD8]">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Sol: Ana Sayfa Logosu */}
        <div className="flex items-center gap-8">
          <BrandLogo variant="main" width={170} height={38} />

          {/* Menü Linkleri */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#1A1A1A]">
            <Link href="/firmalar" className="hover:text-[#C5A059] transition-colors">
              Düğün Mekanları
            </Link>
            <Link href="/kategori/fotografci" className="hover:text-[#C5A059] transition-colors">
              Tedarikçiler
            </Link>
            <Link href="/ai-asistan" className="flex items-center gap-1.5 text-[#6E7A6E] font-semibold hover:opacity-80 transition-opacity">
              <span>✨ AI Düğün Asistanı</span>
            </Link>
            <Link href="/blog" className="hover:text-[#C5A059] transition-colors">
              İlham & Dergi
            </Link>
          </nav>
        </div>

        {/* Sağ: Aksiyon Butonları */}
        <div className="flex items-center gap-4">
          <Link
            href="/firma-katil"
            className="hidden sm:inline-block text-xs uppercase tracking-wider text-[#666666] hover:text-[#1A1A1A] transition-colors"
          >
            Firma Katılımı
          </Link>
          <Link
            href="/giris"
            className="text-sm font-medium text-[#1A1A1A] hover:text-[#C5A059] transition-colors px-3 py-2"
          >
            Giriş Yap
          </Link>
          <Link
            href="/kayit"
            className="bg-[#1A1A1A] text-[#F9F8F6] text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#333333] transition-all duration-200 shadow-sm"
          >
            Ücretsiz Planla
          </Link>
        </div>
      </div>
    </header>
  );
}