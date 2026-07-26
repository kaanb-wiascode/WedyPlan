'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface MobileStickyCtaProps {
  startingPrice: number;
  onOpenQuoteModal: () => void;
}

export const MobileStickyCta: React.FC<MobileStickyCtaProps> = ({ startingPrice, onOpenQuoteModal }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-2xl border-t border-white/80 p-4 px-6 flex items-center justify-between shadow-[0_-10px_30px_rgba(0,0,0,0.08)]">
      <div>
        <span className="text-[10px] text-[#86868B] uppercase font-bold block">Başlangıç</span>
        <span className="font-serif font-bold text-[18px] text-[#1D1D1F]">{startingPrice.toLocaleString('tr-TR')} ₺</span>
      </div>

      <button
        onClick={onOpenQuoteModal}
        className="bg-[#1D1D1F] text-white text-[12px] font-bold px-6 py-3 rounded-full flex items-center gap-1.5 cursor-pointer"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Teklif Al
      </button>
    </div>
  );
};