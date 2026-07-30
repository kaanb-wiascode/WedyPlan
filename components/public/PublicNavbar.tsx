"use client";

import React from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/ui/brand-logo";

interface PublicNavbarProps {
  mode?: "public" | "vendor";
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({ mode = "public" }) => {
  const isVendor = mode === "vendor";

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
      {/* Firma Katıl Sayfasındaki Cam Efektli Yuvarlatılmış (Pill) Arayüz */}
      <nav className="flex items-center justify-between px-6 py-3 rounded-full bg-white/80 backdrop-blur-md border border-neutral-200/60 shadow-lg shadow-black/5 transition-all">
        {/* Temiz & Standart Marka Logosu */}
        <BrandLogo variant={isVendor ? "vendor" : "default"} />

        {/* Menü Linkleri (Moda Göre Esnek İçerik) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
          {isVendor ? (
            // B2B / Firma Katıl Menü Bağlantıları
            <>
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
            </>
          ) : (
            // Ana Sayfa & Genel Public Sayfa Bağlantıları
            <>
              <Link href="/arama" className="hover:text-black transition-colors">
                Keşfet & Dizin
              </Link>
              <Link href="/kategori/dugun-salonlari" className="hover:text-black transition-colors">
                Düğün Salonları
              </Link>
              <Link href="/kategori/kir-bahceleri" className="hover:text-black transition-colors">
                Kır Bahçeleri
              </Link>
              <Link href="/kategori/fotografcilar" className="hover:text-black transition-colors">
                Fotoğraf Stüdyoları
              </Link>
            </>
          )}
        </div>

        {/* Sağ Aksiyon Butonları (Firma Katıl Sayfası Stili) */}
        <div className="flex items-center gap-3">
          {isVendor ? (
            <>
              <Link
                href="/giris"
                className="px-5 py-2 text-sm font-medium text-neutral-700 hover:text-black transition-colors"
              >
                Firma Girişi
              </Link>
              <Link
                href="/firma-katil/onboarding"
                className="px-5 py-2.5 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-full transition-all shadow-md hover:shadow-lg"
              >
                Hemen Ücretsiz Başvurun →
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/firma-katil"
                className="px-4 py-2 text-xs md:text-sm font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/60 rounded-full transition-all"
              >
                İşletme Hesabı (WOS)
              </Link>
              <Link
                href="/giris"
                className="px-5 py-2.5 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-full transition-all shadow-md hover:shadow-lg"
              >
                Giriş Yap →
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default PublicNavbar;