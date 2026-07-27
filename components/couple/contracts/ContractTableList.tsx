"use client";

import React from "react";

export default function ContractTableList({
  contracts,
  onViewContract,
}: {
  contracts: any[];
  onViewContract: (contract: any) => void;
}) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          📋 Sözleşme Kasası ({contracts.length} Doküman)
        </span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">Sözleşme & Tedarikçi</th>
            <th className="py-3 px-2">Kategori</th>
            <th className="py-3 px-2">Tutar</th>
            <th className="py-3 px-2">İmza / Vade Tarihi</th>
            <th className="py-3 px-2">AI Risk Skoru</th>
            <th className="py-3 px-2">Durum</th>
            <th className="py-3 px-2 text-right">İşlem</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {contracts.map((c) => (
            <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                {c.title}
                <span className="block text-[10px] text-slate-400 font-normal">{c.vendorName}</span>
              </td>
              <td className="py-3 px-2 text-slate-500">{c.category}</td>
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                {c.amount.toLocaleString("tr-TR")} {c.currency}
              </td>
              <td className="py-3 px-2 text-slate-500">{c.signedDate || c.expiryDate}</td>
              <td className="py-3 px-2 font-mono font-bold text-emerald-600">%{c.riskScore} Düşük Risk</td>
              <td className="py-3 px-2">
                <span
                  className={"px-2 py-0.5 rounded-full text-[10px] font-bold " +
                    (c.status === "SIGNED"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : c.status === "PENDING"
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                      : "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300")
                  }
                >
                  {c.status === "SIGNED" ? "✓ İmzalandı" : c.status === "PENDING" ? "İmza Bekliyor" : "Süresi Doldu"}
                </span>
              </td>
              <td className="py-3 px-2 text-right">
                <button
                  onClick={() => onViewContract(c)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[11px] font-medium hover:opacity-90 transition"
                >
                  Görüntüle & İmzala →
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
