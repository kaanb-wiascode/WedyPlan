'use client';

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
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl transition-all duration-300">
      {/* Cam Efektli Yuvarlatılmış (Pill) Ana Menü */}
      <nav className="flex items-center justify-between px-6 py-3.5 rounded-full bg-white/70 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
        
        {/* Sol: Marka Logosu */}
        <div className="flex items-center shrink-0 mr-4">
          <BrandLogo variant={isVendor ? "vendor" : "default"} />
        </div>

        {/* Orta: Menü Bağlantıları */}
        {!isVendor ? (
          <div className="hidden lg:flex items-center gap-7 text-[14px] font-semibold text-gray-700 whitespace-nowrap">
            
            {/* 1. Mekanlar */}
            <div 
              className="relative py-2"
              onMouseEnter={() => setActiveDropdown("mekanlar")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link href="/mekanlar" className="hover:text-black flex items-center gap-1.5 transition-colors">
                Mekanlar <span className="text-[10px] text-gray-400 opacity-70">▾</span>
              </Link>
              {activeDropdown === "mekanlar" && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white/90 backdrop-blur-2xl p-3.5 rounded-2xl border border-white/60 shadow-xl space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 py-1.5">Mekan Kategorileri</div>
                  <Link href="/mekanlar/dugun-salonlari" className="block px-3 py-2.5 rounded-xl hover:bg-gray-50 text-[13px] text-gray-800 font-medium transition-colors">Düğün Salonları</Link>
                  <Link href="/mekanlar/kir-bahceleri" className="block px-3 py-2.5 rounded-xl hover:bg-gray-50 text-[13px] text-gray-800 font-medium transition-colors">Kır Düğünü Mekanları</Link>
                  <Link href="/mekanlar/oteller" className="block px-3 py-2.5 rounded-xl hover:bg-gray-50 text-[13px] text-gray-800 font-medium transition-colors">Otel Davet Alanları</Link>
                  <Link href="/mekanlar/tarihi-mekanlar" className="block px-3 py-2.5 rounded-xl hover:bg-gray-50 text-[13px] text-gray-800 font-medium transition-colors">Tarihi Mekanlar & Yalılar</Link>
                </div>
              )}
            </div>

            {/* 2. Firmalar */}
            <div 
              className="relative py-2"
              onMouseEnter={() => setActiveDropdown("firmalar")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link href="/firmalar" className="hover:text-black flex items-center gap-1.5 transition-colors">
                Firmalar <span className="text-[10px] text-gray-400 opacity-70">▾</span>
              </Link>
              {activeDropdown === "firmalar" && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white/90 backdrop-blur-2xl p-3.5 rounded-2xl border border-white/60 shadow-xl space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 py-1.5">Hizmet Sağlayıcılar</div>
                  <Link href="/firmalar/fotografcilar" className="block px-3 py-2.5 rounded-xl hover:bg-gray-50 text-[13px] text-gray-800 font-medium transition-colors">Fotoğraf & Video</Link>
                  <Link href="/firmalar/organizasyon" className="block px-3 py-2.5 rounded-xl hover:bg-gray-50 text-[13px] text-gray-800 font-medium transition-colors">Organizasyon & Süsleme</Link>
                  <Link href="/firmalar/muzik" className="block px-3 py-2.5 rounded-xl hover:bg-gray-50 text-[13px] text-gray-800 font-medium transition-colors">Müzik & DJ</Link>
                  <Link href="/firmalar/kuator" className="block px-3 py-2.5 rounded-xl hover:bg-gray-50 text-[13px] text-gray-800 font-medium transition-colors">Gelin Saçı & Makyajı</Link>
                </div>
              )}
            </div>

            {/* 3. Moda */}
            <div 
              className="relative py-2"
              onMouseEnter={() => setActiveDropdown("moda")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link href="/gelinlik-modelleri" className="hover:text-black flex items-center gap-1.5 transition-colors">
                Moda <span className="text-[10px] text-gray-400 opacity-70">▾</span>
              </Link>
              {activeDropdown === "moda" && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white/90 backdrop-blur-2xl p-3.5 rounded-2xl border border-white/60 shadow-xl space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 py-1.5">Gelinlik & Damatlık</div>
                  <Link href="/gelinlik-modelleri" className="block px-3 py-2.5 rounded-xl hover:bg-gray-50 text-[13px] text-gray-800 font-medium transition-colors">Gelinlik Modelleri</Link>
                  <Link href="/damatlik-modelleri" className="block px-3 py-2.5 rounded-xl hover:bg-gray-50 text-[13px] text-gray-800 font-medium transition-colors">Damatlık Modelleri</Link>
                  <Link href="/gelinlik-kampanyalari" className="block px-3 py-2.5 rounded-xl hover:bg-[#E6007E]/5 text-[#E6007E] text-[13px] font-bold transition-colors">Moda Fırsatları</Link>
                </div>
              )}
            </div>

            {/* 4. Çeyiz */}
            <div 
              className="relative py-2"
              onMouseEnter={() => setActiveDropdown("ceyiz")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link href="/ceyiz" className="hover:text-black flex items-center gap-1.5 transition-colors">
                Çeyiz <span className="text-[10px] text-gray-400 opacity-70">▾</span>
              </Link>
              {activeDropdown === "ceyiz" && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white/90 backdrop-blur-2xl p-3.5 rounded-2xl border border-white/60 shadow-xl space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-3 py-1.5">E-Ticaret & Katalog</div>
                  <Link href="/ceyiz/mutfak" className="block px-3 py-2.5 rounded-xl hover:bg-gray-50 text-[13px] text-gray-800 font-medium transition-colors">Mutfak Grubu</Link>
                  <Link href="/ceyiz/ev-tekstili" className="block px-3 py-2.5 rounded-xl hover:bg-gray-50 text-[13px] text-gray-800 font-medium transition-colors">Ev Tekstili</Link>
                  <Link href="/ceyiz/elektronik" className="block px-3 py-2.5 rounded-xl hover:bg-gray-50 text-[13px] text-gray-800 font-medium transition-colors">Küçük Ev Aletleri</Link>
                  <Link href="/ceyiz/firsatlari" className="block px-3 py-2.5 rounded-xl hover:bg-amber-50 text-amber-700 text-[13px] font-bold transition-colors">Çeyiz Paketleri</Link>
                </div>
              )}
            </div>

            {/* 5. Fırsatlar */}
            <Link href="/kampanyalar" className="hover:text-[#E6007E] font-bold text-[#E6007E] transition-colors">
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
          <div className="hidden lg:flex items-center gap-8 text-[14px] font-semibold text-gray-700">
            <Link href="#cozumler" className="hover:text-black transition-colors">Çözümler & Modüller</Link>
            <Link href="#neden-wedyplan" className="hover:text-black transition-colors">Neden WedyPlan?</Link>
            <Link href="#paketler" className="hover:text-black transition-colors">Paketler</Link>
            <Link href="#referanslar" className="hover:text-black transition-colors">Başarı Hikayeleri</Link>
          </div>
        )}

        {/* Sağ: Arama & Dumanlı Cam Butonlar */}
        <div className="flex items-center gap-3 shrink-0">
          {!isVendor && (
            <form onSubmit={handleSearch} className="hidden xl:flex items-center bg-gray-100/50 backdrop-blur-md px-4 py-2.5 rounded-full border border-gray-200/50 focus-within:ring-2 focus-within:ring-[#E6007E]/20 transition-all">
              <svg className="w-4 h-4 text-gray-500 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Ne arıyorsunuz?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-[13px] text-gray-900 placeholder:text-gray-500 focus:outline-none w-24 focus:w-40 transition-all duration-300"
              />
            </form>
          )}

          {/* Aksiyon Butonları */}
          {!isVendor ? (
            <>
              <Link
                href="/hizli-teklif"
                className="px-5 py-2.5 text-[13px] font-bold text-[#E6007E] bg-white/80 hover:bg-white backdrop-blur-md border border-[#E6007E]/20 rounded-full transition-all shadow-sm hover:shadow"
              >
                Teklif Al
              </Link>
              <Link
                href="/giris"
                className="px-6 py-2.5 text-[13px] font-bold text-white bg-gray-900 hover:bg-black rounded-full transition-all shadow-md hover:shadow-lg"
              >
                Giriş Yap
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/giris"
                className="px-5 py-2.5 text-[13px] font-bold text-gray-700 hover:text-black transition-colors"
              >
                Firma Girişi
              </Link>
              <Link
                href="/firma-katil/onboarding"
                className="px-6 py-2.5 text-[13px] font-bold text-white bg-gray-900 hover:bg-black rounded-full transition-all shadow-md hover:shadow-lg flex items-center gap-1"
              >
                Hemen Başvurun <span className="text-[10px] ml-1">→</span>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default PublicNavbar;