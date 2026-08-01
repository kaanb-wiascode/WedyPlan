'use client';

import React from 'react';
import Link from 'next/link';

export function PublicFooter() {
  return (
    <footer className="bg-[#111113] text-white pt-16 pb-12 border-t border-neutral-800 relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-12">
        
        {/* Üst Kısım: Logo ve Linkler */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          
          {/* Sol: Marka Bilgisi */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="font-serif font-bold text-2xl tracking-tight text-white block">
              wedy<span className="text-[#E6007E]">plan</span>.
            </Link>

            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Hayalinizdeki düğünü akıllı asistanınızla planlayın. En seçkin mekanlar, güvenilir tedarikçiler ve kesintisiz bütçe yönetimi tek bir editoryal stüdyoda.
            </p>
          </div>

          {/* Kolon 1: Keşfet */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest">KEŞFET</h4>
            <ul className="space-y-2 text-xs text-neutral-300 font-light">
              <li><Link href="/firmalar?category=MEKAN" className="hover:text-white transition-colors">Düğün Mekanları</Link></li>
              <li><Link href="/firmalar?category=FOTOGRAF" className="hover:text-white transition-colors">Fotoğrafçılar</Link></li>
              <li><Link href="/gelinlik-modelleri" className="hover:text-white transition-colors">Gelinlik & Moda</Link></li>
              <li><Link href="/firmalar?category=ORGANIZASYON" className="hover:text-white transition-colors">Organizasyon</Link></li>
            </ul>
          </div>

          {/* Kolon 2: Planlama Araçları */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest">PLANLAMA ARAÇLARI</h4>
            <ul className="space-y-2 text-xs text-neutral-300 font-light">
              <li><Link href="/ai-asistan" className="hover:text-white transition-colors">AI Düğün Asistanı</Link></li>
              <li><Link href="/butce-hesaplayici" className="hover:text-white transition-colors">Bütçe Hesaplayıcı</Link></li>
              <li><Link href="/davetli-listesi" className="hover:text-white transition-colors">Davetli Listesi & LCV</Link></li>
              <li><Link href="/dugun-akisi" className="hover:text-white transition-colors">Zaman Çizelgesi</Link></li>
            </ul>
          </div>

          {/* Kolon 3: Kurumsal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest">KURUMSAL</h4>
            <ul className="space-y-2 text-xs text-neutral-300 font-light">
              <li><Link href="/firma-katil" className="hover:text-white transition-colors">Firma Katılımı</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Düğün Dergisi</Link></li>
              <li><Link href="/giris" className="hover:text-white transition-colors">Giriş Yap</Link></li>
              <li><Link href="/kayit" className="hover:text-white transition-colors">Ücretsiz Başla</Link></li>
            </ul>
          </div>

        </div>

        {/* Alt Kısım: Telif Hakkı ve Yasal Metinler */}
        <div className="pt-8 border-t border-neutral-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400 font-light">
          <div>
            © {new Date().getFullYear()} WedyPlan Wedding Studio. Tüm hakları saklıdır.
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link href="/gizlilik-politikasi" className="hover:text-white transition-colors">Gizlilik Politikası</Link>
            <Link href="/kullanim-kosullari" className="hover:text-white transition-colors">Kullanım Koşulları</Link>
            <Link href="/kvkk" className="hover:text-white transition-colors">KVKK Aydınlatma Metni</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

// Hem named import hem de default import uyumu için
export default PublicFooter;