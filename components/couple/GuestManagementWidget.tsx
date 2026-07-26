'use client';

import React from 'react';
import { Users, QrCode, CheckCircle2, Clock, XCircle, Utensils } from 'lucide-react';
import { GUESTS_OS_LIST } from '@/lib/couple-command-constants';

export const GuestManagementWidget: React.FC = () => {
  return (
    <div className="bg-white/40 backdrop-blur-3xl border border-white/80 p-8 rounded-[36px] shadow-[0_16px_40px_rgba(0,0,0,0.04)] space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">Dijital LCV & Masa Planı</span>
          <h2 className="font-serif font-semibold text-[26px] text-[#1D1D1F]">Davetliler & QR Check-in</h2>
        </div>
        <button className="bg-[#1D1D1F] text-white text-[12px] font-bold px-4 py-2 rounded-full cursor-pointer hover:bg-black transition">
          + Yeni Davetli Ekle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {GUESTS_OS_LIST.map((guest) => (
          <div key={guest.id} className="bg-white/80 p-5 rounded-[24px] border border-white space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold bg-black/5 text-[#86868B] px-2 py-0.5 rounded">{guest.group}</span>
              <span className="text-[10px] font-mono font-bold text-[#E6007E] bg-pink-50 px-2 py-0.5 rounded border border-pink-200">
                {guest.qrCode}
              </span>
            </div>

            <div>
              <h4 className="font-bold text-[16px] text-[#1D1D1F]">{guest.fullName}</h4>
              <span className="text-[12px] text-[#6E6E73]">{guest.tableNumber}</span>
            </div>

            {guest.dietaryNotes && (
              <div className="flex items-center gap-1 text-[11px] text-amber-800 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200 w-fit">
                <Utensils className="w-3 h-3" /> Diyet: {guest.dietaryNotes}
              </div>
            )}

            <div className="pt-2 border-t border-black/5 flex items-center justify-between text-[11px]">
              <span className="font-bold text-emerald-700">✓ {guest.rsvpStatus}</span>
              {guest.plusOne && <span className="text-[#86868B]">+1 Davetli Var</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};