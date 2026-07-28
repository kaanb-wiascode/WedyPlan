"use client";

import React from "react";

export default function BackupSnapshotsTable({
  snapshots,
  onOpenRestoreDrawer,
}: {
  snapshots: any[];
  onOpenRestoreDrawer: (snapshot: any) => void;
}) {
  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          💾 Kayıtlı Sistem Anlık Görüntüleri (Snapshots - {snapshots.length} Kayıt)
        </span>
      </div>

      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-slate-200/60 dark:border-slate-800 text-slate-400 font-semibold uppercase">
            <th className="py-3 px-2">Snapshot Adı / Türü</th>
            <th className="py-3 px-2">Boyut</th>
            <th className="py-3 px-2">Konum</th>
            <th className="py-3 px-2">Şifreleme & Hash</th>
            <th className="py-3 px-2">Doğrulama</th>
            <th className="py-3 px-2 text-right">Aksiyonlar</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {snapshots.map((s) => (
            <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-100">
                {s.name}
                <span className="block text-[10px] text-slate-400 font-mono font-normal">{s.type} • {s.timestamp}</span>
              </td>
              <td className="py-3 px-2 font-mono font-bold text-indigo-600">{s.sizeGb} GB</td>
              <td className="py-3 px-2 text-slate-600 dark:text-slate-300 font-mono text-[10px]">{s.location}</td>
              <td className="py-3 px-2 font-mono text-[10px]">
                <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 font-bold block w-max mb-1">
                  AES-256
                </span>
                <span className="text-slate-400 truncate max-w-[100px] block select-all">{s.checksum}</span>
              </td>
              <td className="py-3 px-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  ✓ VERIFIED
                </span>
              </td>
              <td className="py-3 px-2 text-right">
                <button
                  onClick={() => onOpenRestoreDrawer(s)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold hover:opacity-90 transition text-[10px]"
                >
                  Geri Yükle (Restore) ↩️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
