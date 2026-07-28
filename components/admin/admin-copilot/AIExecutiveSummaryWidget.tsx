"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIExecutiveSummaryWidget({ aiReport }: { aiReport: any }) {
  if (!aiReport) return null;

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-indigo-500/10 via-white/80 to-purple-500/10 dark:from-indigo-950/30 dark:via-slate-900/80 dark:to-purple-950/20 border border-indigo-200/50 dark:border-indigo-900/40 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
          ✦ Executive AI Daily Briefing & Risk Radar
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          Otonom Denetçi: Aktif
        </span>
      </div>

      {/* İnsidant Özetleyicisi */}
      <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-indigo-100 dark:border-indigo-900/40 space-y-1">
        <span className="text-[10px] text-indigo-600 font-bold uppercase block">📝 Canlı Operasyonel İnsidant Özeti</span>
        <p className="text-slate-800 dark:text-slate-100 leading-relaxed font-medium text-[11px]">{aiReport.incidentSummary}</p>
      </div>

      {/* Risk Analizi */}
      <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/50 text-amber-900 dark:text-amber-200 font-semibold">
        ⚠️ <strong>Operasyonel Risk Analizi:</strong> {aiReport.riskAnalysis}
      </div>

      {/* Önerilen Aksiyonlar */}
      <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/50 space-y-1">
        <span className="text-[10px] text-purple-700 dark:text-purple-300 font-bold uppercase block">📌 Önerilen Yönetici Aksiyonları:</span>
        <ul className="list-disc list-inside text-slate-800 dark:text-slate-200 space-y-1 text-[11px]">
          {aiReport.actionSuggestions.map((act: string, i: number) => (
            <li key={i}>{act}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
