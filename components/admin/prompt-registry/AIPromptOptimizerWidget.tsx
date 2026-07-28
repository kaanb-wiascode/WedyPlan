"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { generateAIPromptOptimizationAction } from "@/lib/actions/ai-prompt-registry";

export default function AIPromptOptimizerWidget({ aiReport }: { aiReport: any }) {
  const [rawText, setRawText] = useState("");
  const [optimizationResult, setOptimizationResult] = useState<any>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  if (!aiReport) return null;

  const handleOptimize = async () => {
    if (!rawText.trim()) return;
    setIsOptimizing(true);

    const res = await generateAIPromptOptimizationAction({
      rawPrompt: rawText,
    });

    setIsOptimizing(false);

    if (res.success) {
      setOptimizationResult(res);
      alert("✨ " + res.message);
    }
  };

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-purple-500/10 via-white/80 to-indigo-500/10 dark:from-purple-950/30 dark:via-slate-900/80 dark:to-indigo-950/20 border border-purple-200/50 dark:border-purple-900/40 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400">
          ✦ AI Prompt Quality & Auto-Optimization Engine
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
          Otonom İyileştirici
        </span>
      </div>

      <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-purple-100 dark:border-purple-900/40 space-y-1">
        <span className="text-[10px] text-slate-400 font-bold uppercase block">📝 AI Prompt Denetim Özeti</span>
        <p className="text-slate-800 dark:text-slate-100 leading-relaxed text-[11px] font-medium">{aiReport.aiAnalysis}</p>
      </div>

      {/* Hızlı AI Prompt İyileştirme Konsolu */}
      <div className="space-y-2 pt-2 border-t border-purple-100 dark:border-purple-900/40">
        <span className="font-bold text-slate-700 dark:text-slate-200 block">⚡ Anında Prompt İyileştirme (Prompt Tuner)</span>
        <textarea
          rows={2}
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          placeholder="İyileştirmek istediğiniz taslak prompt metnini buraya yazın..."
          className="w-full p-2.5 rounded-xl border border-purple-200 dark:border-purple-900/40 bg-white dark:bg-slate-800 text-[11px] resize-none"
        />
        <button
          onClick={handleOptimize}
          disabled={isOptimizing || !rawText.trim()}
          className="w-full py-2 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition disabled:opacity-50 text-[11px]"
        >
          {isOptimizing ? "Yapay Zeka Optimize Ediyor..." : "✨ Prompt'u Yapay Zeka İle Parlat"}
        </button>

        {optimizationResult && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/50 space-y-1 font-mono text-[10px]">
            <span className="font-bold text-emerald-700 dark:text-emerald-300 block">
              ✓ Optimize Edildi (%{optimizationResult.originalScore} → %{optimizationResult.optimizedScore})
            </span>
            <p className="text-slate-800 dark:text-slate-200 leading-relaxed">{optimizationResult.optimizedPrompt}</p>
          </div>
        )}
      </div>

      <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/50 text-indigo-900 dark:text-indigo-200 font-semibold">
        💡 <strong>AI Optimizasyon Önerisi:</strong> {aiReport.optimizationRecommendations[0]}
      </div>
    </motion.div>
  );
}
