"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIOpsAnalyticsWidget({ aiReport }: { aiReport: any }) {
  if (!aiReport) return null;

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-purple-500/10 via-white/80 to-indigo-500/10 dark:from-purple-950/30 dark:via-slate-900/80 dark:to-indigo-950/20 border border-purple-200/50 dark:border-purple-900/40 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400">
          ✦ AI Cost & Model Intelligence Radar
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          Fallback Router: Aktif
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-purple-100 dark:border-purple-900/40">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">⚡ Indekslenen Vektör Düğümü</span>
          <span className="font-mono font-bold text-indigo-600 text-xs">{aiReport.vectorStoreIndexedItems}</span>
        </div>

        <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-purple-100 dark:border-purple-900/40">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">🛡️ Kesintisiz Çalışma (Failover)</span>
          <span className="font-bold text-emerald-600 text-xs">0 Kesinti (%100 Uptime)</span>
        </div>
      </div>

      <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-purple-100 dark:border-purple-900/40 space-y-1">
        <span className="text-[10px] text-slate-400 font-bold uppercase block">📝 AI LLMOps Denetim Özeti</span>
        <p className="text-slate-800 dark:text-slate-100 leading-relaxed text-[11px] font-medium">{aiReport.aiAnalysis}</p>
      </div>

      <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/50 text-purple-900 dark:text-purple-200 font-semibold">
        💡 <strong>Maliyet Optimizasyonu Önerisi:</strong> {aiReport.costOptimizationRecommendation}
      </div>
    </motion.div>
  );
}
