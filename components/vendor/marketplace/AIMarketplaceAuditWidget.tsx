"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIMarketplaceAuditWidget({ aiAudit }: { aiAudit: any }) {
  if (!aiAudit) return null;

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-indigo-500/10 via-white/80 to-purple-500/10 dark:from-indigo-950/30 dark:via-slate-900/80 dark:to-purple-950/20 border border-indigo-200/50 dark:border-indigo-900/40 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
          ✦ AI Listing Quality & SEO Copilot
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          Kalite Skoru: %{aiAudit.listingQualityScore}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-indigo-100 dark:border-indigo-900/40">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">🔍 SEO & Arama Gücü</span>
          <span className="font-bold text-indigo-600 text-xs">%{aiAudit.seoScore} (Üst Sıra)</span>
        </div>

        <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-indigo-100 dark:border-indigo-900/40">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">📈 Tahmini Dönüşüm Oranı</span>
          <span className="font-bold text-emerald-600 text-xs">{aiAudit.conversionPrediction}</span>
        </div>
      </div>

      {/* AI Fiyat & Piyasa Tavsiyesi */}
      <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-indigo-100 dark:border-indigo-900/40 space-y-1 text-xs">
        <span className="text-[10px] text-slate-400 font-bold uppercase block">💡 AI Piyasa Fiyatlandırma Tavsiyesi</span>
        <p className="text-slate-700 dark:text-slate-200 leading-relaxed text-[11px]">{aiAudit.pricingSuggestion}</p>
      </div>

      {/* Rakip Kıyaslama */}
      <div className="p-3 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/50 text-xs text-indigo-900 dark:text-indigo-200">
        🏆 <strong>Bölgesel Benchmark:</strong> {aiAudit.competitorBenchmark}
      </div>

      {/* Eksik İçerik Uyarısı */}
      {aiAudit.missingContentAlerts && aiAudit.missingContentAlerts.length > 0 && (
        <div className="p-3 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/50 text-xs text-amber-900 dark:text-amber-300">
          ⚠️ <strong>Eksik İçerik Tespiti:</strong> {aiAudit.missingContentAlerts[0]}
        </div>
      )}
    </motion.div>
  );
}
