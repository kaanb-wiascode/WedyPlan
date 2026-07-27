"use client";

import React from "react";

export default function GuestTableList({ guests }: { guests: any[] }) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          📋 Konuk Listesi & LCV Detayları ({guests.length})
        </span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">Konuk</th>
            <th className="py-3 px-2">Kategori</th>
            <th className="py-3 px-2">LCV Durumu</th>
            <th className="py-3 px-2">Masa</th>
            <th className="py-3 px-2">Beslenme / Diyet</th>
            <th className="py-3 px-2">Olasılık</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {guests.map((g) => (
            <tr key={g.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                {g.firstName} {g.lastName}
              </td>
              <td className="py-3 px-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-100 dark:bg-slate-800 font-semibold">
                  {g.category}
                </span>
              </td>
              <td className="py-3 px-2">
                <span
                  className={"px-2 py-0.5 rounded-full text-[10px] font-bold " +
                    (g.rsvpStatus === "CONFIRMED"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : g.rsvpStatus === "DECLINED"
                      ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300")
                  }
                >
                  {g.rsvpStatus === "CONFIRMED" ? "Katılıyor" : g.rsvpStatus === "DECLINED" ? "Katılamıyor" : "Bekliyor"}
                </span>
              </td>
              <td className="py-3 px-2 text-slate-500">{g.tableName}</td>
              <td className="py-3 px-2">
                {g.dietaryPreference !== "NONE" ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-purple-100 text-purple-700 font-bold">
                    {g.dietaryPreference}
                  </span>
                ) : (
                  <span className="text-slate-400">-</span>
                )}
              </td>
              <td className="py-3 px-2 font-mono font-bold text-purple-600">{g.attendanceProbability}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
