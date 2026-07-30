'use client';

import React, { useState } from 'react';
import { MOCK_GUESTS } from '@/lib/couple-constants';
import { Users, UserPlus, CheckCircle2, XCircle, Clock, Check, X } from 'lucide-react';

export default function CoupleGuestsPage() {
  const [guests] = useState(MOCK_GUESTS || []);

  const confirmedCount = guests.filter(g => g.status === 'CONFIRMED').length;
  const declinedCount = guests.filter(g => g.status === 'DECLINED').length;
  const waitingCount = guests.filter(g => g.status === 'WAITING').length;

  return (
    <div className="p-6 sm:p-8 lg:p-10 space-y-8 max-w-[1200px] mx-auto font-sans">
      
      {/* Soft Görsel Arka Plan Işığı */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-rose-200/20 dark:bg-rose-900/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Üst Başlık */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/70 dark:bg-zinc-900/50 p-6 rounded-3xl border border-rose-100/80 dark:border-zinc-800/80 backdrop-blur-xl shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 border border-rose-200/60 dark:border-rose-900/30 rounded-full text-[11px] font-semibold text-rose-600 dark:text-rose-400 mb-2">
            <Users className="w-3.5 h-3.5" /> Dijital LCV & Davetli Takibi
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 dark:text-white">
            Davetliler & Masalar
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Davetlilerinizin katılım durumunu görün ve masa oturma düzenini organize edin.
          </p>
        </div>

        <button className="bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold px-5 py-3 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-sm shadow-rose-500/20 cursor-pointer">
          <UserPlus className="w-4 h-4" />
          <span>Yeni Davetli Ekle</span>
        </button>
      </div>

      {/* LCV Metrikleri */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white/80 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200/70 dark:border-zinc-800 p-5 rounded-2xl shadow-xs flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-serif font-bold text-zinc-900 dark:text-white block">{confirmedCount} Kişi</span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Katılım Teyit Edildi</span>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200/70 dark:border-zinc-800 p-5 rounded-2xl shadow-xs flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-serif font-bold text-zinc-900 dark:text-white block">{waitingCount} Kişi</span>
            <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">Yanıt Bekleniyor</span>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200/70 dark:border-zinc-800 p-5 rounded-2xl shadow-xs flex items-center gap-4">
          <div className="p-3 bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-xl">
            <XCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-serif font-bold text-zinc-900 dark:text-white block">{declinedCount} Kişi</span>
            <span className="text-xs text-rose-600 dark:text-rose-400 font-medium">Gelemiyor</span>
          </div>
        </div>
      </div>

      {/* Davetli Tablosu */}
      <div className="bg-white/80 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200/70 dark:border-zinc-800 p-6 sm:p-8 rounded-3xl shadow-xs space-y-5">
        <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white">Davetli Listesi</h3>

        <div className="space-y-3">
          {guests.map((g: any) => (
            <div key={g.id} className="bg-zinc-50/80 dark:bg-zinc-800/40 p-4 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60 flex items-center justify-between gap-4 transition-colors hover:bg-rose-50/30">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm text-zinc-900 dark:text-white">{g.fullName}</h4>
                  <span className="text-[10px] font-mono bg-zinc-200/60 dark:bg-zinc-700 px-2 py-0.5 rounded-md text-zinc-600 dark:text-zinc-300">{g.group}</span>
                  {g.plusOne && <span className="text-[10px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 px-2 py-0.5 rounded-md border border-rose-200/50">+1 Var</span>}
                </div>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 block">Atanan Masa: {g.tableNumber || 'Atanmadı'}</span>
              </div>

              <span className={`text-xs font-semibold px-3 py-1 rounded-full border flex items-center gap-1.5 ${
                g.status === 'CONFIRMED'
                  ? 'bg-emerald-500/10 text-emerald-600 border-emerald-200/60 dark:border-emerald-900/30'
                  : g.status === 'WAITING'
                  ? 'bg-amber-500/10 text-amber-600 border-amber-200/60 dark:border-amber-900/30'
                  : 'bg-rose-500/10 text-rose-600 border-rose-200/60 dark:border-rose-900/30'
              }`}>
                {g.status === 'CONFIRMED' ? <><Check className="w-3.5 h-3.5" /> Katılıyor</> : g.status === 'WAITING' ? <><Clock className="w-3.5 h-3.5" /> Bekliyor</> : <><X className="w-3.5 h-3.5" /> Katılamıyor</>}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}