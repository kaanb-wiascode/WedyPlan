'use client';

import React from 'react';
import { VendorListingFilterState } from '@/types/vendor-listing';
import { CATEGORIES_LIST, CITIES_LIST } from '@/lib/data/vendor-listing-data';
import { RotateCcw, SlidersHorizontal, CheckCircle2, Circle } from 'lucide-react';
import GlassCard from '@/components/shared/ui/GlassCard';

interface FilterSidebarProps {
  filters: VendorListingFilterState & { search?: string };
  onChangeFilter: (updated: Partial<VendorListingFilterState & { search?: string }>) => void;
  onResetFilters: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChangeFilter,
  onResetFilters,
}) => {
  return (
    <GlassCard className="p-6 border-white/60 bg-white/70 shadow-lg w-full">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200/50">
        <div className="flex items-center gap-2 text-gray-900">
          <SlidersHorizontal className="w-5 h-5" />
          <h3 className="font-bold text-lg tracking-tight">Filtreler</h3>
        </div>
        <button
          onClick={onResetFilters}
          className="text-[11px] font-bold text-[#E6007E] hover:text-[#c5006b] flex items-center gap-1 uppercase tracking-wider transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Temizle
        </button>
      </div>

      <div className="space-y-8">
        
        {/* Kategoriler (Şık Liste) */}
        <div className="space-y-3">
          <h4 className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">Kategori</h4>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => onChangeFilter({ category: 'ALL' })}
              className={`flex items-center justify-between p-2.5 rounded-xl transition-all ${
                (!filters.category || filters.category === 'ALL') ? 'bg-[#1D1D1F] text-white shadow-md' : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <span className="text-[13px] font-semibold">Tüm Kategoriler</span>
            </button>
            {CATEGORIES_LIST?.map((cat: { slug: string; name: string }) => {
              const isActive = filters.category === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => onChangeFilter({ category: cat.slug })}
                  className={`flex items-center justify-between p-2.5 rounded-xl transition-all ${
                    isActive ? 'bg-[#1D1D1F] text-white shadow-md' : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span className="text-[13px] font-semibold">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Şehirler (Select) */}
        <div className="space-y-3">
          <h4 className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">Şehir</h4>
          <select
            value={filters.city || 'ALL'}
            onChange={(e) => onChangeFilter({ city: e.target.value })}
            className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl text-[13px] font-semibold text-gray-800 outline-none focus:ring-2 focus:ring-[#E6007E]/20 focus:border-[#E6007E] transition-all"
          >
            <option value="ALL">Tüm Şehirler</option>
            {CITIES_LIST?.map((city: string) => (
              <option key={city} value={city === 'Tüm Şehirler' ? 'ALL' : city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Fiyat Aralığı (Gelecekte Slider Eklenebilir, Şimdilik Select) */}
        <div className="space-y-3">
          <h4 className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">Fiyat Aralığı</h4>
          <select
            className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-xl text-[13px] font-semibold text-gray-800 outline-none focus:ring-2 focus:ring-[#E6007E]/20 transition-all"
          >
            <option value="ALL">Fark Etmez</option>
            <option value="LOW">Ekonomik (0 - 50.000 ₺)</option>
            <option value="MID">Standart (50.000 - 150.000 ₺)</option>
            <option value="HIGH">Premium (150.000 ₺ +)</option>
          </select>
        </div>

        {/* Akıllı Tercihler (Toggles) */}
        <div className="space-y-3 pt-4 border-t border-gray-200/50">
          <h4 className="text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-4">Akıllı Tercihler</h4>
          
          <button
            onClick={() => onChangeFilter({ availabilityOnly: !filters.availabilityOnly })}
            className="w-full flex items-center justify-between p-3 bg-white/50 border border-gray-100 rounded-xl hover:bg-white transition-colors group"
          >
            <span className="text-[13px] font-semibold text-gray-800 flex items-center gap-2">
              ⚡ Sadece Müsait Olanlar
            </span>
            {filters.availabilityOnly ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            ) : (
              <Circle className="w-5 h-5 text-gray-300 group-hover:text-gray-400" />
            )}
          </button>

          <button
            onClick={() => onChangeFilter({ verifiedOnly: !filters.verifiedOnly })}
            className="w-full flex items-center justify-between p-3 bg-white/50 border border-gray-100 rounded-xl hover:bg-white transition-colors group"
          >
            <span className="text-[13px] font-semibold text-gray-800 flex items-center gap-2">
              ✓ Sadece Onaylı Firmalar
            </span>
            {filters.verifiedOnly ? (
              <CheckCircle2 className="w-5 h-5 text-amber-500" />
            ) : (
              <Circle className="w-5 h-5 text-gray-300 group-hover:text-gray-400" />
            )}
          </button>
        </div>

      </div>
    </GlassCard>
  );
};