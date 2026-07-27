"use client";

import React from "react";
import { motion } from "framer-motion";

export default function InsightsHeader({
  readinessScore,
  successProbability,
  stressIndex,
}: {
  readinessScore: number;
  successProbability: number;
  stressIndex: string;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
              ✦ Executive Intelligence Engine
            </span>
            <span className="text-xs text-slate-400">Canlı Düğün Karar & Risk Paneli</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">AI Wedding Insights</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-rose-600 font-medium uppercase">Düğün Hazırlık Skoru</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">%{readinessScore} Hazır</div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
            <div className="bg-gradient-to-r from-rose-500 to-amber-500 h-full rounded-full" style={{ width: readinessScore + "%" }} />
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Kusursuz Akış Olasılığı</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600">%{successProbability} Yüksek</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">AI Simülasyon Sonucu</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Bilişsel Stres Seviyesi</span>
          <div className="text-2xl font-bold mt-1 text-indigo-600">{stressIndex} (%24)</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Süreç Tam Kontrol Altında</span>
        </motion.div>
      </div>
    </div>
  );
}
