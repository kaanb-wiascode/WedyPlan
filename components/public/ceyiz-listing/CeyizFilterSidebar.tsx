'use client';

import React from 'react';
import { RotateCcw, SlidersHorizontal, CheckCircle2, Circle, Tag, Sparkles, Gift } from 'lucide-react';

interface CeyizFilterState {
  category: string;
  brand: string;
  priceRange: string;
  inStockOnly: boolean;
  isBundleOnly: boolean;
  search?: string;
  sortBy?: string;
}

interface CeyizFilterSidebarProps {
  filters: CeyizFilterState;
  onChangeFilter: (updated: Partial<CeyizFilterState>) => void;
  onResetFilters: () => void;
}

const CEYIZ_CATEGORIES = [
  { slug: 'ALL', name: 'Tüm Kategoriler' },
  { slug: 'ZUCCACIYE', name: 'Züccaciye & Yemek Takımı' },
  { slug: 'EV_TEKSTILI', name: 'Ev Tekstili & Yatak Odası' },
  { slug: 'KUCUK_EV_ALETLERI', name: 'Küçük Ev Aletleri' },
  { slug: 'MOBILYA', name: 'Mobilya & Dekorasyon' },
  { slug: 'BEYAZ_ESYA', name: 'Beyaz Eşya & TV' },
];

const BRANDS = [
  { id: 'ALL', label: 'Tüm Markalar' },
  { id: 'KARACA', label: 'Karaca' },
  { id: 'KORKMAZ', label: 'Korkmaz' },
  { id: 'TACH', label: 'Taç Tekstil' },
  { id: 'PHILIPS', label: 'Philips' },
  { id: 'BOSCH', label: 'Bosch' },
];

export const CeyizFilterSidebar: React.FC<CeyizFilterSidebarProps> = ({
  filters,
  onChangeFilter,
  onResetFilters,
}) => {
  return (
    <div className="p-6 bg-white border border-neutral-200/80 rounded-[32px] shadow-sm w-full">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-100">
        <div className="flex items-center gap-2 text-neutral-900">
          <SlidersHorizontal className="w-5 h-5 text-[#0071e3]" />
          <h3 className="font-serif font-bold text-lg tracking-tight">Çeyiz Filtreleri</h3>
        </div>
        <button
          onClick={onResetFilters}
          className="text-[11px] font-bold text-neutral-500 hover:text-[#0071e3] flex items-center gap-1 uppercase tracking-wider transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Temizle
        </button>
      </div>

      <div className="space-y-8">
        
        {/* Kategori Seçimi */}
        <div className="space-y-3">
          <h4 className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest pl-1">Kategori</h4>
          <div className="flex flex-col gap-1.5">
            {CEYIZ_CATEGORIES.map((cat) => {
              const isActive = (filters.category || 'ALL') === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => onChangeFilter({ category: cat.slug })}
                  className={`flex items-center justify-between p-3 rounded-2xl transition-all duration-200 ${
                    isActive ? 'bg-neutral-900 text-white shadow-md' : 'hover:bg-neutral-50 text-neutral-600'
                  }`}
                >
                  <span className="text-[13px] font-semibold">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Markalar */}
        <div className="space-y-3">
          <h4 className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest pl-1 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5" /> Marka
          </h4>
          <div className="flex flex-col gap-1.5">
            {BRANDS.map((brand) => {
              const isActive = (filters.brand || 'ALL') === brand.id;
              return (
                <button
                  key={brand.id}
                  onClick={() => onChangeFilter({ brand: brand.id })}
                  className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all text-left group ${
                    isActive ? 'bg-pink-50 text-[#0071e3]' : 'hover:bg-neutral-50 text-neutral-600'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                    isActive ? 'border-[#0071e3]' : 'border-neutral-300 group-hover:border-pink-400'
                  }`}>
                    {isActive && <div className="w-2 h-2 bg-[#0071e3] rounded-full" />}
                  </div>
                  <span className="text-[13px] font-medium">{brand.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Akıllı Çeyiz Seçenekleri */}
        <div className="space-y-3 pt-6 border-t border-neutral-100">
          <h4 className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest pl-1 mb-4 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Avantajlı Tercihler
          </h4>
          
          <button
            onClick={() => onChangeFilter({ isBundleOnly: !filters.isBundleOnly })}
            className={`w-full flex items-center justify-between p-3.5 border rounded-2xl transition-all duration-300 ${
              filters.isBundleOnly ? 'bg-amber-50/60 border-amber-200 shadow-sm' : 'bg-white border-neutral-100 hover:border-neutral-200'
            }`}
          >
            <span className={`text-[13px] font-semibold flex items-center gap-2 ${filters.isBundleOnly ? 'text-amber-900' : 'text-neutral-700'}`}>
              <Gift className="w-4 h-4 text-amber-600" /> Sadece Çeyiz Setleri (Paket)
            </span>
            {filters.isBundleOnly ? (
              <CheckCircle2 className="w-5 h-5 text-amber-500" />
            ) : (
              <Circle className="w-5 h-5 text-neutral-200" />
            )}
          </button>

          <button
            onClick={() => onChangeFilter({ inStockOnly: !filters.inStockOnly })}
            className={`w-full flex items-center justify-between p-3.5 border rounded-2xl transition-all duration-300 ${
              filters.inStockOnly ? 'bg-emerald-50/60 border-emerald-200 shadow-sm' : 'bg-white border-neutral-100 hover:border-neutral-200'
            }`}
          >
            <span className={`text-[13px] font-semibold flex items-center gap-2 ${filters.inStockOnly ? 'text-emerald-900' : 'text-neutral-700'}`}>
              ⚡ Sadece Hızlı Kargo / Stokta
            </span>
            {filters.inStockOnly ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            ) : (
              <Circle className="w-5 h-5 text-neutral-200" />
            )}
          </button>
        </div>

      </div>
    </div>
  );
};