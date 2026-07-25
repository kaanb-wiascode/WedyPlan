'use client';

import React, { useMemo } from 'react';
import { useWeddingOS } from '@/store/useWeddingOS';
import { Wallet, Search, Plus, Sparkles, CheckCircle2 } from 'lucide-react';

// TypeScript Tip Tanımı (Hatanın çözümü)
interface Deal {
  id: string;
  clientName: string;
  weddingDate: string;
  totalAmount: number;
  paidAmount: number;
  status: string;
  isOsAutomated?: boolean;
}

const INITIAL_DEALS: Deal[] = [
  { id: '1', clientName: 'Ayşe & Burak', weddingDate: '22.08.2026', totalAmount: 120000, paidAmount: 120000, status: 'Tamamlandı' },
  { id: '2', clientName: 'Zeynep & Murat', weddingDate: '05.09.2026', totalAmount: 80000, paidAmount: 20000, status: 'Kapora Alındı' },
];

export default function PremiumVendorFinancePage() {
  const { venueDealStatus } = useWeddingOS();

  const deals = useMemo(() => {
    let allDeals: Deal[] = [...INITIAL_DEALS];
    if (venueDealStatus === 'ONAYLANDI') {
      allDeals = [
        { id: 'new_os_deal', clientName: 'Selin & Caner (Yeni Onay)', weddingDate: '15.08.2026', totalAmount: 150000, paidAmount: 0, status: 'Yeni Anlaşma', isOsAutomated: true },
        ...allDeals
      ];
    }
    return allDeals;
  }, [venueDealStatus]);

  const totalRevenue = deals.reduce((sum, d) => sum + d.totalAmount, 0);

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-[32px] font-medium tracking-tight text-[#111111]">Finans & Alacaklar</h1>
          <p className="text-[15px] text-[#666666] mt-1">Anlaşmalı olduğunuz çiftlerin ödeme takiplerini yapın.</p>
        </div>
      </header>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className={`p-6 rounded-[24px] border transition-all ${venueDealStatus === 'ONAYLANDI' ? 'bg-[#7C5CFF]/10 border-[#7C5CFF]/20 shadow-[0_0_40px_rgba(124,92,255,0.15)]' : 'bg-white border-[rgba(0,0,0,0.06)]'}`}>
          <span className={`text-[13px] font-medium block mb-2 ${venueDealStatus === 'ONAYLANDI' ? 'text-[#7C5CFF]' : 'text-[#666666]'}`}>Toplam Anlaşma Hacmi</span>
          <div className="text-[32px] font-medium tracking-tight text-[#111111] flex items-center gap-2">
            {formatMoney(totalRevenue)}
            {venueDealStatus === 'ONAYLANDI' && <span className="text-[12px] bg-[#7C5CFF] text-white px-2 py-1 rounded-full animate-pulse">+ Yeni Ciro</span>}
          </div>
        </div>
        
        <div className="bg-[#1DB954]/5 p-6 rounded-[24px] border border-[rgba(0,0,0,0.04)]">
          <span className="text-[13px] font-medium text-[#1DB954] block mb-2">Tahsil Edilen (Kaporalar)</span>
          <div className="text-[32px] font-medium tracking-tight text-[#1DB954]">{formatMoney(140000)}</div>
        </div>
      </div>

      {/* Deals Table */}
      <div className="bg-white border border-[rgba(0,0,0,0.06)] rounded-[24px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <div className="p-6 border-b border-[rgba(0,0,0,0.04)]">
          <h2 className="text-[16px] font-medium text-[#111111]">Aktif Düğün Anlaşmaları</h2>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F8F8F7] border-b text-[13px] font-medium text-[#666666]">
              <th className="px-6 py-4 font-medium">Müşteri</th>
              <th className="px-6 py-4 font-medium">Tarih</th>
              <th className="px-6 py-4 font-medium">Tutar</th>
              <th className="px-6 py-4 font-medium">Durum</th>
            </tr>
          </thead>
          <tbody className="text-[14px]">
            {deals.map((deal) => (
              <tr key={deal.id} className={`border-b border-[rgba(0,0,0,0.04)] ${deal.isOsAutomated ? 'bg-[#7C5CFF]/5' : ''}`}>
                <td className="px-6 py-4 font-medium text-[#111111] flex items-center gap-2">
                  {deal.clientName}
                  {deal.isOsAutomated && <Sparkles className="w-4 h-4 text-[#7C5CFF]" />}
                </td>
                <td className="px-6 py-4 text-[#666666]">{deal.weddingDate}</td>
                <td className="px-6 py-4 font-medium text-[#111111]">{formatMoney(deal.totalAmount)}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[12px] font-medium ${deal.status === 'Yeni Anlaşma' ? 'bg-[#7C5CFF]/10 text-[#7C5CFF]' : 'bg-[#1DB954]/10 text-[#1DB954]'}`}>
                    {deal.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}