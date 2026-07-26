'use client';

import React from 'react';
import { Calendar, CheckCircle2, AlertCircle } from 'lucide-react';

export const VendorAvailabilityCalendar: React.FC = () => {
  return (
    <div className="bg-white/50 backdrop-blur-3xl border border-white/90 p-8 rounded-[36px] shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-widest block mb-1">WOS Canlı Sync</span>
          <h3 className="font-serif font-semibold text-[22px] text-[#1D1D1F]">Tarih & Uygunluk Durumu</h3>
        </div>
        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Canlı Takvim Aktif
        </span>
      </div>

      <p className="text-[13px] text-[#6E6E73]">
        Yaz 2026 Sezonu için Cumartesi / Pazar gece vardiyalarında son 4 müsait tarih kalmıştır.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-center text-[12px] font-bold">
        <div className="p-3 bg-emerald-500/10 text-emerald-800 rounded-2xl border border-emerald-200"> Haziran: Müsait</div>
        <div className="p-3 bg-amber-500/10 text-amber-800 rounded-2xl border border-amber-200"> Temmuz: Az Tarih</div>
        <div className="p-3 bg-emerald-500/10 text-emerald-800 rounded-2xl border border-emerald-200"> Ağustos: Müsait</div>
        <div className="p-3 bg-emerald-500/10 text-emerald-800 rounded-2xl border border-emerald-200"> Eylül: Müsait</div>
      </div>
    </div>
  );
};