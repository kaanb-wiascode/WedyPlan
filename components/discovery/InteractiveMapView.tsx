'use client';

import React from 'react';
import { MapPin, Star } from 'lucide-react';
import { DiscoveryVendor } from '@/types/vendor-discovery';

interface InteractiveMapViewProps {
  vendors: DiscoveryVendor[];
}

export const InteractiveMapView: React.FC<InteractiveMapViewProps> = ({ vendors }) => {
  return (
    <div className="relative h-[600px] w-full rounded-[36px] overflow-hidden border border-white/80 bg-slate-900 shadow-lg flex items-center justify-center">
      {/* Dark Styled Map Overlay Mock */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative z-10 text-center space-y-4 p-8 max-w-md bg-slate-900/80 backdrop-blur-2xl rounded-[32px] border border-slate-700 text-white">
        <MapPin className="w-10 h-10 text-[#E6007E] mx-auto animate-bounce" />
        <h3 className="font-serif font-bold text-[20px]">Apple Maps Lokasyon Görünümü</h3>
        <p className="text-[12px] text-slate-300">
          Harita üzerinde konumlandırılmış {vendors.length} onaylı düğün mekanı ve fotoğraf stüdyosu.
        </p>

        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {vendors.map((v) => (
            <span key={v.id} className="text-[10px] font-bold bg-white/20 px-3 py-1 rounded-full border border-white/30">
              📍 {v.name} ({v.priceStart.toLocaleString('tr-TR')} ₺)
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};