"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIHealthScoreCard({ healthScore, currency }: { healthScore: number; currency: string }) {
  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-indigo-500/10 via-white/80 to-purple-500/10 dark:from-indigo-950/30 dark:via-slate-900/80 dark:to-purple-950/20 border border-indigo-200/50 dark:border-indigo-900/40 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          ✦ AI Budget Health Score
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          Mükemmel
        </span>
      </div>

      <div className="flex items-baseline gap-3">
        <span className="text-5xl font-serif font-bold text-slate-900 dark:text-slate-100">{healthScore}</span>
        <span className="text-sm text-slate-400">/ 100</span>
      </div>

      <div className="w-full bg-slate-200/60 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
        <motion.div
          className="bg-gradient-to-r from-emerald-500 to-indigo-500 h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: healthScore + "%" }}
          transition={{ duration: 1 }}
        />
      </div>

      <div className="space-y-2 pt-2 border-t border-indigo-100 dark:border-indigo-900/40 text-xs">
        <div className="p-2.5 rounded-xl bg-white/60 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300">
          💡 <span className="font-semibold text-indigo-600 dark:text-indigo-400">Tasarruf Fırsatı:</span> Fotoğraf & Video kategorisindeki %11 bütçe aşımı, Dekorasyon alanındaki tasarrufla dengelendi.
        </div>
      </div>
    </motion.div>
  );
}
