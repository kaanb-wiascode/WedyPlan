"use client";

import React from "react";

export default function WorkflowExecutionLogsTable({
  logs,
}: {
  logs: any[];
}) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          📜 Canlı Akış Çalışma Geçmişi (Execution Logs - {logs.length} Kayıt)
        </span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">Akış Adı / Tetikleyici</th>
            <th className="py-3 px-2">Zaman</th>
            <th className="py-3 px-2">Süre</th>
            <th className="py-3 px-2">Durum</th>
            <th className="py-3 px-2 text-right">Detay</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {logs.map((l) => (
            <tr key={l.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                {l.workflowName}
                <span className="block text-[10px] text-slate-400 font-mono font-normal">Tetikleyici: {l.trigger}</span>
              </td>
              <td className="py-3 px-2 text-slate-500 font-mono">{l.timestamp}</td>
              <td className="py-3 px-2 font-mono text-indigo-600 font-bold">{l.durationMs}ms</td>
              <td className="py-3 px-2">
                <span
                  className={"px-2.5 py-1 rounded-full text-[10px] font-bold " +
                    (l.status === "SUCCESS"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300")
                  }
                >
                  {l.status === "SUCCESS" ? "✓ PASSED" : "🚨 FAILED"}
                </span>
              </td>
              <td className="py-3 px-2 text-right">
                <button
                  onClick={() => alert("🔍 Akış Adımları Payload İncelemesi: " + l.id)}
                  className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200 transition text-[10px]"
                >
                  Payload 👁️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
