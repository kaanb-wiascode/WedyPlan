"use client";

import React from "react";

export default function PaymentTableList({
  payments,
  onPayNow,
}: {
  payments: any[];
  onPayNow: (payment: any) => void;
}) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          📋 Finansal Ödeme Ledger & Fatura Arşivi ({payments.length})
        </span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">Ödeme Başlığı / Tedarikçi</th>
            <th className="py-3 px-2">Kategori</th>
            <th className="py-3 px-2">Tutar</th>
            <th className="py-3 px-2">Vade Tarihi</th>
            <th className="py-3 px-2">Taksit</th>
            <th className="py-3 px-2">Durum</th>
            <th className="py-3 px-2 text-right">İşlem & Doküman</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {payments.map((p) => (
            <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                {p.title}
                <span className="block text-[10px] text-slate-400 font-normal">{p.vendorName}</span>
              </td>
              <td className="py-3 px-2 text-slate-500">{p.category}</td>
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                {p.amount.toLocaleString("tr-TR")} {p.currency}
              </td>
              <td className="py-3 px-2 text-slate-500">{p.dueDate}</td>
              <td className="py-3 px-2 font-mono text-slate-500">
                {p.isInstallment ? p.installmentNumber + "/" + p.totalInstallments : "Tek Çekim"}
              </td>
              <td className="py-3 px-2">
                <span
                  className={"px-2 py-0.5 rounded-full text-[10px] font-bold " +
                    (p.status === "PAID"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : p.status === "UPCOMING"
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                      : "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300")
                  }
                >
                  {p.status === "PAID" ? "✓ Ödendi" : p.status === "UPCOMING" ? "Bekliyor" : "Gecikmede"}
                </span>
              </td>
              <td className="py-3 px-2 text-right space-x-1">
                {p.status === "UPCOMING" ? (
                  <button
                    onClick={() => onPayNow(p)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[11px] font-semibold hover:opacity-90 transition"
                  >
                    Ödeme Yap →
                  </button>
                ) : (
                  <button
                    onClick={() => alert("📄 Fatura indiriliyor...")}
                    className="px-2.5 py-1 rounded-xl border border-slate-200 dark:border-slate-800 text-[10px] font-semibold hover:bg-slate-50 transition"
                  >
                    Fatura 📥
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
