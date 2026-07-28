"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIProposalInsightsWidget({ aiData }: { aiData: any }) {
  if (!aiData) return null;

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-indigo-500/10 via-white/80 to-purple-500/10 dark:from-indigo-950/30 dark:via-slate-900/80 dark:to-purple-950/20 border border-indigo-200/50 dark:border-indigo-900/40 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
          ✦ AI Proposal Optimization & Upsell Copilot
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
          Skor: %{aiData.qualityScore}
        </span>
      </div>

      <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-800/50 border border-indigo-100 dark:border-indigo-900/40 space-y-1">
        <span className="text-[10px] text-slate-400 font-bold uppercase block">📈 AI Fiyatlama Tavsiyesi</span>
        <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">{aiData.pricingRecommendation}</p>
      </div>

      <div className="space-y-2">
        <span className="text-[10px] text-indigo-600 font-bold uppercase block">💡 Önerilen Ek Upsell Kalemleri</span>
        {aiData.suggestedUpsells.map((up: any, i: number) => (
          <div key={i} className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-indigo-100 dark:border-indigo-900/40 flex justify-between items-center text-xs">
            <div>
              <h4 className="font-bold text-slate-800 dark:text-slate-100">{up.title}</h4>
              <span className="text-[10px] text-emerald-600 font-bold">{up.conversionImpact}</span>
            </div>
            <span className="font-mono font-bold text-indigo-600">+{up.estimatedPrice.toLocaleString("tr-TR")} ₺</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
