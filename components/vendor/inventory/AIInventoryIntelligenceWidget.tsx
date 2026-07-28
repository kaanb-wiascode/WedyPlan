"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIInventoryIntelligenceWidget({ aiData }: { aiData: any }) {
  if (!aiData) return null;

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-amber-500/10 via-white/80 to-orange-500/10 dark:from-amber-950/30 dark:via-slate-900/80 dark:to-orange-950/20 border border-amber-200/50 dark:border-amber-900/40 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
          ✦ AI Demand & Maintenance Predictor
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
          Optimizasyon: %{aiData.inventoryOptimizationScore}
        </span>
      </div>

      {/* Gelecek Dönem Talep Tahmini */}
      <div className="space-y-1.5 text-xs">
        <span className="text-[10px] text-amber-600 font-bold uppercase block">📈 30 Günlük Düğün Stok & Talep Öngörüsü</span>
        {aiData.demandPredictions?.map((dp: string, i: number) => (
          <div key={i} className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-amber-100 dark:border-amber-900/40 text-slate-800 dark:text-slate-100 text-[11px] font-medium leading-relaxed">
            📦 {dp}
          </div>
        ))}
      </div>

      {/* Ekipman Bakım Tahmini */}
      <div className="space-y-1.5 text-xs pt-1 border-t border-amber-100 dark:border-amber-900/40">
        <span className="text-[10px] text-rose-600 font-bold uppercase block">🛠️ Otonom Ekipman Bakım Uyarısı</span>
        {aiData.maintenancePredictions?.map((mp: string, i: number) => (
          <div key={i} className="p-3 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200/50 text-rose-900 dark:text-rose-300 text-[11px] font-medium leading-relaxed">
            🚨 {mp}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
