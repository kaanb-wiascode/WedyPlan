'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Building2, Camera, Scissors, Music } from 'lucide-react';
import { CategoryPageData } from '@/types/category-page';

const iconMap: Record<string, React.ElementType> = {
  Building2, Camera, Scissors, Music
};

interface CategoryHeroProps {
  data: CategoryPageData;
}

export const CategoryHero: React.FC<CategoryHeroProps> = ({ data }) => {
  const IconComponent = iconMap[data.icon] || Sparkles;

  return (
    <section className="relative pt-32 pb-20 px-6 min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Dynamic Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={data.coverImage} alt={data.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1D1D1F]/80 via-[#1D1D1F]/60 to-[#FAF8F5]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center space-y-6 max-w-4xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 text-[12px] font-bold text-white shadow-xs">
          <IconComponent className="w-4 h-4 text-[#D4AF37]" />
          <span>{data.totalVendors} Onaylı İşletme Listeleniyor</span>
        </div>

        <h1 className="text-[36px] sm:text-[56px] font-serif font-bold text-white leading-tight">
          {data.title}
        </h1>

        <p className="text-[16px] text-white/80 font-light leading-relaxed max-w-2xl mx-auto">
          {data.subtitle}
        </p>
      </motion.div>
    </section>
  );
};