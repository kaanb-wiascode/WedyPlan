"use client";

import React from "react";

export default function UnitEconomicsTable({ aiReport }: { aiReport: any }) {
  const categoryBreakdown = [
    { category: "Düğün Mekanları", revenue: "640.000 ₺", share: "%45", avgTicket: "340.000 ₺" },
    { category: "Fotoğraf & Sinema", revenue: "355.000 ₺", share: "%25", avgTicket: "120.000 ₺" },
    { category: "Müzik & Orkestra", revenue: "213.000 ₺", share: "%15", avgTicket: "85.000 ₺" },
  ];

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-6 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          📈 Birim Ekonomisi Metrikleri & Kategori Bazlı Ciro Kırılımı
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">ARPU (Tedarikçi Başına)</span>
          <span className="font-serif font-bold text-indigo-600 text-sm">{aiReport?.arpuVendor || "1.690 ₺"}</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">ARPU (Çift Başına)</span>
          <span className="font-serif font-bold text-indigo-600 text-sm">{aiReport?.arpuCouple || "145 ₺"}</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">LTV / CAC Oranı</span>
          <span className="font-mono font-bold text-purple-600 text-sm">{aiReport?.ltvCacRatio || "4.8x"}</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Net Kar Marjı</span>
          <span className="font-mono font-bold text-emerald-600 text-sm">%82.4</span>
        </div>
      </div>

      {/* Kategori Tablosu */}
      <div className="space-y-2">
        <span className="font-bold text-slate-700 dark:text-slate-200 block">Kategoriye Göre Ciro Payları</span>
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
              <th className="py-2.5 px-2">Kategori Adı</th>
              <th className="py-2.5 px-2">Aylık Ciro</th>
              <th className="py-2.5 px-2">Kategori Payı</th>
              <th className="py-2.5 px-2 text-right">Ortalama Düğün Bütçesi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {categoryBreakdown.map((c, i) => (
              <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">{c.category}</td>
                <td className="py-3 px-2 font-serif font-bold text-emerald-600">{c.revenue}</td>
                <td className="py-3 px-2 font-mono text-indigo-600 font-bold">{c.share}</td>
                <td className="py-3 px-2 text-right font-serif font-semibold text-slate-700 dark:text-slate-300">{c.avgTicket}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
