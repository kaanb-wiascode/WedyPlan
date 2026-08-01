'use client';

import React from 'react';
import { VendorListingFilterState } from '@/types/vendor-listing';
import { CATEGORIES_LIST, CITIES_LIST } from '@/lib/data/vendor-listing-data';
import { Check, RotateCcw, Map, Grid, Search, SlidersHorizontal } from 'lucide-react';
import GlassCard from '@/components/shared/ui/GlassCard';

interface FilterBarProps {
  filters: VendorListingFilterState & { search?: string };
  onChangeFilter: (updated: Partial<VendorListingFilterState & { search?: string }>) => void;
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
    <div className="sticky top-24 z-40 w-full mb-8">
      <GlassCard className="p-3 md:p-4 border-white/60 bg-white/70 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Sol: Arama ve Temel Filtreler */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          
          {/* Arama Kutusu */}
          <div className="flex items-center bg-white/80 border border-gray-200 rounded-2xl px-4 py-2.5 w-full md:w-64 focus-within:ring-2 focus-within:ring-[#E6007E]/20 transition-all">
            <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Firma veya hizmet ara..."
              value={filters.search || ''}
              onChange={(e) => onChangeFilter({ search: e.target.value })}
              className="bg-transparent text-[13px] text-gray-900 placeholder:text-gray-500 outline-none w-full"
            />
          </div>

          {/* Kategori Seçici */}
          <select
            value={filters.category || 'ALL'}
            onChange={(e) => onChangeFilter({ category: e.target.value })}
            className="px-4 py-2.5 bg-white/80 border border-gray-200 rounded-2xl text-[13px] font-semibold text-gray-800 outline-none cursor-pointer focus:border-[#E6007E] transition-colors"
          >
            <option value="ALL">Tüm Kategoriler</option>
            {CATEGORIES_LIST?.map((cat: { slug: string; name: string }) => (
              <option key={cat.slug} value={cat.slug}>{cat.name}</option>
            ))}
          </select>

          {/* Şehir Seçici */}
          <select
            value={filters.city || 'ALL'}
            onChange={(e) => onChangeFilter({ city: e.target.value })}
            className="px-4 py-2.5 bg-white/80 border border-gray-200 rounded-2xl text-[13px] font-semibold text-gray-800 outline-none cursor-pointer focus:border-[#E6007E] transition-colors"
          >
            <option value="ALL">Tüm Şehirler</option>
            {CITIES_LIST?.map((city: string) => (
              <option key={city} value={city === 'Tüm Şehirler' ? 'ALL' : city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Sağ: Hızlı Filtreler ve Görünüm Modu */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          
          {/* Akıllı Butonlar (Toggle) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onChangeFilter({ availabilityOnly: !filters.availabilityOnly })}
              className={`px-4 py-2.5 rounded-2xl text-[12px] font-bold border transition-all flex items-center gap-1.5 ${
                filters.availabilityOnly
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm'
                  : 'bg-white/80 text-gray-500 border-gray-200 hover:bg-white'
              }`}
            >
              {filters.availabilityOnly && <Check className="w-3.5 h-3.5" />}
              <span>⚡ Müsait</span>
            </button>

            <button
              onClick={() => onChangeFilter({ verifiedOnly: !filters.verifiedOnly })}
              className={`px-4 py-2.5 rounded-2xl text-[12px] font-bold border transition-all flex items-center gap-1.5 ${
                filters.verifiedOnly
                  ? 'bg-amber-50 text-amber-700 border-amber-200 shadow-sm'
                  : 'bg-white/80 text-gray-500 border-gray-200 hover:bg-white'
              }`}
            >
              <span>✓ Onaylı</span>
            </button>
          </div>

          {/* Dikey Ayıraç */}
          <div className="hidden md:block w-px h-8 bg-gray-200 mx-1" />

          {/* Sıralama ve Görünüm */}
          <div className="flex items-center gap-2">
            <select
              value={filters.sortBy || 'RECOMMENDED'}
              onChange={(e) => onChangeFilter({ sortBy: e.target.value as any })}
              className="px-3 py-2.5 bg-white/80 border border-gray-200 rounded-2xl text-[12px] font-bold text-gray-700 outline-none cursor-pointer"
            >
              <option value="RECOMMENDED">Önerilen Sıralama</option>
              <option value="RATING">En Yüksek Puanlılar</option>
              <option value="PRICE_LOW">Fiyat: Düşükten Yükseğe</option>
              <option value="PRICE_HIGH">Fiyat: Yüksekten Düşüğe</option>
            </select>

            <div className="bg-white/80 p-1 rounded-2xl border border-gray-200 flex items-center text-[12px] font-bold">
              <button
                onClick={() => onToggleViewMode('GRID')}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  viewMode === 'GRID' ? 'bg-[#1D1D1F] text-white shadow-md' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Grid className="w-3.5 h-3.5" /> Liste
              </button>
              <button
                onClick={() => onToggleViewMode('MAP')}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                  viewMode === 'MAP' ? 'bg-[#1D1D1F] text-white shadow-md' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Map className="w-3.5 h-3.5" /> Harita
              </button>
            </div>

            <button
              onClick={onResetFilters}
              title="Filtreleri Temizle"
              className="p-2.5 bg-white/80 hover:bg-rose-50 hover:text-rose-600 text-gray-500 rounded-2xl border border-gray-200 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

        </div>
      </GlassCard>
    </div>
  );
};