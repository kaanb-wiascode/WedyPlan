'use client';

import React, { useState } from 'react';
import { Sparkles, Search } from 'lucide-react';

interface MagazineAiSearchBoxProps {
  onSearchSubmit: (query: string) => void;
}

export const MagazineAiSearchBox: React.FC<MagazineAiSearchBoxProps> = ({ onSearchSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(query);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 my-8">
      <form onSubmit={handleSearch} className="bg-white/60 backdrop-blur-2xl p-3 rounded-[32px] border border-white/90 shadow-sm flex items-center gap-3">
        <div className="flex items-center gap-3 flex-1 px-4">
          <Sparkles className="w-5 h-5 text-[#0071e3] shrink-0" />
          <input
            type="text"
            placeholder="Dergide ne aramak istersiniz? Örn: '2026 kır düğünü saç stilleri ve gelinlik tüyoları'..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-[13px] sm:text-[14px] font-medium text-[#1D1D1F] bg-transparent outline-none placeholder:text-[#86868B]"
          />
        </div>
        <button
          type="submit"
          className="bg-[#1D1D1F] hover:bg-black text-white px-6 py-3 rounded-full text-[12px] font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Search className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>İçerik Bul</span>
        </button>
      </form>
    </div>
  );
};