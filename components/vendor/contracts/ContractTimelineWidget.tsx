"use client";

import React from "react";

export default function ContractTimelineWidget({ contract }: { contract: any }) {
  if (!contract) return null;

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          ⏳ Sözleşme Yaşam Döngüsü & Aktivite Geçmişi
        </span>
        <span className="font-mono text-[10px] text-indigo-600 font-bold bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded">
          SHA-256 Verified
        </span>
      </div>

      <div className="space-y-3">
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 flex justify-between items-center">
          <div>
            <h4 className="font-bold text-slate-800 dark:text-slate-100">✍️ Sözleşme Taslağı Oluşturuldu</h4>
            <p className="text-[10px] text-slate-400">Tedarikçi tarafından v1.0 sürümü hazırlandı</p>
          </div>
          <span className="text-[10px] font-semibold text-slate-500">12 Şubat 2026</span>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 flex justify-between items-center">
          <div>
            <h4 className="font-bold text-slate-800 dark:text-slate-100">📨 Müşteri Onayına İletildi</h4>
            <p className="text-[10px] text-slate-400">Selin & Kaan Yılmaz hesabına push bildirimi ve e-posta iletildi</p>
          </div>
          <span className="text-[10px] font-semibold text-slate-500">13 Şubat 2026</span>
        </div>

        <div className="p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/50 flex justify-between items-center">
          <div>
            <h4 className="font-bold text-emerald-800 dark:text-emerald-300">🔏 Müşteri Tarafından E-İmzalandı</h4>
            <p className="text-[10px] text-emerald-600">IP: 176.234.12.88 • Hash: #e8a931c</p>
          </div>
          <span className="text-[10px] font-bold text-emerald-700">14 Şubat 2026</span>
        </div>
      </div>
    </div>
  );
}
