'use client';

import React, { useState } from 'react';
import { Button } from '@/components/shared/ui/Button';
import GlassCard from '@/components/shared/ui/GlassCard';
import { 
  Euro, 
  Wallet, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Send, 
  CreditCard,
  Plus,
  Sparkles
} from 'lucide-react';
import AIPaymentRiskWidget from './AIPaymentRiskWidget';
import { Transaction } from '@/lib/validations/vendor-finance';
import { recordPaymentAction, sendPaymentReminderAction } from '@/lib/actions/vendor-finance';

interface VendorFinanceClientProps {
  initialSummary: {
    totalRevenue: number;
    collectedRevenue: number;
    pendingRevenue: number;
    overdueAmount: number;
    currency: string;
  };
  initialTransactions: Transaction[];
}

export function VendorFinanceClient({ initialSummary, initialTransactions }: VendorFinanceClientProps) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [summary, setSummary] = useState(initialSummary);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleRecordPayment = async (txId: string, amount: number) => {
    setLoadingId(txId);
    const res = await recordPaymentAction(txId);
    if (res.success) {
      setTransactions(prev => prev.map(t => t.id === txId ? { ...t, status: 'PAID', paidDate: 'Şimdi' } : t));
      setSummary(prev => ({
        ...prev,
        collectedRevenue: prev.collectedRevenue + amount,
        pendingRevenue: prev.pendingRevenue - amount
      }));
    }
    setLoadingId(null);
  };

  const handleSendReminder = async (txId: string, coupleName: string) => {
    setLoadingId(txId);
    const res = await sendPaymentReminderAction(txId, coupleName);
    if (res.success) {
      alert(res.message);
    }
    setLoadingId(null);
  };

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      
      {/* 1. AI Tahsilat Riski Widget */}
      <AIPaymentRiskWidget 
        overdueAmount={summary.overdueAmount} 
        currency={summary.currency} 
      />

      {/* 2. Özet Metrik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlassCard className="p-5 space-y-2 border-slate-200/80 dark:border-zinc-800">
          <div className="flex justify-between items-center text-gray-500 text-xs font-semibold">
            <span>Toplam Anlaşılan</span>
            <Wallet className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-black text-gray-900 dark:text-white">
            {summary.totalRevenue.toLocaleString()} {summary.currency}
          </div>
        </GlassCard>

        <GlassCard className="p-5 space-y-2 border-emerald-200/60 dark:border-emerald-900/40">
          <div className="flex justify-between items-center text-emerald-600 text-xs font-bold">
            <span>Tahsil Edilen (Kasa)</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600">
            {summary.collectedRevenue.toLocaleString()} {summary.currency}
          </div>
        </GlassCard>

        <GlassCard className="p-5 space-y-2 border-amber-200/60 dark:border-amber-900/40">
          <div className="flex justify-between items-center text-amber-600 text-xs font-bold">
            <span>Gelecek Tahsilatlar</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600">
            {summary.pendingRevenue.toLocaleString()} {summary.currency}
          </div>
        </GlassCard>

        <GlassCard className="p-5 space-y-2 border-rose-200/60 dark:border-rose-900/40">
          <div className="flex justify-between items-center text-rose-600 text-xs font-bold">
            <span>Geciken Ödemeler</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-black text-rose-600">
            {summary.overdueAmount.toLocaleString()} {summary.currency}
          </div>
        </GlassCard>
      </div>

      {/* 3. Ödeme ve Taksit Takip Tablosu */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200/80 dark:border-zinc-800 overflow-hidden text-xs">
        <div className="p-4 bg-slate-50/80 dark:bg-zinc-800/50 border-b border-slate-200 dark:border-zinc-800 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-sm">Ödeme ve Taksit Takip Planı</h3>
            <p className="text-[11px] text-gray-500">Çiftlerin kapora, taksit ve kapanış bakiye durumları</p>
          </div>
          <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white text-xs flex items-center gap-1.5">
            <Plus className="w-4 h-4" />
            Ödeme Planı Ekle
          </Button>
        </div>

        <table className="w-full text-left">
          <thead className="bg-slate-100/50 dark:bg-zinc-800/30 text-gray-500 border-b border-slate-200 dark:border-zinc-800">
            <tr>
              <th className="p-3.5">Çift</th>
              <th className="p-3.5">Açıklama</th>
              <th className="p-3.5">Tür</th>
              <th className="p-3.5">Vade Tarihi</th>
              <th className="p-3.5">Tutar</th>
              <th className="p-3.5">AI Risk</th>
              <th className="p-3.5">Durum</th>
              <th className="p-3.5 text-right">Aksiyon</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                <td className="p-3.5 font-bold text-gray-900 dark:text-white">{tx.coupleName}</td>
                <td className="p-3.5 text-gray-600 dark:text-gray-300">{tx.title}</td>
                <td className="p-3.5">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-zinc-800 text-gray-600">
                    {tx.type === 'DEPOSIT' ? 'Kapora' : tx.type === 'INSTALLMENT' ? 'Taksit' : 'Kapanış'}
                  </span>
                </td>
                <td className="p-3.5 font-medium">{tx.dueDate}</td>
                <td className="p-3.5 font-bold text-gray-900 dark:text-white">
                  {tx.amount.toLocaleString()} {tx.currency}
                </td>
                <td className="p-3.5">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    tx.aiRiskScore > 50 
                      ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' 
                      : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                  }`}>
                    %{tx.aiRiskScore}
                  </span>
                </td>
                <td className="p-3.5">
                  {tx.status === 'PAID' && (
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Ödendi
                    </span>
                  )}
                  {tx.status === 'PENDING' && (
                    <span className="text-amber-600 font-bold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Bekliyor
                    </span>
                  )}
                  {tx.status === 'OVERDUE' && (
                    <span className="text-rose-600 font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Gecikmede
                    </span>
                  )}
                </td>
                <td className="p-3.5 text-right space-x-2">
                  {tx.status !== 'PAID' && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        isLoading={loadingId === tx.id}
                        onClick={() => handleSendReminder(tx.id, tx.coupleName)}
                        className="text-[10px] h-7 px-2 border-amber-300 text-amber-700 hover:bg-amber-50"
                      >
                        <Send className="w-3 h-3 mr-1" /> Hatırlat
                      </Button>
                      <Button
                        size="sm"
                        isLoading={loadingId === tx.id}
                        onClick={() => handleRecordPayment(tx.id, tx.amount)}
                        className="text-[10px] h-7 px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        Tahsil Et
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default VendorFinanceClient;