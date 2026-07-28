"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIVoiceAnalyticsWidget({ aiReport }: { aiReport: any }) {
  if (!aiReport) return null;

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-violet-500/10 via-white/80 to-indigo-500/10 dark:from-violet-950/30 dark:via-slate-900/80 dark:to-indigo-950/20 border border-violet-200/50 dark:border-violet-900/40 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-violet-700 dark:text-violet-400">
          ✦ AI Conversational Voice & Emotion Intelligence
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
          Voice: Aktif
        </span>
      </div>

      <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-violet-100 dark:border-violet-900/40 space-y-1">
        <span className="text-[10px] text-slate-400 font-bold uppercase block">📊 AI Ses İstihbarat Raporu</span>
        <p className="text-slate-800 dark:text-slate-100 leading-relaxed text-[11px] font-medium">{aiReport.aiAnalysis}</p>
      </div>

      <div className="p-3 rounded-2xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200/50 text-violet-900 dark:text-violet-200 font-semibold">
        💡 <strong>Toplantı Verimlilik Tavsiyesi:</strong> {aiReport.topRecommendation}
      </div>
    </motion.div>
  );
}
