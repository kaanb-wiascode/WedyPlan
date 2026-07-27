"use client";

import React from "react";
import { motion } from "framer-motion";

export default function CalendarWidget() {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="h-full backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between"
    >
      <span className="text-xs font-medium uppercase tracking-wider text-slate-400 block mb-2">
        Planlama Takvimi
      </span>
      <p className="text-xs text-slate-500">Bu ay içinde 3 görüşmeniz planlandı.</p>
    </motion.div>
  );
}