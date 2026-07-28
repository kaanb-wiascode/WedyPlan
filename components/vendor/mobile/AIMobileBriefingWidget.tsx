"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIMobileBriefingWidget({ briefing }: { briefing: any }) {
  if (!briefing) return null;

  return (
    <motion.div whileHover={{ scale: 1.01 }} className="p-5 backdrop-blur-2xl bg-gradient-to-br from-rose-500/10 via-white/80 to-purple-500/10 dark:from-rose-950/30 dark:via-slate-900/80 dark:to-purple-950/20 border border-rose-200/50 dark:border-rose-900/40 rounded-3xl shadow-sm space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          ✦ AI Field Briefing (Saha Özeti)
        </span>
        <button
          onClick={() => alert("🎧 Sesli Brifing Çalınıyor...")}
          className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-600 text-white flex items-center gap-1"
        >
          ▶ Sesli Dinle
        </button>
      </div>

      <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{briefing.greeting}</p>

      <div className="p-2.5 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-rose-100 dark:border-rose-900/40 text-[11px] font-medium text-slate-700 dark:text-slate-300">
        {briefing.weatherAlert}
      </div>

      <div className="space-y-1.5 text-xs">
        <span className="text-[10px] text-slate-400 font-bold uppercase block">📌 Bugünün Saha Zaman Tüneli</span>
        {briefing.urgentTasks?.map((task: string, i: number) => (
          <div key={i} className="p-2 rounded-xl bg-white dark:bg-slate-800 border text-[11px] font-semibold text-slate-800 dark:text-slate-200">
            ⚡ {task}
          </div>
        ))}
      </div>

      <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/50 text-[11px] text-indigo-900 dark:text-indigo-200 font-semibold">
        💡 <strong>AI Saha Önerisi:</strong> {briefing.aiPrioritySuggestion}
      </div>
    </motion.div>
  );
}
