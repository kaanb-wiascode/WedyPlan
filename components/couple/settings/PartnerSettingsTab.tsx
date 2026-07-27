"use client";

import React, { useState } from "react";

export default function PartnerSettingsTab() {
  const [partnerEmail, setPartnerEmail] = useState("kaan@wedyplan.demo");
  const [isSyncing, setIsSyncing] = useState(true);

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            💍 Partner Bağlantısı & Ortak Çalışma
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Partnerinizle aynı hesabı eşzamanlı yönetebilir, bütçe ve konuk listesini ortak düzenleyebilirsiniz.
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          ✓ Eşleşti: Kaan Yılmaz
        </span>
      </div>

      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 space-y-3 text-xs">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-bold text-slate-800 dark:text-slate-100">Bağlı Partner Hesabı</h4>
            <p className="text-slate-400 text-[11px]">{partnerEmail}</p>
          </div>
          <button
            onClick={() => alert("Partner bağlantısı kesme simülasyonu")}
            className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-600 dark:border-rose-900/40 text-[11px] font-semibold hover:bg-rose-50 transition"
          >
            Bağlantıyı Kes
          </button>
        </div>

        <div className="pt-2 border-t border-slate-200/40 dark:border-slate-700/40 space-y-2">
          <label className="flex items-center justify-between text-slate-700 dark:text-slate-200 font-medium cursor-pointer">
            <span>Ortak Bütçe & Harcama Onay Yetkisi</span>
            <input
              type="checkbox"
              checked={isSyncing}
              onChange={(e) => setIsSyncing(e.target.checked)}
              className="w-4 h-4 accent-rose-500 rounded"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
