'use client';

import React from 'react';
import { AiSearchFilterState } from '@/types/ai-search';
import { Filter, Check, RotateCcw } from 'lucide-react';

interface AiFilterPanelProps {
  filters: AiSearchFilterState;
  onChangeFilter: (updated: Partial<AiSearchFilterState>) => void;
  onResetFilters: () => void;
}

export const AiFilterPanel: React.FC<AiFilterPanelProps> = ({
  filters,
  onChangeFilter,
  onResetFilters
}) => {
  const cities = ['Tüm Şehirler', 'İstanbul', 'İzmir', 'Ankara', 'Bursa', 'Antalya'];
  const categories = ['Tümü', 'Düğün Salonu', 'Fotoğrafçı', 'Müzik & DJ', 'Gelinlik', 'Organizasyon'];

  return (
    <aside className="bg-white/50 backdrop-blur-2xl border border-white/90 p-6 rounded-[32px] shadow-xs space-y-6">
      <div className="flex items-center justify-between border-b border-black/5 pb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#E6007E]" />
          <h3 className="font-serif font-bold text-[16px] text-[#1D1D1F]">Filtreleri Özelleştir</h3>
        </div>
        <button
          onClick={onResetFilters}
          className="text-[11px] font-bold text-[#86868B] hover:text-[#E6007E] transition flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" /> Sıfırla
        </button>
      </div>

      {/* Category Selection */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold text-[#86868B] uppercase tracking-wider block">Kategori</label>
        <select
          value={filters.category}
          onChange={(e) => onChangeFilter({ category: e.target.value })}
          className="w-full p-3 bg-white/80 border border-slate-200 rounded-2xl text-[12px] font-semibold text-[#1D1D1F] outline-none focus:border-[#E6007E]"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat === 'Tümü' ? '' : cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* City Selection */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold text-[#86868B] uppercase tracking-wider block">Şehir</label>
        <select
          value={filters.city}
          onChange={(e) => onChangeFilter({ city: e.target.value })}
          className="w-full p-3 bg-white/80 border border-slate-200 rounded-2xl text-[12px] font-semibold text-[#1D1D1F] outline-none focus:border-[#E6007E]"
        >
          {cities.map((city) => (
            <option key={city} value={city === 'Tüm Şehirler' ? '' : city}>{city}</option>
          ))}
        </select>
      </div>

      {/* Max Budget Range */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-[11px] font-bold">
          <span className="text-[#86868B] uppercase tracking-wider">Üst Bütçe Sınırı</span>
          <span className="text-[#E6007E] font-serif font-bold text-[13px]">
            {filters.maxBudget > 0 ? `${filters.maxBudget.toLocaleString('tr-TR')} ₺` : 'Sınırsız'}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="500000"
          step="25000"
          value={filters.maxBudget}
          onChange={(e) => onChangeFilter({ maxBudget: Number(e.target.value) })}
          className="w-full accent-[#E6007E] cursor-pointer"
        />
      </div>

      {/* Verified Partner Toggle */}
      <div className="pt-2 border-t border-black/5">
        <button
          onClick={() => onChangeFilter({ verifiedOnly: !filters.verifiedOnly })}
          className={`w-full p-3 rounded-2xl text-[12px] font-bold border transition flex items-center justify-between cursor-pointer ${
            filters.verifiedOnly
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
              : 'bg-white/60 text-[#6E6E73] border-white'
          }`}
        >
          <span>Sadece Onaylı Partnerler</span>
          {filters.verifiedOnly && <Check className="w-4 h-4 text-emerald-600" />}
        </button>
      </div>
    </aside>
  );
};