"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIBusinessIntelligenceWidget({ insights }: { insights: any }) {
  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-indigo-500/10 via-white/80 to-purple-500/10 dark:from-indigo-950/30 dark:via-slate-900/80 dark:to-purple-950/20 border border-indigo-200/50 dark:border-indigo-900/40 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
          ✦ AI Executive Intelligence & Sales Predictor
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
          Canlı Analiz
        </span>
      </div>

      {/* Ciro Tahmini */}
      <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-800/50 border border-indigo-100 dark:border-indigo-900/40 space-y-1">
        <span className="text-[10px] text-slate-400 font-bold uppercase block">📈 30 Günlük Tahmini Ciro Projeksiyonu</span>
        <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{insights.revenuePrediction}</p>
      </div>

      {/* Bugünün Öncelikleri */}
      <div className="space-y-2">
        <span className="text-[10px] text-indigo-600 font-bold uppercase block">📌 Bugünün Öncelikli Aksiyonları</span>
        {insights.todayPriorities.map((item: string, i: number) => (
          <div key={i} className="p-2.5 rounded-xl bg-white/60 dark:bg-slate-800/40 border border-indigo-100 dark:border-indigo-950/40 text-xs text-slate-700 dark:text-slate-200">
            ⚡ {item}
          </div>
        ))}
      </div>

      {/* Kaçan Fırsat Uyarısı */}
      {insights.lostOpportunityAlert && (
        <div className="p-3 rounded-xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200/50 text-xs text-rose-800 dark:text-rose-300">
          🚨 <strong>Lost Opportunity Alert:</strong> {insights.lostOpportunityAlert}
        </div>
      )}
    </motion.div>
  );
}
