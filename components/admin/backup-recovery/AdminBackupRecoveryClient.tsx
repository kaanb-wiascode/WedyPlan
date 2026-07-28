"use client";

import React, { useState } from "react";
import RestoreManagerDrawer, { RestoreSnapshot } from "./RestoreManagerDrawer";

export default function AdminBackupRecoveryClient() {
  const [selectedSnapshot, setSelectedSnapshot] = useState<RestoreSnapshot | null>({
    id: "snap_2026_07_prod_daily",
    title: "Günlük Otomatik Üretim Yedeği",
    createdAt: "2026-07-28 02:00:00",
    sizeMb: 1420,
  });

  const [isRestoreDrawerOpen, setIsRestoreDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-6 text-xs">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-serif">Veritabanı Yedekleme & Kurtarma (Backup & Recovery)</h1>
          <p className="text-slate-400">Otomatik Anlık Görüntüler (Snapshots) ve Afet Kurtarma Senaryoları</p>
        </div>

        <button
          onClick={() => setIsRestoreDrawerOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition"
        >
          🔄 Manuel Geri Yükleme Masasını Aç
        </button>
      </div>

      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <h2 className="font-bold text-sm">Aktif Snapshot Bilgisi</h2>
        {selectedSnapshot && (
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 flex justify-between items-center font-mono">
            <div>
              <span className="font-bold text-indigo-600 block">{selectedSnapshot.title}</span>
              <span className="text-[10px] text-slate-400">ID: {selectedSnapshot.id} | Tarih: {selectedSnapshot.createdAt}</span>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px]">
              Boyut: {selectedSnapshot.sizeMb} MB
            </span>
          </div>
        )}
      </div>

      <RestoreManagerDrawer
        snapshot={selectedSnapshot}
        isOpen={isRestoreDrawerOpen}
        onClose={() => setIsRestoreDrawerOpen(false)}
      />
    </div>
  );
}