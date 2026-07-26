'use build';

import React from 'react';
import { Wallet, ArrowUpRight, ShieldAlert, CheckCircle2, TrendingDown } from 'lucide-react';
import { BUDGET_OS_ITEMS } from '@/lib/couple-command-constants';

export const BudgetOSWidget: React.FC = () => {
  const totalBudget = 600000;
  const totalSpent = BUDGET_OS_ITEMS.reduce((acc, curr) => acc + curr.actualPrice, 0);
  const totalPaid = BUDGET_OS_ITEMS.reduce((acc, curr) => acc + curr.paidAmount, 0);
  const remainingPayment = totalSpent - totalPaid;

  return (
    <div className="bg-white/40 backdrop-blur-3xl border border-white/80 p-8 rounded-[36px] shadow-[0_16px_40px_rgba(0,0,0,0.04)] space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold text-[#E6007E] uppercase tracking-widest block mb-1">Fintech Cüzdanı</span>
          <h2 className="font-serif font-semibold text-[26px] text-[#1D1D1F]">Budget OS & Bütçe Sağlığı</h2>
        </div>
        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Bütçe Dengede
        </span>
      </div>

      {/* Main Stats Bento */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/80 p-5 rounded-[24px] border border-white shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-[#86868B] uppercase">Planlanan Toplam Bütçe</span>
          <div className="font-serif font-bold text-[28px] text-[#1D1D1F]">{totalBudget.toLocaleString('tr-TR')} ₺</div>
          <span className="text-[11px] text-[#6E6E73]">Üst Limit Sınırı</span>
        </div>

        <div className="bg-white/80 p-5 rounded-[24px] border border-white shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-[#86868B] uppercase">Anlaşılan Net Tutar</span>
          <div className="font-serif font-bold text-[28px] text-[#E6007E]">{totalSpent.toLocaleString('tr-TR')} ₺</div>
          <span className="text-[11px] text-emerald-700 font-semibold">Tasarruf: ₺10,000 Kazanıldı</span>
        </div>

        <div className="bg-white/80 p-5 rounded-[24px] border border-white shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-[#86868B] uppercase">Kalan Toplam Ödeme</span>
          <div className="font-serif font-bold text-[28px] text-amber-700">{remainingPayment.toLocaleString('tr-TR')} ₺</div>
          <span className="text-[11px] text-slate-500">Ödenen Bakiye: {totalPaid.toLocaleString('tr-TR')} ₺</span>
        </div>
      </div>

      {/* Budget Items Table */}
      <div className="space-y-3 pt-2">
        <h4 className="font-bold text-[13px] text-[#1D1D1F] uppercase tracking-wider">Tedarikçi Harcama Kalemleri</h4>
        {BUDGET_OS_ITEMS.map((item) => (
          <div key={item.id} className="p-4 bg-white/80 rounded-[22px] border border-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[9px] font-mono font-bold text-[#86868B] bg-black/5 px-2 py-0.5 rounded uppercase">{item.category}</span>
              <h5 className="font-bold text-[15px] text-[#1D1D1F] mt-0.5">{item.title} ({item.vendorName})</h5>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-black/5">
              <div className="text-right">
                <span className="text-[10px] text-[#86868B] block">Anlaşılan</span>
                <span className="font-serif font-bold text-[15px] text-[#1D1D1F]">{item.actualPrice.toLocaleString('tr-TR')} ₺</span>
              </div>

              <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${
                item.isPaid ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}>
                {item.isPaid ? '✓ Tamamı Ödendi' : `⏳ Kalan: ${(item.actualPrice - item.paidAmount).toLocaleString('tr-TR')} ₺`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};