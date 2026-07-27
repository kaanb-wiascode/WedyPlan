'use client';

import React from 'react';
import { MAGAZINE_CATEGORIES } from '@/lib/data/wedding-magazine-data';
import { MagazineCategory } from '@/types/wedding-magazine';

interface MagazineCategoriesBarProps {
  selectedSlug: string;
  onSelectCategory: (slug: string) => void;
}

export const MagazineCategoriesBar: React.FC<MagazineCategoriesBarProps> = ({
  selectedSlug,
  onSelectCategory
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 my-6">
      <div className="bg-white/40 backdrop-blur-2xl border border-white/80 p-2.5 rounded-full shadow-2xs flex items-center gap-2 overflow-x-auto no-scrollbar">
        {MAGAZINE_CATEGORIES.map((cat: MagazineCategory) => {
          const isSelected = selectedSlug === cat.slug;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={`px-5 py-2.5 rounded-full text-[12px] font-bold transition shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-[#1D1D1F] text-white shadow-xs'
                  : 'bg-white/60 text-[#6E6E73] hover:bg-white hover:text-[#1D1D1F]'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};