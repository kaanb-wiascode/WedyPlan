"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AITenantCapacityWidget({ aiReport }: { aiReport: any }) {
  if (!aiReport) return null;

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-indigo-500/10 via-white/80 to-purple-500/10 dark:from-indigo-950/30 dark:via-slate-900/80 dark:to-purple-950/20 border border-indigo-200/50 dark:border-indigo-900/40 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
          ✦ AI Tenant Capacity & Cost Intelligence
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          Otonom İzolasyon
        </span>
      </div>

      <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-indigo-100 dark:border-indigo-900/40 space-y-1">
        <span className="text-[10px] text-slate-400 font-bold uppercase block">📝 AI Kiracı Denetim Özeti</span>
        <p className="text-slate-800 dark:text-slate-100 leading-relaxed text-[11px] font-medium">{aiReport.aiAnalysis}</p>
      </div>

      {/* Kapasite Öngörüsü */}
      <div className="p-3.5 rounded-2xl bg-purple-50/80 dark:bg-purple-950/30 border border-purple-200/50 space-y-1">
        <span className="text-[10px] text-purple-600 font-bold uppercase block">📈 Gelecek 30 Gün Büyüme Tahmini</span>
        <p className="text-purple-900 dark:text-purple-200 text-[11px] font-medium leading-relaxed">
          {aiReport.capacityForecast}
        </p>
      </div>

      <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/50 text-emerald-900 dark:text-emerald-200 font-semibold">
        💡 <strong>Maliyet Optimizasyonu Önerisi:</strong> {aiReport.costOptimizationRecommendation}
      </div>
    </motion.div>
  );
}
