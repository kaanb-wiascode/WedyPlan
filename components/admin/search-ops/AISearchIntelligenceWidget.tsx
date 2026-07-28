"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AISearchIntelligenceWidget({ aiReport }: { aiReport: any }) {
  if (!aiReport) return null;

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-cyan-500/10 via-white/80 to-teal-500/10 dark:from-cyan-950/30 dark:via-slate-900/80 dark:to-teal-950/20 border border-cyan-200/50 dark:border-cyan-900/40 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400">
          ✦ AI Search Optimization & Trend Radar
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          Otomatik Trend Tespiti
        </span>
      </div>

      {/* Yükselen Trend Arama Kelimeleri */}
      <div className="space-y-1.5">
        <span className="text-[10px] text-slate-400 font-bold uppercase block">📈 Yükselen Sezonluk Arama Sorguları</span>
        {aiReport.trendingSearches?.map((trend: string, i: number) => (
          <div key={i} className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/60 border border-cyan-100 dark:border-cyan-900/40 text-slate-800 dark:text-slate-100 text-[11px] font-medium leading-relaxed">
            🔥 {trend}
          </div>
        ))}
      </div>

      {/* Eksik İçerik / Arama Açığı Uyarısı */}
      <div className="p-3.5 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200/50 space-y-1">
        <span className="text-[10px] text-rose-600 font-bold uppercase block">🚨 Algılanan Eksik İçerik / Arama Açığı (Search Gap)</span>
        <p className="text-rose-900 dark:text-rose-200 text-[11px] font-medium leading-relaxed">
          {aiReport.missingContentGaps[0]}
        </p>
      </div>

      <div className="p-3 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200/50 text-cyan-900 dark:text-cyan-200 font-semibold">
        💡 <strong>AI Eş Anlamlı Kelime Tavsiyesi:</strong> {aiReport.aiRecommendation}
      </div>
    </motion.div>
  );
}
