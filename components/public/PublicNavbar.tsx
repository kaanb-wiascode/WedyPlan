'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/ui/brand-logo';

interface PublicNavbarProps {
  mode?: 'public' | 'vendor';
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({ mode = 'public' }) => {
  const isVendor = mode === 'vendor';
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/arama?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const linkClass =
    'text-[12px] font-normal text-[#1d1d1f] hover:text-[#86868b] transition-colors';

  const menuPanel =
    'absolute top-full left-0 pt-2 w-64 animate-in fade-in slide-in-from-top-1 duration-150';

  const menuInner =
    'apple-glass rounded-2xl p-2 space-y-0.5';

  return (
    <header className="apple-glass-nav sticky top-0 z-50">
      <nav className="mx-auto flex h-12 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex shrink-0 items-center opacity-90 hover:opacity-100">
          <BrandLogo variant={isVendor ? 'vendor' : 'default'} width={118} height={26} className="h-[22px] w-auto" />
        </Link>

        {!isVendor ? (
          <div className="hidden items-center gap-7 lg:flex">
            <div
              className="relative py-3"
              onMouseEnter={() => setActiveDropdown('mekanlar')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link href="/mekanlar" className={linkClass}>
                Mekanlar
              </Link>
              {activeDropdown === 'mekanlar' && (
                <div className={menuPanel}>
                  <div className={menuInner}>
                    <Link href="/mekanlar/dugun-salonlari" className="block rounded-xl px-3 py-2 text-[13px] text-[#1d1d1f] hover:bg-white/50">Düğün Salonları</Link>
                    <Link href="/mekanlar/kir-bahceleri" className="block rounded-xl px-3 py-2 text-[13px] text-[#1d1d1f] hover:bg-white/50">Kır Düğünü Mekanları</Link>
                    <Link href="/mekanlar/oteller" className="block rounded-xl px-3 py-2 text-[13px] text-[#1d1d1f] hover:bg-white/50">Otel Davet Alanları</Link>
                    <Link href="/mekanlar/tarihi-mekanlar" className="block rounded-xl px-3 py-2 text-[13px] text-[#1d1d1f] hover:bg-white/50">Tarihi Mekanlar</Link>
                  </div>
                </div>
              )}
            </div>

            <div
              className="relative py-3"
              onMouseEnter={() => setActiveDropdown('firmalar')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link href="/firmalar" className={linkClass}>
                Firmalar
              </Link>
              {activeDropdown === 'firmalar' && (
                <div className={menuPanel}>
                  <div className={menuInner}>
                    <Link href="/firmalar/fotografcilar" className="block rounded-xl px-3 py-2 text-[13px] text-[#1d1d1f] hover:bg-white/50">Fotoğraf & Video</Link>
                    <Link href="/firmalar/organizasyon" className="block rounded-xl px-3 py-2 text-[13px] text-[#1d1d1f] hover:bg-white/50">Organizasyon</Link>
                    <Link href="/firmalar/muzik" className="block rounded-xl px-3 py-2 text-[13px] text-[#1d1d1f] hover:bg-white/50">Müzik & DJ</Link>
                    <Link href="/firmalar/kuator" className="block rounded-xl px-3 py-2 text-[13px] text-[#1d1d1f] hover:bg-white/50">Saç & Makyaj</Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/gelinlik-modelleri" className={linkClass}>Moda</Link>
            <Link href="/ceyiz" className={linkClass}>Çeyiz</Link>
            <Link href="/kampanyalar" className={linkClass}>Fırsatlar</Link>
            <Link href="/blog" className={linkClass}>Rehber</Link>
          </div>
        ) : (
          <div className="hidden items-center gap-8 lg:flex">
            <Link href="#cozumler" className={linkClass}>Çözümler</Link>
            <Link href="#neden-wedyplan" className={linkClass}>Neden WedyPlan</Link>
            <Link href="#paketler" className={linkClass}>Paketler</Link>
            <Link href="#referanslar" className={linkClass}>Hikayeler</Link>
          </div>
        )}

        <div className="flex items-center gap-3">
          {!isVendor && (
            <form onSubmit={handleSearch} className="hidden items-center xl:flex">
              <input
                type="text"
                placeholder="Ara"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-24 rounded-full border-0 bg-black/5 px-3 py-1.5 text-[12px] text-[#1d1d1f] outline-none placeholder:text-[#86868b] focus:w-40 focus:bg-white/70"
              />
            </form>
          )}

          {!isVendor ? (
            <>
              <Link href="/hizli-teklif" className="text-[12px] text-[#0071e3] hover:underline">
                Teklif al
              </Link>
              <Link
                href="/giris"
                className="rounded-full bg-[#0071e3] px-3.5 py-1.5 text-[12px] font-medium text-white hover:bg-[#0077ed]"
              >
                Giriş yap
              </Link>
            </>
          ) : (
            <>
              <Link href="/giris?role=VENDOR" className="text-[12px] text-[#1d1d1f] hover:text-[#0071e3]">
                Firma girişi
              </Link>
              <Link
                href="/firma-katil/onboarding"
                className="rounded-full bg-[#0071e3] px-3.5 py-1.5 text-[12px] font-medium text-white hover:bg-[#0077ed]"
              >
                Başvurun
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default PublicNavbar;
