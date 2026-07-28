"use client";

import React from "react";

export default function AuditLogsTable({
  logs,
}: {
  logs: any[];
}) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          📜 Değiştirilemez Kriptografik Denetim İzleri (Audit Logs - {logs.length} Kayıt)
        </span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">Aktör / Eylem Türü</th>
            <th className="py-3 px-2">Zaman Damgası</th>
            <th className="py-3 px-2">IP Adresi</th>
            <th className="py-3 px-2">SHA-256 Hash İzi</th>
            <th className="py-3 px-2 text-right">Doğrulama</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {logs.map((l) => (
            <tr key={l.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                {l.actionType}
                <span className="block text-[10px] text-indigo-600 font-normal">{l.actorName} ({l.actorRole})</span>
              </td>
              <td className="py-3 px-2 text-slate-500 font-mono">{l.timestamp}</td>
              <td className="py-3 px-2 font-mono text-slate-600 dark:text-slate-300">{l.ipAddress}</td>
              <td className="py-3 px-2 font-mono text-[10px] text-slate-400 truncate max-w-[140px] select-all">
                {l.hashChain}
              </td>
              <td className="py-3 px-2 text-right">
                <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-mono">
                  ✓ VERIFIED
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
