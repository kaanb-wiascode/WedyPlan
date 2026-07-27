"use client";

import React from "react";
import { motion } from "framer-motion";

export default function VendorRecommendationsWidget() {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="h-full backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between"
    >
      <span className="text-xs font-medium uppercase tracking-wider text-slate-400 block mb-2">
        AI Önerilen Tedarikçiler
      </span>
      <p className="text-xs text-slate-500">Tarzınıza ve bütçenize uyan 4 yeni fotoğrafçı eşleşti.</p>
    </motion.div>
  );
}