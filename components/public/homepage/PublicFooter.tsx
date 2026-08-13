'use client';

import React from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/ui/brand-logo';
import { CATALOG_CATEGORIES, CATALOG_CITIES, MAJOR_CITY_SLUGS, catalogHref } from '@/lib/catalog/taxonomy';

export function PublicFooter() {
  const majorCities = CATALOG_CITIES.filter((c) => MAJOR_CITY_SLUGS.includes(c.slug));
  const topCategories = CATALOG_CATEGORIES.filter((c) => !c.parentSlug).slice(0, 10);

  return (
    <footer className="relative z-20 border-t border-black/8 bg-[#f5f5f7] pb-12 pt-12 text-[#6e6e73]">
      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-12">
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="inline-flex">
              <BrandLogo variant="main" size="footer" />
            </Link>
            <p className="text-[14px] leading-relaxed">
              Düğün keşfi ve düğün işletim sistemi. Çiftlerden komisyon alınmaz.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="apple-kicker">Kategoriler</h4>
            <ul className="space-y-2.5 text-[14px]">
              {topCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={catalogHref(cat.slug)} className="hover:text-[#1d1d1f]">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="apple-kicker">Şehirler</h4>
            <ul className="space-y-2.5 text-[14px]">
              {majorCities.map((city) => (
                <li key={city.slug}>
                  <Link href={catalogHref('dugun-mekanlari', city.slug)} className="hover:text-[#1d1d1f]">
                    {city.name} düğün mekanları
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="apple-kicker">Planlama</h4>
            <ul className="space-y-2.5 text-[14px]">
              <li><Link href="/ai-asistan" className="hover:text-[#1d1d1f]">AI Düğün Asistanı</Link></li>
              <li><Link href="/butce-hesaplayici" className="hover:text-[#1d1d1f]">Bütçe Hesaplayıcı</Link></li>
              <li><Link href="/hizli-teklif" className="hover:text-[#1d1d1f]">Ücretsiz teklif al</Link></li>
              <li><Link href="/firma-katil" className="hover:text-[#1d1d1f]">Firma Katılımı</Link></li>
              <li><Link href="/blog" className="hover:text-[#1d1d1f]">Düğün Dergisi</Link></li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {CATALOG_CITIES.map((city) => (
            <Link
              key={city.slug}
              href={catalogHref('dugun-mekanlari', city.slug)}
              className="text-[12px] text-[#6e6e73] hover:text-[#1d1d1f]"
            >
              {city.name}
            </Link>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-black/8 pt-6 text-[13px] md:flex-row">
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
