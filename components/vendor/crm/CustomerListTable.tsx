"use client";

import React from "react";

export default function CustomerListTable({
  customers,
  onSelectCustomer,
}: {
  customers: any[];
  onSelectCustomer: (customer: any) => void;
}) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          📋 Müşteri Veritabanı ({customers.length} Kayıt)
        </span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">Çift İsimleri / İletişim</th>
            <th className="py-3 px-2">Düğün Tarihi & Konum</th>
            <th className="py-3 px-2">Anlaşma Bütçesi</th>
            <th className="py-3 px-2">Segment</th>
            <th className="py-3 px-2">Sağlık Skoru</th>
            <th className="py-3 px-2 text-right">İşlem</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {customers.map((c) => (
            <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                {c.coupleName}
                <span className="block text-[10px] text-slate-400 font-normal">{c.phone}</span>
              </td>
              <td className="py-3 px-2 text-slate-600 dark:text-slate-300">
                {c.weddingDate}
                <span className="block text-[10px] text-slate-400">{c.location}</span>
              </td>
              <td className="py-3 px-2 font-serif font-bold text-indigo-600">
                {c.budget.toLocaleString("tr-TR")} ₺
              </td>
              <td className="py-3 px-2">
                <span
                  className={"px-2.5 py-1 rounded-full text-[10px] font-bold " +
                    (c.segment === "VIP"
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                      : c.segment === "ACTIVE_COUPLE"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : c.segment === "BLACK_LIST"
                      ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                      : "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300")
                  }
                >
                  {c.segment}
                </span>
              </td>
              <td className="py-3 px-2 font-bold text-emerald-600">%{c.healthScore || 95}</td>
              <td className="py-3 px-2 text-right">
                <button
                  onClick={() => onSelectCustomer(c)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[10px] font-bold hover:opacity-90 transition"
                >
                  360° Profil →
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
