'use client';

import React from 'react';
import { Sparkles, RotateCcw } from 'lucide-react';

interface AiSearchEmptyStateProps {
  onReset: () => void;
}

export const AiSearchEmptyState: React.FC<AiSearchEmptyStateProps> = ({ onReset }) => {
  return (
    <div className="bg-white/50 backdrop-blur-2xl border border-white p-12 rounded-[36px] text-center space-y-4 max-w-xl mx-auto shadow-xs">
      <div className="w-14 h-14 rounded-2xl bg-pink-500/10 text-[#E6007E] flex items-center justify-center mx-auto">
        <Sparkles className="w-7 h-7 text-[#D4AF37]" />
      </div>

      <h3 className="font-serif font-bold text-[24px] text-[#1D1D1F]">
        Eşleşen Firma Bulunamadı
      </h3>

      <p className="text-[13px] text-[#6E6E73] font-light leading-relaxed">
        Girdiğiniz arama cümlesine veya filtre kriterlerine uygun onaylı partnerimiz eşleşmedi. Arama cümlenizi esneterek veya filtreleri sıfırlayarak tekrar deneyebilirsiniz.
      </p>

      <button
        onClick={onReset}
        className="bg-[#1D1D1F] hover:bg-black text-white text-[12px] font-bold px-6 py-3 rounded-full transition inline-flex items-center gap-2 cursor-pointer"
      >
        <RotateCcw className="w-4 h-4 text-[#D4AF37]" />
        <span>Tüm Filtreleri Sıfırla</span>
      </button>
    </div>
  );
};