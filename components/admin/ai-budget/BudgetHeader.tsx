"use client";

import React from "react";
import { motion } from "framer-motion";

export default function BudgetHeader({
  healthScore,
  totalManaged,
  avgSavings,
  analyzedCount,
  onOpenSimulationModal,
}: {
  healthScore: number;
  totalManaged: string;
  avgSavings: number;
  analyzedCount: number;
  onOpenSimulationModal: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              ✦ WedyPlan Shared AI Budget Intelligence & Forecast Engine
            </span>
            <span className="text-xs text-slate-400">Bütçe Tahmini, Risk Analizi & Nakit Akış Zaman Tüneli</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Budget Intelligence Engine</h1>
        </div>

        <button
          onClick={onOpenSimulationModal}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          💡 Etkileşimli Bütçe Simülatörünü Çalıştır
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">AI Bütçe Sağlık Skoru</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600 flex items-center gap-2">
            <span>%{healthScore}</span>
            <span className="text-xs font-mono font-normal text-slate-400">Optimum Dağılım</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Düşük Bütçe Aşım Riski</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Yönetilen Toplam Düğün Bütçesi</span>
          <div className="text-2xl font-serif font-bold mt-1 text-slate-900 dark:text-slate-100">{totalManaged}</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ 100% Verified Transactions</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-teal-600 font-medium uppercase">Ortalama Tasarruf Oranı</span>
          <div className="text-2xl font-mono font-bold mt-1 text-teal-600">%{avgSavings}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Paket & ROI Optimizasyonu</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">Analiz Edilen Düğün Planı</span>
          <div className="text-2xl font-mono font-bold mt-1 text-indigo-600">{analyzedCount} Plan</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Gerçek Zamanlı AI Takibi</span>
        </motion.div>
      </div>
    </div>
  );
}
