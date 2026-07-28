"use client";

import React from "react";

export default function BIMetricDimensionsTable() {
  const metricsList = [
    { name: "Tedarikçi Başarı Endeksi (Vendor Success)", score: "94 / 100", target: "90", status: "ON_TRACK" },
    { name: "Çift Düğün Süreci İlerlemesi (Couple Health)", score: "%89.2", target: "%85", status: "ON_TRACK" },
    { name: "Arama Motoru Yanıt Hızı (Search Latency)", score: "18 ms", target: "< 50 ms", status: "ON_TRACK" },
    { name: "Müşteri Hizmetleri SLA Uyum Başarısı", score: "%98.8", target: "%95", status: "ON_TRACK" },
  ];

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          📈 Kritik Performans Göstergeleri (KPI Breakdowns)
        </span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">Metrik Tanımı</th>
            <th className="py-3 px-2">Anlık Değer</th>
            <th className="py-3 px-2">Hedef Değer</th>
            <th className="py-3 px-2 text-right">Performans</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {metricsList.map((m, i) => (
            <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">{m.name}</td>
              <td className="py-3 px-2 font-serif font-bold text-indigo-600 text-sm">{m.score}</td>
              <td className="py-3 px-2 font-mono text-slate-500">{m.target}</td>
              <td className="py-3 px-2 text-right">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  ✓ Hedef Aşıldı
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
