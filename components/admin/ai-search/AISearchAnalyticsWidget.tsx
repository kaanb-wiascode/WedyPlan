"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AISearchAnalyticsWidget({ aiReport }: { aiReport: any }) {
  if (!aiReport) return null;

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-sky-500/10 via-white/80 to-purple-500/10 dark:from-sky-950/30 dark:via-slate-900/80 dark:to-purple-950/20 border border-sky-200/50 dark:border-sky-900/40 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-400">
          ✦ AI Intent & Vector Search Analytics
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
          Engine: Aktif
        </span>
      </div>

      <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-sky-100 dark:border-sky-900/40 space-y-1">
        <span className="text-[10px] text-slate-400 font-bold uppercase block">📊 AI Arama Motoru İstihbarat Raporu</span>
        <p className="text-slate-800 dark:text-slate-100 leading-relaxed text-[11px] font-medium">{aiReport.aiAnalysis}</p>
      </div>

      <div className="p-3 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200/50 text-sky-900 dark:text-sky-200 font-semibold">
        💡 <strong>Kategori Önerisi:</strong> {aiReport.topRecommendation}
      </div>
    </motion.div>
  );
}
