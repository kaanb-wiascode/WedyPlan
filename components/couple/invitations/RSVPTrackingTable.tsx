"use client";

import React from "react";

export default function RSVPTrackingTable({ guests }: { guests: any[] }) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          📋 Konuk LCV & Menü Tercih Ledger ({guests.length} Davetli)
        </span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">Konuk İsim</th>
            <th className="py-3 px-2">Refakatçi (+1)</th>
            <th className="py-3 px-2">LCV Durumu</th>
            <th className="py-3 px-2">Menü Tercihi</th>
            <th className="py-3 px-2">Alerjen / Özel Not</th>
            <th className="py-3 px-2">Giriş QR</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {guests.map((g) => (
            <tr key={g.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                {g.name}
                <span className="block text-[10px] text-slate-400 font-normal">{g.phone || g.email}</span>
              </td>
              <td className="py-3 px-2 text-slate-500">
                {g.plusOne ? "✓ " + g.plusOneName : "Tek Katılım"}
              </td>
              <td className="py-3 px-2">
                <span
                  className={"px-2 py-0.5 rounded-full text-[10px] font-bold " +
                    (g.status === "CONFIRMED"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : g.status === "PENDING"
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                      : "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300")
                  }
                >
                  {g.status === "CONFIRMED" ? "✓ Katılıyor" : g.status === "PENDING" ? "Bekliyor" : "Katılamıyor"}
                </span>
              </td>
              <td className="py-3 px-2 font-semibold text-slate-700 dark:text-slate-200">{g.mealPreference}</td>
              <td className="py-3 px-2 text-slate-400">{g.dietaryNotes || "-"}</td>
              <td className="py-3 px-2">
                {g.status === "CONFIRMED" ? (
                  <span className="font-mono text-[10px] text-indigo-600 font-bold bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-md">
                    {g.checkInCode}
                  </span>
                ) : (
                  <span className="text-slate-300">-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
