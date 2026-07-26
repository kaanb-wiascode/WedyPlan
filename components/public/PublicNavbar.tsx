'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Store, Sparkles, ArrowRight } from 'lucide-react';

export const PublicNavbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 pt-4">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto h-16 sm:h-20 bg-white/40 sm:bg-white/30 backdrop-blur-md sm:backdrop-blur-2xl border border-white/60 rounded-full px-5 sm:px-8 flex items-center justify-between shadow-[0_8px_32px_rgba(31,38,135,0.04)]"
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#E6007E] via-pink-500 to-[#D4AF37] p-[1px] shadow-sm group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-white/90 rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#E6007E] fill-[#E6007E]/20 group-hover:fill-[#E6007E] transition-all" />
            </div>
          </div>
          <div>
            <span className="font-serif font-bold text-[18px] sm:text-[20px] text-[#1D1D1F] tracking-tight block leading-none">
              WedyPlan
            </span>
            <span className="text-[9px] font-semibold text-[#D4AF37] tracking-widest uppercase block mt-0.5">
              Liquid OS
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <div className="hidden lg:flex items-center gap-8 text-[13px] font-medium text-[#1D1D1F]/70">
          <Link href="/firmalar" className="hover:text-[#E6007E] transition-colors">
            Keşfet & Dizin
          </Link>
          <Link href="/firmalar?category=Düğün+Salonu" className="hover:text-[#E6007E] transition-colors">
            Düğün Salonları
          </Link>
          <Link href="/firmalar?category=Kır+Bahçesi" className="hover:text-[#E6007E] transition-colors">
            Kır Bahçeleri
          </Link>
          <Link href="/firmalar?category=Fotoğrafçı" className="hover:text-[#E6007E] transition-colors">
            Fotoğraf Stüdyoları
          </Link>
        </div>

        {/* Right Action Capsule */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/cift"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-pink-200/60 bg-white/50 text-[12px] font-semibold text-[#1D1D1F] hover:bg-white/80 transition-all shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E6007E]" />
            <span>Çift Modu</span>
          </Link>

          <Link
            href="/giris"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#1D1D1F] hover:bg-black text-white text-[12px] font-semibold transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            <Store className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Giriş Yap</span>
            <ArrowRight className="w-3 h-3 text-white/50 hidden sm:block" />
          </Link>
        </div>
      </motion.nav>
    </header>
  );
};