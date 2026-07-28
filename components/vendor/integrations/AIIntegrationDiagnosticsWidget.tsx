"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIIntegrationDiagnosticsWidget({ aiData }: { aiData: any }) {
  if (!aiData) return null;

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-emerald-500/10 via-white/80 to-teal-500/10 dark:from-emerald-950/30 dark:via-slate-900/80 dark:to-teal-950/20 border border-emerald-200/50 dark:border-emerald-900/40 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          ✦ AI Connection Diagnostics & Sync Optimizer
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          Otomatik Onarım Modu
        </span>
      </div>

      {/* Teşhis Listesi */}
      <div className="space-y-2 text-xs">
        {aiData.diagnostics?.map((diag: any, i: number) => (
          <div
            key={i}
            className={"p-3 rounded-2xl border flex justify-between items-center " +
              (diag.status === "HEALTHY"
                ? "bg-white/80 dark:bg-slate-800/60 border-emerald-100 dark:border-emerald-900/40"
                : "bg-amber-50/80 dark:bg-amber-950/30 border-amber-200/50")
            }
          >
            <div>
              <div className="flex items-center gap-2">
                <span className={"w-2 h-2 rounded-full " + (diag.status === "HEALTHY" ? "bg-emerald-500" : "bg-amber-500")} />
                <h4 className="font-bold text-slate-800 dark:text-slate-100">{diag.integrationName}</h4>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5">{diag.message}</p>
            </div>
            <span className="font-mono text-[10px] font-bold text-slate-400">{diag.latency}</span>
          </div>
        ))}
      </div>

      {/* AI Önerileri */}
      <div className="space-y-1.5 text-xs pt-1 border-t border-emerald-100 dark:border-emerald-900/40">
        <span className="text-[10px] text-emerald-600 font-bold uppercase block">💡 AI Entegrasyon Tavsiyeleri</span>
        {aiData.aiRecommendations?.map((rec: string, i: number) => (
          <div key={i} className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border text-[11px] text-slate-700 dark:text-slate-200">
            ⚡ {rec}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
