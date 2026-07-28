"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIFeatureFlagRiskWidget({ aiReport }: { aiReport: any }) {
  if (!aiReport) return null;

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-rose-500/10 via-white/80 to-purple-500/10 dark:from-rose-950/30 dark:via-slate-900/80 dark:to-purple-950/20 border border-rose-200/50 dark:border-rose-900/40 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
          ✦ AI Safe Rollout & Impact Prediction Radar
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          Otomatik Anomali Tespiti
        </span>
      </div>

      <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-rose-100 dark:border-rose-900/40 space-y-1">
        <span className="text-[10px] text-slate-400 font-bold uppercase block">📝 AI Yayın Risk Değerlendirmesi</span>
        <p className="text-slate-800 dark:text-slate-100 leading-relaxed text-[11px] font-medium">{aiReport.aiAnalysis}</p>
      </div>

      {/* Performans & CPU Etkisi Tahmini */}
      <div className="p-3.5 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/30 border border-indigo-200/50 space-y-1">
        <span className="text-[10px] text-indigo-600 font-bold uppercase block">⚡ Tahmini Sunucu Performans Etkisi</span>
        <p className="text-indigo-900 dark:text-indigo-200 text-[11px] font-medium leading-relaxed">
          {aiReport.impactPrediction}
        </p>
      </div>

      <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/50 text-purple-900 dark:text-purple-200 font-semibold">
        💡 <strong>AI Kademeli Yayın Önerisi:</strong> {aiReport.recommendation}
      </div>
    </motion.div>
  );
}
