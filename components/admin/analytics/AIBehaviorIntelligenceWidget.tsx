"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIBehaviorIntelligenceWidget({ aiReport }: { aiReport: any }) {
  if (!aiReport) return null;

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-indigo-500/10 via-white/80 to-purple-500/10 dark:from-indigo-950/30 dark:via-slate-900/80 dark:to-purple-950/20 border border-indigo-200/50 dark:border-indigo-900/40 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
          ✦ AI Behavior & Drop-Off Diagnostics
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          UX Sağlık: %{aiReport.uxHealthScore}
        </span>
      </div>

      {/* En Yüksek Terk Adımı */}
      <div className="p-3.5 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200/50 space-y-1">
        <span className="text-[10px] text-rose-600 font-bold uppercase block">🚨 En Yüksek Terk Yaşanan Sayfa / Adım (Drop-Off)</span>
        <p className="text-rose-900 dark:text-rose-200 text-[11px] font-medium leading-relaxed">
          {aiReport.topDropOffStep}
        </p>
      </div>

      <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-indigo-100 dark:border-indigo-900/40 space-y-1">
        <span className="text-[10px] text-slate-400 font-bold uppercase block">📝 AI Kullanıcı Davranış Tespiti</span>
        <p className="text-slate-800 dark:text-slate-100 leading-relaxed text-[11px] font-medium">{aiReport.aiAnalysis}</p>
      </div>

      <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/50 text-purple-900 dark:text-purple-200 font-semibold">
        💡 <strong>AI Yolculuk Optimizasyon Önerisi:</strong> {aiReport.journeyOptimizationRecommendation}
      </div>
    </motion.div>
  );
}
