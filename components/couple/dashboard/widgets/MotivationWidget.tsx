"use client";

import React from "react";
import { motion } from "framer-motion";

export default function MotivationWidget() {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="h-full backdrop-blur-2xl bg-gradient-to-br from-rose-500/10 to-amber-500/10 dark:from-rose-950/30 dark:to-amber-950/20 border border-white/60 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between"
    >
      <span className="text-xs font-medium uppercase tracking-wider text-rose-600 block mb-1">
        Günün Notu ✨
      </span>
      <p className="text-xs italic text-slate-700 dark:text-slate-300">
        "Mükemmel bir düğün, mükemmel detayların birleşimidir. Harika gidiyorsunuz!"
      </p>
    </motion.div>
  );
}