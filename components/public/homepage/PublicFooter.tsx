'use client';

import React from 'react';
import Link from 'next/link';

export function PublicFooter() {
  return (
    <footer className="relative z-20 border-t border-black/8 bg-[#f5f5f7] pb-12 pt-12 text-[#6e6e73]">
      <div className="mx-auto max-w-6xl space-y-10 px-6 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-12">
          <div className="space-y-3 md:col-span-1">
            <Link href="/" className="block text-[21px] font-semibold tracking-tight text-[#1d1d1f]">
              WedyPlan
            </Link>
            <p className="text-[12px] leading-relaxed">
              Hayalinizdeki düğünü akıllı asistanınızla planlayın. En seçkin mekanlar, güvenilir tedarikçiler ve kesintisiz bütçe yönetimi.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="apple-kicker">Keşfet</h4>
            <ul className="space-y-2 text-[12px]">
              <li><Link href="/firmalar?category=MEKAN" className="hover:text-[#1d1d1f]">Düğün Mekanları</Link></li>
              <li><Link href="/firmalar?category=FOTOGRAF" className="hover:text-[#1d1d1f]">Fotoğrafçılar</Link></li>
              <li><Link href="/gelinlik-modelleri" className="hover:text-[#1d1d1f]">Gelinlik & Moda</Link></li>
              <li><Link href="/firmalar?category=ORGANIZASYON" className="hover:text-[#1d1d1f]">Organizasyon</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="apple-kicker">Planlama araçları</h4>
            <ul className="space-y-2 text-[12px]">
              <li><Link href="/ai-asistan" className="hover:text-[#1d1d1f]">AI Düğün Asistanı</Link></li>
              <li><Link href="/butce-hesaplayici" className="hover:text-[#1d1d1f]">Bütçe Hesaplayıcı</Link></li>
              <li><Link href="/davetli-listesi" className="hover:text-[#1d1d1f]">Davetli Listesi & LCV</Link></li>
              <li><Link href="/dugun-akisi" className="hover:text-[#1d1d1f]">Zaman Çizelgesi</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="apple-kicker">Kurumsal</h4>
            <ul className="space-y-2 text-[12px]">
              <li><Link href="/firma-katil" className="hover:text-[#1d1d1f]">Firma Katılımı</Link></li>
              <li><Link href="/blog" className="hover:text-[#1d1d1f]">Düğün Dergisi</Link></li>
              <li><Link href="/giris" className="hover:text-[#1d1d1f]">Giriş Yap</Link></li>
              <li><Link href="/kayit" className="hover:text-[#1d1d1f]">Ücretsiz Başla</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-black/8 pt-6 text-[11px] md:flex-row">
          <div>© {new Date().getFullYear()} WedyPlan. Tüm hakları saklıdır.</div>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/gizlilik-politikasi" className="hover:text-[#1d1d1f]">Gizlilik Politikası</Link>
            <Link href="/kullanim-kosullari" className="hover:text-[#1d1d1f]">Kullanım Koşulları</Link>
            <Link href="/kvkk" className="hover:text-[#1d1d1f]">KVKK Aydınlatma Metni</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default PublicFooter;
