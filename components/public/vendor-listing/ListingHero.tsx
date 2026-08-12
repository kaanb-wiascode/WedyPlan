'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Search, ShieldCheck } from 'lucide-react';

interface ListingHeroProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  totalCount: number;
}

export const ListingHero: React.FC<ListingHeroProps> = ({
  searchQuery,
  onSearchChange,
  totalCount
}) => {
  return (
    <section className="relative pt-28 pb-8 px-4 sm:px-8 max-w-7xl mx-auto text-center space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-xl border border-white text-[12px] font-bold text-[#0071e3] shadow-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>WedyPlan Verified Partner Directory</span>
        </div>

        <h1 className="text-[32px] sm:text-[48px] font-serif font-normal text-[#1D1D1F] leading-tight">
          Hayalinizdeki Düğün İçin <br className="hidden sm:block" />
          <span className="italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#1D1D1F] via-[#0071e3] to-[#D4AF37]">
            Onaylı İşletmeleri Keşfedin.
          </span>
        </h1>

        <p className="text-[14px] text-[#6E6E73] max-w-xl mx-auto font-light">
          Türkiye'nin en seçkin mekanları ve bağımsız profesyonelleri WedyPlan güvencesiyle tek katalogda.
        </p>
      </motion.div>

      {/* Quick Search Input */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/60 backdrop-blur-2xl p-2.5 rounded-[28px] border border-white/90 shadow-sm flex items-center gap-3 px-4">
          <Search className="w-5 h-5 text-[#0071e3] shrink-0" />
          <input
            type="text"
            placeholder="Firma adı, mekan veya ilçe ara (Örn: Luxe Kır Bahçesi, Beykoz)..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full text-[14px] font-medium text-[#1D1D1F] bg-transparent outline-none placeholder:text-[#86868B]"
          />
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shrink-0 hidden sm:inline-flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> {totalCount} Firma
          </span>
        </div>
      </div>
    </section>
  );
};