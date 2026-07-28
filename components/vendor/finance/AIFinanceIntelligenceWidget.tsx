"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIFinanceIntelligenceWidget({ aiData }: { aiData: any }) {
  if (!aiData) return null;

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-emerald-500/10 via-white/80 to-teal-500/10 dark:from-emerald-950/30 dark:via-slate-900/80 dark:to-teal-950/20 border border-emerald-200/50 dark:border-emerald-900/40 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          ✦ AI Financial Intelligence & Cash Flow Predictor
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          Sağlık Skoru: %{aiData.financialHealthScore}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-emerald-100 dark:border-emerald-900/40">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">📈 30 Günlük Tahmini Nakit Akışı</span>
          <span className="font-bold text-emerald-600 text-xs">{aiData.cashFlowPrediction30Days}</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-emerald-100 dark:border-emerald-900/40">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">🏛️ Vergi Karşılık Uyarısı</span>
          <span className="font-bold text-amber-600 text-xs">{aiData.taxProvisionAmount}</span>
        </div>
      </div>

      <div className="space-y-2 text-xs">
        <span className="text-[10px] text-emerald-600 font-bold uppercase block">💡 AI Tasarruf & Kar Optimizasyon Tavsiyesi</span>
        {aiData.savingsRecommendations.map((rec: any, i: number) => (
          <div key={i} className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-emerald-100 dark:border-emerald-900/40 space-y-1">
            <div className="flex justify-between items-center">
              <h4 className="font-bold text-slate-800 dark:text-slate-100">{rec.title}</h4>
              <span className="font-mono font-bold text-emerald-600 text-[10px] bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                Tasarruf Potansiyeli: {rec.potentialSaving}
              </span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">{rec.advice}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
