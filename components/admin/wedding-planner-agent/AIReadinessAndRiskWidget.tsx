"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIReadinessAndRiskWidget({ aiReport }: { aiReport: any }) {
  if (!aiReport) return null;

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-pink-500/10 via-white/80 to-purple-500/10 dark:from-pink-950/30 dark:via-slate-900/80 dark:to-purple-950/20 border border-pink-200/50 dark:border-pink-900/40 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-pink-700 dark:text-pink-400">
          ✦ AI Wedding Readiness & Action Plan Engine
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          Hazırlık: %{aiReport.weddingReadinessScore}
        </span>
      </div>

      {/* Günlük, Haftalık, Aylık Plan */}
      <div className="grid grid-cols-1 gap-2">
        <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-pink-100 dark:border-pink-900/40">
          <span className="text-[10px] text-pink-600 font-bold uppercase block">📅 Günlük Eylem Planı</span>
          <p className="text-slate-800 dark:text-slate-100 font-medium text-[11px]">{aiReport.dailyPlan}</p>
        </div>

        <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-purple-100 dark:border-purple-900/40">
          <span className="text-[10px] text-purple-600 font-bold uppercase block">📆 Haftalık Eylem Planı</span>
          <p className="text-slate-800 dark:text-slate-100 font-medium text-[11px]">{aiReport.weeklyPlan}</p>
        </div>
      </div>

      {/* Risk Uyarısı */}
      <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/50 text-amber-900 dark:text-amber-200 font-semibold">
        ⚠️ <strong>AI Erken Uyarı:</strong> {aiReport.riskAlerts[0]}
      </div>
    </motion.div>
  );
}
