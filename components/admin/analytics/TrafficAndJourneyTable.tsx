"use client";

import React from "react";

export default function TrafficAndJourneyTable() {
  const topPages = [
    { url: "/dugun-mekanlari/bodrum", views: "124,000", avgTime: "2m 14s", bounce: "%24.2" },
    { url: "/fotograf-sinema/istanbul", views: "98,400", avgTime: "1m 58s", bounce: "%28.0" },
    { url: "/couple/dashboard/budget", views: "64,200", avgTime: "4m 45s", bounce: "%12.1" },
  ];

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          🌐 En Çok Ziyaret Edilen Sayfalar & Kalıcılık Analitiği
        </span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">Sayfa URL'si</th>
            <th className="py-3 px-2">Görüntülenme</th>
            <th className="py-3 px-2">Kalma Süresi</th>
            <th className="py-3 px-2 text-right">Hemen Çıkma (Bounce)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {topPages.map((p, i) => (
            <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-mono font-bold text-indigo-600">{p.url}</td>
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">{p.views}</td>
              <td className="py-3 px-2 font-mono text-slate-600 dark:text-slate-300">{p.avgTime}</td>
              <td className="py-3 px-2 text-right font-mono font-bold text-emerald-600">{p.bounce}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
