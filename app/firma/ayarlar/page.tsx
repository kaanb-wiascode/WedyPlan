'use client';

import React, { useState } from 'react';
import { Settings, Building2, CreditCard, Bell, Save, Sparkles, CheckCircle2 } from 'lucide-react';

export default function VendorSettingsPage() {
  const [companyName, setCompanyName] = useState('Beykoz Secret Garden');
  const [taxNumber, setTaxNumber] = useState('1234567890');
  const [phone, setPhone] = useState('+90 216 111 22 33');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage('Firma ayarlarınız kaydedildi.');
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8 font-sans antialiased">
      
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-3 rounded-2xl shadow-2xl border border-zinc-800 dark:border-zinc-200 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* HEADER */}
      <div className="p-8 rounded-3xl apple-glass shadow-[0_8px_30px_rgb(0,0,0,0.03)] space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/60 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 text-[11px] font-medium border border-zinc-300/40 dark:border-zinc-700/50">
          <Settings className="w-3.5 h-3.5 text-zinc-500" />
          <span>Firma Konfigürasyonu</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Firma Ayarları
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          Kurumsal bilgilerinizi, fatura detaylarınızı ve WedyPlan aboneliğinizi yönetin.
        </p>
      </div>

      <form onSubmit={handleSave} className="apple-glass rounded-[28px] p-6 sm:p-8 space-y-6 shadow-xs">
        <h3 className="text-sm font-bold text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-3">
          Resmi Şirket & İletişim Bilgileri
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Ticari Unvan / Firma Adı</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Vergi Numarası / Kimlik No</label>
            <input
              type="text"
              value={taxNumber}
              onChange={(e) => setTaxNumber(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end border-t border-zinc-100 dark:border-zinc-800">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-black transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Değişiklikleri Kaydet
          </button>
        </div>
      </form>

    </div>
  );
}