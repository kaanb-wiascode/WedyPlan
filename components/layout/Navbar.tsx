import Link from "next/link";
import { BrandLogo } from "@/components/ui/brand-logo";

export function Navbar() {
  return (
    <header className="w-full glass-card border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* LOGO BÖLÜMÜ */}
        <Link href="/" className="flex items-center gap-3">
          <BrandLogo portal="main" size="md" />
        </Link>

        {/* MENÜ LİNKLERİ */}
        <nav className="hidden md:flex items-center gap-8 font-sans-corporate text-sm font-medium">
          <Link href="/firsatlar" className="hover:opacity-70 transition-opacity">Fırsatlar</Link>
          <Link href="/mekanlar" className="hover:opacity-70 transition-opacity">Mekanlar</Link>
          <Link href="/vendor" className="hover:opacity-70 transition-opacity">Tedarikçi OS</Link>
        </nav>

        {/* AKSİYON BUTONLARI */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="px-5 py-2.5 rounded-full glass-btn-secondary text-sm">
            Giriş Yap
          </Link>
          <Link href="/register" className="px-5 py-2.5 rounded-full glass-btn-primary text-sm">
            Ücretsiz Başla
          </Link>
        </div>
      </div>
    </header>
  );
}