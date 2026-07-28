"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIReputationWidget({ aiData }: { aiData: any }) {
  if (!aiData) return null;

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-amber-500/10 via-white/80 to-orange-500/10 dark:from-amber-950/30 dark:via-slate-900/80 dark:to-orange-950/20 border border-amber-200/50 dark:border-amber-900/40 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
          ✦ AI Sentiment Analysis & Reputation Copilot
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          Pozitif Duygu: %{aiData.positiveSentimentPercentage}
        </span>
      </div>

      {/* AI Özet */}
      <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-amber-100 dark:border-amber-900/40 space-y-1 text-xs">
        <span className="text-[10px] text-slate-400 font-bold uppercase block">📝 Müşteri Yorumları AI Özeti</span>
        <p className="text-slate-700 dark:text-slate-200 leading-relaxed text-[11px]">{aiData.reviewSummary}</p>
      </div>

      {/* İyileştirme Önerisi */}
      <div className="p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/50 text-xs space-y-1">
        <span className="text-[10px] text-amber-600 font-bold uppercase block">💡 AI Hizmet İyileştirme Önerisi</span>
        <p className="text-amber-900 dark:text-amber-200 text-[11px] leading-relaxed font-medium">{aiData.improvementSuggestion}</p>
      </div>

      {/* Kriz Uyarısı */}
      {aiData.crisisAlertsCount > 0 && (
        <div className="p-3 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200/50 text-xs flex justify-between items-center text-rose-800 dark:text-rose-300">
          <span className="text-[11px] font-bold">🚨 1 Adet Düşük Puanlı Yorum Yanıt Bekliyor</span>
          <span className="text-[10px] font-mono font-bold bg-rose-600 text-white px-2 py-0.5 rounded">Acil Müdahale</span>
        </div>
      )}
    </motion.div>
  );
}
