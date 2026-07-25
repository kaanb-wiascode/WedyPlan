'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface DealPayment {
  id: string;
  clientName: string;
  phone: string;
  weddingDate: string;
  totalAmount: number;
  paidAmount: number;
  dueDate: string;
  status: 'Tamamlandı' | 'Kısmi Ödeme (Kapora)' | 'Ödeme Bekliyor';
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
    status: 'Kısmi Ödeme (Kapora)',
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
    status: 'Ödeme Bekliyor',
  },
];

export default function VendorFinancePage() {
  const [deals, setDeals] = useState<DealPayment[]>(INITIAL_DEALS);

  // Form State
  const [newDeal, setNewDeal] = useState({
    clientName: '',
    phone: '',
    weddingDate: '',
    totalAmount: '',
    paidAmount: '',
    dueDate: '',
  });

  // Toplam Metrik Hesaplamaları
  const totalRevenue = deals.reduce((sum, d) => sum + d.totalAmount, 0);
  const totalCollected = deals.reduce((sum, d) => sum + d.paidAmount, 0);
  const totalPending = totalRevenue - totalCollected;

  // Yeni Anlaşma Ekleme
  const handleAddDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeal.clientName || !newDeal.totalAmount) return;

    const total = Number(newDeal.totalAmount);
    const paid = Number(newDeal.paidAmount) || 0;

    let status: DealPayment['status'] = 'Ödeme Bekliyor';
    if (paid >= total) status = 'Tamamlandı';
    else if (paid > 0) status = 'Kısmi Ödeme (Kapora)';

    const dealItem: DealPayment = {
      id: Date.now().toString(),
      clientName: newDeal.clientName,
      phone: newDeal.phone,
      weddingDate: newDeal.weddingDate,
      totalAmount: total,
      paidAmount: paid,
      dueDate: newDeal.dueDate,
      status,
    };

    setDeals([dealItem, ...deals]);
    setNewDeal({
      clientName: '',
      phone: '',
      weddingDate: '',
      totalAmount: '',
      paidAmount: '',
      dueDate: '',
    });
  };

  // WhatsApp Ödeme Hatırlatması Gönder
  const handleSendReminder = (deal: DealPayment) => {
    const remaining = deal.totalAmount - deal.paidAmount;
    const cleanPhone = deal.phone.replace(/\D/g, '');
    let msg = `Merhaba ${deal.clientName},\n\n${deal.weddingDate} tarihindeki düğün organizasyonunuz için kalan ödeme hatırlatmasıdır.\n\n`;
    msg += `💰 *Toplam Anlaşma:* ${deal.totalAmount.toLocaleString('tr-TR')} TL\n`;
    msg += `✅ *Ödenen Kapora:* ${deal.paidAmount.toLocaleString('tr-TR')} TL\n`;
    msg += `⏳ *Kalan Bakiye:* ${remaining.toLocaleString('tr-TR')} TL\n`;
    msg += `📅 *Son Ödeme Tarihi:* ${deal.dueDate}\n\n`;
    msg += `Ödeme ve detaylar için bizimle iletişime geçebilirsiniz. Teşekkür ederiz!`;

    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Üst Başlık */}
      <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="bg-emerald-50 text-emerald-700 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase border border-emerald-100">
            B2B Finans & Gelir Yönetimi
          </span>
          <h1 className="text-2xl font-extrabold text-[#4A154B] mt-1">Alacak & Kapora Takip Paneli 💰</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Çiftlerle yaptığınız düğün anlaşmalarını, alınan kaporaları ve kalan alacakları tek ekrandan yönetin.
          </p>
        </div>
      </div>

      {/* Finansal Özet Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm text-center">
          <span className="text-xs font-bold text-slate-400 uppercase">Toplam Anlaşma Hacmi</span>
          <p className="text-2xl md:text-3xl font-extrabold text-[#4A154B] mt-1">
            {totalRevenue.toLocaleString('tr-TR')} TL
          </p>
        </div>

        <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 text-center">
          <span className="text-xs font-bold text-emerald-600 uppercase">Tahsil Edilen (Kaporalar)</span>
          <p className="text-2xl md:text-3xl font-extrabold text-emerald-700 mt-1">
            {totalCollected.toLocaleString('tr-TR')} TL
          </p>
        </div>

        <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 text-center">
          <span className="text-xs font-bold text-amber-700 uppercase">Bekleyen Kalan Alacak</span>
          <p className="text-2xl md:text-3xl font-extrabold text-amber-800 mt-1">
            {totalPending.toLocaleString('tr-TR')} TL
          </p>
        </div>
      </div>

      {/* Yeni Anlaşma Ekleme Formu */}
      <div className="bg-white p-6 rounded-3xl border border-purple-100 shadow-sm space-y-4">
        <h2 className="text-xs font-bold text-[#4A154B] uppercase">➕ Yeni Düğün Anlaşması Ekle</h2>
        <form onSubmit={handleAddDeal} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <input
            type="text"
            required
            placeholder="Çift Adı (Örn: Selin & Caner)"
            value={newDeal.clientName}
            onChange={(e) => setNewDeal({ ...newDeal, clientName: e.target.value })}
            className="p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
          />
          <input
            type="tel"
            placeholder="Telefon (05XX...)"
            value={newDeal.phone}
            onChange={(e) => setNewDeal({ ...newDeal, phone: e.target.value })}
            className="p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
          />
          <input
            type="text"
            placeholder="Düğün Tarihi (Örn: 15.08.2026)"
            value={newDeal.weddingDate}
            onChange={(e) => setNewDeal({ ...newDeal, weddingDate: e.target.value })}
            className="p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
          />
          <input
            type="number"
            required
            placeholder="Toplam Tutar (TL)"
            value={newDeal.totalAmount}
            onChange={(e) => setNewDeal({ ...newDeal, totalAmount: e.target.value })}
            className="p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
          />
          <input
            type="number"
            placeholder="Alınan Kapora (TL)"
            value={newDeal.paidAmount}
            onChange={(e) => setNewDeal({ ...newDeal, paidAmount: e.target.value })}
            className="p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#E6007E]"
          />
          <button
            type="submit"
            className="bg-[#4A154B] text-white text-xs font-bold py-2.5 rounded-xl hover:bg-purple-900 transition shadow"
          >
            Kaydet
          </button>
        </form>
      </div>

      {/* Anlaşmalar ve Tahsilat Tablosu */}
      <div className="bg-white rounded-3xl border border-purple-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <h2 className="text-sm font-bold text-[#4A154B]">Düğün Anlaşmaları & Alacak Listesi</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-[#4A154B] uppercase">
                <th className="p-4">Çift / Müşteri</th>
                <th className="p-4">Düğün Tarihi</th>
                <th className="p-4">Toplam Tutar</th>
                <th className="p-4">Alınan Kapora</th>
                <th className="p-4">Kalan Bakiye</th>
                <th className="p-4">Durum</th>
                <th className="p-4 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {deals.map((deal) => {
                const remaining = deal.totalAmount - deal.paidAmount;

                return (
                  <tr key={deal.id} className="hover:bg-purple-50/20 transition">
                    <td className="p-4 font-bold text-slate-800">
                      {deal.clientName}
                      <span className="block text-[10px] text-slate-400 font-normal">{deal.phone}</span>
                    </td>
                    <td className="p-4 font-semibold text-slate-600">{deal.weddingDate}</td>
                    <td className="p-4 font-bold text-[#4A154B]">{deal.totalAmount.toLocaleString('tr-TR')} TL</td>
                    <td className="p-4 font-bold text-emerald-600">{deal.paidAmount.toLocaleString('tr-TR')} TL</td>
                    <td className="p-4 font-bold text-amber-700">{remaining.toLocaleString('tr-TR')} TL</td>
                    <td className="p-4">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${
                          deal.status === 'Tamamlandı'
                            ? 'bg-emerald-50 text-emerald-700'
                            : deal.status === 'Kısmi Ödeme (Kapora)'
                            ? 'bg-amber-50 text-amber-800'
                            : 'bg-red-50 text-red-600'
                        }`}
                      >
                        ● {deal.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {remaining > 0 && (
                        <button
                          onClick={() => handleSendReminder(deal)}
                          className="bg-[#25D366] hover:bg-emerald-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition inline-flex items-center gap-1 shadow-sm"
                        >
                          <span>💬</span>
                          <span>Hatırlat</span>
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