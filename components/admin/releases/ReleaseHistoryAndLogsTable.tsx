"use client";

import React from "react";
import { executeImmediateRollbackAction } from "@/lib/actions/admin-releases";

export default function ReleaseHistoryAndLogsTable({
  releases,
}: {
  releases: any[];
}) {
  const handleRollback = async (releaseId: string) => {
    const res = await executeImmediateRollbackAction({
      targetReleaseId: releaseId,
      reason: "Yönetici paneli acil rollback butonundan tetiklendi.",
      forceImmediate: true,
    });

    if (res.success) {
      alert("🚨 " + res.message);
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          📜 Canlı Dağıtım Geçmişi & Rollback Masası ({releases.length} Sürüm)
        </span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">Versiyon / Commit</th>
            <th className="py-3 px-2">Ortam & Strateji</th>
            <th className="py-3 px-2">Mühendis</th>
            <th className="py-3 px-2">Zaman</th>
            <th className="py-3 px-2">Durum</th>
            <th className="py-3 px-2 text-right">Aksiyonlar</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {releases.map((r) => (
            <tr key={r.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                {r.versionTag}
                <span className="block text-[10px] text-slate-400 font-mono font-normal">commit: {r.commitHash}</span>
              </td>
              <td className="py-3 px-2 font-mono text-indigo-600 font-bold text-[10px]">
                {r.environment} ({r.strategy})
              </td>
              <td className="py-3 px-2 font-bold text-slate-700 dark:text-slate-300">{r.engineer}</td>
              <td className="py-3 px-2 text-slate-500 font-mono">{r.timestamp}</td>
              <td className="py-3 px-2">
                <span
                  className={"px-2.5 py-1 rounded-full text-[10px] font-bold " +
                    (r.status === "DEPLOYED"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300")
                  }
                >
                  {r.status === "DEPLOYED" ? "✓ DEPLOYED" : "ROLLED_BACK"}
                </span>
              </td>
              <td className="py-3 px-2 text-right">
                {r.status === "DEPLOYED" && (
                  <button
                    onClick={() => handleRollback(r.id)}
                    className="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-bold hover:bg-rose-700 transition text-[10px]"
                  >
                    Acil Rollback 🚨
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
