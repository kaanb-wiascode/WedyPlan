'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export const CategoryAiRecommendation: React.FC = () => {
  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-pink-500/10 via-purple-500/5 to-amber-500/10 backdrop-blur-3xl border border-white/80 p-8 sm:p-12 rounded-[40px] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/80 text-[#0071e3] border border-pink-200 rounded-full text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Yapay Zeka Destekli Eşleştirme
          </div>
          <h2 className="font-serif font-bold text-[28px] sm:text-[32px] text-[#1D1D1F]">
            Zaman kaybetmeyin, WedyAI sizin için en uygun olanı bulsun.
          </h2>
          <p className="text-[14px] text-[#6E6E73] font-light leading-relaxed">
            Filtrelerle uğraşmak yerine ne aradığınızı doğal dille yazın, bütçenize ve tarzınıza %100 uyan mekanları saniyeler içinde önünüze getirelim.
          </p>
        </div>

        <Link href="/ai-arama" className="bg-[#1D1D1F] text-white px-8 py-4 rounded-full font-bold text-[13px] hover:bg-black transition shadow-lg shrink-0 flex items-center gap-2 whitespace-nowrap">
          <span>WedyAI İle Ara</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};