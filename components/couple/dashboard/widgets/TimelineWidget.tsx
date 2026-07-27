"use client";

import React from "react";
import { motion } from "framer-motion";

export default function TimelineWidget() {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="h-full backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between"
    >
      <span className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-3 block">
        Yaklaşan Zaman Çizelgesi
      </span>
      <div className="space-y-2 text-xs">
        <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 font-medium">
          15 Mart — Mekan Tadım Etkinliği
        </div>
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-300">
          02 Nisan — Davetiye Basım Onayı
        </div>
      </div>
    </motion.div>
  );
}