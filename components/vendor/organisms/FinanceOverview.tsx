'use client';

import React, { useState } from 'react';
import { FINANCE_SUMMARY_MOCK, INITIAL_TRANSACTIONS } from '@/lib/vendor-finance-constants';
import { FinancialTransaction } from '@/types/vendor-finance';
import { FinanceMetricCard } from '@/components/vendor/molecules/FinanceMetricCard';
import { TransactionRow } from '@/components/vendor/molecules/TransactionRow';
import { Wallet, TrendingUp, Clock, PieChart, Sparkles } from 'lucide-react';

export const FinanceOverview: React.FC = () => {
  const [transactions] = useState<FinancialTransaction[]>(INITIAL_TRANSACTIONS);
  const [filter, setFilter] = useState<'ALL' | 'INCOME' | 'EXPENSE'>('ALL');

  const filteredTransactions = transactions.filter((t) => {
    if (filter === 'INCOME') return t.type === 'INCOME';
    if (filter === 'EXPENSE') return t.type === 'EXPENSE';
    return true;
  });

  return (
    <div className="space-y-8">
      {/* 1. Üst Metrik Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <FinanceMetricCard
          title="Toplam Sözleşme Hacmi"
          amount={FINANCE_SUMMARY_MOCK.totalRevenue}
          subText="Sezonluk Toplam Ciro"
          icon={<Wallet className="w-5 h-5 text-[#D4AF37]" />}
          trend="+18% Sezon Artışı"
          variant="gold"
        />
        <FinanceMetricCard
          title="Tahsil Edilen Nakit"
          amount={FINANCE_SUMMARY_MOCK.collectedAmount}
          subText="Kasadaki Sıcak Para"
          icon={<TrendingUp className="w-5 h-5 text-emerald-600" />}
          variant="emerald"
        />
        <FinanceMetricCard
          title="Bekleyen Çift Alacakları"
          amount={FINANCE_SUMMARY_MOCK.pendingCollectables}
          subText="Vadesi Gelecek Taksitler"
          icon={<Clock className="w-5 h-5 text-amber-600" />}
        />
        <FinanceMetricCard
          title="Tedarikçi Hakedişleri"
          amount={FINANCE_SUMMARY_MOCK.upcomingExpenses}
          subText="Ödenecek Garson & Müzik"
          icon={<PieChart className="w-5 h-5 text-rose-600" />}
          variant="rose"
        />
      </div>

      {/* 2. WedyAI Finans Öngörüsü Uyarısı */}
      <div className="p-4 bg-gradient-to-r from-[#D4AF37]/15 via-white/80 to-white/40 border border-[#D4AF37]/30 rounded-[24px] backdrop-blur-2xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#D4AF37] text-white rounded-2xl shadow-sm shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-[15px] text-[#1D1D1F]">WedyAI Nakit Akış Öngörüsü</h4>
            <p className="text-[12px] text-[#6E6E73]">
              Önümüzdeki 30 gün içinde <strong className="text-[#1D1D1F]">320.000 ₺</strong> tahsilat bekleniyor. Tahmini net kârlılık oranınız <strong className="text-emerald-700">%{FINANCE_SUMMARY_MOCK.netProfitMargin}</strong> seviyesinde seyrediyor.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Kasa Hareketleri Listesi */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-black/5 pb-3">
          <h3 className="font-serif text-[20px] font-semibold text-[#1D1D1F]">Kasa & Ödeme Hareketleri</h3>

          <div className="flex items-center gap-2">
            {[
              { id: 'ALL', label: 'Tüm Hareketler' },
              { id: 'INCOME', label: ' Tahsilatlar (+)' },
              { id: 'EXPENSE', label: ' Giderler (-)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                  filter === tab.id ? 'bg-white text-[#1D1D1F] shadow-sm border border-white' : 'text-[#6E6E73] hover:bg-white/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredTransactions.map((tx) => (
            <TransactionRow key={tx.id} transaction={tx} />
          ))}
        </div>
      </div>
    </div>
  );
};