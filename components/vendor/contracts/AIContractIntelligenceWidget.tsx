"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIContractIntelligenceWidget({ aiAnalysis }: { aiAnalysis: any }) {
  if (!aiAnalysis) return null;

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-indigo-500/10 via-white/80 to-purple-500/10 dark:from-indigo-950/30 dark:via-slate-900/80 dark:to-purple-950/20 border border-indigo-200/50 dark:border-indigo-900/40 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
          ✦ AI Legal & Compliance Copilot
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          Uyum Skoru: %{aiAnalysis.complianceScore}
        </span>
      </div>

      {/* Sade Dil Özeti */}
      <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-indigo-100 dark:border-indigo-900/40 space-y-1 text-xs">
        <span className="text-[10px] text-slate-400 font-bold uppercase block">📝 Plain Language Summary (Sade Dil Özeti)</span>
        <p className="text-slate-700 dark:text-slate-200 leading-relaxed text-[11px]">{aiAnalysis.plainSummary}</p>
      </div>

      {/* Eksik Madde Uyarısı */}
      {aiAnalysis.missingClauses && aiAnalysis.missingClauses.length > 0 && (
        <div className="space-y-1.5 text-xs">
          <span className="text-[10px] text-amber-600 font-bold uppercase block">⚠️ AI Eksik Madde Tespiti</span>
          {aiAnalysis.missingClauses.map((mc: string, i: number) => (
            <div key={i} className="p-2.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/50 text-[11px] text-amber-900 dark:text-amber-300">
              💡 {mc}
            </div>
          ))}
        </div>
      )}

      {/* Önerilen Ek Maddeler */}
      <div className="space-y-2 text-xs">
        <span className="text-[10px] text-indigo-600 font-bold uppercase block">➕ Madde Kütüphanesi Önerileri</span>
        <div className="space-y-1.5">
          {aiAnalysis.suggestedClauses.map((sc: any, i: number) => (
            <div key={i} className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border text-[10px] flex justify-between items-center">
              <span className="font-semibold text-slate-800 dark:text-slate-100">{sc.title}</span>
              <span className="text-indigo-600 font-bold text-[9px] bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded">{sc.category}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
