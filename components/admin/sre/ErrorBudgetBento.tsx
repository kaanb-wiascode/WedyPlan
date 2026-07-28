"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ErrorBudgetBento({ budgets }: { budgets: any[] }) {
  if (!budgets || budgets.length === 0) return null;

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        📉 SLI / SLO & Hata Bütçesi Matrisi (Error Budget Tracker)
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {budgets.map((item, i) => {
          const isHealthy = item.status === "HEALTHY";
          const progressColor = isHealthy ? "bg-emerald-500" : "bg-amber-500";
          const badgeClass = isHealthy ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300";

          return (
            <motion.div
              key={i}
              whileHover={{ y: -2 }}
              className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs">{item.serviceName}</h4>
                  <span className="text-[10px] text-slate-400 font-mono">Hedef SLO: %{item.targetSloPct} | SLI: %{item.currentSliPct}</span>
                </div>
                <span className={"px-2 py-0.5 rounded text-[10px] font-bold font-mono " + badgeClass}>
                  {item.status}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="text-slate-400">Kalan Hata Bütçesi:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">%{item.remainingErrorBudgetPct}</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className={"h-full " + progressColor} style={{ width: item.remainingErrorBudgetPct + "%" }} />
                </div>
              </div>

              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-[10px] font-mono flex justify-between">
                <span className="text-slate-400">Burn Rate Çarpanı:</span>
                <span className="font-bold text-rose-600">{item.burnRateMultiplier}x</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
