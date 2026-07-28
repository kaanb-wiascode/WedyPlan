"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIVendorCoachAnalyticsWidget({ aiReport }: { aiReport: any }) {
  if (!aiReport) return null;

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-indigo-500/10 via-white/80 to-emerald-500/10 dark:from-indigo-950/30 dark:via-slate-900/80 dark:to-emerald-950/20 border border-indigo-200/50 dark:border-indigo-900/40 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
          ✦ Daily Business Briefing & Opportunity Detector
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          Ciro Fırsatı: Aktif
        </span>
      </div>

      {/* Günlük İşletme Brifingi */}
      <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-indigo-100 dark:border-indigo-900/40 space-y-1">
        <span className="text-[10px] text-indigo-600 font-bold uppercase block">☀️ Günlük İşletme Brifingi</span>
        <p className="text-slate-800 dark:text-slate-100 leading-relaxed font-medium text-[11px]">{aiReport.dailyBusinessBriefing}</p>
      </div>

      {/* Fırsat & Rakip Analizi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div className="p-3 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/50 text-emerald-900 dark:text-emerald-200">
          💡 <strong>Ciro Büyütme Fırsatı:</strong> {aiReport.opportunityDetection}
        </div>

        <div className="p-3 rounded-2xl bg-purple-50/80 dark:bg-purple-950/30 border border-purple-200/50 text-purple-900 dark:text-purple-200">
          📊 <strong>Rakip Fiyat Analizi:</strong> {aiReport.competitorAnalysis}
        </div>
      </div>
    </motion.div>
  );
}
