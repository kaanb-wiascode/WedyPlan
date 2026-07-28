"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIMultimodalAnalyticsWidget({ aiReport }: { aiReport: any }) {
  if (!aiReport) return null;

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-fuchsia-500/10 via-white/80 to-indigo-500/10 dark:from-fuchsia-950/30 dark:via-slate-900/80 dark:to-indigo-950/20 border border-fuchsia-200/50 dark:border-fuchsia-900/40 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-700 dark:text-fuchsia-400">
          ✦ AI Cross-Modal Vision & Document Extraction Radar
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-950 dark:text-fuchsia-300">
          Engine: Aktif
        </span>
      </div>

      <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-fuchsia-100 dark:border-fuchsia-900/40 space-y-1">
        <span className="text-[10px] text-slate-400 font-bold uppercase block">📊 AI Multimodal İstihbarat Raporu</span>
        <p className="text-slate-800 dark:text-slate-100 leading-relaxed text-[11px] font-medium">{aiReport.aiAnalysis}</p>
      </div>

      <div className="p-3 rounded-2xl bg-fuchsia-50 dark:bg-fuchsia-950/40 border border-fuchsia-200/50 text-fuchsia-900 dark:text-fuchsia-200 font-semibold">
        💡 <strong>Portfolyo Önerisi:</strong> {aiReport.topRecommendation}
      </div>
    </motion.div>
  );
}
