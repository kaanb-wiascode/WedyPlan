"use client";

import React from "react";

export default function TicketListTable({ tickets }: { tickets: any[] }) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          📋 Aktif & Geçmiş Destek Biletleri ({tickets.length} Bilet)
        </span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">Bilet No / Konu</th>
            <th className="py-3 px-2">Kategori</th>
            <th className="py-3 px-2">Öncelik</th>
            <th className="py-3 px-2">Durum</th>
            <th className="py-3 px-2 text-right">İşlem</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {tickets.map((t) => (
            <tr key={t.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                {t.subject}
                <span className="block text-[10px] text-slate-400 font-mono font-normal">{t.id} • {t.date}</span>
              </td>
              <td className="py-3 px-2 text-slate-500 font-semibold uppercase text-[10px]">{t.category}</td>
              <td className="py-3 px-2">
                <span
                  className={"px-2 py-0.5 rounded text-[9px] font-bold " +
                    (t.priority === "URGENT" || t.priority === "HIGH"
                      ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                      : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300")
                  }
                >
                  {t.priority}
                </span>
              </td>
              <td className="py-3 px-2">
                <span
                  className={"px-2.5 py-1 rounded-full text-[10px] font-bold " +
                    (t.status === "RESOLVED"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300")
                  }
                >
                  {t.status === "RESOLVED" ? "✓ Çözüldü" : "● İşlemde"}
                </span>
              </td>
              <td className="py-3 px-2 text-right">
                <button
                  onClick={() => alert("🔍 Bilet Detay & Sohbet Geçmişi")}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[10px] font-bold hover:opacity-90 transition"
                >
                  İncele →
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
