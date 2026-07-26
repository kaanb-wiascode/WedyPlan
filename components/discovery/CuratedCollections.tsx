'use client';

import React from 'react';
import { CuratedCollection } from '@/types/vendor-discovery';
import { Sparkles, ArrowRight } from 'lucide-react';

interface CuratedCollectionsProps {
  collections: CuratedCollection[];
}

export const CuratedCollections: React.FC<CuratedCollectionsProps> = ({ collections }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">Düğün Konseptleri</span>
          <h2 className="font-serif font-semibold text-[26px] text-[#1D1D1F]">Editörün Özel Koleksiyonları</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {collections.map((col) => (
          <div
            key={col.id}
            className="group relative h-72 rounded-[32px] overflow-hidden border border-white/80 shadow-sm cursor-pointer"
          >
            <img
              src={col.coverUrl}
              alt={col.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/30">
                {col.itemCount} Mekan & Ekip
              </span>
              <h3 className="font-serif font-semibold text-[22px] leading-tight">{col.title}</h3>
              <p className="text-[12px] text-white/80 line-clamp-1">{col.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};