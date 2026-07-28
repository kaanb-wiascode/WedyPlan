"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ExperimentHeader({
  costSavings,
  totalExperiments,
  qualityScore,
  activeWinners,
  onOpenSimulatorModal,
}: {
  costSavings: number;
  totalExperiments: number;
  qualityScore: number;
  activeWinners: number;
  onOpenSimulatorModal: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              ✦ WedyPlan Shared AI Experimentation Lab & Model Benchmark Engine
            </span>
            <span className="text-xs text-slate-400">A/B Testing, İstem Kıyaslama, Maliyet & Performans Optimizasyonu</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">AI Experimentation Lab</h1>
        </div>

        <button
          onClick={onOpenSimulatorModal}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          🧪 Canlı Model Benchmark & A/B Test Konsolunu Aç
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Maliyet Tasarruf Oranı</span>
          <div className="text-2xl font-bold mt-1 text-indigo-600 flex items-center gap-2">
            <span>+%{costSavings}</span>
            <span className="text-xs font-mono font-normal text-slate-400">Token Optimization</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Akıllı Model Yönlendirme</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">Yürütülen Deney Sayısı</span>
          <div className="text-2xl font-serif font-bold mt-1 text-slate-900 dark:text-slate-100">{totalExperiments} Test</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ Auto Winner Active</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-teal-600 font-medium uppercase">Ortalama Yanıt Kalitesi</span>
          <div className="text-2xl font-mono font-bold mt-1 text-teal-600">%{qualityScore}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Semantik Doğruluk Skoru</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-pink-600 font-medium uppercase">Aktif Primary Model</span>
          <div className="text-2xl font-mono font-bold mt-1 text-pink-600">{activeWinners} Servis</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Router Entegrasyonu</span>
        </motion.div>
      </div>
    </div>
  );
}
