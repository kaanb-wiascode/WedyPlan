"use client";

import React from "react";
import { motion } from "framer-motion";

export default function BIKpiBento({ kpis }: { kpis: any }) {
  if (!kpis) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-1">
        <span className="text-xs text-slate-400 font-medium uppercase">Yıllık Konsolide Ciro</span>
        <div className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100">{kpis.totalRevenue}</div>
        <span className="text-[10px] text-emerald-600 font-bold block">{kpis.revenueGrowth} Büyüme Oranı</span>
      </motion.div>

      <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-1">
        <span className="text-xs text-slate-400 font-medium uppercase">Satış Dönüşüm Oranı</span>
        <div className="text-2xl font-bold text-indigo-600">{kpis.conversionRate}</div>
        <span className="text-[10px] text-slate-400 block font-normal">Sözleşme Başarı: {kpis.contractSuccessRate}</span>
      </motion.div>

      <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-1">
        <span className="text-xs text-slate-400 font-medium uppercase">Ortalama Kampanya ROI</span>
        <div className="text-2xl font-bold text-purple-600">{kpis.campaignRoi}</div>
        <span className="text-[10px] text-slate-400 block font-normal">3.4x Reklam Getirisi</span>
      </motion.div>

      <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-1">
        <span className="text-xs text-slate-400 font-medium uppercase">Müşteri Memnuniyeti (CSAT)</span>
        <div className="text-2xl font-bold text-emerald-600">★ {kpis.customerSatisfactionScore}</div>
        <span className="text-[10px] text-slate-400 block font-normal">İptal Oranı: {kpis.cancellationRate}</span>
      </motion.div>
    </div>
  );
}
