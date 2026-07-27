"use client";

import React from "react";
import { motion } from "framer-motion";

export default function StressAndRiskWidget({ predictions }: { predictions: any }) {
  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
        🛡️ AI Risk Radar & Tahminleme Motoru
      </span>

      <div className="space-y-3 text-xs">
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 flex justify-between items-center">
          <div>
            <h4 className="font-bold text-slate-800 dark:text-slate-100">Bütçe Aşımı Riski</h4>
            <p className="text-[10px] text-slate-400">Mevcut harcama ivmesine göre</p>
          </div>
          <span className="font-mono font-bold text-emerald-600">{predictions.budgetOverrunRisk}</span>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 flex justify-between items-center">
          <div>
            <h4 className="font-bold text-slate-800 dark:text-slate-100">Zaman Çizelgesi Gecikmesi</h4>
            <p className="text-[10px] text-slate-400">Kritik yol üzerindeki görevler</p>
          </div>
          <span className="font-mono font-bold text-amber-600">{predictions.delayRisk}</span>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
          <h4 className="font-bold text-slate-800 dark:text-slate-100">Henüz Anlaşılmayan Eksik Tedarikçiler</h4>
          <div className="flex gap-1.5 pt-1">
            {predictions.missingVendors.map((vendor: string, i: number) => (
              <span key={i} className="px-2 py-0.5 rounded-full text-[10px] bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 font-semibold">
                ⚠️ {vendor}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
