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
      <nav className="flex items-center justify-between px-6 py-3 rounded-full bg-white/80 backdrop-blur-xl border border-white/60 shadow-lg shadow-black/5 transition-all">
        
        {/* Sol: Marka Logosu */}
        <div className="flex items-center shrink-0 mr-4">
          <BrandLogo variant={isVendor ? "vendor" : "default"} />
        </div>

        {/* Orta: Okunabilirliği Yüksek (text-sm) Menü Bağlantıları */}
        {!isVendor ? (
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-800 whitespace-nowrap">
            
            {/* 1. Mekanlar */}
            <div 
              className="relative py-1"
              onMouseEnter={() => setActiveDropdown("mekanlar")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link href="/mekanlar" className="hover:text-black flex items-center gap-1.5 transition-colors">
                Mekanlar <span className="text-[10px] text-neutral-400">▾</span>
              </Link>
              {activeDropdown === "mekanlar" && (
                <div className="absolute top-full left-0 w-60 bg-white/85 backdrop-blur-2xl p-3 rounded-2xl border border-white/60 shadow-2xl space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2 py-1">Mekan Kategorileri</div>
                  <Link href="/mekanlar/dugun-salonlari" className="block px-3 py-2 rounded-xl hover:bg-neutral-900/5 text-xs text-neutral-800 font-medium">Düğün Salonları</Link>
                  <Link href="/mekanlar/kir-bahceleri" className="block px-3 py-2 rounded-xl hover:bg-neutral-900/5 text-xs text-neutral-800 font-medium">Kır Düğünü Mekanları</Link>
                  <Link href="/mekanlar/oteller" className="block px-3 py-2 rounded-xl hover:bg-neutral-900/5 text-xs text-neutral-800 font-medium">Otel Davet Alanları</Link>
                  <Link href="/mekanlar/tarihi-mekanlar" className="block px-3 py-2 rounded-xl hover:bg-neutral-900/5 text-xs text-neutral-800 font-medium">Tarihi Mekanlar & Yalılar</Link>
                </div>
              )}
            </div>

            {/* 2. Firmalar */}
            <div 
              className="relative py-1"
              onMouseEnter={() => setActiveDropdown("firmalar")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link href="/firmalar" className="hover:text-black flex items-center gap-1.5 transition-colors">
                Firmalar <span className="text-[10px] text-neutral-400">▾</span>
              </Link>
              {activeDropdown === "firmalar" && (
                <div className="absolute top-full left-0 w-60 bg-white/85 backdrop-blur-2xl p-3 rounded-2xl border border-white/60 shadow-2xl space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2 py-1">Hizmet Sağlayıcılar</div>
                  <Link href="/firmalar/fotografcilar" className="block px-3 py-2 rounded-xl hover:bg-neutral-900/5 text-xs text-neutral-800 font-medium">Fotoğraf & Video</Link>
                  <Link href="/firmalar/organizasyon" className="block px-3 py-2 rounded-xl hover:bg-neutral-900/5 text-xs text-neutral-800 font-medium">Organizasyon & Süsleme</Link>
                  <Link href="/firmalar/muzik" className="block px-3 py-2 rounded-xl hover:bg-neutral-900/5 text-xs text-neutral-800 font-medium">Müzik & DJ</Link>
                  <Link href="/firmalar/kuator" className="block px-3 py-2 rounded-xl hover:bg-neutral-900/5 text-xs text-neutral-800 font-medium">Gelin Saçı & Makyajı</Link>
                </div>
              )}
            </div>

            {/* 3. Moda */}
            <div 
              className="relative py-1"
              onMouseEnter={() => setActiveDropdown("moda")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link href="/gelinlik-modelleri" className="hover:text-black flex items-center gap-1.5 transition-colors">
                Moda <span className="text-[10px] text-neutral-400">▾</span>
              </Link>
              {activeDropdown === "moda" && (
                <div className="absolute top-full left-0 w-60 bg-white/85 backdrop-blur-2xl p-3 rounded-2xl border border-white/60 shadow-2xl space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2 py-1">Gelinlik & Damatlık</div>
                  <Link href="/gelinlik-modelleri" className="block px-3 py-2 rounded-xl hover:bg-neutral-900/5 text-xs text-neutral-800 font-medium">Gelinlik Modelleri</Link>
                  <Link href="/damatlik-modelleri" className="block px-3 py-2 rounded-xl hover:bg-neutral-900/5 text-xs text-neutral-800 font-medium">Damatlık Modelleri</Link>
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
              <Link href="/ceyiz" className="hover:text-black flex items-center gap-1.5 transition-colors">
                Çeyiz <span className="text-[10px] text-neutral-400">▾</span>
              </Link>
              {activeDropdown === "ceyiz" && (
                <div className="absolute top-full left-0 w-60 bg-white/85 backdrop-blur-2xl p-3 rounded-2xl border border-white/60 shadow-2xl space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2 py-1">E-Ticaret & Katalog</div>
                  <Link href="/ceyiz/mutfak" className="block px-3 py-2 rounded-xl hover:bg-neutral-900/5 text-xs text-neutral-800 font-medium">Mutfak Grubu</Link>
                  <Link href="/ceyiz/ev-tekstili" className="block px-3 py-2 rounded-xl hover:bg-neutral-900/5 text-xs text-neutral-800 font-medium">Ev Tekstili</Link>
                  <Link href="/ceyiz/elektronik" className="block px-3 py-2 rounded-xl hover:bg-neutral-900/5 text-xs text-neutral-800 font-medium">Küçük Ev Aletleri</Link>
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
        ) : (
          /* B2B / Firma Katıl Menü Bağlantıları */
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-neutral-700">
            <Link href="#cozumler" className="hover:text-black transition-colors">
              Çözümler & Modüller
            </Link>
            <Link href="#neden-wedyplan" className="hover:text-black transition-colors">
              Neden WedyPlan?
            </Link>
            <Link href="#paketler" className="hover:text-black transition-colors">
              Paketler
            </Link>
            <Link href="#referanslar" className="hover:text-black transition-colors">
              Başarı Hikayeleri
            </Link>
          </div>
        )}

        {/* Sağ: Arama & Dumanlı Cam Butonlar */}
        <div className="flex items-center gap-3 shrink-0">
          {!isVendor && (
            <form onSubmit={handleSearch} className="hidden xl:flex items-center bg-neutral-200/50 backdrop-blur-md px-3.5 py-2 rounded-full border border-neutral-300/40 focus-within:ring-2 focus-within:ring-rose-500/20">
              <svg className="w-3.5 h-3.5 text-neutral-500 mr-1.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs text-neutral-800 placeholder:text-neutral-500 focus:outline-none w-16 focus:w-28 transition-all"
              />
            </form>
          )}

          {/* Dumanlı Cam Butonlar */}
          {!isVendor ? (
            <>
              <Link
                href="/hizli-teklif"
                className="px-4 py-2 text-xs font-semibold text-rose-800 bg-rose-50/80 hover:bg-rose-100/90 backdrop-blur-md border border-rose-200/80 rounded-full transition-all whitespace-nowrap shadow-sm"
              >
                Teklif Al
              </Link>
              <Link
                href="/giris"
                className="px-5 py-2 text-xs font-semibold text-white bg-neutral-800/85 hover:bg-neutral-900/95 backdrop-blur-md border border-neutral-700/60 rounded-full transition-all shadow-md whitespace-nowrap"
              >
                Giriş Yap
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/giris"
                className="px-5 py-2 text-xs font-medium text-neutral-700 hover:text-black transition-colors"
              >
                Firma Girişi
              </Link>
              <Link
                href="/firma-katil/onboarding"
                className="px-5 py-2 text-xs font-semibold text-white bg-neutral-800/85 hover:bg-neutral-900/95 backdrop-blur-md border border-neutral-700/60 rounded-full transition-all shadow-md whitespace-nowrap"
              >
                Hemen Ücretsiz Başvurun →
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default PublicNavbar;