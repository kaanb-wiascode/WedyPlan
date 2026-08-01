'use client';

import React, { useState } from 'react';
import { RotateCcw, SlidersHorizontal, CheckCircle2, Circle } from 'lucide-react';
import GlassCard from '@/components/shared/ui/GlassCard';

interface ModaFilterState {
  category: string;
  style: string;
  fabric: string;
  rentalOption: boolean;
  customDesignOnly: boolean;
  search?: string;
  sortBy?: string;
}

interface ModaFilterSidebarProps {
  filters: ModaFilterState;
  onChangeFilter: (updated: Partial<ModaFilterState>) => void;
  onResetFilters: () => void;
}

const MODA_CATEGORIES = [
  { slug: 'ALL', name: 'Tüm Koleksiyonlar' },
  { slug: 'gelinlik', name: 'Gelinlik Modelleri' },
  { slug: 'damatlik', name: 'Damatlık & Takım Elbise' },
  { slug: 'abiye', name: 'Abiye & Gece Elbisesi' },
  { slug: 'aksesuar', name: 'Gelin Aksesuarları & Duvak' },
];

const STYLES = [
  { id: 'ALL', label: 'Tüm Kesimler' },
  { id: 'A_KESIM', label: 'A Kesim' },
  { id: 'PRENSES', label: 'Prenses Model' },
  { id: 'BALIK', label: 'Balık Kesim' },
  { id: 'HELEN', label: 'Helen Stil' },
  { id: 'MINIMAL', label: 'Sade & Minimal' },
];

export const ModaFilterSidebar: React.FC<ModaFilterSidebarProps> = ({
  filters,
  onChangeFilter,
  onResetFilters,
}) => {
  return (
    <GlassCard className="p-6 border-white/60 bg-white/80 shadow-lg w-full rounded-[32px]">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200/50">
        <div className="flex items-center gap-2 text-gray-900">
          <SlidersHorizontal className="w-5 h-5" />
          <h3 className="font-bold text-lg tracking-tight">Moda Filtreleri</h3>
        </div>
        <button
          onClick={onResetFilters}
          className="text-[11px] font-bold text-[#E6007E] hover:text-[#c5006b] flex items-center gap-1.5 uppercase tracking-wider transition-colors bg-[#E6007E]/5 px-3 py-1.5 rounded-full"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Temizle
        </button>
      </div>

      <div className="space-y-8">
        
        {/* KOLEKSİYON KATEGORİSİ */}
        <div className="space-y-3">
          <h4 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest pl-2">Koleksiyon</h4>
          <div className="flex flex-col gap-1.5">
            {MODA_CATEGORIES.map((cat) => {
              const isActive = (filters.category || 'ALL') === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => onChangeFilter({ category: cat.slug })}
                  className={`flex items-center justify-between p-3 rounded-2xl transition-all duration-200 ${
                    isActive ? 'bg-[#1D1D1F] text-white shadow-md scale-[1.02]' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <span className="text-[13px] font-semibold">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* KESİM / SİLÜET TARZI */}
        <div className="space-y-3">
          <h4 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest pl-2">Model & Kesim</h4>
          <div className="flex flex-col gap-1.5">
            {STYLES.map((style) => {
              const isActive = (filters.style || 'ALL') === style.id;
              return (
                <button
                  key={style.id}
                  onClick={() => onChangeFilter({ style: style.id })}
                  className={`flex items-center justify-between p-3 rounded-2xl transition-all duration-200 ${
                    isActive ? 'bg-[#1D1D1F] text-white shadow-md' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <span className="text-[13px] font-medium">{style.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* HİZMET & SEÇENEK TERCİHLERİ */}
        <div className="space-y-3 pt-6 border-t border-gray-200/50">
          <h4 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest pl-2 mb-4">Seçenekler</h4>
          
          <button
            onClick={() => onChangeFilter({ rentalOption: !filters.rentalOption })}
            className={`w-full flex items-center justify-between p-3.5 border rounded-2xl transition-all duration-300 ${
              filters.rentalOption ? 'bg-rose-50 border-rose-200 shadow-sm' : 'bg-white border-gray-100 hover:border-gray-200'
            }`}
          >
            <span className={`text-[13px] font-semibold flex items-center gap-2 ${filters.rentalOption ? 'text-rose-800' : 'text-gray-700'}`}>
              👗 Kiralama İmkanı Var
            </span>
            {filters.rentalOption ? (
              <CheckCircle2 className="w-5 h-5 text-rose-500" />
            ) : (
              <Circle className="w-5 h-5 text-gray-200" />
            )}
          </button>

          <button
            onClick={() => onChangeFilter({ customDesignOnly: !filters.customDesignOnly })}
            className={`w-full flex items-center justify-between p-3.5 border rounded-2xl transition-all duration-300 ${
              filters.customDesignOnly ? 'bg-amber-50 border-amber-200 shadow-sm' : 'bg-white border-gray-100 hover:border-gray-200'
            }`}
          >
            <span className={`text-[13px] font-semibold flex items-center gap-2 ${filters.customDesignOnly ? 'text-amber-800' : 'text-gray-700'}`}>
              ✨ Özel Dikim / Modaevi
            </span>
            {filters.customDesignOnly ? (
              <CheckCircle2 className="w-5 h-5 text-amber-500" />
            ) : (
              <Circle className="w-5 h-5 text-gray-200" />
            )}
          </button>
        </div>

      </div>
    </GlassCard>
  );
};