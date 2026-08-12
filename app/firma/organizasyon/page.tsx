'use client';

import React, { useState } from 'react';
import { useConfirm } from '@/context/ConfirmContext';
import { Users, Plus, Trash2, CheckCircle2, User, Phone, Sparkles } from 'lucide-react';

interface StaffItem {
  id: string;
  name: string;
  role: string;
  phone: string;
  assignedEvent: string;
}

export default function VendorTeamPage() {
  const confirm = useConfirm();

  const [staffList, setStaffList] = useState<StaffItem[]>([
    { id: '1', name: 'Ahmet Yılmaz', role: 'Saha Sorumlusu', phone: '+90 532 999 88 77', assignedEvent: 'Selin & Caner Düğünü (15 Ağu)' },
    { id: '2', name: 'Mehmet Demir', role: 'Başşef / Mutfak', phone: '+90 533 123 45 67', assignedEvent: 'Selin & Caner Düğünü (15 Ağu)' },
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleDeleteStaff = async (id: string, name: string) => {
    const isConfirmed = await confirm({
      title: 'Personeli Çıkarmak İstediğinize Emin Misiniz?',
      message: `"${name}" etkinlik kadrosundan çıkarılacaktır.`,
      confirmText: 'Evet, Çıkar',
      cancelText: 'Vazgeç',
      variant: 'danger'
    });

    if (isConfirmed) {
      setStaffList(prev => prev.filter(s => s.id !== id));
      setToastMessage('Personel listeden çıkarıldı.');
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 font-sans antialiased">
      
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-3 rounded-2xl shadow-2xl border border-zinc-800 dark:border-zinc-200 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <Sparkles className="w-4 h-4 text-zinc-400" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* HEADER */}
      <div className="p-8 rounded-3xl apple-glass shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/60 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 text-[11px] font-medium border border-zinc-300/40 dark:border-zinc-700/50">
            <Users className="w-3.5 h-3.5 text-zinc-500" />
            <span>Saha Kadrosu</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Ekip & Operasyon
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Düğün günü sahada bulunacak yetkili personel ve hizmet ekibini yönetin.
          </p>
        </div>
      </div>

      {/* EKİP TABLOSU */}
      <div className="apple-glass rounded-[28px] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50/50 dark:bg-zinc-800/30 border-b border-zinc-200/80 dark:border-zinc-800 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                <th className="p-4">Personel Adı</th>
                <th className="p-4">Görevi</th>
                <th className="p-4">Telefon</th>
                <th className="p-4">Atanan Etkinlik</th>
                <th className="p-4 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60 text-xs">
              {staffList.map((s) => (
                <tr key={s.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                  <td className="p-4 font-bold text-zinc-900 dark:text-white">{s.name}</td>
                  <td className="p-4 text-zinc-500 font-medium">{s.role}</td>
                  <td className="p-4 text-zinc-500 font-medium">{s.phone}</td>
                  <td className="p-4 font-semibold text-zinc-800 dark:text-zinc-200">{s.assignedEvent}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDeleteStaff(s.id, s.name)}
                      className="p-1.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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