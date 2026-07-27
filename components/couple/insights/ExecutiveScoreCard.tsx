"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ExecutiveScoreCard({
  nextBestAction,
  onCompleteAction,
}: {
  nextBestAction: any;
  onCompleteAction: () => void;
}) {
  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-rose-500/10 via-white/80 to-amber-500/10 dark:from-rose-950/30 dark:via-slate-900/80 dark:to-amber-950/20 border border-rose-200/50 dark:border-rose-900/40 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          ✦ AI Next Best Action (Sıradaki En Önemli Adım)
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
          Öncelikli
        </span>
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-slate-100">{nextBestAction.title}</h3>
        <p className="text-xs text-slate-500 leading-relaxed">{nextBestAction.impact}</p>
        <span className="text-[11px] text-rose-600 font-semibold block pt-1">Hedef Tarih: {nextBestAction.deadline}</span>
      </div>

      <button
        onClick={onCompleteAction}
        className="w-full py-3 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs hover:opacity-90 transition shadow-md"
      >
        ✓ Bu Adımı Tamamla & Skoru Yükselt
      </button>
    </motion.div>
  );
}
