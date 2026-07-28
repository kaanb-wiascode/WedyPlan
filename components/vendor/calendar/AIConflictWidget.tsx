"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIConflictWidget({ conflicts, suggestions }: { conflicts: any[]; suggestions: string[] }) {
  if (!conflicts || conflicts.length === 0) return null;

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-rose-500/10 via-white/80 to-amber-500/10 dark:from-rose-950/30 dark:via-slate-900/80 dark:to-amber-950/20 border border-rose-200/50 dark:border-rose-900/40 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          ✦ AI Operations Conflict Radar & Solution Engine
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
          Çakışma Uyarısı
        </span>
      </div>

      {conflicts.map((c) => (
        <div key={c.id} className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-rose-100 dark:border-rose-900/40 space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-rose-800 dark:text-rose-300">🚨 {c.title}</h4>
            <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-rose-600 text-white">YÜKSEK RİSK</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">{c.description}</p>
          <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/50 text-[11px] text-emerald-800 dark:text-emerald-300 font-semibold">
            💡 <strong>AI Çözüm Önerisi:</strong> {c.solution}
          </div>
        </div>
      ))}

      {suggestions && suggestions.length > 0 && (
        <div className="space-y-1 text-xs pt-1">
          <span className="text-[10px] text-indigo-600 font-bold uppercase block">⚡ Zamanlama Optimasyonu Tavsiyesi</span>
          <p className="text-slate-600 dark:text-slate-300 text-[11px] italic">{suggestions[0]}</p>
        </div>
      )}
    </motion.div>
  );
}
