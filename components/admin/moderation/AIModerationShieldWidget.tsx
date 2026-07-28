"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIModerationShieldWidget({ aiReport }: { aiReport: any }) {
  if (!aiReport) return null;

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-rose-500/10 via-white/80 to-purple-500/10 dark:from-rose-950/30 dark:via-slate-900/80 dark:to-purple-950/20 border border-rose-200/50 dark:border-rose-900/40 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
          ✦ AI Content Safety & Fraud Radar
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          Otomatik Tarama Aktif
        </span>
      </div>

      <div className="space-y-2">
        <span className="text-[10px] text-slate-400 font-bold uppercase block">🚨 AI Tarafından Yakalanan Otomatik İhlaller</span>
        {aiReport.aiDetections?.map((det: any) => (
          <div key={det.id} className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-rose-100 dark:border-rose-900/40 space-y-1">
            <div className="flex justify-between items-center">
              <span className="font-bold text-rose-600 text-[10px] uppercase">{det.type}</span>
              <span className="font-mono text-[9px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 px-2 py-0.5 rounded">{det.confidence}</span>
            </div>
            <p className="text-slate-800 dark:text-slate-100 font-medium leading-relaxed text-[11px]">{det.details}</p>
            <span className="text-[9px] text-slate-400 block font-mono">Hedef: {det.target}</span>
          </div>
        ))}
      </div>

      <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/50 text-purple-900 dark:text-purple-200 font-semibold">
        💡 <strong>AI Moderatör Önerisi:</strong> {aiReport.aiRecommendation}
      </div>
    </motion.div>
  );
}
