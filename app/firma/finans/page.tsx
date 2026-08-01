'use client';

import React, { useState, useMemo } from 'react';
import { useConfirm } from '@/context/ConfirmContext';
import {
  Wallet,
  TrendingUp,
  CreditCard,
  CheckCircle2,
  Clock,
  Sparkles,
  FileText,
  DollarSign
} from 'lucide-react';

interface FinanceTransaction {
  id: string;
  coupleNames: string;
  description: string;
  amount: number;
  date: string;
  type: 'DEPOSIT' | 'MILESTONE' | 'FINAL';
  status: 'COMPLETED' | 'ESCROW_HELD' | 'PENDING';
}

export default function VendorFinancePage() {
  const confirm = useConfirm();

  const [transactions] = useState<FinanceTransaction[]>([
    {
      id: '1',
      coupleNames: 'Selin & Caner',
      description: 'Düğün Salonu Kapora Ödemesi',
      amount: 45000,
      date: '15 Mart 2026',
      type: 'DEPOSIT',
      status: 'COMPLETED'
    },
    {
      id: '2',
      coupleNames: 'Merve & Kaan',
      description: 'Menü Tadımı Ara Hakediş',
      amount: 15000,
      date: '10 Nisan 2026',
      type: 'MILESTONE',
      status: 'ESCROW_HELD'
    },
    {
      id: '3',
      coupleNames: 'Gizem & Burak',
      description: 'Kapanış Ödemesi Taksiti',
      amount: 35000,
      date: '25 Ağustos 2026',
      type: 'FINAL',
      status: 'PENDING'
    }
  ]);

  const totalRevenue = useMemo(() => transactions.reduce((acc, curr) => acc + curr.amount, 0), [transactions]);
  const completedRevenue = useMemo(() => transactions.filter(t => t.status === 'COMPLETED').reduce((acc, curr) => acc + curr.amount, 0), [transactions]);
  const escrowHeldRevenue = useMemo(() => transactions.filter(t => t.status === 'ESCROW_HELD').reduce((acc, curr) => acc + curr.amount, 0), [transactions]);

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 font-sans antialiased">
      
      {/* HEADER */}
      <div className="p-8 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/60 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 text-[11px] font-medium border border-zinc-300/40 dark:border-zinc-700/50">
          <Wallet className="w-3.5 h-3.5 text-zinc-500" />
          <span>Finansal Hakedişler</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Finans & Muhasebe
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          Güvenli havuz kaporalarınızı, hakedişlerinizi ve e-Faturalarınızı takip edin.
        </p>
      </div>

      {/* ÖZET FİNANS KARTLARI */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs space-y-1">
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Hesaba Aktarılan Ciro
          </span>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">₺{completedRevenue.toLocaleString('tr-TR')}</div>
          <div className="text-[11px] text-zinc-400">Tahsil Edilen Tutarlar</div>
        </div>

        <div className="p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs space-y-1">
          <span className="text-xs font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Güvenli Havuzda (Escrow)
          </span>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">₺{escrowHeldRevenue.toLocaleString('tr-TR')}</div>
          <div className="text-[11px] text-zinc-400">Etkinlik Günü Otomatik Serbest Kalacak</div>
        </div>

        <div className="p-6 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs space-y-1">
          <span className="text-xs font-medium text-zinc-400">Toplam Anlaşma Hacmi</span>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">₺{totalRevenue.toLocaleString('tr-TR')}</div>
          <div className="text-[11px] text-zinc-400">Kayıtlı Tüm Sözleşmeler</div>
        </div>
      </div>

      {/* HAKEDİŞ TABLOSU */}
      <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50/50 dark:bg-zinc-800/30 border-b border-zinc-200/80 dark:border-zinc-800 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                <th className="p-4">Çift Adı</th>
                <th className="p-4">Açıklama</th>
                <th className="p-4">Tarih</th>
                <th className="p-4">Tutar</th>
                <th className="p-4 text-right">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60 text-xs">
              {transactions.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                  <td className="p-4 font-bold text-zinc-900 dark:text-white">{item.coupleNames}</td>
                  <td className="p-4 font-medium text-zinc-600 dark:text-zinc-400">{item.description}</td>
                  <td className="p-4 font-medium text-zinc-500">{item.date}</td>
                  <td className="p-4 font-bold text-zinc-900 dark:text-white">₺{item.amount.toLocaleString('tr-TR')}</td>
                  <td className="p-4 text-right">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      item.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' :
                      item.status === 'ESCROW_HELD' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20' :
                      'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
                    }`}>
                      {item.status === 'COMPLETED' ? 'Hesaba Aktarıldı' : item.status === 'ESCROW_HELD' ? 'Güvenli Havuzda' : 'Ödeme Bekliyor'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}