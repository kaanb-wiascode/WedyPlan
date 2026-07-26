'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Store, Sparkles } from 'lucide-react';

export const PublicNavbar: React.FC = () => {
  return (
    <nav className="h-20 bg-white/70 backdrop-blur-2xl border-b border-pink-100/60 sticky top-0 z-50 px-6 md:px-12 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#E6007E] to-pink-400 flex items-center justify-center text-white shadow-md shadow-pink-200">
          <Heart className="w-5 h-5 fill-white" />
        </div>
        <div>
          <span className="font-serif font-bold text-[20px] text-[#1D1D1F]">WedyPlan</span>
          <span className="text-[10px] font-semibold text-[#E6007E] block -mt-1 tracking-wider">Pazaryeri & AI</span>
        </div>
      </Link>

      {/* Menü Linkleri */}
      <div className="hidden md:flex items-center gap-8 text-[13px] font-semibold text-[#6E6E73]">
        <Link href="/firmalar" className="hover:text-[#E6007E] transition">Tüm Firmalar</Link>
        <Link href="/firmalar?category=Düğün+Salonu" className="hover:text-[#E6007E] transition">Düğün Salonları</Link>
        <Link href="/firmalar?category=Kır+Bahçesi" className="hover:text-[#E6007E] transition">Kır Bahçeleri</Link>
        <Link href="/firmalar?category=Fotoğrafçı" className="hover:text-[#E6007E] transition">Fotoğrafçılar</Link>
      </div>

      {/* Giriş Butonları */}
      <div className="flex items-center gap-3">
        <Link
          href="/cift"
          className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-pink-200 bg-pink-50/50 text-[12px] font-bold text-[#E6007E] hover:bg-pink-100/50 transition"
        >
          <Sparkles className="w-3.5 h-3.5" /> Çift Girişi
        </Link>
        <Link
          href="/firma/talepler"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1D1D1F] text-white text-[12px] font-bold hover:bg-black transition shadow-sm"
        >
          <Store className="w-3.5 h-3.5" /> Firma Paneli
        </Link>
      </div>
    </nav>
  );
};