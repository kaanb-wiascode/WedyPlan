"use client";

import React from "react";

export default function CampaignListTable({ campaigns }: { campaigns: any[] }) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          📢 Kampanya & Kupon Listesi ({campaigns.length} Kayıt)
        </span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">Kampanya Başlığı / Kodu</th>
            <th className="py-3 px-2">Tür</th>
            <th className="py-3 px-2">İndirim</th>
            <th className="py-3 px-2">Gelen Talep</th>
            <th className="py-3 px-2">Tahmini ROI</th>
            <th className="py-3 px-2 text-right">Durum</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {campaigns.map((c) => (
            <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                {c.title}
                <span className="block text-[10px] text-purple-600 font-mono font-bold">{c.couponCode || "Kuponsuz"}</span>
              </td>
              <td className="py-3 px-2 text-slate-500 font-semibold text-[10px] uppercase">{c.type}</td>
              <td className="py-3 px-2 font-serif font-bold text-purple-600">%{c.discountPercentage} İndirim</td>
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-200">+{c.leadsGenerated} Talep</td>
              <td className="py-3 px-2 font-bold text-emerald-600">%{c.roi} ROI</td>
              <td className="py-3 px-2 text-right">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  {c.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
