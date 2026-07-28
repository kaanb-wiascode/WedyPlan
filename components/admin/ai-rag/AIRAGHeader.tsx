"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIRAGHeader({
  faithfulnessScore,
  totalQueriesToday,
  avgLatency,
  hallucinationRate,
  onOpenTestConsole,
}: {
  faithfulnessScore: number;
  totalQueriesToday: number;
  avgLatency: string;
  hallucinationRate: string;
  onOpenTestConsole: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              ✦ WedyPlan Shared RAG Infrastructure OS
            </span>
            <span className="text-xs text-slate-400">Doğrulanmış Bilgi Retrieval, Re-Ranking & Atıf Katmanı</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Retrieval Augmented Generation (RAG)</h1>
        </div>

        <button
          onClick={onOpenTestConsole}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          🧪 Live RAG Query & Citation Tester
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">RAG Yanıt Sadakat Skoru</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600 flex items-center gap-2">
            <span>%{faithfulnessScore}</span>
            <span className="text-xs font-mono font-normal text-slate-400">Sıfır Sapma</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Zero Unverified Hallucination</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Bugün Yanıtlanan RAG Sorguları</span>
          <div className="text-2xl font-mono font-bold mt-1 text-slate-900 dark:text-slate-100">{totalQueriesToday.toLocaleString("tr-TR")} Sorgu</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ 6-Step Pipeline Passed</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">Ortalama Toplam RAG Latency</span>
          <div className="text-2xl font-mono font-bold mt-1 text-purple-600">{avgLatency}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Retrieval + Re-Rank + Gen</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-rose-600 font-medium uppercase">Algılanan Hallüsinasyon Riski</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600 flex items-center gap-2">
            <span>{hallucinationRate}</span>
            <span className="text-xs font-mono font-normal text-slate-400">Güvenli</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Automatic Guardrail Active</span>
        </motion.div>
      </div>
    </div>
  );
}
