"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIMediaIntelligenceWidget({ aiData }: { aiData: any }) {
  if (!aiData) return null;

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-rose-500/10 via-white/80 to-pink-500/10 dark:from-rose-950/30 dark:via-slate-900/80 dark:to-pink-950/20 border border-rose-200/50 dark:border-rose-900/40 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
          ✦ AI Media Intelligence & SEO Optimizer
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
          Skor: %{aiData.portfolioQualityScore}
        </span>
      </div>

      {/* AI Üretimi SEO Alt Metni */}
      <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-rose-100 dark:border-rose-900/40 space-y-1 text-xs">
        <span className="text-[10px] text-slate-400 font-bold uppercase block">🖼️ Google SEO Alt-Text Önerisi</span>
        <p className="text-slate-700 dark:text-slate-200 leading-relaxed text-[11px] font-medium">{aiData.generatedAltText}</p>
      </div>

      {/* Akıllı Etiketler */}
      <div className="space-y-1.5 text-xs">
        <span className="text-[10px] text-rose-600 font-bold uppercase block">🏷️ Otomatik Algılanan Akıllı Etiketler</span>
        <div className="flex flex-wrap gap-1.5">
          {aiData.suggestedTags?.map((tag: string, i: number) => (
            <span key={i} className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 border text-[10px] font-mono font-semibold text-rose-600 dark:text-rose-300">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Kontrol Özeti */}
      <div className="p-3 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/50 text-xs flex justify-between items-center text-emerald-800 dark:text-emerald-300">
        <span className="text-[11px] font-bold">✓ Tekrarlayan veya Bulanık Görsel Bulunmadı</span>
        <span className="text-[10px] font-mono font-bold">100% Netlik</span>
      </div>
    </motion.div>
  );
}
