'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Search, AlertCircle } from 'lucide-react';
import GlassCard from '@/components/shared/ui/GlassCard';

export default function NotFound() {
  return (
    <div className="apple-page flex min-h-screen flex-col items-center justify-center p-4">
      {/* Arka Plan Dekoratif Şekiller */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0071e3]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#D4AF37]/10 rounded-full blur-3xl" />

      <GlassCard className="max-w-2xl w-full p-8 md:p-16 text-center z-10 border-white/60">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-100 rounded-full">
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#1D1D1F] to-gray-500 tracking-tight mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Aradığınız sayfayı bulamadık
        </h2>
        <p className="text-gray-600 font-light text-lg mb-10 max-w-lg mx-auto">
          Düğün planlama serüveninizde bazen yanlış yollara sapabilirsiniz. Endişelenmeyin, sizi doğru yere yönlendirmek için buradayız.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/"
            className="apple-btn apple-btn-inline"
          >
            <Home className="w-5 h-5" /> Ana Sayfaya Dön
          </Link>
          <Link 
            href="/firmalar"
            className="apple-btn-secondary apple-btn-secondary-inline"
          >
            <Search className="w-5 h-5" /> Firmaları Keşfet
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}