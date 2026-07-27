'use client';

import React from 'react';
import { Wallet, ShieldCheck, CalendarCheck, Star } from 'lucide-react';

export const SuccessMetrics: React.FC = () => {
  return (
    <section className="py-12 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white/40 backdrop-blur-2xl border border-white/80 p-6 rounded-[32px] text-center space-y-1">
          <div className="p-2.5 bg-pink-500/10 text-[#E6007E] rounded-2xl w-fit mx-auto mb-2"><Wallet className="w-5 h-5" /></div>
          <div className="text-[28px] font-serif font-bold text-[#1D1D1F]">₺2.4M+</div>
          <p className="text-[11px] text-[#6E6E73]">Yönetilen Düğün Bütçesi</p>
        </div>

        <div className="bg-white/40 backdrop-blur-2xl border border-white/80 p-6 rounded-[32px] text-center space-y-1">
          <div className="p-2.5 bg-emerald-500/10 text-emerald-600 rounded-2xl w-fit mx-auto mb-2"><CalendarCheck className="w-5 h-5" /></div>
          <div className="text-[28px] font-serif font-bold text-[#1D1D1F]">%100</div>
          <p className="text-[11px] text-[#6E6E73]">Çakışmasız Takvim Garantisi</p>
        </div>

        <div className="bg-white/40 backdrop-blur-2xl border border-white/80 p-6 rounded-[32px] text-center space-y-1">
          <div className="p-2.5 bg-amber-500/10 text-[#D4AF37] rounded-2xl w-fit mx-auto mb-2"><ShieldCheck className="w-5 h-5" /></div>
          <div className="text-[28px] font-serif font-bold text-[#1D1D1F]">500+</div>
          <p className="text-[11px] text-[#6E6E73]">Doğrulanmış Partner Firma</p>
        </div>

        <div className="bg-white/40 backdrop-blur-2xl border border-white/80 p-6 rounded-[32px] text-center space-y-1">
          <div className="p-2.5 bg-purple-500/10 text-purple-600 rounded-2xl w-fit mx-auto mb-2"><Star className="w-5 h-5" /></div>
          <div className="text-[28px] font-serif font-bold text-[#1D1D1F]">4.95 / 5</div>
          <p className="text-[11px] text-[#6E6E73]">Çift Memnuniyet Skoru</p>
        </div>
      </div>
    </section>
  );
};