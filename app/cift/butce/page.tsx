'use client';

import React, { useState } from 'react';
import { MOCK_BUDGET_ITEMS, MOCK_WEDDING_INFO } from '@/lib/couple-constants';
import { Wallet, Plus, CheckCircle2, Clock, PieChart } from 'lucide-react';

export default function CoupleBudgetPage() {
  const [items] = useState(MOCK_BUDGET_ITEMS);
  const info = MOCK_WEDDING_INFO;

  const totalActual = items.reduce((acc, curr) => acc + curr.actualAmount, 0);
  const paidAmount = items.filter(i => i.isPaid).reduce((acc, curr) => acc + curr.actualAmount, 0);
  const remainingPayment = totalActual - paidAmount;

  return (
    <div className="space-y-8 max-w-[1200px] mx-auto">
      {/* Üst Başlık */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/60 backdrop-blur-xl border border-white rounded-full text-[11px] font-semibold text-[#E6007E] mb-2">
            <Wallet className="w-3.5 h-3.5" /> Akıllı Düğün Cüzdanı
          </div>
          <h1 className="text-[28px] md:text-[32px] font-serif text-[#1D1D1F]">
            Bütçe Planlayıcı
          </h1>
          <p className="text-[13px] text-[#6E6E73]">
            Düğün harcamalarınızı kalem kalem planlayın ve ödeme vadelerini takip edin.
          </p>
        </div>

        <button className="bg-[#E6007E] text-white text-[12px] font-bold px-4 py-2.5 rounded-full hover:bg-pink-700 transition flex items-center gap-1.5 shadow-md shadow-pink-200 cursor-pointer">
          <Plus className="w-4 h-4" /> Yeni Harcama Kalemi Ekle
        </button>
      </div>

      {/* Özet Kartlar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/60 backdrop-blur-2xl border border-white/90 p-5 rounded-[24px] shadow-sm space-y-2">
          <span className="text-[12px] font-semibold text-[#6E6E73]">Hedef Bütçe</span>
          <div className="text-[22px] font-serif font-bold text-[#1D1D1F]">
            {info.totalBudget.toLocaleString('tr-TR')} ₺
          </div>
          <span className="text-[11px] text-[#86868B]">Planlanan Toplam Sınır</span>
        </div>

        <div className="bg-white/60 backdrop-blur-2xl border border-white/90 p-5 rounded-[24px] shadow-sm space-y-2">
          <span className="text-[12px] font-semibold text-[#6E6E73]">Anlaşılan Toplam Tutar</span>
          <div className="text-[22px] font-serif font-bold text-[#E6007E]">
            {totalActual.toLocaleString('tr-TR')} ₺
          </div>
          <span className="text-[11px] text-[#86868B]">Netleşen Harcamalar</span>
        </div>

        <div className="bg-white/60 backdrop-blur-2xl border border-white/90 p-5 rounded-[24px] shadow-sm space-y-2">
          <span className="text-[12px] font-semibold text-[#6E6E73]">Kalan Ödeme</span>
          <div className="text-[22px] font-serif font-bold text-amber-700">
            {remainingPayment.toLocaleString('tr-TR')} ₺
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold">Ödenen: {paidAmount.toLocaleString('tr-TR')} ₺</span>
        </div>
      </div>

      {/* Harcama Listesi */}
      <div className="bg-white/60 backdrop-blur-2xl border border-white/90 p-6 rounded-[28px] shadow-sm space-y-4">
        <h3 className="font-serif text-[18px] font-semibold text-[#1D1D1F]">Harcama Kalemleri</h3>

        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="bg-white/80 p-4 rounded-[20px] border border-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${item.isPaid ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}`}>
                  {item.isPaid ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#86868B] bg-black/5 px-2 py-0.5 rounded">{item.category}</span>
                  <h4 className="font-bold text-[14px] text-[#1D1D1F] mt-0.5">{item.title}</h4>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 border-black/5 pt-2 sm:pt-0">
                <div className="text-right">
                  <span className="text-[10px] text-[#86868B] block">Anlaşılan</span>
                  <span className="font-serif font-bold text-[15px] text-[#1D1D1F]">{item.actualAmount.toLocaleString('tr-TR')} ₺</span>
                </div>

                <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                  item.isPaid ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                  {item.isPaid ? '✓ Ödendi' : '⏳ Kalan Bakiye'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}