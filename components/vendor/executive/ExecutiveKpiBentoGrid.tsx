"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ExecutiveKpiBentoGrid({ kpis }: { kpis: any }) {
  if (!kpis) return null;

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        📊 15 Metrikli Çok Boyutlu İşletme Bento Grid
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Sales Funnel & Conversion */}
        <motion.div whileHover={{ y: -2 }} className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-[10px] text-indigo-600 font-bold uppercase block">Satış Hunisi Dönüşümü</span>
          <div className="text-xl font-bold text-slate-900 dark:text-slate-100">{kpis.conversionRate}</div>
          <span className="text-[10px] text-slate-400">Ort. Yanıt Süresi: {kpis.responseTime}</span>
        </motion.div>

        {/* Cash Flow */}
        <motion.div whileHover={{ y: -2 }} className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-[10px] text-emerald-600 font-bold uppercase block">Net Nakit Akışı</span>
          <div className="text-xl font-serif font-bold text-emerald-600">{kpis.cashFlow}</div>
          <span className="text-[10px] text-slate-400">Gelecek Tahsilat: {kpis.upcomingCollection}</span>
        </motion.div>

        {/* Contract Pipeline */}
        <motion.div whileHover={{ y: -2 }} className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-[10px] text-purple-600 font-bold uppercase block">Sözleşme Hattı</span>
          <div className="text-xl font-bold text-slate-900 dark:text-slate-100">{kpis.activeContractsCount} Yürürlükte</div>
          <span className="text-[10px] text-amber-600 font-bold">{kpis.pendingApprovalsCount} Onay Bekliyor</span>
        </motion.div>

        {/* Inventory & Assets */}
        <motion.div whileHover={{ y: -2 }} className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-[10px] text-amber-600 font-bold uppercase block">Saha Demirbaş & Depo</span>
          <div className="text-xl font-bold text-slate-900 dark:text-slate-100">%{kpis.inventoryUtilization} Kullanımda</div>
          <span className="text-[10px] text-slate-400">2 Ekipman Bakımda</span>
        </motion.div>
      </div>
    </div>
  );
}
