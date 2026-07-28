"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AISupportAssistantWidget({ aiSolution }: { aiData?: any; aiSolution: any }) {
  if (!aiSolution) return null;

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-sky-500/10 via-white/80 to-indigo-500/10 dark:from-sky-950/30 dark:via-slate-900/80 dark:to-indigo-950/20 border border-sky-200/50 dark:border-sky-900/40 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-700 dark:text-sky-400">
          ✦ AI Support Copilot & Instant Diagnostics
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
          Otomatik Teşhis
        </span>
      </div>

      {/* Yapay Zeka Çözüm Önerisi */}
      <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-sky-100 dark:border-sky-900/40 space-y-1 text-xs">
        <span className="text-[10px] text-slate-400 font-bold uppercase block">💡 AI Tarafından Algılanan Anında Çözüm</span>
        <p className="text-slate-700 dark:text-slate-200 leading-relaxed text-[11px] font-medium">{aiSolution.suggestedSolution}</p>
      </div>

      {/* İlgili Bilgi Bankası Makaleleri */}
      {aiSolution.relatedKbArticles && aiSolution.relatedKbArticles.length > 0 && (
        <div className="space-y-1.5 text-xs">
          <span className="text-[10px] text-sky-600 font-bold uppercase block">📚 Önerilen Yardım Rehberleri</span>
          <div className="space-y-1">
            {aiSolution.relatedKbArticles.map((kb: any) => (
              <div key={kb.id} className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border text-[11px] flex justify-between items-center hover:border-sky-300 transition cursor-pointer">
                <span className="font-semibold text-slate-800 dark:text-slate-100">📖 {kb.title}</span>
                <span className="text-[10px] font-mono text-slate-400">{kb.readTime}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
