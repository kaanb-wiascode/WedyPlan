"use client";

import React from "react";

export default function RequestTrackingTable({ requests }: { requests: any[] }) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          📋 Gönderilen Teklif İstekleri ({requests.length})
        </span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">Başlık / Kategori</th>
            <th className="py-3 px-2">Şehir / Tarih</th>
            <th className="py-3 px-2">Bütçe</th>
            <th className="py-3 px-2">Tedarikçi Dağıtımı</th>
            <th className="py-3 px-2">AI Kalite</th>
            <th className="py-3 px-2">Durum</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {requests.map((r) => (
            <tr key={r.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                {r.title}
                <span className="block text-[10px] text-slate-400 font-normal">{r.category}</span>
              </td>
              <td className="py-3 px-2 text-slate-500">{r.location} • {r.weddingDate}</td>
              <td className="py-3 px-2 font-semibold text-slate-700 dark:text-slate-200">{r.budgetRange}</td>
              <td className="py-3 px-2 text-slate-500">{r.vendorCount} Tedarikçiye İletildi</td>
              <td className="py-3 px-2 font-mono font-bold text-emerald-600">%{r.qualityScore}</td>
              <td className="py-3 px-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  {r.statusText}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
