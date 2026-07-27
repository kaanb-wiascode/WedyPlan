'use client';

import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

interface StickyBookingCardProps {
  startingPrice: number;
  onOpenOfferModal: () => void;
}

export const StickyBookingCard: React.FC<StickyBookingCardProps> = ({ startingPrice, onOpenOfferModal }) => {
  return (
    <>
      {/* Desktop Floating Card */}
      <div className="hidden lg:block sticky top-24 bg-white/60 backdrop-blur-3xl border border-white p-6 rounded-[32px] shadow-xl space-y-6">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider block">Başlangıç Paketi</span>
          <div className="font-serif font-bold text-[32px] text-[#1D1D1F]">
            {startingPrice.toLocaleString('tr-TR')} ₺
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 inline-block">
            ✓ Şeffaf Bütçe Garantisi
          </span>
        </div>

        <button
          onClick={onOpenOfferModal}
          className="w-full bg-[#1D1D1F] hover:bg-black text-white text-[13px] font-bold py-4 rounded-full transition shadow-md cursor-pointer flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>Ücretsiz Teklif İste</span>
        </button>

        <div className="text-[11px] text-[#6E6E73] text-center space-y-1">
          <p>⚡ WedyAI ile ortalama dönüş süresi 15 dakika</p>
          <p className="flex items-center justify-center gap-1 text-emerald-700 font-bold">
            <ShieldCheck className="w-3.5 h-3.5" /> E-İmza Sözleşme Koruması
          </p>
        </div>
      </div>

      {/* Mobile Bottom Fixed Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-2xl border-t border-white/80 p-4 px-6 flex items-center justify-between shadow-lg">
        <div>
          <span className="text-[10px] text-[#86868B] uppercase font-bold block">Başlangıç</span>
          <span className="font-serif font-bold text-[18px] text-[#1D1D1F]">{startingPrice.toLocaleString('tr-TR')} ₺</span>
        </div>

        <button
          onClick={onOpenOfferModal}
          className="bg-[#1D1D1F] text-white text-[12px] font-bold px-6 py-3 rounded-full flex items-center gap-1.5 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Teklif Al
        </button>
      </div>
    </>
  );
};