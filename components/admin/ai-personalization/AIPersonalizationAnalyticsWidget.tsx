"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIPersonalizationAnalyticsWidget({ aiReport }: { aiReport: any }) {
  if (!aiReport) return null;

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-rose-500/10 via-white/80 to-purple-500/10 dark:from-rose-950/30 dark:via-slate-900/80 dark:to-purple-950/20 border border-rose-200/50 dark:border-rose-900/40 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
          ✦ AI Omnichannel Personalization Intelligence
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
          Engine: Aktif
        </span>
      </div>

      <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-rose-100 dark:border-rose-900/40 space-y-1">
        <span className="text-[10px] text-slate-400 font-bold uppercase block">📊 AI Kişiselleştirme İstihbarat Analizi</span>
        <p className="text-slate-800 dark:text-slate-100 leading-relaxed text-[11px] font-medium">{aiReport.aiAnalysis}</p>
      </div>

      <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/50 text-rose-900 dark:text-rose-200 font-semibold">
        💡 <strong>Bildirim Stratejisi:</strong> {aiReport.topRecommendation}
      </div>
    </motion.div>
  );
}
