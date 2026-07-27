'use client';

import React from 'react';
import { VendorListingFilterState } from '@/types/vendor-listing';
import { CATEGORIES_LIST, CITIES_LIST } from '@/lib/data/vendor-listing-data';
import { Filter, Check, RotateCcw, Map, Grid } from 'lucide-react';

interface FilterBarProps {
  filters: VendorListingFilterState;
  onChangeFilter: (updated: Partial<VendorListingFilterState>) => void;
  onResetFilters: () => void;
  viewMode: 'GRID' | 'MAP';
  onToggleViewMode: (mode: 'GRID' | 'MAP') => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onChangeFilter,
  onResetFilters,
  viewMode,
  onToggleViewMode
}) => {
  return (
    <div className="sticky top-20 z-40 max-w-7xl mx-auto px-4 sm:px-8 my-4">
      <div className="bg-white/50 backdrop-blur-2xl border border-white/90 p-3 rounded-[28px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-between gap-3">
        
        {/* Left Category & City Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Select */}
          <select
            value={filters.category}
            onChange={(e) => onChangeFilter({ category: e.target.value })}
            className="p-2.5 px-4 bg-white/80 border border-slate-200 rounded-full text-[12px] font-bold text-[#1D1D1F] outline-none cursor-pointer focus:border-[#E6007E]"
          >
            {CATEGORIES_LIST.map((cat: { slug: string; name: string }) => (
              <option key={cat.slug} value={cat.slug}>{cat.name}</option>
            ))}
          </select>

          {/* City Select */}
          <select
            value={filters.city}
            onChange={(e) => onChangeFilter({ city: e.target.value })}
            className="p-2.5 px-4 bg-white/80 border border-slate-200 rounded-full text-[12px] font-bold text-[#1D1D1F] outline-none cursor-pointer focus:border-[#E6007E]"
          >
            {CITIES_LIST.map((city: string) => (
              <option key={city} value={city === 'Tüm Şehirler' ? '' : city}>{city}</option>
            ))}
          </select>

          {/* Availability Filter Toggle */}
          <button
            onClick={() => onChangeFilter({ availabilityOnly: !filters.availabilityOnly })}
            className={`px-3.5 py-2 rounded-full text-[12px] font-bold border transition cursor-pointer flex items-center gap-1.5 ${
              filters.availabilityOnly
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-white/80 text-[#6E6E73] border-white'
            }`}
          >
            {filters.availabilityOnly && <Check className="w-3.5 h-3.5 text-emerald-600" />}
            <span>⚡ Sadece Müsait Olanlar</span>
          </button>

          {/* Verified Partner Toggle */}
          <button
            onClick={() => onChangeFilter({ verifiedOnly: !filters.verifiedOnly })}
            className={`px-3.5 py-2 rounded-full text-[12px] font-bold border transition cursor-pointer flex items-center gap-1.5 ${
              filters.verifiedOnly
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-white/80 text-[#6E6E73] border-white'
            }`}
          >
            <span>✓ Onaylı Firmalar</span>
          </button>
        </div>

        {/* Right Sort & View Controls */}
        <div className="flex items-center gap-2">
          {/* Sort By Select */}
          <select
            value={filters.sortBy}
            onChange={(e) => onChangeFilter({ sortBy: e.target.value as any })}
            className="p-2.5 px-3 bg-white/80 border border-slate-200 rounded-full text-[12px] font-bold text-[#1D1D1F] outline-none cursor-pointer"
          >
            <option value="RECOMMENDED">Önerilen Sıralama</option>
            <option value="RATING">En Yüksek Puanlılar</option>
            <option value="PRICE_LOW">Fiyat: Düşükten Yükseğe</option>
            <option value="PRICE_HIGH">Fiyat: Yüksekten Düşüğe</option>
          </select>

          {/* View Mode Toggle */}
          <div className="bg-white/80 p-1 rounded-full border border-slate-200 flex items-center text-[12px] font-bold">
            <button
              onClick={() => onToggleViewMode('GRID')}
              className={`px-3 py-1.5 rounded-full transition cursor-pointer flex items-center gap-1 ${
                viewMode === 'GRID' ? 'bg-[#1D1D1F] text-white shadow-xs' : 'text-[#6E6E73]'
              }`}
            >
              <Grid className="w-3.5 h-3.5" /> Liste
            </button>
            <button
              onClick={() => onToggleViewMode('MAP')}
              className={`px-3 py-1.5 rounded-full transition cursor-pointer flex items-center gap-1 ${
                viewMode === 'MAP' ? 'bg-[#1D1D1F] text-white shadow-xs' : 'text-[#6E6E73]'
              }`}
            >
              <Map className="w-3.5 h-3.5" /> Harita
            </button>
          </div>

          <button
            onClick={onResetFilters}
            title="Filtreleri Temizle"
            className="p-2.5 bg-white/80 hover:bg-white text-slate-500 rounded-full border border-slate-200 transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};