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
      <nav className="flex items-center justify-between px-6 py-2.5 rounded-full bg-white/85 backdrop-blur-md border border-neutral-200/80 shadow-lg shadow-black/5 transition-all relative">
        
        {/* Sol: Marka Logosu */}
        <div className="flex items-center gap-6 shrink-0">
          <BrandLogo variant={isVendor ? "vendor" : "default"} />
        </div>

        {/* Orta: Arama Çubuğu & Şık Kategorili Linkler */}
        {!isVendor && (
          <div className="hidden lg:flex items-center gap-5 text-xs font-medium text-neutral-700">
            
            {/* 1. Büyülü Mekanlar */}
            <div 
              className="relative py-2"
              onMouseEnter={() => setActiveDropdown("mekanlar")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link href="/mekanlar" className="hover:text-black flex items-center gap-1 py-1 transition-colors">
                Büyülü Mekanlar <span className="text-[10px] text-neutral-400">▾</span>
              </Link>
              {activeDropdown === "mekanlar" && (
                <div className="absolute top-full left-0 w-64 bg-white/95 backdrop-blur-xl p-4 rounded-2xl border border-neutral-200 shadow-xl space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2">Kayıtlı Mekanlar</div>
                  <Link href="/mekanlar/dugun-salonlari" className="block px-3 py-2 rounded-xl hover:bg-neutral-100/80 text-sm">🏰 Balo & Düğün Salonları</Link>
                  <Link href="/mekanlar/kir-bahceleri" className="block px-3 py-2 rounded-xl hover:bg-neutral-100/80 text-sm">🌿 Masalsı Kır Bahçeleri</Link>
                  <Link href="/mekanlar/oteller" className="block px-3 py-2 rounded-xl hover:bg-neutral-100/80 text-sm">🏨 Prestijli Otel Davetleri</Link>
                  <Link href="/mekanlar/tarihi-mekanlar" className="block px-3 py-2 rounded-xl hover:bg-neutral-100/80 text-sm">🏛️ Tarihi Yalılar & Kasırlar</Link>
                </div>
              )}
            </div>

            {/* 2. Sanatçılar & Hizmetler */}
            <div 
              className="relative py-2"
              onMouseEnter={() => setActiveDropdown("firmalar")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link href="/firmalar" className="hover:text-black flex items-center gap-1 py-1 transition-colors">
                Sanatçılar & Hizmetler <span className="text-[10px] text-neutral-400">▾</span>
              </Link>
              {activeDropdown === "firmalar" && (
                <div className="absolute top-full left-0 w-64 bg-white/95 backdrop-blur-xl p-4 rounded-2xl border border-neutral-200 shadow-xl space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2">Düğün Uzmanları</div>
                  <Link href="/firmalar/fotografcilar" className="block px-3 py-2 rounded-xl hover:bg-neutral-100/80 text-sm">📸 Düğün Hikayesi & Fotoğraf</Link>
                  <Link href="/firmalar/organizasyon" className="block px-3 py-2 rounded-xl hover:bg-neutral-100/80 text-sm">✨ Konsept Organizasyon</Link>
                  <Link href="/firmalar/muzik" className="block px-3 py-2 rounded-xl hover:bg-neutral-100/80 text-sm">🎵 Canlı Müzik, Orkestra & DJ</Link>
                  <Link href="/firmalar/kuator" className="block px-3 py-2 rounded-xl hover:bg-neutral-100/80 text-sm">💄 Gelin Tasarım & Makyaj</Link>
                </div>
              )}
            </div>

            {/* 3. Gelinlik & Şıklık Atölyesi */}
            <div 
              className="relative py-2"
              onMouseEnter={() => setActiveDropdown("gelinlik")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link href="/gelinlik-modelleri" className="hover:text-black flex items-center gap-1 py-1 transition-colors">
                Gelinlik & Şıklık <span className="text-[10px] text-neutral-400">▾</span>
              </Link>
              {activeDropdown === "gelinlik" && (
                <div className="absolute top-full left-0 w-72 bg-white/95 backdrop-blur-xl p-4 rounded-2xl border border-neutral-200 shadow-xl space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2">Moda & Kampanyalar</div>
                  <Link href="/gelinlik-modelleri" className="block px-3 py-2 rounded-xl hover:bg-neutral-100/80 text-sm">👰 Özel Tasarım Gelinlikler</Link>
                  <Link href="/damatlik-modelleri" className="block px-3 py-2 rounded-xl hover:bg-neutral-100/80 text-sm">🤵 Şık Damatlık & Aksesuarlar</Link>
                  <Link href="/gelinlik-kampanyalari" className="block px-3 py-2 rounded-xl hover:bg-rose-50 text-rose-700 text-sm font-semibold">🎁 Özel Moda İndirimleri</Link>
                </div>
              )}
            </div>

            {/* 4. Evim & Çeyiz Dünyası */}
            <div 
              className="relative py-2"
              onMouseEnter={() => setActiveDropdown("ceyiz")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link href="/ceyiz" className="hover:text-black flex items-center gap-1 py-1 transition-colors">
                Evim & Çeyiz <span className="text-[10px] text-neutral-400">▾</span>
              </Link>
              {activeDropdown === "ceyiz" && (
                <div className="absolute top-full left-0 w-64 bg-white/95 backdrop-blur-xl p-4 rounded-2xl border border-neutral-200 shadow-xl space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2">Çeyiz E-Ticaret</div>
                  <Link href="/ceyiz/mutfak" className="block px-3 py-2 rounded-xl hover:bg-neutral-100/80 text-sm">🍽️ Zarafet dolu Mutfak Setleri</Link>
                  <Link href="/ceyiz/ev-tekstili" className="block px-3 py-2 rounded-xl hover:bg-neutral-100/80 text-sm">🛏️ Lüks Ev Tekstili & Nevresim</Link>
                  <Link href="/ceyiz/elektronik" className="block px-3 py-2 rounded-xl hover:bg-neutral-100/80 text-sm">🔌 Akıllı Küçük Ev Aletleri</Link>
                  <Link href="/ceyiz/firsatlari" className="block px-3 py-2 rounded-xl hover:bg-amber-50 text-amber-700 text-sm font-semibold">🏷️ Çeyiz Paket Fırsatları</Link>
                </div>
              )}
            </div>

            {/* 5. Ayrıcalıklar & Fırsatlar */}
            <Link href="/kampanyalar" className="hover:text-rose-600 font-semibold text-rose-600 transition-colors">
              ✨ Fırsatlar
            </Link>

            {/* 6. İlham & Düğün Dergisi */}
            <Link href="/blog" className="hover:text-black transition-colors">
              İlham & Dergi
            </Link>

            {/* 7. Akıllı Planlama Stüdyosu */}
            <Link href="/araclar" className="hover:text-black font-medium transition-colors">
              Planlama Stüdyosu
            </Link>
          </div>
        )}

        {/* Sağ: Arama & Butonlar */}
        <div className="flex items-center gap-3">
          {!isVendor && (
            <form onSubmit={handleSearch} className="hidden md:flex items-center bg-neutral-100/80 px-3 py-1.5 rounded-full border border-neutral-200/60 focus-within:ring-2 focus-within:ring-rose-500/20">
              <span className="text-xs text-neutral-400 mr-1.5">🔍</span>
              <input
                type="text"
                placeholder="Ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none w-20 focus:w-32 transition-all"
              />
            </form>
          )}

          {/* Sihirli Fiyat Teklifi */}
          {!isVendor && (
            <Link
              href="/hizli-teklif"
              className="px-4 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 rounded-full transition-all shrink-0"
            >
              ⚡ Sihirli Fiyat Teklifi
            </Link>
          )}

          <Link
            href="/giris"
            className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-full transition-all shadow-sm shrink-0"
          >
            Giriş Yap
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default PublicNavbar;