'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/ui/brand-logo';
import { ChevronDown, Menu, Search, X } from 'lucide-react';
import {
  CATALOG_GROUPS,
  CATALOG_CITIES,
  MAJOR_CITY_SLUGS,
  catalogHref,
  categoriesInGroup,
  type CatalogGroupId,
} from '@/lib/catalog/taxonomy';

interface PublicNavbarProps {
  mode?: 'public' | 'vendor';
}

const NAV_LABEL: Record<CatalogGroupId, string> = {
  mekanlar: 'Mekanlar',
  firmalar: 'Firmalar',
  moda: 'Moda',
  organizasyon: 'Organizasyon',
  diger: 'Daha fazlası',
};

const GROUP_HREF: Record<CatalogGroupId, string> = {
  mekanlar: '/dugun-mekanlari',
  firmalar: '/dugun-fotografcilari',
  moda: '/gelinlik',
  organizasyon: '/dugun-organizasyon',
  diger: '/firmalar',
};

const GROUP_CITY_CATEGORY: Record<CatalogGroupId, string> = {
  mekanlar: 'dugun-mekanlari',
  firmalar: 'dugun-fotografcilari',
  moda: 'gelinlik',
  organizasyon: 'dugun-organizasyon',
  diger: 'dugun-mekanlari',
};

export const PublicNavbar: React.FC<PublicNavbarProps> = ({ mode = 'public' }) => {
  const isVendor = mode === 'vendor';
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = (id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(id);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 160);
  };

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    window.location.href = `/arama?q=${encodeURIComponent(q)}`;
  };

  const linkClass =
    'inline-flex items-center gap-1 text-[12px] font-medium tracking-[0.01em] text-[#6e6e73] transition-colors hover:text-[#1d1d1f]';

  const majorCities = CATALOG_CITIES.filter((c) => MAJOR_CITY_SLUGS.includes(c.slug));
  const navGroups = CATALOG_GROUPS.slice(0, 4);

  return (
    <header className="apple-glass-nav sticky top-0 z-50">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 md:h-16 md:px-6">
        <Link href="/" className="flex shrink-0 items-center opacity-90 hover:opacity-100">
          <BrandLogo variant={isVendor ? 'vendor' : 'default'} size="nav" />
        </Link>

        {!isVendor ? (
          <div className="hidden min-w-0 flex-1 items-center justify-center gap-6 xl:gap-7 lg:flex">
            {navGroups.map((group) => (
              <div
                key={group.id}
                className="relative py-3"
                onMouseEnter={() => openMenu(group.id)}
                onMouseLeave={scheduleClose}
              >
                <Link href={GROUP_HREF[group.id]} className={linkClass}>
                  {NAV_LABEL[group.id]}
                  <ChevronDown className={`h-3 w-3 text-[#86868b] transition ${activeDropdown === group.id ? 'rotate-180' : ''}`} />
                </Link>
              </div>
            ))}
            <Link href="/ceyiz" className={linkClass}>Çeyiz</Link>
            <Link href="/kampanyalar" className={linkClass}>Fırsatlar</Link>
            <Link href="/blog" className={linkClass}>Rehber</Link>
          </div>
        ) : (
          <div className="hidden flex-1 items-center justify-center gap-7 lg:flex">
            <Link href="#cozumler" className={linkClass}>Çözümler</Link>
            <Link href="#neden-wedyplan" className={linkClass}>Neden WedyPlan</Link>
            <Link href="#paketler" className={linkClass}>Paketler</Link>
          </div>
        )}

        <div className="flex shrink-0 items-center gap-2">
          {!isVendor && (
            <form onSubmit={handleSearch} className="hidden items-center xl:flex">
              <div className="flex h-9 items-center rounded-full border border-black/8 bg-white/80 px-3">
                <Search className="mr-2 h-3.5 w-3.5 text-[#86868b]" />
                <input
                  type="text"
                  placeholder="Mekan, firma, şehir"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-36 bg-transparent text-[12px] text-[#1d1d1f] outline-none placeholder:text-[#86868b]"
                />
              </div>
            </form>
          )}

          {!isVendor ? (
            <>
              <Link href="/hizli-teklif" className="apple-btn-secondary apple-btn-compact apple-btn-inline hidden sm:inline-flex">
                Teklif al
              </Link>
              <Link href="/giris" className="apple-btn apple-btn-solid apple-btn-compact apple-btn-inline hidden sm:inline-flex">
                Giriş yap
              </Link>
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full lg:hidden"
                onClick={() => setMobileOpen((open) => !open)}
                aria-label="Menü"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </>
          ) : (
            <>
              <Link href="/giris?role=VENDOR" className="apple-btn-secondary apple-btn-compact apple-btn-inline hidden sm:inline-flex">
                Firma girişi
              </Link>
              <Link href="/firma-katil/onboarding" className="apple-btn apple-btn-solid apple-btn-compact apple-btn-inline hidden sm:inline-flex">
                Başvurun
              </Link>
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full lg:hidden"
                onClick={() => setMobileOpen((open) => !open)}
                aria-label="Menü"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </>
          )}
        </div>
      </nav>

      {activeDropdown && !isVendor ? (
        <div
          className="absolute left-0 right-0 top-full hidden lg:block"
          onMouseEnter={() => openMenu(activeDropdown)}
          onMouseLeave={scheduleClose}
        >
          <div className="border-t border-black/8 bg-white/97 shadow-[0_28px_80px_rgba(15,15,20,0.12)] backdrop-blur-xl">
            <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 py-6">
              <div className="col-span-3 border-r border-black/8 pr-5">
                <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#86868b]">
                  {NAV_LABEL[activeDropdown as CatalogGroupId]}
                </p>
                <p className="mt-2 text-[16px] font-semibold leading-snug tracking-tight text-[#1d1d1f]">
                  Kategoriye göre keşfedin
                </p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-[#6e6e73]">
                  Fiyat, ilçe ve kapasiteyle karşılaştırın. Teklif ücretsizdir.
                </p>
                <Link
                  href={GROUP_HREF[activeDropdown as CatalogGroupId]}
                  className="apple-link mt-4 inline-block text-[13px]"
                  onClick={() => setActiveDropdown(null)}
                >
                  Tümünü gör
                </Link>
              </div>
              <div className="col-span-6 grid grid-cols-2 gap-x-4 gap-y-0.5">
                {categoriesInGroup(activeDropdown as CatalogGroupId).map((cat) => (
                  <Link
                    key={cat.slug}
                    href={catalogHref(cat.slug)}
                    onClick={() => setActiveDropdown(null)}
                    className="rounded-lg px-2.5 py-1.5 hover:bg-[#f5f5f7]"
                  >
                    <span className="block text-[12px] font-medium text-[#1d1d1f]">{cat.name}</span>
                    <span className="text-[11px] text-[#86868b]">
                      {cat.vendorCount.toLocaleString('tr-TR')} ilan
                    </span>
                  </Link>
                ))}
              </div>
              <div className="col-span-3 border-l border-black/8 pl-5">
                <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#86868b]">Popüler şehirler</p>
                <div className="mt-2 space-y-0.5">
                  {majorCities.map((city) => (
                    <Link
                      key={city.slug}
                      href={catalogHref(GROUP_CITY_CATEGORY[activeDropdown as CatalogGroupId], city.slug)}
                      onClick={() => setActiveDropdown(null)}
                      className="block rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-[#1d1d1f] hover:bg-[#f5f5f7]"
                    >
                      {city.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {mobileOpen && !isVendor ? (
        <div className="max-h-[80vh] overflow-y-auto border-t border-black/8 bg-white px-5 py-4 lg:hidden">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="flex h-11 items-center rounded-full border border-black/10 bg-[#f5f5f7] px-4">
              <Search className="mr-2 h-4 w-4 text-[#86868b]" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Mekan, firma, şehir"
                className="w-full bg-transparent text-[15px] outline-none"
              />
            </div>
          </form>
          <div className="mb-4 grid grid-cols-2 gap-2">
            <Link href="/giris" onClick={() => setMobileOpen(false)} className="apple-btn apple-btn-solid apple-btn-compact">
              Giriş yap
            </Link>
            <Link href="/hizli-teklif" onClick={() => setMobileOpen(false)} className="apple-btn-secondary apple-btn-compact">
              Teklif al
            </Link>
          </div>
          {CATALOG_GROUPS.map((group) => (
            <div key={group.id} className="mb-5">
              <p className="mb-2 text-[12px] font-medium uppercase tracking-[0.08em] text-[#86868b]">{group.name}</p>
              <div className="grid grid-cols-1 gap-0.5">
                {categoriesInGroup(group.id).map((cat) => (
                  <Link
                    key={cat.slug}
                    href={catalogHref(cat.slug)}
                    className="rounded-lg px-2 py-2 text-[13px] font-medium text-[#1d1d1f]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {mobileOpen && isVendor ? (
        <div className="border-t border-black/8 bg-white px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            <Link href="#cozumler" className="rounded-lg px-2 py-3 text-[15px] font-medium" onClick={() => setMobileOpen(false)}>Çözümler</Link>
            <Link href="#neden-wedyplan" className="rounded-lg px-2 py-3 text-[15px] font-medium" onClick={() => setMobileOpen(false)}>Neden WedyPlan</Link>
            <Link href="#paketler" className="rounded-lg px-2 py-3 text-[15px] font-medium" onClick={() => setMobileOpen(false)}>Paketler</Link>
            <Link href="/giris?role=VENDOR" className="apple-btn-secondary apple-btn-compact mt-3" onClick={() => setMobileOpen(false)}>Firma girişi</Link>
            <Link href="/firma-katil/onboarding" className="apple-btn apple-btn-solid apple-btn-compact mt-2" onClick={() => setMobileOpen(false)}>Başvurun</Link>
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default PublicNavbar;
