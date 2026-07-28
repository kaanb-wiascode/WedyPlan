"use client";

import React from "react";
import { motion } from "framer-motion";

export default function TimelineHeader({
  healthScore,
  activeTimelines,
  preventedDelays,
  avgHealth,
  onOpenReschedulerModal,
}: {
  healthScore: number;
  activeTimelines: number;
  preventedDelays: number;
  avgHealth: number;
  onOpenReschedulerModal: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              ✦ WedyPlan Shared AI Timeline & Delay Intelligence Engine
            </span>
            <span className="text-xs text-slate-400">Kritik Yol Analizi, Gecikme Önleme & Otomatik Yeniden Planlama</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Wedding Timeline Intelligence</h1>
        </div>

        <button
          onClick={onOpenReschedulerModal}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          ⚡ Otomatik Yeniden Planlayıcıyı (Auto-Rescheduler) Tetikle
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Zaman Çizelgesi Sağlık Skoru</span>
          <div className="text-2xl font-bold mt-1 text-indigo-600 flex items-center gap-2">
            <span>%{healthScore}</span>
            <span className="text-xs font-mono font-normal text-slate-400">Optimum Akış</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Sıfır Zaman Çakışması</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">Aktif Zaman Çizelgesi</span>
          <div className="text-2xl font-serif font-bold mt-1 text-slate-900 dark:text-slate-100">{activeTimelines} Akış</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ Real-time Sync Active</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Önlenen Gecikme Sayısı</span>
          <div className="text-2xl font-mono font-bold mt-1 text-emerald-600">{preventedDelays} Aksama</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Critical Path Tamponlaması</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-pink-600 font-medium uppercase">Ortalama Akış Başarısı</span>
          <div className="text-2xl font-mono font-bold mt-1 text-pink-600">%{avgHealth}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Yapay Zeka Destekli Düzeltme</span>
        </motion.div>
      </div>
    </div>
  );
}
