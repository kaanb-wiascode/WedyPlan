"use client";

import React from "react";

export default function TransactionsAndInvoicesTable({ transactions }: { transactions: any[] }) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          💳 Finansal İşlemler & Fatura Kasası ({transactions.length} Kayıt)
        </span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">Açıklama / Fatura No</th>
            <th className="py-3 px-2">İşlem Türü</th>
            <th className="py-3 px-2">Kategori</th>
            <th className="py-3 px-2">Tutar</th>
            <th className="py-3 px-2">Vade / Tarih</th>
            <th className="py-3 px-2 text-right">Durum</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {transactions.map((t) => (
            <tr key={t.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                {t.title}
                <span className="block text-[10px] text-slate-400 font-mono">{t.invoiceNumber || "Faturasız"}</span>
              </td>
              <td className="py-3 px-2">
                <span
                  className={"px-2.5 py-1 rounded-full text-[10px] font-bold " +
                    (t.type === "INCOME"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : t.type === "EXPENSE"
                      ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300")
                  }
                >
                  {t.type === "INCOME" ? "Gelir +" : t.type === "EXPENSE" ? "Gider -" : "İade"}
                </span>
              </td>
              <td className="py-3 px-2 text-slate-500 font-semibold text-[10px] uppercase">{t.category}</td>
              <td className={"py-3 px-2 font-serif font-bold " + (t.type === "INCOME" ? "text-emerald-600" : "text-rose-600")}>
                {t.type === "INCOME" ? "+" : "-"}{t.amount.toLocaleString("tr-TR")} ₺
              </td>
              <td className="py-3 px-2 text-slate-500">{t.dueDate}</td>
              <td className="py-3 px-2 text-right">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {t.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
