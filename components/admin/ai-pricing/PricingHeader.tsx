"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PricingHeader({
  avgRevenueBoost,
  totalPackages,
  totalYield,
  onOpenSimulatorModal,
}: {
  avgRevenueBoost: number;
  totalPackages: number;
  totalYield: string;
  onOpenSimulatorModal: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              ✦ WedyPlan Shared AI Dynamic Pricing & Revenue Optimization
            </span>
            <span className="text-xs text-slate-400">Sezonsallık, Talep, Doluluk & Rakip Analizi</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Dynamic Pricing Engine</h1>
        </div>

        <button
          onClick={onOpenSimulatorModal}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          💡 Fiyat Simülatörü & Kampanya Konsolunu Aç
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Ortalama Ciro Artışı</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600 flex items-center gap-2">
            <span>+%{avgRevenueBoost}</span>
            <span className="text-xs font-mono font-normal text-slate-400">Gelir Optimizasyonu</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">AI Destekli Fiyatlandırma</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Optimize Edilen Paket</span>
          <div className="text-2xl font-serif font-bold mt-1 text-slate-900 dark:text-slate-100">{totalPackages} Paket</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ Dynamic Rules Active</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-teal-600 font-medium uppercase">Toplam Üretilen Hacim</span>
          <div className="text-2xl font-mono font-bold mt-1 text-teal-600">{totalYield}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Tedarikçi Ciro Katkısı</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">Dönüşüm Oranı Hedefi</span>
          <div className="text-2xl font-mono font-bold mt-1 text-purple-600">%78 Sales Yield</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Dengeli Fiyat Esnekliği</span>
        </motion.div>
      </div>
    </div>
  );
}
