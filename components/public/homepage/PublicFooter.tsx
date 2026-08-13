'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MapPin } from 'lucide-react';
import { BrandLogo } from '@/components/ui/brand-logo';
import { CATALOG_CATEGORIES, CATALOG_CITIES, MAJOR_CITY_SLUGS, catalogHref } from '@/lib/catalog/taxonomy';

export function PublicFooter() {
  const router = useRouter();
  const majorCities = CATALOG_CITIES.filter((c) => MAJOR_CITY_SLUGS.includes(c.slug));
  const topCategories = CATALOG_CATEGORIES.filter((c) => !c.parentSlug).slice(0, 6);

  return (
    <footer className="relative z-20 border-t border-black/8 bg-[#f5f5f7] pb-10 pt-10 text-[#6e6e73]">
      <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 md:gap-10">
          <div className="col-span-2 space-y-4 md:col-span-2">
            <Link href="/" className="inline-flex">
              <BrandLogo variant="main" size="md" />
            </Link>
            <p className="max-w-xs text-[13px] leading-relaxed">
              Düğün keşfi ve düğün işletim sistemi. Çiftlerden komisyon alınmaz.
            </p>
            <div className="flex max-w-sm items-center gap-3 rounded-2xl border border-black/8 bg-white px-3.5 py-2.5">
              <MapPin className="h-4 w-4 shrink-0 text-[#0071e3]" />
              <div className="min-w-0 flex-1">
                <label htmlFor="footer-city" className="block text-[10px] font-medium uppercase tracking-[0.08em] text-[#86868b]">
                  81 ilde keşfet
                </label>
                <select
                  id="footer-city"
                  defaultValue=""
                  onChange={(e) => {
                    const slug = e.target.value;
                    if (slug) router.push(catalogHref('dugun-mekanlari', slug));
                  }}
                  className="w-full cursor-pointer bg-transparent text-[13px] font-medium text-[#1d1d1f] outline-none"
                >
                  <option value="" disabled>
                    Şehir seçin
                  </option>
                  {CATALOG_CITIES.map((city) => (
                    <option key={city.slug} value={city.slug}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="apple-kicker">Kategoriler</h4>
            <ul className="space-y-2 text-[13px]">
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
            <ul className="space-y-2 text-[13px]">
              {majorCities.map((city) => (
                <li key={city.slug}>
                  <Link href={catalogHref('dugun-mekanlari', city.slug)} className="hover:text-[#1d1d1f]">
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="apple-kicker">Planlama</h4>
            <ul className="space-y-2 text-[13px]">
              <li><Link href="/ai-asistan" className="hover:text-[#1d1d1f]">AI asistan</Link></li>
              <li><Link href="/butce-hesaplayici" className="hover:text-[#1d1d1f]">Bütçe</Link></li>
              <li><Link href="/hizli-teklif" className="hover:text-[#1d1d1f]">Teklif al</Link></li>
              <li><Link href="/firma-katil" className="hover:text-[#1d1d1f]">Firma katılımı</Link></li>
              <li><Link href="/blog" className="hover:text-[#1d1d1f]">Rehber</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-black/8 pt-5 text-[12px] md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} WedyPlan</div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/gizlilik-politikasi" className="hover:text-[#1d1d1f]">Gizlilik</Link>
            <Link href="/kullanim-kosullari" className="hover:text-[#1d1d1f]">Koşullar</Link>
            <Link href="/kvkk" className="hover:text-[#1d1d1f]">KVKK</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default PublicFooter;
