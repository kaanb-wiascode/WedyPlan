"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIDailyBriefingWidget({ briefing }: { briefing: any }) {
  if (!briefing) return null;

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-rose-500/10 via-white/80 to-purple-500/10 dark:from-rose-950/30 dark:via-slate-900/80 dark:to-purple-950/20 border border-rose-200/50 dark:border-rose-900/40 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
          ✦ Otonom Günlük İş Brifingi ({briefing.date})
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
          Proaktif Öneri
        </span>
      </div>

      <div className="space-y-2 text-xs">
        <span className="text-[10px] text-rose-600 font-bold uppercase block">📌 Bugünün Öncelikli 2 Aksiyonu</span>
        {briefing.priorities?.map((p: string, i: number) => (
          <div key={i} className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-rose-100 dark:border-rose-900/40 text-slate-800 dark:text-slate-100 font-medium">
            ⚡ {p}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-rose-100 dark:border-rose-900/40">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">📈 Ciro Hedef Ulaşımı</span>
          <span className="font-bold text-emerald-600 text-[11px]">{briefing.revenuePrediction}</span>
        </div>

        <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-rose-100 dark:border-rose-900/40">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">🔍 Bölgesel Pazar Trendi</span>
          <span className="font-bold text-indigo-600 text-[11px]">{briefing.competitorInsight}</span>
        </div>
      </div>
    </motion.div>
  );
}
