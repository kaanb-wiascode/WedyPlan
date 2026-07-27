'use client';

import React from 'react';
import { Search, Filter, ShieldCheck, MapPin } from 'lucide-react';

export const CategoryFilters: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 -mt-8 relative z-20">
      <div className="bg-white/70 backdrop-blur-3xl p-3 sm:p-4 rounded-[32px] border border-white/90 shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex flex-col sm:flex-row items-center gap-3">
        
        <div className="flex items-center gap-3 flex-1 w-full px-4 border-b sm:border-b-0 sm:border-r border-black/5 py-2 sm:py-0">
          <Search className="w-5 h-5 text-[#E6007E] shrink-0" />
          <input
            type="text"
            placeholder="Firma veya mekan adı arayın..."
            className="w-full text-[14px] font-medium text-[#1D1D1F] bg-transparent outline-none placeholder:text-[#86868B]"
          />
        </div>

        <div className="flex items-center gap-3 flex-1 w-full px-4 py-2 sm:py-0">
          <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0" />
          <select className="w-full text-[14px] font-medium text-[#1D1D1F] bg-transparent outline-none cursor-pointer">
            <option value="">Tüm Lokasyonlar</option>
            <option value="istanbul">İstanbul</option>
            <option value="izmir">İzmir</option>
            <option value="ankara">Ankara</option>
          </select>
        </div>

        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <button className="flex-1 sm:w-auto px-4 py-3 rounded-2xl bg-white/80 border border-white text-[12px] font-bold text-[#1D1D1F] hover:bg-white transition flex items-center justify-center gap-1.5 shadow-xs">
            <Filter className="w-3.5 h-3.5" /> Gelişmiş Filtre
          </button>
          <button className="flex-1 sm:w-auto bg-[#1D1D1F] text-white px-8 py-3 rounded-2xl font-bold text-[13px] hover:bg-black transition shadow-md">
            Ara
          </button>
        </div>

      </div>
    </div>
  );
};