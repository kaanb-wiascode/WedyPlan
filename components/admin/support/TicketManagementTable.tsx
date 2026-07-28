"use client";

import React from "react";

export default function TicketManagementTable({
  tickets,
  onSelectTicket,
  onQuickResolve,
}: {
  tickets: any[];
  onSelectTicket: (ticket: any) => void;
  onQuickResolve: (ticketId: string) => void;
}) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          📋 Destek Talebi & İnceleme Kuyruğu ({tickets.length} Bilet)
        </span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">Bilet No / Konu</th>
            <th className="py-3 px-2">Talep Eden</th>
            <th className="py-3 px-2">Aciliyet / SLA</th>
            <th className="py-3 px-2">Durum</th>
            <th className="py-3 px-2 text-right">Aksiyonlar</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {tickets.map((t) => (
            <tr key={t.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                {t.subject}
                <span className="block text-[10px] text-slate-400 font-mono font-normal">{t.id} • {t.category}</span>
              </td>
              <td className="py-3 px-2 text-slate-600 dark:text-slate-300 font-medium">
                {t.requesterName}
                <span className="block text-[10px] text-indigo-600 font-bold">{t.requesterType}</span>
              </td>
              <td className="py-3 px-2">
                <span
                  className={"px-2 py-0.5 rounded text-[9px] font-bold " +
                    (t.priority === "URGENT_D_DAY"
                      ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 animate-pulse"
                      : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300")
                  }
                >
                  {t.priority === "URGENT_D_DAY" ? "🚨 D-DAY SAHA ACİL" : t.priority}
                </span>
                <span className="block text-[10px] font-mono text-amber-600 font-bold mt-0.5">SLA: {t.slaRemaining}</span>
              </td>
              <td className="py-3 px-2">
                <span
                  className={"px-2.5 py-1 rounded-full text-[10px] font-bold " +
                    (t.status === "RESOLVED"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : t.status === "ESCALATED"
                      ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                      : "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300")
                  }
                >
                  {t.status === "RESOLVED" ? "✓ Çözüldü" : t.status === "ESCALATED" ? "🔥 Escalated" : "● İşlemde"}
                </span>
              </td>
              <td className="py-3 px-2 text-right space-x-2">
                <button
                  onClick={() => onSelectTicket(t)}
                  className="px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-950 text-sky-600 font-bold hover:bg-sky-100 transition text-[10px]"
                >
                  Yanıtsız/İncele
                </button>
                <button
                  onClick={() => onQuickResolve(t.id)}
                  className="px-2 py-1 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition text-[10px]"
                >
                  Çözüldü ✓
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
