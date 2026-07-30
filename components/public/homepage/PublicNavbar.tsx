'use client';

import Link from 'next/link';
import { BrandLogo } from '@/components/ui/brand-logo';

export function PublicNavbar() {
  return (
    /* sticky top-0 z-50 ve backdrop-blur ile sayfa kayarken sabit kalan Apple tarzı navbar */
    <header className="sticky top-0 z-50 bg-[#E5E5E5]/85 backdrop-blur-md border-b border-[#D5D5D5] transition-all">
      <div className="container mx-auto flex items-center justify-between px-6 py-3.5">
        {/* Sol: Güncellenmiş Yeni Logo */}
        <div className="flex items-center gap-8">
          <BrandLogo variant="main" width={180} height={40} />

          {/* Apple SF Pro fontlu Menü Linkleri */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-[#111111]">
            <Link href="/firmalar" className="hover:text-[#C5A059] transition-colors">
              Düğün Mekanları
            </Link>
            <Link href="/kategori/fotografci" className="hover:text-[#C5A059] transition-colors">
              Tedarikçiler
            </Link>
            <Link href="/ai-asistan" className="flex items-center gap-1 text-[#6E7A6E] font-bold hover:opacity-80 transition-opacity">
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
            className="hidden sm:inline-block text-[11px] font-bold uppercase tracking-wider text-[#666666] hover:text-[#111111] transition-colors"
          >
            Firma Katılımı
          </Link>
          <Link
            href="/giris"
            className="text-xs font-bold text-[#111111] hover:text-[#C5A059] transition-colors px-3 py-2"
          >
            Giriş Yap
          </Link>
          <Link
            href="/kayit"
            className="bg-[#111111] text-[#E5E5E5] text-xs font-bold px-5 py-2.5 rounded-full hover:bg-[#333333] transition-all duration-200 shadow-sm"
          >
            Ücretsiz Planla
          </Link>
        </div>
      </div>
    </header>
  );
}

export default PublicNavbar;