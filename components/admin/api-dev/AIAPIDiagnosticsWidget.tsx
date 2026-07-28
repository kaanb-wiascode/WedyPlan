"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIAPIDiagnosticsWidget({ aiReport }: { aiReport: any }) {
  if (!aiReport) return null;

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-indigo-500/10 via-white/80 to-purple-500/10 dark:from-indigo-950/30 dark:via-slate-900/80 dark:to-purple-950/20 border border-indigo-200/50 dark:border-indigo-900/40 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
          ✦ AI API Error Explanation & Security Engine
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          Spec: {aiReport.openApiSpecVersion}
        </span>
      </div>

      <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-indigo-100 dark:border-indigo-900/40 space-y-1">
        <span className="text-[10px] text-slate-400 font-bold uppercase block">📝 AI API Durum Özeti</span>
        <p className="text-slate-800 dark:text-slate-100 leading-relaxed text-[11px] font-medium">{aiReport.aiAnalysis}</p>
      </div>

      {/* Hata Çözümlemesi */}
      <div className="p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/50 space-y-1">
        <span className="text-[10px] text-amber-600 font-bold uppercase block">🔍 AI Hata Çözümleyici (Error Explanation)</span>
        <p className="text-amber-900 dark:text-amber-200 text-[11px] font-medium leading-relaxed">
          {aiReport.errorExplanation}
        </p>
      </div>

      <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/50 text-indigo-900 dark:text-indigo-200 font-semibold">
        🛡️ <strong>AI Güvenlik Önerisi:</strong> {aiReport.securitySuggestion}
      </div>
    </motion.div>
  );
}
