'use client';

import React from 'react';
import { MapPin, Star } from 'lucide-react';
import { VendorListingItem } from '@/types/vendor-listing';

interface MapViewProps {
  vendors: VendorListingItem[];
}

export const MapView: React.FC<MapViewProps> = ({ vendors }) => {
  return (
    <div className="relative h-[650px] w-full rounded-[36px] overflow-hidden border border-white/80 bg-slate-900 shadow-xl flex items-center justify-center">
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative z-10 text-center space-y-4 p-8 max-w-lg bg-slate-900/80 backdrop-blur-2xl rounded-[32px] border border-slate-700 text-white shadow-2xl">
        <MapPin className="w-10 h-10 text-[#E6007E] mx-auto animate-bounce" />
        <h3 className="font-serif font-bold text-[22px]">Apple Maps Harita Keşfi</h3>
        <p className="text-[12px] text-slate-300">
          Seçtiğiniz lokasyondaki {vendors.length} onaylı düğün mekanı ve hizmet sağlayıcısı harita üzerinde konumlandırıldı.
        </p>

        <div className="flex flex-wrap justify-center gap-2 pt-2 max-h-40 overflow-y-auto">
          {vendors.map((v) => (
            <span key={v.id} className="text-[10px] font-bold bg-white/20 text-white px-3 py-1 rounded-full border border-white/30">
              📍 {v.name} ({v.startingPrice.toLocaleString('tr-TR')} ₺)
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};