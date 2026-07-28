"use client";

import React from "react";

export default function LeadTableView({
  leads,
  onSelectLead,
}: {
  leads: any[];
  onSelectLead: (lead: any) => void;
}) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">Çift İsimleri</th>
            <th className="py-3 px-2">Düğün Tarihi & Konum</th>
            <th className="py-3 px-2">Bütçe</th>
            <th className="py-3 px-2">Davetli Sayısı</th>
            <th className="py-3 px-2">Huni Aşaması</th>
            <th className="py-3 px-2">AI Skor</th>
            <th className="py-3 px-2 text-right">İşlem</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {leads.map((l) => (
            <tr key={l.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                {l.coupleName}
                <span className="block text-[10px] text-slate-400 font-normal">{l.phone || l.email}</span>
              </td>
              <td className="py-3 px-2 text-slate-600 dark:text-slate-300">
                {l.weddingDate}
                <span className="block text-[10px] text-slate-400">{l.location}</span>
              </td>
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                {l.budget.toLocaleString("tr-TR")} ₺
              </td>
              <td className="py-3 px-2 text-slate-500">{l.guestCount} Kişi</td>
              <td className="py-3 px-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  {l.stage}
                </span>
              </td>
              <td className="py-3 px-2 font-bold text-emerald-600">%{l.leadScore}</td>
              <td className="py-3 px-2 text-right">
                <button
                  onClick={() => onSelectLead(l)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[10px] font-bold"
                >
                  Detay & AI →
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
