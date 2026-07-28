"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIProfileOptimizerWidget({
  metaTitle,
  metaDescription,
  suggestedKeywords,
  missingFields,
  onApplySEO,
}: {
  metaTitle: string;
  metaDescription: string;
  suggestedKeywords: string[];
  missingFields: string[];
  onApplySEO: () => void;
}) {
  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-indigo-500/10 via-white/80 to-purple-500/10 dark:from-indigo-950/30 dark:via-slate-900/80 dark:to-purple-950/20 border border-indigo-200/50 dark:border-indigo-900/40 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
          ✦ AI SEO & Profile Optimizer
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
          Arama Motoru Uyumu
        </span>
      </div>

      {/* Google Önizleme */}
      <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-indigo-100 dark:border-indigo-900/40 space-y-1">
        <span className="text-[10px] text-slate-400 font-mono block">🔍 Google Arama Sonucu Önizleme</span>
        <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 line-clamp-1">{metaTitle}</h4>
        <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">{metaDescription}</p>
      </div>

      {/* Önermeli Etiketler */}
      {suggestedKeywords.length > 0 && (
        <div className="space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">🏷️ AI Önerilen Arama Etiketleri</span>
          <div className="flex flex-wrap gap-1.5">
            {suggestedKeywords.map((kw, i) => (
              <span key={i} className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 border text-[10px] font-mono font-semibold text-indigo-600 dark:text-indigo-300">
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Eksik Maddeler */}
      {missingFields.length > 0 && (
        <div className="space-y-1.5 pt-2 border-t border-indigo-100 dark:border-indigo-900/40">
          <span className="text-[10px] text-rose-600 font-bold uppercase block">⚠️ Vitrin Eksik Bilgi Tespiti</span>
          {missingFields.map((mf, i) => (
            <div key={i} className="p-2.5 rounded-xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200/50 text-[11px] text-rose-800 dark:text-rose-300">
              🚨 {mf}
            </div>
          ))}
        </div>
      )}

      <button
        onClick={onApplySEO}
        className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition"
      >
        ✓ AI SEO Metinlerini Profili Ekle
      </button>
    </motion.div>
  );
}
