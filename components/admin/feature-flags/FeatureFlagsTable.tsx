"use client";

import React from "react";

export default function FeatureFlagsTable({
  flags,
  onSelectFlag,
  onTriggerKillSwitch,
}: {
  flags: any[];
  onSelectFlag: (flag: any) => void;
  onTriggerKillSwitch: (flagKey: string) => void;
}) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          🚩 Canlı Özellik Bayrakları & Kademeli Yayınlar ({flags.length} Bayrak)
        </span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">Bayrak Adı / Key</th>
            <th className="py-3 px-2">Ortam</th>
            <th className="py-3 px-2">Yüzdelik Yayın (Rollout)</th>
            <th className="py-3 px-2">Durum</th>
            <th className="py-3 px-2 text-right">Aksiyonlar</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {flags.map((f) => (
            <tr key={f.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                {f.name}
                <span className="block text-[10px] text-slate-400 font-mono font-normal">key: {f.flagKey}</span>
              </td>
              <td className="py-3 px-2 font-mono font-bold text-indigo-600 text-[10px]">{f.environment}</td>
              <td className="py-3 px-2 font-mono font-bold text-purple-600">
                %{f.rolloutPercentage} Kullanıcı
              </td>
              <td className="py-3 px-2">
                {f.isKillSwitched ? (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-600 text-white animate-pulse">
                    🚨 KILL SWITCHED
                  </span>
                ) : (
                  <span
                    className={"px-2.5 py-1 rounded-full text-[10px] font-bold " +
                      (f.status === "ENABLED"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                        : f.status === "EXPERIMENT_ACTIVE"
                        ? "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
                        : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300")
                    }
                  >
                    {f.status === "ENABLED" ? "● Aktif" : f.status === "EXPERIMENT_ACTIVE" ? "🧪 Deneyde" : "Devre Dışı"}
                  </span>
                )}
              </td>
              <td className="py-3 px-2 text-right space-x-2">
                <button
                  onClick={() => onSelectFlag(f)}
                  className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 font-bold hover:bg-indigo-100 transition text-[10px]"
                >
                  360° Hedefle
                </button>

                {!f.isKillSwitched && (
                  <button
                    onClick={() => onTriggerKillSwitch(f.flagKey)}
                    className="px-2 py-1 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-bold hover:bg-rose-200 transition text-[10px]"
                  >
                    🚨 ACİL KAPAT
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
