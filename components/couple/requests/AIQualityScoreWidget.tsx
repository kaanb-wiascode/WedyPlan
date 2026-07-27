"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIQualityScoreWidget({
  qualityScore,
  responseRate,
  suggestions,
}: {
  qualityScore: number;
  responseRate: number;
  suggestions: string[];
}) {
  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-rose-500/10 via-white/80 to-amber-500/10 dark:from-rose-950/30 dark:via-slate-900/80 dark:to-amber-950/20 border border-rose-200/50 dark:border-rose-900/40 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          ✦ AI Request Quality
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          %{qualityScore} Kalite
        </span>
      </div>

      <div>
        <span className="text-[10px] text-slate-400 uppercase font-semibold">Tahmini Yanıt Alma İhtimali</span>
        <div className="text-3xl font-serif font-bold text-slate-900 dark:text-slate-100 mt-0.5">%{responseRate}</div>
      </div>

      <div className="space-y-2 pt-2 border-t border-rose-100 dark:border-rose-900/40 text-xs">
        {suggestions.map((s, i) => (
          <div key={i} className="p-2.5 rounded-xl bg-white/60 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300">
            💡 {s}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
