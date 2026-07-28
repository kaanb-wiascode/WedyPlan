"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIOrchestrationHeader({
  qualityScore,
  totalTokensToday,
  totalCostToday,
  avgLatency,
  onOpenTestPlayground,
}: {
  qualityScore: number;
  totalTokensToday: number;
  totalCostToday: string;
  avgLatency: string;
  onOpenTestPlayground: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              ✦ WedyPlan Shared AI Infrastructure OS
            </span>
            <span className="text-xs text-slate-400">Çoklu Sağlayıcı Gateway, Devre Kesici & Akıllı Yönlendirici</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">AI Orchestration Platform</h1>
        </div>

        <button
          onClick={onOpenTestPlayground}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          🧪 AI Gateway Test Playground
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">AI Ekosistem Kalite Skoru</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600 flex items-center gap-2">
            <span>%{qualityScore}</span>
            <span className="text-xs font-mono font-normal text-slate-400">Mükemmel Yanıt</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">5 Sağlayıcı Konsolide</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">Bugün Kullanılan Token</span>
          <div className="text-2xl font-mono font-bold mt-1 text-slate-900 dark:text-slate-100">{(totalTokensToday / 1000000).toFixed(2)}M Token</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ %34 Smart Cost Saving</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Bugünkü Toplam LLM Maliyeti</span>
          <div className="text-2xl font-serif font-bold mt-1 text-emerald-600">{totalCostToday}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Bütçe Sınırları Dahilinde</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-teal-600 font-medium uppercase">Ortalama Gateway Latency</span>
          <div className="text-2xl font-mono font-bold mt-1 text-indigo-600">{avgLatency}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Sub-millisecond Edge Router</span>
        </motion.div>
      </div>
    </div>
  );
}
