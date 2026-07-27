"use client";

import React from "react";
import { motion } from "framer-motion";

export default function WeatherWidget({ date, city, temp, condition }: { date: string; city: string; temp: string; condition: string }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="h-full backdrop-blur-2xl bg-gradient-to-br from-amber-500/10 via-white/80 to-sky-500/10 dark:from-amber-950/20 dark:via-slate-900/80 dark:to-sky-950/20 border border-white/60 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between"
    >
      <div className="flex justify-between items-start">
        <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Düğün Günü Tahmini</span>
        <span className="text-2xl">☀️</span>
      </div>

      <div className="my-2">
        <div className="text-3xl font-bold tracking-tight">{temp}</div>
        <div className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-1">{condition}</div>
      </div>

      <div className="text-[11px] text-slate-400 flex justify-between items-center">
        <span>📍 {city}</span>
        <span>{date}</span>
      </div>
    </motion.div>
  );
}