"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIChecklistInsightsCard({ score }: { score: number }) {
  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-rose-500/10 via-white/80 to-amber-500/10 dark:from-rose-950/30 dark:via-slate-900/80 dark:to-amber-950/20 border border-rose-200/50 dark:border-rose-900/40 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          ✦ AI Checklist Progress Score
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          %86 Hazırlık
        </span>
      </div>

      <div className="flex items-baseline gap-3">
        <span className="text-5xl font-serif font-bold text-slate-900 dark:text-slate-100">{score}</span>
        <span className="text-sm text-slate-400">/ 100 Skoru</span>
      </div>

      <div className="p-3 rounded-2xl bg-white/60 dark:bg-slate-800/40 text-xs text-slate-700 dark:text-slate-300 border border-rose-100 dark:border-rose-900/30 space-y-1">
        <p>💡 <span className="font-semibold text-rose-600">AI Risk Tespiti:</span> Nikah işlemleri için gerekli resmi evrakların teslimine <span className="font-bold">12 gün kaldı</span>.</p>
        <p className="text-[11px] text-slate-400">Partneriniz Kaan'a atanan "Gelinlik/Damatlık Aksesuar Seçimi" bekleniyor.</p>
      </div>
    </motion.div>
  );
}
