'use client';

import React, { useState, useRef, useEffect } from 'react';
import { VendorListingFilterState } from '@/types/vendor-listing';
import { CATEGORIES_LIST, CITIES_LIST } from '@/lib/data/vendor-listing-data';
import { RotateCcw, SlidersHorizontal, CheckCircle2, Circle, ChevronDown, MapPin } from 'lucide-react';
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
  const [isCityOpen, setIsCityOpen] = useState(false);
  const cityRef = useRef<HTMLDivElement>(null);

  // Dışarı tıklandığında şehir menüsünü kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cityRef.current && !cityRef.current.contains(event.target as Node)) {
        setIsCityOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Kategorilerdeki "Tüm Kategoriler" tekrarını önlemek için temizlenmiş liste
  const cleanCategories = CATEGORIES_LIST?.filter(c => c.slug !== 'ALL' && c.name !== 'Tüm Kategoriler') || [];

  return (
    <GlassCard className="p-6 border-white/60 bg-white/80 shadow-lg w-full rounded-[32px]">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200/50">
        <div className="flex items-center gap-2 text-gray-900">
          <SlidersHorizontal className="w-5 h-5" />
          <h3 className="font-bold text-lg tracking-tight">Filtreler</h3>
        </div>
        <button
          onClick={onResetFilters}
          className="text-[11px] font-bold text-[#E6007E] hover:text-[#c5006b] flex items-center gap-1.5 uppercase tracking-wider transition-colors bg-[#E6007E]/5 px-3 py-1.5 rounded-full"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Temizle
        </button>
      </div>

      <div className="space-y-8">
        
        {/* KATEGORİLER */}
        <div className="space-y-3">
          <h4 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest pl-2">Kategori</h4>
          <div className="flex flex-col gap-1.5">
            <button
              onClick={() => onChangeFilter({ category: 'ALL' })}
              className={`flex items-center justify-between p-3 rounded-2xl transition-all duration-200 ${
                (!filters.category || filters.category === 'ALL') ? 'bg-[#1D1D1F] text-white shadow-md scale-[1.02]' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <span className="text-[13px] font-semibold">Tüm Kategoriler</span>
            </button>
            {cleanCategories.map((cat: { slug: string; name: string }) => {
              const isActive = filters.category === cat.slug;
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

        {/* ŞEHİR (Özel Dropdown) */}
        <div className="space-y-3" ref={cityRef}>
          <h4 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest pl-2">Şehir</h4>
          <div className="relative">
            <button
              onClick={() => setIsCityOpen(!isCityOpen)}
              className="w-full px-4 py-3.5 bg-white border border-gray-200 hover:border-gray-300 rounded-2xl text-[13px] font-semibold text-gray-800 flex items-center justify-between transition-all shadow-sm"
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                {filters.city === 'ALL' || !filters.city ? 'Tüm Şehirler' : filters.city}
              </span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isCityOpen ? 'rotate-180' : ''}`} />
            </button>

            {isCityOpen && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2">
                <button
                  onClick={() => { onChangeFilter({ city: 'ALL' }); setIsCityOpen(false); }}
                  className="w-full text-left px-4 py-3 text-[13px] font-medium text-gray-700 hover:bg-gray-50 border-b border-gray-50 transition-colors"
                >
                  Tüm Şehirler
                </button>
                {CITIES_LIST?.map((city: string) => (
                  <button
                    key={city}
                    onClick={() => { onChangeFilter({ city }); setIsCityOpen(false); }}
                    className="w-full text-left px-4 py-3 text-[13px] font-medium text-gray-700 hover:bg-gray-50 border-b border-gray-50 transition-colors"
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* FİYAT ARALIĞI (Select yerine şık liste butonları) */}
        <div className="space-y-3">
          <h4 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest pl-2">Fiyat Aralığı</h4>
          <div className="flex flex-col gap-1.5">
            {[
              { id: 'ALL', label: 'Fark Etmez' },
              { id: 'LOW', label: 'Ekonomik (0 - 50.000 ₺)' },
              { id: 'MID', label: 'Standart (50.000 - 150.000 ₺)' },
              { id: 'HIGH', label: 'Premium (150.000 ₺ +)' }
            ].map((price) => (
              <button
                key={price.id}
                // Not: type'ınızda priceRange gibi bir field varsa buraya bağlayabilirsiniz.
                // Şimdilik görsel amaçlı eklenmiştir.
                className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-100 transition-all text-left group"
              >
                <div className="w-4 h-4 rounded-full border border-gray-300 group-hover:border-[#E6007E] transition-colors" />
                <span className="text-[13px] font-medium text-gray-700">{price.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* AKILLI TERCİHLER */}
        <div className="space-y-3 pt-6 border-t border-gray-200/50">
          <h4 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest pl-2 mb-4">Akıllı Tercihler</h4>
          
          <button
            onClick={() => onChangeFilter({ availabilityOnly: !filters.availabilityOnly })}
            className={`w-full flex items-center justify-between p-3.5 border rounded-2xl transition-all duration-300 ${
              filters.availabilityOnly ? 'bg-emerald-50 border-emerald-200 shadow-sm' : 'bg-white border-gray-100 hover:border-gray-200'
            }`}
          >
            <span className={`text-[13px] font-semibold flex items-center gap-2 ${filters.availabilityOnly ? 'text-emerald-800' : 'text-gray-700'}`}>
              ⚡ Sadece Müsait Olanlar
            </span>
            {filters.availabilityOnly ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            ) : (
              <Circle className="w-5 h-5 text-gray-200" />
            )}
          </button>

          <button
            onClick={() => onChangeFilter({ verifiedOnly: !filters.verifiedOnly })}
            className={`w-full flex items-center justify-between p-3.5 border rounded-2xl transition-all duration-300 ${
              filters.verifiedOnly ? 'bg-amber-50 border-amber-200 shadow-sm' : 'bg-white border-gray-100 hover:border-gray-200'
            }`}
          >
            <span className={`text-[13px] font-semibold flex items-center gap-2 ${filters.verifiedOnly ? 'text-amber-800' : 'text-gray-700'}`}>
              ✓ Sadece Onaylı Firmalar
            </span>
            {filters.verifiedOnly ? (
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