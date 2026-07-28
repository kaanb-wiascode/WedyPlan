"use client";

import React from "react";

export default function BillingHistoryTable({ invoices }: { invoices: any[] }) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          🧾 Fatura & Ödeme Geçmişi ({invoices.length} Fatura)
        </span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">Fatura No / Açıklama</th>
            <th className="py-3 px-2">Ödeme Tarihi</th>
            <th className="py-3 px-2">Tutar</th>
            <th className="py-3 px-2">Durum</th>
            <th className="py-3 px-2 text-right">PDF</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {invoices.map((inv) => (
            <tr key={inv.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                {inv.invoiceNumber}
                <span className="block text-[10px] text-slate-400 font-normal">{inv.description}</span>
              </td>
              <td className="py-3 px-2 text-slate-500">{inv.date}</td>
              <td className="py-3 px-2 font-serif font-bold text-emerald-600">
                {inv.amount.toLocaleString("tr-TR")} ₺
              </td>
              <td className="py-3 px-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  {inv.status}
                </span>
              </td>
              <td className="py-3 px-2 text-right">
                <button
                  onClick={() => alert("📄 Fatura PDF İndiriliyor...")}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold hover:bg-slate-200 transition"
                >
                  İndir 📥
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
