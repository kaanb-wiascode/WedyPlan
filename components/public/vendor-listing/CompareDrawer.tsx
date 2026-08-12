'use client';

import React from 'react';
import { Layers, X, ArrowRight, Check } from 'lucide-react';
import { VendorListingItem } from '@/types/vendor-listing';

interface CompareDrawerProps {
  selectedVendors: VendorListingItem[];
  onRemoveVendor: (id: string) => void;
  onClearAll: () => void;
}

export const CompareDrawer: React.FC<CompareDrawerProps> = ({
  selectedVendors,
  onRemoveVendor,
  onClearAll
}) => {
  if (selectedVendors.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-3xl w-full px-4">
      <div className="bg-[#1D1D1F]/90 backdrop-blur-2xl border border-white/20 text-white p-4 rounded-[32px] shadow-2xl flex items-center justify-between gap-4">
        
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#0071e3] rounded-2xl">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-[14px]">
              {selectedVendors.length} Firma Seçildi
            </h4>
            <span className="text-[11px] text-slate-400">En fazla 3 firmayı karşılaştırabilirsiniz</span>
          </div>
        </div>

        {/* Selected Vendor Thumbnails */}
        <div className="hidden sm:flex items-center gap-2">
          {selectedVendors.map((v) => (
            <div key={v.id} className="relative group">
              <img src={v.imageUrl} alt={v.name} className="w-10 h-10 rounded-xl object-cover border border-white/40" />
              <button
                onClick={() => onRemoveVendor(v.id)}
                className="absolute -top-1 -right-1 bg-[#0071e3]/80 text-white rounded-full p-0.5 text-[8px] cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onClearAll}
            className="text-[11px] font-bold text-slate-400 hover:text-white transition px-2 cursor-pointer"
          >
            Temizle
          </button>
          <button
            onClick={() => alert(`${selectedVendors.length} firmanın detaylı karşılaştırma analizi hazırlanıyor...`)}
            className="bg-[#0071e3] hover:bg-pink-600 text-white text-[12px] font-bold px-5 py-2.5 rounded-full transition shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <span>Karşılaştır</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};