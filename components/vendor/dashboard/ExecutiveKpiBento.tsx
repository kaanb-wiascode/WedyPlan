"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ExecutiveKpiBento({ kpis }: { kpis: any }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Bugünün Cirosu */}
      <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-1">
        <span className="text-xs text-slate-400 font-medium uppercase">Bugünün Cirosu</span>
        <div className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100">{kpis.todayRevenue}</div>
        <span className="text-[10px] text-emerald-600 font-bold block">✓ Tahsil Edildi</span>
      </motion.div>

      {/* Aylık Ciro */}
      <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-1">
        <span className="text-xs text-slate-400 font-medium uppercase">Bu Ayın Cirosu</span>
        <div className="text-2xl font-serif font-bold text-emerald-600">{kpis.monthlyRevenue}</div>
        <span className="text-[10px] text-emerald-600 font-bold block">{kpis.revenueGrowth} Büyüme</span>
      </motion.div>

      {/* Gelen Talepler (Leads) */}
      <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-1">
        <span className="text-xs text-slate-400 font-medium uppercase">Yeni Müşteri Talepleri</span>
        <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{kpis.newLeadsCount} Talep</div>
        <span className="text-[10px] text-indigo-600 font-bold block">{kpis.pendingOffersCount} Teklif Bekliyor</span>
      </motion.div>

      {/* Dönüşüm Oranı */}
      <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-1">
        <span className="text-xs text-slate-400 font-medium uppercase">Teklif Dönüşüm Oranı</span>
        <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{kpis.conversionRate}</div>
        <span className="text-[10px] text-slate-400 block font-normal">★ {kpis.customerSatisfactionScore} Müşteri Puanı</span>
      </motion.div>
    </div>
  );
}
