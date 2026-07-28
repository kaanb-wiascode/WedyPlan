"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AISubscriptionIntelligenceWidget({ aiData }: { aiData: any }) {
  if (!aiData) return null;

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-emerald-500/10 via-white/80 to-teal-500/10 dark:from-emerald-950/30 dark:via-slate-900/80 dark:to-teal-950/20 border border-emerald-200/50 dark:border-emerald-900/40 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          ✦ AI Subscription & Cost Optimizer
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          Maliyet Skoru: %{aiData.optimizationscore}
        </span>
      </div>

      {/* Akıllı Paket Önerisi */}
      <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-emerald-100 dark:border-emerald-900/40 space-y-1 text-xs">
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">💡 AI Önerilen Optimum Paket</span>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
            {aiData.recommendedPlan}
          </span>
        </div>
        <p className="text-slate-700 dark:text-slate-200 leading-relaxed text-[11px]">{aiData.reasoning}</p>
      </div>

      {/* Yıllık Tasarruf Hesabı */}
      <div className="p-3 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/50 text-xs flex justify-between items-center text-emerald-900 dark:text-emerald-200">
        <div>
          <span className="text-[10px] font-bold uppercase block text-emerald-600">💰 Potansiyel Yıllık Tasarruf</span>
          <span className="font-serif font-bold text-xs">{aiData.potentialAnnualSaving}</span>
        </div>
        <button onClick={() => alert("Yıllık Plana Geçiş")} className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-[10px]">
          Yıllığa Geç
        </button>
      </div>

      {/* Depolama Doluluk Uyarısı */}
      {aiData.storageDepletionAlert && (
        <div className="p-3 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/50 text-xs text-amber-900 dark:text-amber-300">
          ⚠️ <strong>Depolama Uyarısı:</strong> {aiData.storageDepletionAlert}
        </div>
      )}
    </motion.div>
  );
}
