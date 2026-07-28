"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIMarketplaceHealthWidget({ aiReport }: { aiReport: any }) {
  if (!aiReport) return null;

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-purple-500/10 via-white/80 to-indigo-500/10 dark:from-purple-950/30 dark:via-slate-900/80 dark:to-indigo-950/20 border border-purple-200/50 dark:border-purple-900/40 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400">
          ✦ AI Marketplace Health & Search Gap Intelligence
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          Pazar Yeri Skoru: %{aiReport.healthScore}
        </span>
      </div>

      <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-purple-100 dark:border-purple-900/40 space-y-1">
        <span className="text-[10px] text-slate-400 font-bold uppercase block">🔍 Arama & İlan Eşleşme Başarısı</span>
        <span className="font-bold text-indigo-600 text-sm">{aiReport.searchDemandMatchRate}</span>
      </div>

      {/* Arama Boşlukları (Search Gaps) */}
      <div className="space-y-1.5">
        <span className="text-[10px] text-amber-600 font-bold uppercase block">🚨 AI Tarafından Algılanan Arama Boşlukları (Search Gaps)</span>
        {aiReport.searchGaps?.map((gap: string, i: number) => (
          <div key={i} className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/50 text-amber-900 dark:text-amber-200 text-[11px] font-medium leading-relaxed">
            ⚡ {gap}
          </div>
        ))}
      </div>

      <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/50 text-purple-900 dark:text-purple-200 font-semibold">
        💡 <strong>AI Büyüme Önerisi:</strong> {aiReport.aiRecommendation}
      </div>
    </motion.div>
  );
}
