"use client";

import React from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/ui/brand-logo";

interface PublicNavbarProps {
  mode?: "public" | "vendor";
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({ mode = "vendor" }) => {
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
      <nav className="flex items-center justify-between px-6 py-3 rounded-full bg-white/80 backdrop-blur-md border border-neutral-200/60 shadow-lg shadow-black/5 transition-all">
        {/* Temiz Marka Logosı */}
        <BrandLogo variant={mode === "vendor" ? "vendor" : "default"} />

        {/* B2B / Partner Odaklı Yeni Menü Bağlantıları */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
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

        {/* Sağ Butonlar */}
        <div className="flex items-center gap-3">
          <Link
            href="/giris"
            className="px-5 py-2 text-sm font-medium text-neutral-700 hover:text-black transition-colors"
          >
            Firma Girişi
          </Link>
          <Link
            href="#basvuru"
            className="px-5 py-2.5 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-full transition-all shadow-md hover:shadow-lg"
          >
            Hemen Ücretsiz Başvurun →
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default PublicNavbar;