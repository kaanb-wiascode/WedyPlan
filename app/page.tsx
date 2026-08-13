'use client';

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PublicNavbar from "@/components/public/PublicNavbar";
import PublicFooter from "@/components/public/homepage/PublicFooter";
import { HomepageLeadWidget } from "@/components/public/catalog/HomepageLeadWidget";
import { CatalogCard } from "@/components/public/catalog/CatalogCard";
import { Search, MapPin, ArrowRight, BookOpen } from "lucide-react";
import {
  CATALOG_CATEGORIES,
  CATALOG_CITIES,
  CATALOG_GROUPS,
  MAJOR_CITY_SLUGS,
  catalogHref,
  categoriesInGroup,
} from "@/lib/catalog/taxonomy";
import { categoryCover, cityCover } from "@/lib/catalog/media";
import { getCatalogListings } from "@/lib/catalog/listings";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [city, setCity] = useState("Tüm Şehirler");
  const [categorySlug, setCategorySlug] = useState("dugun-mekanlari");
  const featured = useMemo(
    () => getCatalogListings({ category: "dugun-mekanlari", city: "istanbul", limit: 3 }),
    []
  );
  const topCategories = CATALOG_CATEGORIES.filter((item) => !item.parentSlug).slice(0, 8);
  const majorCities = CATALOG_CITIES.filter((item) => MAJOR_CITY_SLUGS.includes(item.slug));

  const searchHref = () => {
    const q = searchQuery.trim();
    const citySlug = CATALOG_CITIES.find((item) => item.name === city)?.slug;
    if (q) return `/arama?q=${encodeURIComponent(q)}${citySlug ? `&city=${citySlug}` : ""}`;
    return catalogHref(categorySlug, citySlug);
  };

  return (
    <div className="apple-page">
      <PublicNavbar mode="public" />

      <section className="relative px-4 pb-12 pt-16 md:pb-16 md:pt-20">
        <div className="mx-auto max-w-5xl space-y-7 text-center">
          <p className="apple-kicker">Düğün keşfi + planlama</p>
          <h1 className="text-[40px] font-semibold leading-[1.05] tracking-tight text-[#1d1d1f] sm:text-5xl md:text-6xl lg:text-[64px]">
            Mekanı bulun,
            <br />
            düğünü yönetin.
          </h1>
          <p className="mx-auto max-w-2xl text-[17px] leading-relaxed text-[#86868b] md:text-[19px]">
            38 kategoride fiyatı görün, ücretsiz teklif alın. Teklif firma panosuna düşer; bütçe, davetli ve sözleşme aynı yerde yürür.
          </p>

          <div className="apple-panel mx-auto flex max-w-4xl flex-col gap-0 overflow-hidden rounded-[28px] md:flex-row md:items-stretch">
            <div className="flex flex-1 items-center px-5 py-3.5 text-left md:border-r md:border-black/8">
              <Search className="mr-3 h-4 w-4 shrink-0 text-[#86868b]" />
              <div className="w-full">
                <label className="apple-label mb-0">Ne arıyorsunuz?</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Salon, fotoğrafçı, gelinlik..."
                  className="w-full bg-transparent text-[15px] font-medium text-[#1d1d1f] placeholder:text-[#86868b] focus:outline-none"
                />
              </div>
            </div>
            <div className="flex items-center px-5 py-3.5 text-left md:w-48 md:border-r md:border-black/8">
              <div className="w-full">
                <label className="apple-label mb-0">Kategori</label>
                <select
                  value={categorySlug}
                  onChange={(e) => setCategorySlug(e.target.value)}
                  className="w-full cursor-pointer bg-transparent text-[15px] font-medium text-[#1d1d1f] focus:outline-none"
                >
                  {topCategories.map((item) => (
                    <option key={item.slug} value={item.slug}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center px-5 py-3.5 text-left md:w-44 md:border-r md:border-black/8">
              <MapPin className="mr-2 h-4 w-4 shrink-0 text-[#86868b]" />
              <div className="w-full">
                <label className="apple-label mb-0">Şehir</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full cursor-pointer bg-transparent text-[15px] font-medium text-[#1d1d1f] focus:outline-none"
                >
                  <option value="Tüm Şehirler">Tüm şehirler</option>
                  {majorCities.map((item) => (
                    <option key={item.slug} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                  <option disabled>────────</option>
                  {CATALOG_CITIES.filter((item) => !MAJOR_CITY_SLUGS.includes(item.slug)).map((item) => (
                    <option key={item.slug} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="p-3 md:p-2.5">
              <Link href={searchHref()} className="apple-btn apple-btn-inline w-full gap-2 md:h-full md:min-w-[140px]">
                <span>Keşfet</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <p className="text-[13px] text-[#86868b]">Çiftlerden komisyon alınmaz. Teklif ücretsizdir.</p>
        </div>
      </section>

      <HomepageLeadWidget />

      <section className="mx-auto max-w-7xl space-y-8 px-4 py-12 md:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="apple-kicker">Kategoriler</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#1d1d1f] md:text-4xl">
              Nereden başlamak istersiniz?
            </h2>
          </div>
          <Link href="/dugun-mekanlari" className="apple-link hidden text-[15px] sm:inline-flex">
            Tüm kategoriler
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {topCategories.map((cat) => (
            <Link key={cat.slug} href={catalogHref(cat.slug)} className="group">
              <div className="relative h-36 overflow-hidden rounded-[20px] md:h-40">
                <Image
                  src={categoryCover(cat.slug, cat.group)}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3 text-left text-white">
                  <h3 className="text-[13px] font-semibold leading-tight md:text-[14px]">{cat.name}</h3>
                  <p className="mt-0.5 text-[11px] text-white/75">{cat.vendorCount.toLocaleString("tr-TR")}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid gap-8 border-t border-black/8 pt-8 md:grid-cols-5">
          {CATALOG_GROUPS.map((group) => (
            <div key={group.id}>
              <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.08em] text-[#86868b]">{group.name}</p>
              <ul className="space-y-2">
                {categoriesInGroup(group.id).slice(0, 7).map((cat) => (
                  <li key={cat.slug}>
                    <Link href={catalogHref(cat.slug)} className="text-[14px] text-[#1d1d1f] hover:text-[#0071e3]">
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-6 px-4 py-8 md:px-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="apple-kicker">Öne çıkanlar</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#1d1d1f]">İstanbul düğün mekanları</h2>
          </div>
          <Link href="/dugun-mekanlari/istanbul" className="apple-link text-[15px]">
            Tümünü gör
          </Link>
        </div>
        <div className="space-y-4">
          {featured.map((vendor) => (
            <CatalogCard key={vendor.id} vendor={vendor} layout="list" />
          ))}
        </div>
      </section>

      <section className="px-4 py-14 md:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div>
            <p className="apple-kicker">Şehirler</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#1d1d1f] md:text-4xl">
              En çok aranan iller
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {majorCities.map((cityRecord) => (
              <Link
                key={cityRecord.slug}
                href={catalogHref("dugun-mekanlari", cityRecord.slug)}
                className="apple-panel group overflow-hidden rounded-[24px]"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={cityCover(cityRecord.slug)}
                    alt={cityRecord.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-[17px] font-semibold tracking-tight text-[#1d1d1f]">{cityRecord.name}</h3>
                  <p className="mt-1 text-[13px] text-[#86868b]">
                    {cityRecord.districts.slice(0, 3).join(", ")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-10 px-4 py-14 md:px-8">
        <div className="max-w-2xl">
          <p className="apple-kicker">Rehber</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#1d1d1f] md:text-4xl">
            Karar vermeyi kolaylaştıran yazılar
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {[
            {
              title: "Düğün bütçesi nasıl planlanır?",
              cat: "Bütçe",
              desc: "Sürpriz kalemleri baştan görün, teklifleri aynı yerde karşılaştırın.",
            },
            {
              title: "Mekan seçerken kapasite ve menü",
              cat: "Mekan",
              desc: "Hafta içi / hafta sonu fiyatı ve tadım randevusunu netleştirin.",
            },
            {
              title: "Tekliften sözleşmeye kadar",
              cat: "İşleyiş",
              desc: "Onaylanan teklif firma panosunda takvim ve sözleşmeye döner.",
            },
          ].map((blog) => (
            <Link key={blog.title} href="/blog" className="apple-panel flex flex-col justify-between rounded-[24px] p-7">
              <div className="space-y-3">
                <span className="apple-chip">{blog.cat}</span>
                <h3 className="text-[20px] font-semibold leading-snug tracking-tight text-[#1d1d1f]">{blog.title}</h3>
                <p className="text-[14px] leading-relaxed text-[#86868b]">{blog.desc}</p>
              </div>
              <span className="apple-link mt-6 inline-flex items-center text-[14px]">
                <BookOpen className="mr-1.5 h-3.5 w-3.5" /> Oku
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 pb-20 md:px-8">
        <div className="apple-panel mx-auto max-w-5xl rounded-[28px] px-6 py-14 text-center md:px-12">
          <p className="apple-kicker">Firmalar için</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#1d1d1f] md:text-4xl">
            Talebi alın, takvimi ve sözleşmeyi yönetin
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-[#86868b]">
            WedyPlan yalnızca vitrin değil. CRM, takvim, sözleşme ve finans aynı panelde.
          </p>
          <div className="pt-8">
            <Link href="/firma-katil" className="apple-btn apple-btn-inline">
              Firma hesabı oluşturun
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
