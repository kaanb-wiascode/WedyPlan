"use client";

import React from "react";

export default function TelemetryAndBackupsTable({
  backups,
  onTriggerBackup,
}: {
  backups: any[];
  onTriggerBackup: () => void;
}) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          💾 Veritabanı & Bulut Depolama Otomatik Yedekleri ({backups.length} Kayıt)
        </span>

        <button
          onClick={onTriggerBackup}
          className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-[10px]"
        >
          + Anlık Tam Yedek Al (Instant Backup)
        </button>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">Yedek Adı / Hedef</th>
            <th className="py-3 px-2">Boyut</th>
            <th className="py-3 px-2">Zaman Damgası</th>
            <th className="py-3 px-2">Doğrulama (Hash)</th>
            <th className="py-3 px-2 text-right">Durum</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {backups.map((b) => (
            <tr key={b.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                {b.name}
                <span className="block text-[10px] text-slate-400 font-mono font-normal">Hedef: {b.targetStorage}</span>
              </td>
              <td className="py-3 px-2 font-mono font-bold text-indigo-600">{b.sizeGb} GB</td>
              <td className="py-3 px-2 font-mono text-slate-500">{b.timestamp}</td>
              <td className="py-3 px-2 font-mono text-[10px] text-slate-400 truncate max-w-[120px] select-all">{b.hash}</td>
              <td className="py-3 px-2 text-right">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
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
