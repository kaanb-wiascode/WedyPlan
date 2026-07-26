'use client';

import React from 'react';
import { Filter, Check, SlidersHorizontal } from 'lucide-react';
import { DiscoveryFilterState } from '@/types/vendor-discovery';

interface SmartFilterBarProps {
  filters: DiscoveryFilterState;
  onChangeFilter: (updated: Partial<DiscoveryFilterState>) => void;
  activeCount: number;
}

export const SmartFilterBar: React.FC<SmartFilterBarProps> = ({ filters, onChangeFilter, activeCount }) => {
  const categories = ['Tümü', 'Düğün Salonu', 'Kır Bahçesi', 'Fotoğrafçı', 'Organizasyon', 'Gelinlik'];

  return (
    <div className="sticky top-20 z-40 px-4 sm:px-8 max-w-7xl mx-auto my-6">
      <div className="bg-white/40 backdrop-blur-2xl border border-white/80 p-3 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 shrink-0">
          {categories.map((cat) => {
            const isSelected = (cat === 'Tümü' && !filters.category) || filters.category === cat;
            return (
              <button
                key={cat}
                onClick={() => onChangeFilter({ category: cat === 'Tümü' ? '' : cat })}
                className={`px-4 py-2 rounded-full text-[12px] font-bold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#1D1D1F] text-white shadow-sm'
                    : 'bg-white/60 text-[#6E6E73] hover:bg-white hover:text-[#1D1D1F]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Quick Toggles */}
        <div className="flex items-center gap-2 shrink-0 border-l border-black/5 pl-4">
          <button
            onClick={() => onChangeFilter({ verifiedOnly: !filters.verifiedOnly })}
            className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold border transition flex items-center gap-1.5 cursor-pointer ${
              filters.verifiedOnly
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-white/60 text-[#6E6E73] border-white'
            }`}
          >
            {filters.verifiedOnly && <Check className="w-3.5 h-3.5 text-emerald-600" />}
            <span>✓ Onaylı Firmalar</span>
          </button>

          <button
            onClick={() => onChangeFilter({ dealsOnly: !filters.dealsOnly })}
            className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold border transition flex items-center gap-1.5 cursor-pointer ${
              filters.dealsOnly
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-white/60 text-[#6E6E73] border-white'
            }`}
          >
            <span>🏷️ Fırsat Paketleri</span>
          </button>
        </div>
      </div>
    </div>
  );
};