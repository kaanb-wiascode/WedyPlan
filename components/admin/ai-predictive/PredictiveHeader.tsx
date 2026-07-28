"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PredictiveHeader({
  modelAccuracy,
  projectedRevenue,
  customerGrowth,
  vendorGrowth,
  onOpenSimulatorModal,
}: {
  modelAccuracy: number;
  projectedRevenue: string;
  customerGrowth: number;
  vendorGrowth: number;
  onOpenSimulatorModal: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              ✦ WedyPlan Shared AI Predictive Analytics & Future Forecast Engine
            </span>
            <span className="text-xs text-slate-400">Ciro, Talep, Büyüme, Risk & Churn Projeksiyonları</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Predictive Analytics Engine</h1>
        </div>

        <button
          onClick={onOpenSimulatorModal}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          📈 Gelecek Projeksiyon & Tahmin Konsolunu Aç
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Model Tahmin Doğruluğu</span>
          <div className="text-2xl font-bold mt-1 text-indigo-600 flex items-center gap-2">
            <span>%{modelAccuracy}</span>
            <span className="text-xs font-mono font-normal text-slate-400">Time-Series Index</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Yüksek Doğruluk Oranı</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Yıllık Tahmini Ciro</span>
          <div className="text-2xl font-serif font-bold mt-1 text-slate-900 dark:text-slate-100">{projectedRevenue}</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ Projected Annual Volume</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-teal-600 font-medium uppercase">Tahmini Müşteri Büyümesi</span>
          <div className="text-2xl font-mono font-bold mt-1 text-teal-600">+{customerGrowth}%</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">YoY Dynamic Growth</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">Tedarikçi Büyüme Oranı</span>
          <div className="text-2xl font-mono font-bold mt-1 text-purple-600">+{vendorGrowth}%</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Pazaryeri Ekosistem Genişlemesi</span>
        </motion.div>
      </div>
    </div>
  );
}
