'use client';

import React from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/ui/brand-logo';

export function PublicFooter() {
  return (
    <footer className="bg-[#111111] text-[#E5E5E5] pt-16 pb-12 border-t border-[#262626]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[#262626]">
          {/* Sol Sütun: Güncellenmiş Yeni Logo ve Açıklama */}
          <div className="md:col-span-2 space-y-4">
            <div className="inline-block">
              {/* brightness-0 invert filtresi sayesinde siyah renkli logo koyu zeminde bembeyaz ve şeffaf görünür */}
              <BrandLogo variant="main" width={180} height={40} className="brightness-0 invert" />
            </div>
            <p className="text-xs text-[#A3A3A3] leading-relaxed max-w-sm">
              Hayalinizdeki düğünü akıllı asistanınızla planlayın. En seçkin mekanlar, güvenilir tedarikçiler ve kesintisiz bütçe yönetimi tek bir editoryal stüdyoda.
            </p>
          </div>

          {/* Sütun 2: Keşfet */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">Keşfet</h4>
            <ul className="space-y-2 text-xs text-[#A3A3A3]">
              <li><Link href="/firmalar" className="hover:text-white transition-colors">Düğün Mekanları</Link></li>
              <li><Link href="/kategori/fotografci" className="hover:text-white transition-colors">Fotoğrafçılar</Link></li>
              <li><Link href="/kategori/gelinlik" className="hover:text-white transition-colors">Gelinlik & Moda</Link></li>
              <li><Link href="/kategori/organizasyon" className="hover:text-white transition-colors">Organizasyon</Link></li>
            </ul>
          </div>

          {/* Sütun 3: Planlama Araçları */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">Planlama Araçları</h4>
            <ul className="space-y-2 text-xs text-[#A3A3A3]">
              <li><Link href="/ai-asistan" className="hover:text-white transition-colors">AI Düğün Asistanı</Link></li>
              <li><Link href="/cift/butce" className="hover:text-white transition-colors">Bütçe Hesaplayıcı</Link></li>
              <li><Link href="/cift/davetliler" className="hover:text-white transition-colors">Davetli Listesi & LCV</Link></li>
              <li><Link href="/cift/gorevler" className="hover:text-white transition-colors">Zaman Çizelgesi</Link></li>
            </ul>
          </div>

          {/* Sütun 4: Kurumsal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">Kurumsal</h4>
            <ul className="space-y-2 text-xs text-[#A3A3A3]">
              <li><Link href="/firma-katil" className="hover:text-white transition-colors">Firma Katılımı</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Düğün Dergisi</Link></li>
              <li><Link href="/giris" className="hover:text-white transition-colors">Giriş Yap</Link></li>
              <li><Link href="/kayit" className="hover:text-white transition-colors">Ücretsiz Başla</Link></li>
            </ul>
          </div>
        </div>

        {/* Telif & Alt Bilgi */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#737373] gap-4">
          <p>© {new Date().getFullYear()} WedyPlan Wedding Studio. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-[#A3A3A3] transition-colors">Gizlilik Politikası</Link>
            <Link href="#" className="hover:text-[#A3A3A3] transition-colors">Kullanım Koşulları</Link>
            <Link href="#" className="hover:text-[#A3A3A3] transition-colors">KVKK Aydınlatma Metni</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default PublicFooter;