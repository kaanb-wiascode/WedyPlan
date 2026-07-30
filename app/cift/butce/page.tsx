'use client';

import React, { useState } from 'react';
import { MOCK_BUDGET_ITEMS, MOCK_WEDDING_INFO } from '@/lib/couple-constants';
import { Wallet, Plus, CheckCircle2, Clock, Check } from 'lucide-react';

export default function CoupleBudgetPage() {
  const [items] = useState(MOCK_BUDGET_ITEMS || []);
  const info = MOCK_WEDDING_INFO || { totalBudget: 250000 };

  const totalActual = items.reduce((acc: number, curr: any) => acc + curr.actualAmount, 0);
  const paidAmount = items.filter((i: any) => i.isPaid).reduce((acc: number, curr: any) => acc + curr.actualAmount, 0);
  const remainingPayment = totalActual - paidAmount;

  return (
    <div className="p-6 sm:p-8 lg:p-10 space-y-8 max-w-[1200px] mx-auto font-sans">
      
      {/* Soft Görsel Arka Plan Işığı */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-rose-200/20 dark:bg-rose-900/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Üst Başlık */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/70 dark:bg-zinc-900/50 p-6 rounded-3xl border border-rose-100/80 dark:border-zinc-800/80 backdrop-blur-xl shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 border border-rose-200/60 dark:border-rose-900/30 rounded-full text-[11px] font-semibold text-rose-600 dark:text-rose-400 mb-2">
            <Wallet className="w-3.5 h-3.5" /> Akıllı Düğün Cüzdanı
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900 dark:text-white">
            Bütçe Planlayıcı
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Düğün harcamalarınızı kalem kalem planlayın ve ödeme vadelerini takip edin.
          </p>
        </div>

        <button className="bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold px-5 py-3 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-sm shadow-rose-500/20 cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>Yeni Harcama Kalemi Ekle</span>
        </button>
      </div>

      {/* Özet Kartlar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white/80 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200/70 dark:border-zinc-800 p-6 rounded-2xl shadow-xs space-y-2">
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Hedef Bütçe</span>
          <div className="text-2xl font-serif font-bold text-zinc-900 dark:text-white">
            {info.totalBudget.toLocaleString('tr-TR')} ₺
          </div>
          <span className="text-[11px] text-zinc-400 block">Planlanan Toplam Sınır</span>
        </div>

        <div className="bg-white/80 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200/70 dark:border-zinc-800 p-6 rounded-2xl shadow-xs space-y-2">
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Anlaşılan Toplam Tutar</span>
          <div className="text-2xl font-serif font-bold text-rose-500">
            {totalActual.toLocaleString('tr-TR')} ₺
          </div>
          <span className="text-[11px] text-zinc-400 block">Netleşen Harcamalar</span>
        </div>

        <div className="bg-white/80 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200/70 dark:border-zinc-800 p-6 rounded-2xl shadow-xs space-y-2">
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Kalan Ödeme</span>
          <div className="text-2xl font-serif font-bold text-amber-600 dark:text-amber-400">
            {remainingPayment.toLocaleString('tr-TR')} ₺
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold block">
            Ödenen: {paidAmount.toLocaleString('tr-TR')} ₺
          </span>
        </div>
      </div>

      {/* Harcama Listesi */}
      <div className="bg-white/80 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200/70 dark:border-zinc-800 p-6 sm:p-8 rounded-3xl shadow-xs space-y-5">
        <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-white">Harcama Kalemleri</h3>

        <div className="space-y-3">
          {items.map((item: any) => (
            <div key={item.id} className="bg-zinc-50/80 dark:bg-zinc-800/40 p-4 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:bg-rose-50/30">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${item.isPaid ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}`}>
                  {item.isPaid ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-zinc-500 bg-zinc-200/60 dark:bg-zinc-700 px-2 py-0.5 rounded-md">{item.category}</span>
                  <h4 className="font-semibold text-sm text-zinc-900 dark:text-white mt-1">{item.title}</h4>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 border-zinc-200 dark:border-zinc-700 pt-2 sm:pt-0">
                <div className="text-right">
                  <span className="text-[10px] text-zinc-400 block">Anlaşılan</span>
                  <span className="font-serif font-bold text-sm text-zinc-900 dark:text-white">{item.actualAmount.toLocaleString('tr-TR')} ₺</span>
                </div>

                <span className={`text-xs font-semibold px-3 py-1 rounded-full border flex items-center gap-1.5 ${
                  item.isPaid ? 'bg-emerald-500/10 text-emerald-600 border-emerald-200/60 dark:border-emerald-900/30' : 'bg-amber-500/10 text-amber-600 border-amber-200/60 dark:border-amber-900/30'
                }`}>
                  {item.isPaid ? <><Check className="w-3.5 h-3.5" /> Ödendi</> : <><Clock className="w-3.5 h-3.5" /> Kalan Bakiye</>}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}