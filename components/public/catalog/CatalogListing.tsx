"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, LayoutGrid, List, Search, SlidersHorizontal } from "lucide-react";
import type { CatalogCategory, CatalogCity } from "@/lib/catalog/taxonomy";
import { CATALOG_CITIES, CATALOG_CATEGORIES, MAJOR_CITY_SLUGS, catalogHref } from "@/lib/catalog/taxonomy";
import type { CatalogVendor } from "@/lib/catalog/listings";
import { CatalogCard } from "./CatalogCard";

type SortKey = "RECOMMENDED" | "RATING" | "PRICE_LOW" | "PRICE_HIGH";

type CatalogListingProps = {
  title: string;
  description: string;
  category?: CatalogCategory | null;
  city?: CatalogCity | null;
  listings: CatalogVendor[];
  showCityStrip?: boolean;
};

export function CatalogListing({
  title,
  description,
  category,
  city,
  listings,
  showCityStrip = true,
}: CatalogListingProps) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("RECOMMENDED");
  const [saved, setSaved] = useState<string[]>([]);
  const [sortOpen, setSortOpen] = useState(false);
  const [layout, setLayout] = useState<"grid" | "list">("list");
  const [district, setDistrict] = useState<string | null>(null);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [campaignOnly, setCampaignOnly] = useState(false);
  const [capacity, setCapacity] = useState<"ALL" | "S" | "M" | "L">("ALL");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const children = category
    ? CATALOG_CATEGORIES.filter((item) => item.parentSlug === category.slug)
    : [];
  const majorCities = CATALOG_CITIES.filter((item) => MAJOR_CITY_SLUGS.includes(item.slug));
  const districts = city?.districts ?? [];

  const filtered = useMemo(() => {
    const q = search.trim().toLocaleLowerCase("tr-TR");
    let items = listings;
    if (q) {
      items = items.filter(
        (v) =>
          v.name.toLocaleLowerCase("tr-TR").includes(q) ||
          v.district.toLocaleLowerCase("tr-TR").includes(q) ||
          v.city.toLocaleLowerCase("tr-TR").includes(q)
      );
    }
    if (district) items = items.filter((v) => v.district === district);
    if (verifiedOnly) items = items.filter((v) => v.isVerified);
    if (campaignOnly) items = items.filter((v) => Boolean(v.discountPct));
    if (capacity !== "ALL") {
      items = items.filter((v) => {
        if (v.capacityMax <= 0) return true;
        if (capacity === "S") return v.capacityMax <= 250;
        if (capacity === "M") return v.capacityMin <= 400 && v.capacityMax >= 200;
        return v.capacityMax >= 500;
      });
    }
    const copy = [...items];
    if (sortBy === "RATING") copy.sort((a, b) => b.rating - a.rating);
    if (sortBy === "PRICE_LOW") copy.sort((a, b) => a.price - b.price);
    if (sortBy === "PRICE_HIGH") copy.sort((a, b) => b.price - a.price);
    return copy;
  }, [listings, search, sortBy, district, verifiedOnly, campaignOnly, capacity]);

  const sortOptions: { key: SortKey; label: string }[] = [
    { key: "RECOMMENDED", label: "Önerilen" },
    { key: "RATING", label: "En yüksek puan" },
    { key: "PRICE_LOW", label: "Fiyat (artan)" },
    { key: "PRICE_HIGH", label: "Fiyat (azalan)" },
  ];
  const sortLabel = sortOptions.find((item) => item.key === sortBy)?.label ?? "Önerilen";

  const chip = (active: boolean) =>
    `shrink-0 rounded-full px-3.5 py-2 text-[13px] font-medium transition ${
      active ? "bg-[#1d1d1f] text-white" : "bg-white text-[#1d1d1f] ring-1 ring-black/8 hover:bg-[#f5f5f7]"
    }`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-10">
      <header className="max-w-3xl space-y-2">
        <p className="apple-kicker">{category?.name ?? "Keşfet"}</p>
        <h1 className="text-[32px] font-semibold tracking-tight text-[#1d1d1f] md:text-[40px]">{title}</h1>
        <p className="text-[15px] leading-relaxed text-[#86868b]">{description}</p>
      </header>

      {children.length > 0 ? (
        <div className="mt-6 flex flex-wrap gap-2">
          {children.map((child) => (
            <Link key={child.slug} href={catalogHref(child.slug, city?.slug)} className={chip(false)}>
              {child.name}
            </Link>
          ))}
        </div>
      ) : null}

      {showCityStrip ? (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          <Link href={category ? catalogHref(category.slug) : "/dugun-mekanlari"} className={chip(!city)}>
            Tüm şehirler
          </Link>
          {majorCities.map((item) => (
            <Link
              key={item.slug}
              href={catalogHref(category?.slug ?? "dugun-mekanlari", item.slug)}
              className={chip(city?.slug === item.slug)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      ) : null}

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className={`apple-panel h-fit space-y-5 rounded-[22px] p-5 ${filtersOpen ? "block" : "hidden lg:block"}`}>
          <div className="flex items-center justify-between">
            <h2 className="text-[15px] font-semibold text-[#1d1d1f]">Filtreler</h2>
            <button
              type="button"
              className="text-[12px] text-[#0071e3]"
              onClick={() => {
                setDistrict(null);
                setVerifiedOnly(false);
                setCampaignOnly(false);
                setCapacity("ALL");
                setSearch("");
              }}
            >
              Temizle
            </button>
          </div>

          {districts.length > 1 ? (
            <div>
              <p className="mb-2 text-[12px] font-medium uppercase tracking-wide text-[#86868b]">İlçe</p>
              <div className="flex flex-wrap gap-1.5">
                {districts.map((item) => (
                  <button key={item} type="button" onClick={() => setDistrict(district === item ? null : item)} className={chip(district === item)}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div>
            <p className="mb-2 text-[12px] font-medium uppercase tracking-wide text-[#86868b]">Kapasite</p>
            <div className="flex flex-wrap gap-1.5">
              {([
                ["ALL", "Tümü"],
                ["S", "250’ye kadar"],
                ["M", "200–400"],
                ["L", "500+"],
              ] as const).map(([key, label]) => (
                <button key={key} type="button" onClick={() => setCapacity(key)} className={chip(capacity === key)}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <label className="flex cursor-pointer items-center gap-2 text-[14px] text-[#1d1d1f]">
            <input type="checkbox" checked={verifiedOnly} onChange={(e) => setVerifiedOnly(e.target.checked)} className="accent-[#0071e3]" />
            Yalnızca onaylı
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-[14px] text-[#1d1d1f]">
            <input type="checkbox" checked={campaignOnly} onChange={(e) => setCampaignOnly(e.target.checked)} className="accent-[#0071e3]" />
            Kampanyalı ilanlar
          </label>

          {!city ? (
            <div>
              <p className="mb-2 text-[12px] font-medium uppercase tracking-wide text-[#86868b]">Tüm iller</p>
              <div className="max-h-48 overflow-y-auto pr-1">
                {CATALOG_CITIES.map((item) => (
                  <Link
                    key={item.slug}
                    href={catalogHref(category?.slug ?? "dugun-mekanlari", item.slug)}
                    className="block rounded-lg px-2 py-1.5 text-[13px] text-[#1d1d1f] hover:bg-[#f5f5f7]"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </aside>

        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              className="apple-btn-secondary apple-btn-compact inline-flex lg:hidden"
              onClick={() => setFiltersOpen((open) => !open)}
            >
              <SlidersHorizontal className="h-4 w-4" /> Filtreler
            </button>
            <div className="flex flex-1 items-center gap-2 rounded-full bg-white px-4 py-2.5 ring-1 ring-black/8">
              <Search className="h-4 w-4 text-[#86868b]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Firma veya ilçe ara"
                className="w-full bg-transparent text-[14px] text-[#1d1d1f] outline-none placeholder:text-[#86868b]"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSortOpen((open) => !open)}
                  className="inline-flex h-10 items-center gap-1 rounded-full bg-white px-4 text-[13px] font-medium ring-1 ring-black/8"
                >
                  {sortLabel} <ChevronDown className="h-4 w-4" />
                </button>
                {sortOpen ? (
                  <div className="apple-panel absolute right-0 z-20 mt-2 w-48 rounded-2xl p-2">
                    {sortOptions.map((option) => (
                      <button
                        key={option.key}
                        type="button"
                        onClick={() => {
                          setSortBy(option.key);
                          setSortOpen(false);
                        }}
                        className="block w-full rounded-xl px-3 py-2 text-left text-[13px] hover:bg-[#f5f5f7]"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="flex rounded-full bg-white p-1 ring-1 ring-black/8">
                <button type="button" onClick={() => setLayout("list")} className={`rounded-full p-2 ${layout === "list" ? "bg-[#1d1d1f] text-white" : "text-[#86868b]"}`} aria-label="Liste">
                  <List className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => setLayout("grid")} className={`rounded-full p-2 ${layout === "grid" ? "bg-[#1d1d1f] text-white" : "text-[#86868b]"}`} aria-label="Izgara">
                  <LayoutGrid className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <p className="text-[13px] text-[#86868b]">
            {filtered.length} ilan · çiftlerden komisyon yok
          </p>

          {filtered.length === 0 ? (
            <div className="apple-panel rounded-[24px] px-6 py-16 text-center">
              <p className="text-[17px] font-semibold text-[#1d1d1f]">Bu filtreyle ilan yok</p>
              <p className="mt-1 text-[14px] text-[#86868b]">İlçeyi veya kapasiteyi genişletin.</p>
            </div>
          ) : layout === "grid" ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {filtered.map((vendor) => (
                <CatalogCard
                  key={vendor.id}
                  vendor={vendor}
                  layout="grid"
                  saved={saved.includes(vendor.id)}
                  onToggleSave={(id) =>
                    setSaved((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
                  }
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((vendor) => (
                <CatalogCard
                  key={vendor.id}
                  vendor={vendor}
                  layout="list"
                  saved={saved.includes(vendor.id)}
                  onToggleSave={(id) =>
                    setSaved((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
                  }
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
