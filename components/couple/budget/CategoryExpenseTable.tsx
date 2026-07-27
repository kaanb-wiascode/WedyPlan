"use client";

import React from "react";

export default function CategoryExpenseTable({ categories, currency }: { categories: any[]; currency: string }) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 overflow-x-auto">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          📑 Harcama Ledger & Fatura Detayları
        </span>
        <button className="px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-medium hover:opacity-90 transition">
          + Yeni Harcama / Fatura Ekle
        </button>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">Kategori</th>
            <th className="py-3 px-2">Tahmini</th>
            <th className="py-3 px-2">Gerçekleşen</th>
            <th className="py-3 px-2">Fark</th>
            <th className="py-3 px-2">Durum</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {categories.map((c) => {
            const diff = c.estimated - c.actual;
            return (
              <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                <td className="py-3 px-2 font-semibold">{c.name}</td>
                <td className="py-3 px-2">{c.estimated.toLocaleString("tr-TR")} {currency}</td>
                <td className="py-3 px-2 font-bold">{c.actual.toLocaleString("tr-TR")} {currency}</td>
                <td className={"py-3 px-2 font-semibold " + (diff < 0 ? "text-rose-600" : "text-emerald-600")}>
                  {diff.toLocaleString("tr-TR")} {currency}
                </td>
                <td className="py-3 px-2">
                  <span
                    className={"px-2 py-0.5 rounded-full text-[10px] font-bold " +
                      (c.status === "OVER_BUDGET"
                        ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                        : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300")
                    }
                  >
                    {c.status === "OVER_BUDGET" ? "Bütçe Aşıldı" : "Dengeli"}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
