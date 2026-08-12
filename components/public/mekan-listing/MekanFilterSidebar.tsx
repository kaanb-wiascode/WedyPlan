'use client';

import React, { useState, useRef, useEffect } from 'react';
import { RotateCcw, SlidersHorizontal, CheckCircle2, Circle, MapPin, ChevronDown, Users, Sparkles } from 'lucide-react';

interface MekanFilterState {
  category: string;
  city: string;
  capacity: string;
  priceRange: string;
  features: string[];
  search?: string;
  sortBy?: string;
}

interface MekanFilterSidebarProps {
  filters: MekanFilterState;
  onChangeFilter: (updated: Partial<MekanFilterState>) => void;
  onResetFilters: () => void;
}

const VENUE_TYPES = [
  { slug: 'ALL', name: 'Tüm Mekanlar' },
  { slug: 'KIR_BAHCESI', name: 'Kır Bahçesi' },
  { slug: 'OTEL', name: 'Otel & Resort' },
  { slug: 'TARIHI_MEKAN', name: 'Tarihi Mekan & Yalı' },
  { slug: 'DUGUN_SALONU', name: 'Düğün Salonu' },
  { slug: 'TEKNE', name: 'Tekne & Yat' },
];

const CAPACITIES = [
  { id: 'ALL', label: 'Fark Etmez' },
  { id: '100-300', label: '100 - 300 Kişi (Butik)' },
  { id: '300-500', label: '300 - 500 Kişi' },
  { id: '500-1000', label: '500 - 1000 Kişi' },
  { id: '1000+', label: '1000+ Kişi (Geniş Davet)' },
];

const FEATURES = [
  { id: 'acik_alan', label: 'Açık Alan Var' },
  { id: 'deniz_manzarasi', label: 'Deniz / Boğaz Manzarası' },
  { id: 'konaklama', label: 'Konaklama İmkanı' },
  { id: 'alkol_servisi', label: 'Alkol Servisi Var' },
];

export const MekanFilterSidebar: React.FC<MekanFilterSidebarProps> = ({
  filters,
  onChangeFilter,
  onResetFilters,
}) => {
  const toggleFeature = (featId: string) => {
    const current = filters.features || [];
    if (current.includes(featId)) {
      onChangeFilter({ features: current.filter(id => id !== featId) });
    } else {
      onChangeFilter({ features: [...current, featId] });
    }
  };

  return (
    <div className="p-6 bg-white border border-neutral-200/80 rounded-[32px] shadow-sm w-full">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-100">
        <div className="flex items-center gap-2 text-neutral-900">
          <SlidersHorizontal className="w-5 h-5 text-[#0071e3]" />
          <h3 className="font-serif font-bold text-lg tracking-tight">Mekan Filtreleri</h3>
        </div>
        <button
          onClick={onResetFilters}
          className="text-[11px] font-bold text-neutral-500 hover:text-[#0071e3] flex items-center gap-1 uppercase tracking-wider transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Temizle
        </button>
      </div>

      <div className="space-y-8">
        
        {/* Mekan Türü */}
        <div className="space-y-3">
          <h4 className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest pl-1">Mekan Türü</h4>
          <div className="flex flex-col gap-1.5">
            {VENUE_TYPES.map((type) => {
              const isActive = (filters.category || 'ALL') === type.slug;
              return (
                <button
                  key={type.slug}
                  onClick={() => onChangeFilter({ category: type.slug })}
                  className={`flex items-center justify-between p-3 rounded-2xl transition-all duration-200 ${
                    isActive ? 'bg-neutral-900 text-white shadow-md' : 'hover:bg-neutral-50 text-neutral-600'
                  }`}
                >
                  <span className="text-[13px] font-semibold">{type.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Kapasite */}
        <div className="space-y-3">
          <h4 className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest pl-1 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" /> Davetli Kapasitesi
          </h4>
          <div className="flex flex-col gap-1.5">
            {CAPACITIES.map((cap) => {
              const isActive = (filters.capacity || 'ALL') === cap.id;
              return (
                <button
                  key={cap.id}
                  onClick={() => onChangeFilter({ capacity: cap.id })}
                  className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all text-left group ${
                    isActive ? 'bg-[#0071e3]/8 text-[#0071e3]' : 'hover:bg-neutral-50 text-neutral-600'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                    isActive ? 'border-rose-600' : 'border-neutral-300 group-hover:border-rose-400'
                  }`}>
                    {isActive && <div className="w-2 h-2 bg-[#0071e3] rounded-full" />}
                  </div>
                  <span className="text-[13px] font-medium">{cap.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Özel Nitelikler (Premium Features) */}
        <div className="space-y-3 pt-6 border-t border-neutral-100">
          <h4 className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest pl-1 mb-4 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Aranan Özellikler
          </h4>
          
          <div className="space-y-2.5">
            {FEATURES.map((feat) => {
              const isSelected = filters.features?.includes(feat.id);
              return (
                <button
                  key={feat.id}
                  onClick={() => toggleFeature(feat.id)}
                  className={`w-full flex items-center justify-between p-3.5 border rounded-2xl transition-all duration-300 ${
                    isSelected ? 'bg-amber-50/50 border-amber-200 shadow-sm' : 'bg-white border-neutral-100 hover:border-neutral-200'
                  }`}
                >
                  <span className={`text-[13px] font-semibold flex items-center gap-2 ${isSelected ? 'text-amber-900' : 'text-neutral-700'}`}>
                    {feat.label}
                  </span>
                  {isSelected ? (
                    <CheckCircle2 className="w-5 h-5 text-amber-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-neutral-200" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};