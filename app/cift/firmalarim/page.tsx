'use client';

import React, { useState } from 'react';
import { MOCK_COUPLE_VENDORS } from '@/lib/couple-constants';
import { Store, Phone, CheckCircle2, Clock, Heart } from 'lucide-react';

export default function CoupleVendorsPage() {
  const [vendors] = useState(MOCK_COUPLE_VENDORS);

  return (
    <div className="space-y-8 max-w-[1200px] mx-auto">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/60 backdrop-blur-xl border border-white rounded-full text-[11px] font-semibold text-[#E6007E] mb-2">
          <Store className="w-3.5 h-3.5" /> Düğün Ekibi
        </div>
        <h1 className="text-[28px] md:text-[32px] font-serif text-[#1D1D1F]">
          Firmalarım & Favoriler
        </h1>
        <p className="text-[13px] text-[#6E6E73]">
          Anlaştığınız hizmet sağlayıcıları ve teklif beklediğiniz firmaları yönetin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vendors.map((v) => (
          <div key={v.id} className="bg-white/60 backdrop-blur-2xl border border-white/90 p-5 rounded-[24px] shadow-sm flex flex-col justify-between gap-4">
            <div className="flex items-center gap-4">
              <img src={v.imageUrl} alt={v.name} className="w-20 h-20 rounded-2xl object-cover bg-slate-100 shrink-0" />
              <div>
                <span className="text-[10px] font-mono font-bold text-[#86868B] uppercase">{v.category}</span>
                <h3 className="font-bold text-[16px] text-[#1D1D1F] mt-0.5">{v.name}</h3>
                {v.phone && <span className="text-[12px] text-[#6E6E73] flex items-center gap-1 mt-1"><Phone className="w-3 h-3 text-[#E6007E]" /> {v.phone}</span>}
              </div>
            </div>

            <div className="pt-3 border-t border-black/5 flex items-center justify-between">
              <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                v.status === 'AGREED'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : v.status === 'WAITING_QUOTE'
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-pink-50 text-[#E6007E] border-pink-200'
              }`}>
                {v.status === 'AGREED' ? '✓ Anlaşıldı' : v.status === 'WAITING_QUOTE' ? '⏳ Teklif Bekliyor' : '♡ Favori'}
              </span>

              {v.price && (
                <span className="font-serif font-bold text-[15px] text-[#1D1D1F]">{v.price.toLocaleString('tr-TR')} ₺</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}