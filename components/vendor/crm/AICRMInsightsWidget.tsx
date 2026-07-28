"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AICRMInsightsWidget({
  aiSummaryData,
  selectedCustomer,
}: {
  aiSummaryData: any;
  selectedCustomer: any;
}) {
  if (!selectedCustomer || !aiSummaryData) {
    return (
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm text-center text-xs text-slate-400">
        Müşteri İlişkileri Analizi ve AI Tavsiyelerini görmek için listeden bir müşteri seçiniz.
      </div>
    );
  }

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-indigo-500/10 via-white/80 to-purple-500/10 dark:from-indigo-950/30 dark:via-slate-900/80 dark:to-purple-950/20 border border-indigo-200/50 dark:border-indigo-900/40 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
          ✦ AI CRM Intelligence: {selectedCustomer.coupleName}
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          Sağlık Skoru: %{aiSummaryData.healthScore}
        </span>
      </div>

      {/* AI Özet */}
      <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-indigo-100 dark:border-indigo-900/40 space-y-1 text-xs">
        <span className="text-[10px] text-slate-400 font-bold uppercase block">📝 Müşteri Geçmişi Özeti</span>
        <p className="text-slate-700 dark:text-slate-200 leading-relaxed text-[11px]">{aiSummaryData.summary}</p>
      </div>

      {/* Sıradaki En İyi Aksiyon */}
      <div className="p-3.5 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/50 text-xs space-y-1">
        <span className="text-[10px] text-indigo-600 font-bold uppercase block">🎯 Sıradaki En İyi Aksiyon (Next Best Action)</span>
        <p className="font-semibold text-slate-800 dark:text-slate-100">{aiSummaryData.nextBestAction}</p>
      </div>

      {/* Cross-Sell / Upsell Fırsatları */}
      <div className="space-y-2 text-xs">
        <span className="text-[10px] text-purple-600 font-bold uppercase block">💡 Önerilen Ek Hizmet Fırsatları (Upsell)</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {aiSummaryData.upsellSuggestions.map((up: any, i: number) => (
            <div key={i} className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border text-[10px] space-y-0.5">
              <div className="font-bold text-slate-800 dark:text-slate-100">{up.title}</div>
              <div className="flex justify-between items-center pt-1 text-slate-400">
                <span className="font-mono font-bold text-indigo-600">{up.price}</span>
                <span className="text-emerald-600 font-bold">{up.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
