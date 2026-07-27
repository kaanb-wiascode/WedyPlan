"use client";

import React from "react";
import { motion } from "framer-motion";

export default function TaskProgressWidget({ completed, total }: { completed: number; total: number }) {
  const percentage = Math.round((completed / total) * 100);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="h-full backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between"
    >
      <div>
        <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Planlama İlerlemesi</span>
        <div className="flex items-baseline justify-between mt-2">
          <span className="text-3xl font-bold tracking-tight">{percentage}%</span>
          <span className="text-xs font-medium text-slate-500">{completed} / {total} Görev</span>
        </div>
      </div>

      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 my-4 overflow-hidden">
        <motion.div
          className="bg-gradient-to-r from-rose-500 to-amber-500 h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8 }}
        />
      </div>

      <span className="text-xs text-slate-400">Sonraki: Fotoğrafçı Görüşmesi</span>
    </motion.div>
  );
}