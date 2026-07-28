"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AICoupleRiskWidget({ aiReport }: { aiReport: any }) {
  if (!aiReport) return null;

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-rose-500/10 via-white/80 to-purple-500/10 dark:from-rose-950/30 dark:via-slate-900/80 dark:to-purple-950/20 border border-rose-200/50 dark:border-rose-900/40 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
          ✦ AI Couple Fraud & Engagement Audit
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          Güven Skoru: %{aiReport.trustScore}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-rose-100 dark:border-rose-900/40">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">🚨 Spam / Bot Riski</span>
          <span className="font-bold text-emerald-600 text-xs">%{aiReport.spamRiskScore} (Temiz)</span>
        </div>

        <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-rose-100 dark:border-rose-900/40">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">🤖 AI LLM Jeton Kullanımı</span>
          <span className="font-bold text-purple-600 text-xs">{aiReport.aiUsageTokens}</span>
        </div>
      </div>

      <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-rose-100 dark:border-rose-900/40 space-y-1">
        <span className="text-[10px] text-slate-400 font-bold uppercase block">📝 AI Kullanıcı Özeti</span>
        <p className="text-slate-700 dark:text-slate-200 leading-relaxed text-[11px]">{aiReport.auditSummary}</p>
      </div>

      <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/50 text-rose-900 dark:text-rose-200 font-semibold">
        💡 <strong>AI Hatırlatma Tavsiyesi:</strong> {aiReport.recommendation}
      </div>
    </motion.div>
  );
}
