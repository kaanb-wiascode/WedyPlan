'use client';

import React, { useState, useTransition } from 'react';
import { useConfirm } from '@/context/ConfirmContext';
import {
  FileText,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  ExternalLink,
  Search,
  Sparkles,
  X,
  FileCheck
} from 'lucide-react';

interface ContractItem {
  id: string;
  coupleNames: string;
  title: string;
  amount: number;
  status: 'SIGNED' | 'SENT' | 'DRAFT';
  date: string;
  contractUrl?: string;
}

export default function VendorContractsPage() {
  const confirm = useConfirm();
  const [isPending, startTransition] = useTransition();

  const [contracts, setContracts] = useState<ContractItem[]>([
    {
      id: '1',
      coupleNames: 'Selin & Caner',
      title: 'Kır Düğünü Hizmet & Yemek Sözleşmesi',
      amount: 150000,
      status: 'SIGNED',
      date: '15 Mart 2026',
      contractUrl: '#'
    },
    {
      id: '2',
      coupleNames: 'Gizem & Burak',
      title: 'Açık Hava Kokteyl Sözleşme Taslağı',
      amount: 180000,
      status: 'SENT',
      date: '02 Nisan 2026',
      contractUrl: '#'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleDeleteContract = async (id: string, title: string) => {
    const isConfirmed = await confirm({
      title: 'Sözleşmeyi Silmek İstediğinize Emin Misiniz?',
      message: `"${title}" sözleşme kaydı kalıcı olarak silinecektir.`,
      confirmText: 'Evet, Sil',
      cancelText: 'Vazgeç',
      variant: 'danger'
    });

    if (isConfirmed) {
      setContracts(prev => prev.filter(c => c.id !== id));
      showToast('Sözleşme kaydı silindi.');
    }
  };

  const filteredContracts = contracts.filter(c =>
    c.coupleNames.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 font-sans antialiased">
      
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-3 rounded-2xl shadow-2xl border border-zinc-800 dark:border-zinc-200 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <Sparkles className="w-4 h-4 text-zinc-400" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* HEADER */}
      <div className="p-8 rounded-3xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/60 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 text-[11px] font-medium border border-zinc-300/40 dark:border-zinc-700/50">
            <FileText className="w-3.5 h-3.5 text-zinc-500" />
            <span>Hukuki Dokümantasyon</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Teklif & Sözleşmeler
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Çiftlerinize ilettiğiniz resmi teklifleri ve onaylanan dijital sözleşmeleri takip edin.
          </p>
        </div>
      </div>

      {/* TABLO (Frosted Glass) */}
      <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50/50 dark:bg-zinc-800/30 border-b border-zinc-200/80 dark:border-zinc-800 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                <th className="p-4">Çift Adı</th>
                <th className="p-4">Sözleşme Başlığı</th>
                <th className="p-4">Anlaşma Tutarı</th>
                <th className="p-4">Durum</th>
                <th className="p-4 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60 text-xs">
              {filteredContracts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-zinc-400 font-medium">
                    Kayıtlı sözleşme bulunamadı.
                  </td>
                </tr>
              ) : (
                filteredContracts.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="p-4 font-bold text-zinc-900 dark:text-white">{item.coupleNames}</td>
                    <td className="p-4 font-medium text-zinc-600 dark:text-zinc-400">{item.title}</td>
                    <td className="p-4 font-bold text-zinc-900 dark:text-white">₺{item.amount.toLocaleString('tr-TR')}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        item.status === 'SIGNED' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' :
                        'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                      }`}>
                        {item.status === 'SIGNED' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {item.status === 'SIGNED' ? 'İmzalandı & Yürürlükte' : 'Çift Onayı Bekliyor'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={item.contractUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 text-xs font-semibold inline-flex items-center gap-1 transition-all"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> PDF
                        </a>
                        <button
                          onClick={() => handleDeleteContract(item.id, item.title)}
                          className="p-1.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}