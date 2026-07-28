"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIBusinessHealthWidget({ aiData }: { aiData: any }) {
  if (!aiData) return null;

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-violet-500/10 via-white/80 to-indigo-500/10 dark:from-violet-950/30 dark:via-slate-900/80 dark:to-indigo-950/20 border border-violet-200/50 dark:border-violet-900/40 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-violet-700 dark:text-violet-400">
          ✦ AI Business Health & Executive Copilot
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
          Sağlık Skoru: %{aiData.businessHealthScore}
        </span>
      </div>

      {/* Büyüme Tahmini */}
      <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-violet-100 dark:border-violet-900/40 space-y-1 text-xs">
        <span className="text-[10px] text-slate-400 font-bold uppercase block">📈 Yıllık Büyüme & Ciro Projeksiyonu</span>
        <p className="text-slate-800 dark:text-slate-100 font-bold text-xs">{aiData.growthForecast}</p>
      </div>

      {/* Pazar Fırsatı Tespiti */}
      <div className="p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/50 text-xs space-y-1">
        <span className="text-[10px] text-emerald-600 font-bold uppercase block">💡 AI Pazar Fırsatı Tespiti (Opportunity)</span>
        <p className="text-emerald-900 dark:text-emerald-200 text-[11px] leading-relaxed font-medium">{aiData.opportunityDetection}</p>
      </div>

      {/* Risk Uyarısı */}
      {aiData.riskAlerts && aiData.riskAlerts.length > 0 && (
        <div className="p-3 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200/50 text-xs space-y-1 text-rose-800 dark:text-rose-300">
          <span className="text-[10px] text-rose-600 font-bold uppercase block">🚨 Proaktif Risk Uyarısı</span>
          <p className="text-[11px] font-medium">{aiData.riskAlerts[0]}</p>
        </div>
      )}

      {/* Aksiyon Önerileri */}
      <div className="space-y-1.5 text-xs">
        <span className="text-[10px] text-violet-600 font-bold uppercase block">🎯 Önerilen Stratejik Aksiyonlar</span>
        {aiData.actionRecommendations?.map((act: string, i: number) => (
          <div key={i} className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border text-[11px] text-slate-700 dark:text-slate-200">
            ⚡ {act}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
