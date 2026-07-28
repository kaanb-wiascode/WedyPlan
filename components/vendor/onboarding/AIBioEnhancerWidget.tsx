"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIBioEnhancerWidget({
  enhancedBio,
  keywords,
  isEnhancing,
  onApplyBio,
}: {
  enhancedBio: string;
  keywords: string[];
  isEnhancing: boolean;
  onApplyBio: (text: string) => void;
}) {
  if (!enhancedBio) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-5 backdrop-blur-2xl bg-gradient-to-br from-indigo-500/10 via-white/80 to-purple-500/10 dark:from-indigo-950/30 dark:via-slate-900/80 dark:to-purple-950/20 border border-indigo-200/50 dark:border-indigo-900/40 rounded-3xl space-y-3"
    >
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
          ✦ AI Kurumsal Metin & SEO Dokunuşu
        </span>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
          Lüks Segment Uyumlu
        </span>
      </div>

      <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line bg-white/60 dark:bg-slate-800/40 p-3 rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
        {enhancedBio}
      </p>

      {keywords.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {keywords.map((kw, i) => (
            <span key={i} className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-300">
              {kw}
            </span>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => onApplyBio(enhancedBio)}
        className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition shadow-sm"
      >
        ✓ AI Metnini Açıklama Olarak Kullan
      </button>
    </motion.div>
  );
}
