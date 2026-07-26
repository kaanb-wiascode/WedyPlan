'use client';

import React, { useState } from 'react';
import { MOCK_GUESTS } from '@/lib/couple-constants';
import { Users, UserPlus, CheckCircle2, XCircle, Clock } from 'lucide-react';

export default function CoupleGuestsPage() {
  const [guests] = useState(MOCK_GUESTS);

  const confirmedCount = guests.filter(g => g.status === 'CONFIRMED').length;
  const declinedCount = guests.filter(g => g.status === 'DECLINED').length;
  const waitingCount = guests.filter(g => g.status === 'WAITING').length;

  return (
    <div className="space-y-8 max-w-[1200px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/60 backdrop-blur-xl border border-white rounded-full text-[11px] font-semibold text-[#E6007E] mb-2">
            <Users className="w-3.5 h-3.5" /> Dijital LCV & Davetli Takibi
          </div>
          <h1 className="text-[28px] md:text-[32px] font-serif text-[#1D1D1F]">
            Davetliler & Masalar
          </h1>
          <p className="text-[13px] text-[#6E6E73]">
            Davetlilerinizin katılım durumunu görün ve masa oturma düzenini organize edin.
          </p>
        </div>

        <button className="bg-[#E6007E] text-white text-[12px] font-bold px-4 py-2.5 rounded-full hover:bg-pink-700 transition flex items-center gap-1.5 shadow-md shadow-pink-200 cursor-pointer">
          <UserPlus className="w-4 h-4" /> Yeni Davetli Ekle
        </button>
      </div>

      {/* LCV Metrikleri */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/60 backdrop-blur-2xl border border-white/90 p-5 rounded-[24px] shadow-sm flex items-center gap-3">
          <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-2xl"><CheckCircle2 className="w-6 h-6" /></div>
          <div>
            <span className="text-[20px] font-serif font-bold text-[#1D1D1F] block">{confirmedCount} Kişi</span>
            <span className="text-[11px] text-emerald-700 font-semibold">Katılım Teyit Edildi</span>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-2xl border border-white/90 p-5 rounded-[24px] shadow-sm flex items-center gap-3">
          <div className="p-3 bg-amber-500/10 text-amber-600 rounded-2xl"><Clock className="w-6 h-6" /></div>
          <div>
            <span className="text-[20px] font-serif font-bold text-[#1D1D1F] block">{waitingCount} Kişi</span>
            <span className="text-[11px] text-amber-700 font-semibold">Yanıt Bekleniyor</span>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-2xl border border-white/90 p-5 rounded-[24px] shadow-sm flex items-center gap-3">
          <div className="p-3 bg-rose-500/10 text-rose-600 rounded-2xl"><XCircle className="w-6 h-6" /></div>
          <div>
            <span className="text-[20px] font-serif font-bold text-[#1D1D1F] block">{declinedCount} Kişi</span>
            <span className="text-[11px] text-rose-700 font-semibold">Gelemiyor</span>
          </div>
        </div>
      </div>

      {/* Davetli Tablosu */}
      <div className="bg-white/60 backdrop-blur-2xl border border-white/90 p-6 rounded-[28px] shadow-sm space-y-4">
        <h3 className="font-serif text-[18px] font-semibold text-[#1D1D1F]">Davetli Listesi</h3>

        <div className="space-y-2">
          {guests.map((g) => (
            <div key={g.id} className="bg-white/80 p-4 rounded-[18px] border border-white flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-[14px] text-[#1D1D1F]">{g.fullName}</h4>
                  <span className="text-[9px] font-mono bg-black/5 px-2 py-0.5 rounded text-[#6E6E73]">{g.group}</span>
                  {g.plusOne && <span className="text-[9px] font-bold bg-pink-100 text-[#E6007E] px-2 py-0.5 rounded">+1 Var</span>}
                </div>
                <span className="text-[11px] text-[#86868B] mt-0.5 block">Atanan Masa: {g.tableNumber || 'Atanmadı'}</span>
              </div>

              <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                g.status === 'CONFIRMED'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : g.status === 'WAITING'
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}>
                {g.status === 'CONFIRMED' ? '✓ Geliyor' : g.status === 'WAITING' ? '⏳ Bekliyor' : '✕ Gelemiyor'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}