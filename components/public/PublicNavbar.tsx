"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/ui/brand-logo";

interface PublicNavbarProps {
  mode?: "public" | "vendor";
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({ mode = "public" }) => {
  const isVendor = mode === "vendor";
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/arama?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-7xl">
      {/* Cam Efektli Yuvarlatılmış (Pill) Ana Menü */}
      <nav className="flex items-center justify-between px-6 py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200/80 shadow-md shadow-black/5 transition-all">
        
        {/* Sol: Marka Logosu */}
        <div className="flex items-center shrink-0 mr-4">
          <BrandLogo variant={isVendor ? "vendor" : "default"} />
        </div>

        {/* Orta: Tek Kelimelik Net Menü Başlıkları */}
        {!isVendor && (
          <div className="hidden lg:flex items-center gap-5 text-xs font-medium text-neutral-700 whitespace-nowrap">
            
            {/* 1. Mekanlar */}
            <div 
              className="relative py-1"
              onMouseEnter={() => setActiveDropdown("mekanlar")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link href="/mekanlar" className="hover:text-black flex items-center gap-1 transition-colors">
                Mekanlar <span className="text-[9px] text-neutral-400">▾</span>
              </Link>
              {activeDropdown === "mekanlar" && (
                <div className="absolute top-full left-0 w-56 bg-white p-3 rounded-2xl border border-neutral-200 shadow-xl space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2 py-1">Mekan Kategorileri</div>
                  <Link href="/mekanlar/dugun-salonlari" className="block px-3 py-2 rounded-xl hover:bg-neutral-100 text-xs">Düğün Salonları</Link>
                  <Link href="/mekanlar/kir-bahceleri" className="block px-3 py-2 rounded-xl hover:bg-neutral-100 text-xs">Kır Düğünü Mekanları</Link>
                  <Link href="/mekanlar/oteller" className="block px-3 py-2 rounded-xl hover:bg-neutral-100 text-xs">Otel Davet Alanları</Link>
                  <Link href="/mekanlar/tarihi-mekanlar" className="block px-3 py-2 rounded-xl hover:bg-neutral-100 text-xs">Tarihi Mekanlar & Yalılar</Link>
                </div>
              )}
            </div>

            {/* 2. Firmalar */}
            <div 
              className="relative py-1"
              onMouseEnter={() => setActiveDropdown("firmalar")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link href="/firmalar" className="hover:text-black flex items-center gap-1 transition-colors">
                Firmalar <span className="text-[9px] text-neutral-400">▾</span>
              </Link>
              {activeDropdown === "firmalar" && (
                <div className="absolute top-full left-0 w-56 bg-white p-3 rounded-2xl border border-neutral-200 shadow-xl space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2 py-1">Hizmet Sağlayıcılar</div>
                  <Link href="/firmalar/fotografcilar" className="block px-3 py-2 rounded-xl hover:bg-neutral-100 text-xs">Fotoğraf & Video</Link>
                  <Link href="/firmalar/organizasyon" className="block px-3 py-2 rounded-xl hover:bg-neutral-100 text-xs">Organizasyon & Süsleme</Link>
                  <Link href="/firmalar/muzik" className="block px-3 py-2 rounded-xl hover:bg-neutral-100 text-xs">Müzik & DJ</Link>
                  <Link href="/firmalar/kuator" className="block px-3 py-2 rounded-xl hover:bg-neutral-100 text-xs">Gelin Saçı & Makyajı</Link>
                </div>
              )}
            </div>

            {/* 3. Moda */}
            <div 
              className="relative py-1"
              onMouseEnter={() => setActiveDropdown("moda")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link href="/gelinlik-modelleri" className="hover:text-black flex items-center gap-1 transition-colors">
                Moda <span className="text-[9px] text-neutral-400">▾</span>
              </Link>
              {activeDropdown === "moda" && (
                <div className="absolute top-full left-0 w-56 bg-white p-3 rounded-2xl border border-neutral-200 shadow-xl space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2 py-1">Gelinlik & Damatlık</div>
                  <Link href="/gelinlik-modelleri" className="block px-3 py-2 rounded-xl hover:bg-neutral-100 text-xs">Gelinlik Modelleri</Link>
                  <Link href="/damatlik-modelleri" className="block px-3 py-2 rounded-xl hover:bg-neutral-100 text-xs">Damatlık Modelleri</Link>
                  <Link href="/gelinlik-kampanyalari" className="block px-3 py-2 rounded-xl hover:bg-rose-50 text-rose-700 text-xs font-semibold">Moda Fırsatları</Link>
                </div>
              )}
            </div>

            {/* 4. Çeyiz */}
            <div 
              className="relative py-1"
              onMouseEnter={() => setActiveDropdown("ceyiz")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link href="/ceyiz" className="hover:text-black flex items-center gap-1 transition-colors">
                Çeyiz <span className="text-[9px] text-neutral-400">▾</span>
              </Link>
              {activeDropdown === "ceyiz" && (
                <div className="absolute top-full left-0 w-56 bg-white p-3 rounded-2xl border border-neutral-200 shadow-xl space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2 py-1">E-Ticaret & Katalog</div>
                  <Link href="/ceyiz/mutfak" className="block px-3 py-2 rounded-xl hover:bg-neutral-100 text-xs">Mutfak Grubu</Link>
                  <Link href="/ceyiz/ev-tekstili" className="block px-3 py-2 rounded-xl hover:bg-neutral-100 text-xs">Ev Tekstili</Link>
                  <Link href="/ceyiz/elektronik" className="block px-3 py-2 rounded-xl hover:bg-neutral-100 text-xs">Küçük Ev Aletleri</Link>
                  <Link href="/ceyiz/firsatlari" className="block px-3 py-2 rounded-xl hover:bg-amber-50 text-amber-700 text-xs font-semibold">Çeyiz Paketleri</Link>
                </div>
              )}
            </div>

            {/* 5. Fırsatlar */}
            <Link href="/kampanyalar" className="hover:text-rose-600 font-semibold text-rose-600 transition-colors">
              Fırsatlar
            </Link>

            {/* 6. Rehber */}
            <Link href="/blog" className="hover:text-black transition-colors">
              Rehber
            </Link>

            {/* 7. Araçlar */}
            <Link href="/araclar" className="hover:text-black transition-colors">
              Araçlar
            </Link>
          </div>
        )}

        {/* Sağ: Arama & Butonlar */}
        <div className="flex items-center gap-2.5 shrink-0">
          {!isVendor && (
            <form onSubmit={handleSearch} className="hidden xl:flex items-center bg-neutral-100/90 px-3 py-1.5 rounded-full border border-neutral-200/80 focus-within:ring-2 focus-within:ring-rose-500/20">
              <svg className="w-3.5 h-3.5 text-neutral-400 mr-1.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none w-16 focus:w-28 transition-all"
              />
            </form>
          )}

          {/* Teklif Al Butonu */}
          {!isVendor && (
            <Link
              href="/hizli-teklif"
              className="px-4 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 rounded-full transition-all whitespace-nowrap"
            >
              Teklif Al
            </Link>
          )}

          <Link
            href="/giris"
            className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-full transition-all shadow-sm whitespace-nowrap"
          >
            Giriş Yap
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default PublicNavbar;