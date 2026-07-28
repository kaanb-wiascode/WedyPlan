"use client";

import React from "react";

export default function ProposalListTable({ proposals }: { proposals: any[] }) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          📄 Gönderilen & Taslak Teklifler ({proposals.length})
        </span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">Çift / Teklif Başlığı</th>
            <th className="py-3 px-2">Toplam Tutar</th>
            <th className="py-3 px-2">Geçerlilik Tarihi</th>
            <th className="py-3 px-2">Durum</th>
            <th className="py-3 px-2">Revizyon</th>
            <th className="py-3 px-2 text-right">İşlem</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {proposals.map((p) => (
            <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                {p.coupleName}
                <span className="block text-[10px] text-slate-400 font-normal">{p.title}</span>
              </td>
              <td className="py-3 px-2 font-serif font-bold text-indigo-600">
                {p.totalPrice.toLocaleString("tr-TR")} ₺
              </td>
              <td className="py-3 px-2 text-slate-500">{p.expirationDate}</td>
              <td className="py-3 px-2">
                <span
                  className={"px-2.5 py-1 rounded-full text-[10px] font-bold " +
                    (p.status === "ACCEPTED"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : p.status === "SENT"
                      ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300")
                  }
                >
                  {p.status === "ACCEPTED" ? "✓ Onaylandı" : p.status === "SENT" ? "İnceleniyor" : "Taslak"}
                </span>
              </td>
              <td className="py-3 px-2 text-slate-400 font-mono text-[10px]">{p.version}</td>
              <td className="py-3 px-2 text-right">
                <button onClick={() => alert("🔍 Teklif Detay Modalı")} className="text-indigo-600 font-bold hover:underline">
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
