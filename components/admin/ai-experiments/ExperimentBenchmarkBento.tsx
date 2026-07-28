"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ExperimentBenchmarkBento() {
  const models = [
    { name: "Claude 3.5 Sonnet", provider: "Anthropic", latency: "140 ms", quality: "%98.5 Quality", isWinner: true, icon: "👑", color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40" },
    { name: "GPT-4o", provider: "OpenAI", latency: "220 ms", quality: "%97.8 Quality", isWinner: false, icon: "⚡", color: "text-purple-600 bg-purple-50 dark:bg-purple-950/40" },
    { name: "Gemini 1.5 Pro", provider: "Google Gemini", latency: "180 ms", quality: "%94.2 Quality", isWinner: false, icon: "💎", color: "text-teal-600 bg-teal-50 dark:bg-teal-950/40" },
    { name: "Llama 3 8B Instruct", provider: "Self-Hosted", latency: "80 ms", quality: "%89.0 Quality", isWinner: false, icon: "🦙", color: "text-amber-600 bg-amber-50 dark:bg-amber-950/40" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        📊 Model Kıyaslama & Benchmark Matrisi (Model Benchmark Matrix)
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {models.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -2 }}
            className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 shadow-sm space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs">{item.name}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">Sağlayıcı: {item.provider}</span>
                  </div>
                </div>

                {item.isWinner && (
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold font-mono bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    KAZANAN MODEL
                  </span>
                )}
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border font-mono text-[10px] flex justify-between items-center">
              <span className="text-slate-400">Gecikme / Kalite:</span>
              <span className="font-bold text-indigo-600 text-xs">{item.latency} | {item.quality}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
