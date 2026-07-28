"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIFinancialHealthWidget({ aiReport }: { aiReport: any }) {
  if (!aiReport) return null;

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-emerald-500/10 via-white/80 to-teal-500/10 dark:from-emerald-950/30 dark:via-slate-900/80 dark:to-teal-950/20 border border-emerald-200/50 dark:border-emerald-900/40 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          ✦ AI Financial Audit & Revenue Forecast
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          Finansal Sağlık: %{aiReport.financialHealthScore}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-emerald-100 dark:border-emerald-900/40">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">📈 90 Günlük Ciro Öngörüsü</span>
          <span className="font-serif font-bold text-emerald-600 text-xs">{aiReport.forecast90DaysRevenue}</span>
        </div>

        <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-emerald-100 dark:border-emerald-900/40">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">💰 Tahmini Net Komisyon</span>
          <span className="font-serif font-bold text-indigo-600 text-xs">{aiReport.predictedPlatformCommissions}</span>
        </div>
      </div>

      <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-emerald-100 dark:border-emerald-900/40 space-y-1">
        <span className="text-[10px] text-slate-400 font-bold uppercase block">📝 AI Finansal Denetim Özeti</span>
        <p className="text-slate-700 dark:text-slate-200 leading-relaxed text-[11px]">{aiReport.aiAnalysis}</p>
      </div>

      <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/50 text-emerald-900 dark:text-emerald-200 font-semibold">
        💡 <strong>AI Nakit Akış Tavsiyesi:</strong> {aiReport.recommendation}
      </div>
    </motion.div>
  );
}
