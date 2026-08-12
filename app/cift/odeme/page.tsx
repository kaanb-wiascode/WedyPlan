'use client';

import React, { useEffect, useState, useMemo, useTransition } from 'react';
import { useConfirm } from '@/context/ConfirmContext';
import {
  CreditCard,
  Plus,
  Trash2,
  Sparkles,
  Search,
  CheckCircle2,
  Clock,
  Calendar,
  X
} from 'lucide-react';

interface PaymentInstallment {
  id: string;
  title: string;
  vendorName: string;
  amount: number;
  dueDate: string;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
}

export default function PaymentsPage() {
  const confirm = useConfirm();

  const [installments, setInstallments] = useState<PaymentInstallment[]>([
    {
      id: '1',
      title: 'Düğün Salonu 1. Taksit',
      vendorName: 'Beykoz Secret Garden',
      amount: 45000,
      dueDate: '2026-03-15',
      status: 'PAID',
    },
    {
      id: '2',
      title: 'Fotoğraf Çekimi Kaporası',
      vendorName: 'Masal Kareler Studio',
      amount: 15000,
      dueDate: '2026-04-10',
      status: 'PAID',
    },
    {
      id: '3',
      title: 'Düğün Salonu 2. Taksit (Ara Ödeme)',
      vendorName: 'Beykoz Secret Garden',
      amount: 45000,
      dueDate: '2026-08-01',
      status: 'PENDING',
    },
    {
      id: '4',
      title: 'Gelinlik / Damatlık Kapanış Ödemesi',
      vendorName: 'Aysira Moda & Vakko',
      amount: 25000,
      dueDate: '2026-08-25',
      status: 'PENDING',
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('ALL');

  // Form State
  const [title, setTitle] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState<'PAID' | 'PENDING'>('PENDING');

  // Metrikler
  const totalAmount = useMemo(
    () => installments.reduce((acc, curr) => acc + curr.amount, 0),
    [installments]
  );
  
  const paidAmount = useMemo(
    () => installments.filter(i => i.status === 'PAID').reduce((acc, curr) => acc + curr.amount, 0),
    [installments]
  );

  const pendingAmount = totalAmount - paidAmount;
  const paidPercentage = totalAmount > 0 ? Math.round((paidAmount / totalAmount) * 100) : 0;

  const handleAddPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount || !dueDate) return;

    startTransition(() => {
      const newInst: PaymentInstallment = {
        id: Date.now().toString(),
        title,
        vendorName: vendorName || 'Genel Tedarikçi',
        amount: parseFloat(amount),
        dueDate,
        status,
      };

      setInstallments(prev => [...prev, newInst]);
      setTitle('');
      setVendorName('');
      setAmount('');
      setDueDate('');
      setStatus('PENDING');
      setIsModalOpen(false);
    });
  };

  // 🍏 GLOBAL APPLE UYARI PENCERESİ ENTEGRASYONU
  const handleDelete = async (id: string, itemTitle: string) => {
    const isConfirmed = await confirm({
      title: 'Taksiti Silmek İstediğinize Emin Misiniz?',
      message: `"${itemTitle}" ödeme kaydı kalıcı olarak silinecektir. Bu işlem geri alınamaz.`,
      confirmText: 'Evet, Sil',
      cancelText: 'Vazgeç',
      variant: 'danger',
    });

    if (isConfirmed) {
      setInstallments(prev => prev.filter(i => i.id !== id));
    }
  };

  const handleTogglePaid = (id: string) => {
    setInstallments(prev =>
      prev.map(i => {
        if (i.id === id) {
          const nextStatus = i.status === 'PAID' ? 'PENDING' : 'PAID';
          return { ...i, status: nextStatus };
        }
        return i;
      })
    );
  };

  const filteredInstallments = installments.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.vendorName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatusFilter === 'ALL' || item.status === selectedStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 font-sans antialiased">
      
      {/* HEADER & HIZLI AKSİYON */}
      <div className="p-8 rounded-3xl apple-glass shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/60 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 text-[11px] font-medium border border-zinc-300/40 dark:border-zinc-700/50">
            <CreditCard className="w-3.5 h-3.5 text-zinc-500" />
            <span>Finansal Takvim</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Ödeme & Taksit Planı
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Anlaşmalı firmalarınıza yapacağınız ödemeleri ve vade tarihlerini takip edin.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-black dark:hover:bg-zinc-200 transition-all cursor-pointer inline-flex items-center justify-center gap-2 shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" /> Taksit / Ödeme Ekle
        </button>
      </div>

      {/* 1. ÖZET FİNANS KARTLARI */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-6 rounded-3xl apple-glass shadow-xs space-y-1">
          <span className="text-xs font-medium text-zinc-400">Toplam Taksit Yükü</span>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">₺{totalAmount.toLocaleString('tr-TR')}</div>
          <div className="text-[11px] text-zinc-500">Kayıtlı Tüm Taksitler</div>
        </div>

        <div className="p-6 rounded-3xl apple-glass shadow-xs space-y-1">
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Tamamlanan Ödemeler
          </span>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">₺{paidAmount.toLocaleString('tr-TR')}</div>
          <div className="text-[11px] text-zinc-400">Toplam Borcun %{paidPercentage}&apos;si Ödendi</div>
        </div>

        <div className="p-6 rounded-3xl apple-glass shadow-xs space-y-1">
          <span className="text-xs font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Gelecek Taksitler
          </span>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">₺{pendingAmount.toLocaleString('tr-TR')}</div>
          <div className="text-[11px] text-zinc-400">Vadesi Gelen / Bekleyen</div>
        </div>
      </div>

      {/* 2. İLERLEME BARI */}
      <div className="p-6 rounded-3xl apple-glass shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-zinc-700 dark:text-zinc-300">Ödenen Taksit Oranı</span>
          <span className="text-zinc-900 dark:text-white">%{paidPercentage}</span>
        </div>
        <div className="w-full h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-zinc-900 dark:bg-white rounded-full transition-all duration-500"
            style={{ width: `${paidPercentage}%` }}
          />
        </div>
      </div>

      {/* 3. FİLTRE VE ARAMA */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Ödeme veya firma ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedStatusFilter('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedStatusFilter === 'ALL'
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs'
                : 'bg-white/80 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-100/80'
            }`}
          >
            Tümü
          </button>
          <button
            onClick={() => setSelectedStatusFilter('PAID')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedStatusFilter === 'PAID'
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs'
                : 'bg-white/80 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-100/80'
            }`}
          >
            Ödenenler
          </button>
          <button
            onClick={() => setSelectedStatusFilter('PENDING')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedStatusFilter === 'PENDING'
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs'
                : 'bg-white/80 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-100/80'
            }`}
          >
            Bekleyenler
          </button>
        </div>
      </div>

      {/* 4. TAKSİT TABLOSU */}
      <div className="apple-glass rounded-[28px] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50/50 dark:bg-zinc-800/30 border-b border-zinc-200/80 dark:border-zinc-800 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                <th className="p-4">Ödeme Başlığı</th>
                <th className="p-4">Firma / Tedarikçi</th>
                <th className="p-4">Vade Tarihi</th>
                <th className="p-4">Tutar</th>
                <th className="p-4">Durum</th>
                <th className="p-4 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60 text-xs">
              {filteredInstallments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-zinc-400 font-medium">
                    Kayıtlı ödeme taksiti bulunamadı.
                  </td>
                </tr>
              ) : (
                filteredInstallments.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="p-4 font-bold text-zinc-900 dark:text-white">
                      {item.title}
                    </td>
                    <td className="p-4 font-medium text-zinc-600 dark:text-zinc-400">
                      {item.vendorName}
                    </td>
                    <td className="p-4 text-zinc-500 dark:text-zinc-400 font-medium">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-zinc-400" />
                        {new Date(item.dueDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-zinc-900 dark:text-white">
                      ₺{item.amount.toLocaleString('tr-TR')}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleTogglePaid(item.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                          item.status === 'PAID'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {item.status === 'PAID' ? (
                          <>
                            <CheckCircle2 className="w-3 h-3" /> Ödendi
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3" /> Ödeme Bekliyor
                          </>
                        )}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDelete(item.id, item.title)}
                        className="p-1.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
                        title="Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. YENİ TAKSİT EKLEME MODALI */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-zinc-500" /> Yeni Ödeme Taksiti Ekle
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddPayment} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Ödeme Başlığı</label>
                <input
                  type="text"
                  placeholder="örn. Düğün Salonu 2. Taksit"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Firma / Tedarikçi Adı</label>
                <input
                  type="text"
                  placeholder="örn. Beykoz Secret Garden"
                  value={vendorName}
                  onChange={(e) => setVendorName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Tutar (₺)</label>
                  <input
                    type="number"
                    placeholder="25000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Vade Tarihi</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all font-medium"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Durum</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setStatus('PENDING')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      status === 'PENDING'
                        ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-transparent'
                        : 'bg-zinc-50 dark:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700'
                    }`}
                  >
                    Ödeme Bekliyor
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus('PAID')}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      status === 'PAID'
                        ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-transparent'
                        : 'bg-zinc-50 dark:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700'
                    }`}
                  >
                    Ödendi
                  </button>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-black dark:hover:bg-zinc-200 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isPending ? 'Ekleniyor...' : 'Taksiti Kaydet'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}