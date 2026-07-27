'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { CategoryPopularSearch } from '@/types/category-page';

export const CategoryPopularSearches: React.FC<{ searches: CategoryPopularSearch[] }> = ({ searches }) => {
  return (
    <section className="py-8 px-6 max-w-7xl mx-auto space-y-4">
      <h3 className="text-[12px] font-bold text-[#86868B] uppercase tracking-wider flex items-center gap-1.5">
        <Search className="w-4 h-4 text-[#D4AF37]" /> Popüler Keşifler
      </h3>
      <div className="flex flex-wrap gap-3">
        {searches.map((search) => (
          <div key={search.id} className="bg-white/60 hover:bg-white backdrop-blur-2xl border border-white px-4 py-2.5 rounded-full transition shadow-2xs cursor-pointer flex items-center gap-2">
            <span className="text-[13px] font-semibold text-[#1D1D1F]">{search.query}</span>
            <span className="text-[10px] font-mono bg-black/5 text-[#6E6E73] px-1.5 py-0.5 rounded">{search.count}</span>
          </div>
        ))}
      </div>
    </section>
  );
};