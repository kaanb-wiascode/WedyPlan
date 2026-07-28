"use client";

import React from "react";
import { motion } from "framer-motion";

export default function StressTestingHeader({
  breakingPointRps,
  breakingPointVu,
  recoverySeconds,
  selfHealingScore,
  onOpenGeneratorModal,
}: {
  breakingPointRps: number;
  breakingPointVu: number;
  recoverySeconds: number;
  selfHealingScore: number;
  onOpenGeneratorModal: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
              ✦ WedyPlan Shared Enterprise Breaking Point & Stress Testing Platform
            </span>
            <span className="text-xs text-slate-400">Breaking Points, Storm Generator, Self-Healing & Capacity Scaling</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Stress Testing Platform</h1>
        </div>

        <button
          onClick={onOpenGeneratorModal}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-600 via-orange-600 to-indigo-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          ⚡ Yeni Stres Fırtınası Tetikle
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-rose-600 font-medium uppercase">Kırılma Noktası (Breaking RPS)</span>
          <div className="text-2xl font-bold mt-1 text-rose-600 flex items-center gap-2">
            <span>{breakingPointRps.toLocaleString()} RPS</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Sistem Yıkım Eşiği</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-amber-600 font-medium uppercase">Maksimum Dayanım Kullanıcı</span>
          <div className="text-2xl font-serif font-bold mt-1 text-slate-900 dark:text-slate-100">{breakingPointVu.toLocaleString()} VU</div>
          <span className="text-[11px] text-amber-600 font-bold block mt-0.5">Extreme Traffic Capacity</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-teal-600 font-medium uppercase">Otonom Toparlanma Süresi</span>
          <div className="text-2xl font-mono font-bold mt-1 text-teal-600">{recoverySeconds} Saniye</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Self-Healing Recovery Speed</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">Self-Healing Skoru</span>
          <div className="text-2xl font-mono font-bold mt-1 text-purple-600">%{selfHealingScore}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Auto Recovery Verified</span>
        </motion.div>
      </div>
    </div>
  );
}
