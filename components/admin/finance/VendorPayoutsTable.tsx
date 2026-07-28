"use client";

import React from "react";

export default function VendorPayoutsTable({
  payouts,
  onProcessPayout,
}: {
  payouts: any[];
  onProcessPayout: (payoutId: string, vendorId: string, amount: number, action: any) => void;
}) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          💸 Tedarikçi Escrow Hakediş & Transfer Listesi ({payouts.length} Kayıt)
        </span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">Hakediş ID / Tedarikçi</th>
            <th className="py-3 px-2">Düğün Detayı</th>
            <th className="py-3 px-2">Brüt / Komisyon</th>
            <th className="py-3 px-2">Net Ödenecek</th>
            <th className="py-3 px-2">Escrow Durumu</th>
            <th className="py-3 px-2 text-right">İşlem</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {payouts.map((p) => (
            <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                {p.vendorName}
                <span className="block text-[10px] text-slate-400 font-mono font-normal">{p.id} • IBAN: {p.maskedIban}</span>
              </td>
              <td className="py-3 px-2 text-slate-600 dark:text-slate-300">
                {p.weddingEvent}
                <span className="block text-[10px] text-slate-400 font-normal">{p.weddingDate}</span>
              </td>
              <td className="py-3 px-2 font-mono text-slate-600 dark:text-slate-300">
                {p.grossAmount.toLocaleString("tr-TR")} ₺
                <span className="block text-[10px] text-indigo-600 font-bold">-%{p.commissionPercentage} Kesinti</span>
              </td>
              <td className="py-3 px-2 font-serif font-bold text-emerald-600 text-sm">
                {p.netAmount.toLocaleString("tr-TR")} ₺
              </td>
              <td className="py-3 px-2">
                <span
                  className={"px-2.5 py-1 rounded-full text-[10px] font-bold " +
                    (p.status === "RELEASED"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : p.status === "PENDING_ESCROW"
                      ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300")
                  }
                >
                  {p.status === "RELEASED" ? "✓ Aktarıldı" : p.status === "PENDING_ESCROW" ? "● Escrow Onayda" : "⚠️ Disputelu (Bloke)"}
                </span>
              </td>
              <td className="py-3 px-2 text-right space-x-2">
                {p.status === "PENDING_ESCROW" && (
                  <button
                    onClick={() => onProcessPayout(p.id, p.vendorId, p.netAmount, "RELEASE")}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition text-[10px]"
                  >
                    Aktar ✨
                  </button>
                )}
                {p.status === "RELEASED" && (
                  <button
                    onClick={() => alert("📄 Dekont PDF İndiriliyor...")}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200 transition text-[10px]"
                  >
                    Dekont 📥
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
