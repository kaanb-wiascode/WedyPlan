"use client";

import React from "react";
import { triggerVendorDataBackupAction } from "@/lib/actions/vendor-settings";

export default function RegionalTaxPanel({
  currency,
  setCurrency,
  vatRate,
  setVatRate,
  vendorId,
}: {
  currency: string;
  setCurrency: (c: string) => void;
  vatRate: number;
  setVatRate: (r: number) => void;
  vendorId: string;
}) {
  const handleTriggerBackup = async () => {
    const res = await triggerVendorDataBackupAction(vendorId);
    if (res.success) {
      alert("✨ " + res.message);
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          🌍 Para Birimi, Vergi & Güvenlik Kaset Yedeklemesi
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-semibold block mb-1">Varsayılan Para Birimi</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800"
          >
            <option value="TRY">TRY (Türk Lirası ₺)</option>
            <option value="EUR">EUR (Euro €)</option>
            <option value="USD">USD (Amerikan Doları $)</option>
            <option value="GBP">GBP (İngiliz Sterlini £)</option>
          </select>
        </div>

        <div>
          <label className="font-semibold block mb-1">Varsayılan KDV Oranı (%)</label>
          <input
            type="number"
            value={vatRate}
            onChange={(e) => setVatRate(Number(e.target.value))}
            className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-mono"
          />
        </div>
      </div>

      {/* Şifreli Yasal Veri Yedeği Butonu */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
        <div>
          <h4 className="font-bold text-slate-800 dark:text-slate-100">Tam İşletme Veri Yedeği İndir</h4>
          <p className="text-[10px] text-slate-400">Tüm müşteri, sözleşme, e-fatura ve finansal verileriniz şifreli arşivlenir.</p>
        </div>
        <button
          type="button"
          onClick={handleTriggerBackup}
          className="px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold hover:opacity-90 transition text-xs"
        >
          📦 Yedeği Oluştur & İndir
        </button>
      </div>
    </div>
  );
}
