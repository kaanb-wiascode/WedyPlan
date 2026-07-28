"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AICampaignIntelligenceWidget({ aiData }: { aiData: any }) {
  if (!aiData) return null;

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-purple-500/10 via-white/80 to-indigo-500/10 dark:from-purple-950/30 dark:via-slate-900/80 dark:to-indigo-950/20 border border-purple-200/50 dark:border-purple-900/40 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400">
          ✦ AI Marketing Copywriter & ROI Predictor
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
          Skor: %{aiData.campaignScore}
        </span>
      </div>

      {/* AI Üretimi Reklam Metni */}
      <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-purple-100 dark:border-purple-900/40 space-y-1 text-xs">
        <span className="text-[10px] text-slate-400 font-bold uppercase block">✍️ Önerilen AI Reklam & Duyuru Metni</span>
        <p className="text-slate-700 dark:text-slate-200 leading-relaxed text-[11px] italic">"{aiData.marketingCopy}"</p>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-purple-100 dark:border-purple-900/40">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">🕒 En İyi Yayın Zamanı</span>
          <span className="font-bold text-indigo-600 text-[11px]">{aiData.bestLaunchTime}</span>
        </div>

        <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-purple-100 dark:border-purple-900/40">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">📈 Tahmini ROI</span>
          <span className="font-bold text-emerald-600 text-[11px]">{aiData.estimatedRoi}</span>
        </div>
      </div>

      {/* Hedef Kitle Önerisi */}
      <div className="p-3 rounded-2xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200/50 text-xs space-y-1">
        <span className="text-[10px] text-purple-600 font-bold uppercase block">🎯 AI Hedef Kitle Önerisi</span>
        <p className="font-semibold text-slate-800 dark:text-slate-100 text-[11px]">{aiData.targetAudienceSuggestion}</p>
      </div>
    </motion.div>
  );
}
