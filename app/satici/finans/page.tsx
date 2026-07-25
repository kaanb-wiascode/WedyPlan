'use client';

import React, { useState } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  MessageCircle, 
  Plus, 
  Search, 
  ArrowUpRight,
  AlertCircle
} from 'lucide-react';

interface DealPayment {
  id: string;
  clientName: string;
  phone: string;
  weddingDate: string;
  totalAmount: number;
  paidAmount: number;
  dueDate: string;
  status: 'Tamamlandı' | 'Kapora Alındı' | 'Bekliyor';
}

const INITIAL_DEALS: DealPayment[] = [
  {
    id: '1',
    clientName: 'Selin & Caner',
    phone: '05321112233',
    weddingDate: '15.08.2026',
    totalAmount: 180000,
    paidAmount: 50000,
    dueDate: '01.08.2026',
    status: 'Kapora Alındı',
  },
  {
    id: '2',
    clientName: 'Ayşe & Burak',
    phone: '05332223344',
    weddingDate: '22.08.2026',
    totalAmount: 120000,
    paidAmount: 120000,
    dueDate: '10.08.2026',
    status: 'Tamamlandı',
  },
  {
    id: '3',
    clientName: 'Zeynep & Murat',
    phone: '05353334455',
    weddingDate: '05.09.2026',
    totalAmount: 150000,
    paidAmount: 0,
    dueDate: '20.08.2026',
    status: 'Bekliyor',
  },
];

export default function PremiumVendorFinancePage() {
  const [deals, setDeals] = useState<DealPayment[]>(INITIAL_DEALS);
  const [search, setSearch] = useState('');

  // Toplam Metrikler
  const totalRevenue = deals.reduce((sum, d) => sum + d.totalAmount, 0);
  const totalCollected = deals.reduce((sum, d) => sum + d.paidAmount, 0);
  const totalPending = totalRevenue - totalCollected;

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(amount);
  };

  const handleSendReminder = (deal: DealPayment) => {
    const remaining = deal.totalAmount - deal.paidAmount;
    const cleanPhone = deal.phone.replace(/\D/g, '');
    let msg = `Merhaba ${deal.clientName},\n\n${deal.weddingDate} tarihindeki düğün organizasyonunuz için kalan ödeme detayları aşağıdadır:\n\n`;
    msg += `• Toplam Anlaşma: ${formatMoney(deal.totalAmount)}\n`;
    msg += `• Ödenen Kapora: ${formatMoney(deal.paidAmount)}\n`;
    msg += `• Kalan Bakiye: ${formatMoney(remaining)}\n\n`;
    msg += `Detaylar ve sorularınız için bizimle iletişime geçebilirsiniz. Teşekkür ederiz.`;

    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[32px] font-medium tracking-tight text-[#111111]">
            Finans & Alacak Yönetimi
          </h1>
          <p className="text-[15px] text-[#666666] mt-1">
            Anlaşmalı olduğunuz çiftlerin ödeme ve kapora takiplerini yapın.
          </p>
        </div>
        <button className="h-[44px] px-5 bg-[#111111] text-white rounded-[14px] text-[14px] font-medium flex items-center gap-2 hover:bg-[#333333] transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Yeni Anlaşma Ekle
        </button>
      </header>

      {/* Financial Summary Cards (Stripe Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-[24px] border border-[rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <span className="text-[13px] font-medium text-[#666666] block mb-2">Toplam Anlaşma Hacmi</span>
          <div className="text-[32px] font-medium tracking-tight text-[#111111]">
            {formatMoney(totalRevenue)}
          </div>
        </div>

        <div className="bg-[#1DB954]/5 p-6 rounded-[24px] border border-[rgba(0,0,0,0.04)]">
          <span className="text-[13px] font-medium text-[#1DB954] block mb-2">Tahsil Edilen (Kaporalar)</span>
          <div className="text-[32px] font-medium tracking-tight text-[#1DB954]">
            {formatMoney(totalCollected)}
          </div>
        </div>

        <div className="bg-[#F8F8F7] p-6 rounded-[24px] border border-[rgba(0,0,0,0.04)]">
          <span className="text-[13px] font-medium text-[#666666] block mb-2">Bekleyen Kalan Bakiye</span>
          <div className="text-[32px] font-medium tracking-tight text-[#111111]">
            {formatMoney(totalPending)}
          </div>
        </div>
      </div>

      {/* Deals & Payments Table */}
      <div className="bg-white border border-[rgba(0,0,0,0.06)] rounded-[24px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <div className="p-6 border-b border-[rgba(0,0,0,0.04)] flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <h2 className="text-[16px] font-medium text-[#111111]">Aktif Düğün Anlaşmaları</h2>
          <div className="relative w-full sm:w-[260px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999999]" />
            <input 
              type="text" 
              placeholder="Çift ismi ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-[40px] pl-10 pr-4 bg-[#F8F8F7] border border-[rgba(0,0,0,0.06)] rounded-[12px] text-[13px] text-[#111111] outline-none focus:border-[#7C5CFF]/30 transition-colors placeholder:text-[#999999]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8F8F7] border-b border-[rgba(0,0,0,0.04)] text-[13px] font-medium text-[#666666]">
                <th className="px-6 py-4">Çift / Müşteri</th>
                <th className="px-6 py-4">Düğün Tarihi</th>
                <th className="px-6 py-4">Toplam Tutar</th>
                <th className="px-6 py-4">Ödenen Kapora</th>
                <th className="px-6 py-4">Kalan Bakiye</th>
                <th className="px-6 py-4">Durum</th>
                <th className="px-6 py-4 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="text-[14px]">
              {deals.map((deal) => {
                const remaining = deal.totalAmount - deal.paidAmount;

                return (
                  <tr key={deal.id} className="border-b border-[rgba(0,0,0,0.04)] hover:bg-[#F8F8F7]/50 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="font-medium text-[#111111] block">{deal.clientName}</span>
                      <span className="text-[12px] text-[#999999]">{deal.phone}</span>
                    </td>
                    <td className="px-6 py-4 text-[#666666]">{deal.weddingDate}</td>
                    <td className="px-6 py-4 font-medium text-[#111111]">{formatMoney(deal.totalAmount)}</td>
                    <td className="px-6 py-4 font-medium text-[#1DB954]">{formatMoney(deal.paidAmount)}</td>
                    <td className="px-6 py-4 font-medium text-[#111111]">{formatMoney(remaining)}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-medium ${
                        deal.status === 'Tamamlandı' ? 'bg-[#1DB954]/10 text-[#1DB954]' :
                        deal.status === 'Kapora Alındı' ? 'bg-[#F5A623]/10 text-[#F5A623]' : 'bg-[#FF453A]/10 text-[#FF453A]'
                      }`}>
                        {deal.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {remaining > 0 && (
                        <button 
                          onClick={() => handleSendReminder(deal)}
                          className="h-[36px] px-3.5 bg-[#1DB954] hover:bg-[#1AA34A] text-white text-[12px] font-medium rounded-[10px] transition-colors inline-flex items-center gap-1.5 shadow-sm"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-current" /> Hatırlat
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}