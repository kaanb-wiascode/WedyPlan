"use client";

import React from "react";
import { motion } from "framer-motion";

export default function TimelineHeader({
  completedCount,
  totalCount,
  viewMode,
  setViewMode,
}: {
  completedCount: number;
  totalCount: number;
  viewMode: string;
  setViewMode: (v: string) => void;
}) {
  const percentage = Math.round((completedCount / totalCount) * 100) || 0;

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
              ✦ Timeline Engine
            </span>
            <span className="text-xs text-slate-400">Master Akış & Zaman Çizelgesi</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Wedding Timeline Engine</h1>
        </div>

        <div className="flex gap-2">
          <button className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium hover:bg-slate-50 transition flex items-center gap-1.5">
            📅 Takvim Senkronizasyonu (.ics)
          </button>
          <button className="px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-medium hover:opacity-90 transition">
            + Yeni Milat / Görev
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-slate-400 font-medium uppercase">Tamamlanma İlerlemesi</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">%{percentage}</div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-rose-500 h-full rounded-full" style={{ width: percentage + "%" }} />
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-slate-400 font-medium uppercase">Tamamlanan / Toplam</span>
          <div className="text-2xl font-bold mt-1">{completedCount} / {totalCount} Görev</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Zamanında İlerliyor</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-rose-600 font-medium uppercase">Kritik Son Tarih</span>
          <div className="text-2xl font-bold mt-1 text-rose-600">15 Gün Kaldı</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Fotoğrafçı Sözleşme Onayı</span>
        </motion.div>
      </div>

      <div className="flex gap-2 border-b border-slate-200/60 dark:border-slate-800 pb-2 overflow-x-auto">
        {["MASTER", "MONTHLY", "WEEKLY", "DAY_OF"].map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={"px-4 py-2 rounded-2xl text-xs font-semibold transition " +
              (viewMode === mode
                ? "bg-amber-500 text-white shadow-sm"
                : "bg-white dark:bg-slate-900 text-slate-500 border border-slate-200 dark:border-slate-800")
            }
          >
            {mode === "MASTER" ? "Master Timeline" : mode === "MONTHLY" ? "Aylık Görünüm" : mode === "WEEKLY" ? "Haftalık Akış" : "Düğün Günü (Saatlik)"}
          </button>
        ))}
      </div>
    </div>
  );
}
