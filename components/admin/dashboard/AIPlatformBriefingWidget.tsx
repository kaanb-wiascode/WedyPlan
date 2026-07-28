"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIPlatformBriefingWidget({ aiData }: { aiData: any }) {
  if (!aiData) return null;

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-rose-500/10 via-white/80 to-indigo-500/10 dark:from-rose-950/30 dark:via-slate-900/80 dark:to-indigo-950/20 border border-rose-200/50 dark:border-rose-900/40 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
          ✦ AI Executive Control Briefing
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          Platform Sağlık Skoru: %{aiData.businessHealthScore}
        </span>
      </div>

      {/* Yönetici Brifingi */}
      <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-rose-100 dark:border-rose-900/40 space-y-1 text-xs">
        <span className="text-[10px] text-slate-400 font-bold uppercase block">☀️ Otonom Platform Günlük Raporu</span>
        <p className="text-slate-800 dark:text-slate-100 leading-relaxed font-medium text-[11px]">{aiData.executiveBriefing}</p>
      </div>

      {/* Günün Risk ve Fırsatları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        <div className="p-3 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/50 text-amber-900 dark:text-amber-200">
          ⚠️ <strong>Günün Riski:</strong> {aiData.todaysRisks[0]}
        </div>

        <div className="p-3 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/50 text-emerald-900 dark:text-emerald-200">
          💡 <strong>Büyüme Fırsatı:</strong> {aiData.growthOpportunities[0]}
        </div>
      </div>
    </motion.div>
  );
}
