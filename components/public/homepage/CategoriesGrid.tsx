'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HOMEPAGE_CATEGORIES } from '@/lib/data/homepage-data';
import { Building2, Camera, Scissors, Sparkles, Music, ArrowRight } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Building2,
  Camera,
  Scissors,
  Sparkles,
  Music
};

export const CategoriesGrid: React.FC = () => {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-[#E6007E] uppercase tracking-widest block mb-1">Koleksiyonlar</span>
          <h2 className="font-serif font-semibold text-[32px] text-[#1D1D1F]">Hizmet Kategorileri</h2>
        </div>
        <Link href="/firmalar" className="text-[13px] font-bold text-[#1D1D1F] hover:text-[#E6007E] transition flex items-center gap-1">
          Tüm Dizin <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {HOMEPAGE_CATEGORIES.map((cat) => {
          const IconComponent = iconMap[cat.iconName] || Sparkles;
          return (
            <Link
              key={cat.id}
              href={`/firmalar?category=${cat.slug}`}
              className="group bg-white/40 backdrop-blur-2xl p-6 rounded-[28px] border border-white/80 hover:bg-white hover:shadow-lg transition-all duration-300 text-center space-y-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6007E]"
            >
              <div className="w-12 h-12 rounded-2xl bg-white text-[#1D1D1F] mx-auto flex items-center justify-center group-hover:scale-110 shadow-xs transition duration-300">
                <IconComponent className="w-6 h-6 text-[#E6007E]" />
              </div>
              <div>
                <h3 className="font-bold text-[15px] text-[#1D1D1F]">{cat.title}</h3>
                <span className="text-[11px] text-[#86868B]">{cat.itemCount}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};