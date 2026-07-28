"use client";

import React from "react";
import { motion } from "framer-motion";

export default function TrainingHeader({
  healthScore,
  activeModels,
  totalSamples,
  costSavings,
  onOpenStartJobModal,
}: {
  healthScore: number;
  activeModels: number;
  totalSamples: number;
  costSavings: string;
  onOpenStartJobModal: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              ✦ WedyPlan Shared AI Training & Fine-Tuning Infrastructure OS
            </span>
            <span className="text-xs text-slate-400">Özel Model Eğitimi, Sentetik Veri & Maliyet Tasarrufu</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">AI Model Fine-Tuning Center</h1>
        </div>

        <button
          onClick={onOpenStartJobModal}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          ⚡ Yeni Model Fine-Tuning Eğitimi Başlat
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Model Başarım Skoru</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600 flex items-center gap-2">
            <span>%{healthScore}</span>
            <span className="text-xs font-mono font-normal text-slate-400">Düşük Kayıp (Loss)</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Zero Overfitting Active</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">Aktif Özel Eğitilmiş Modeller</span>
          <div className="text-2xl font-mono font-bold mt-1 text-slate-900 dark:text-slate-100">{activeModels} Özel Model</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ Self-Hosted Llama-3 Active</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Aylık LLM Tasarruf Miktarı</span>
          <div className="text-2xl font-serif font-bold mt-1 text-emerald-600">{costSavings}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">%82 Maliyet Düşüşü</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-teal-600 font-medium uppercase">Eğitilmiş Toplam Veri Örneği</span>
          <div className="text-2xl font-mono font-bold mt-1 text-indigo-600">{(totalSamples / 1000).toFixed(0)}K Sample</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">PII Cleaned %100</span>
        </motion.div>
      </div>
    </div>
  );
}
