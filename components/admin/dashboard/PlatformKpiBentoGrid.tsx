"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PlatformKpiBentoGrid({ metrics }: { metrics: any }) {
  if (!metrics) return null;

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        📊 Ekosistem Finans, Trafik & Büyüme Bento UI
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* GMV */}
        <motion.div whileHover={{ y: -2 }} className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Platform Brüt İşlem Hacmi (GMV)</span>
          <div className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100">{metrics.financials?.grossMerchandiseValue}</div>
          <span className="text-[10px] text-emerald-600 font-bold block">✓ Yıllık ARR: {metrics.financials?.arr}</span>
        </motion.div>

        {/* Trafik & Dönüşüm */}
        <motion.div whileHover={{ y: -2 }} className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Aylık Trafik & Dönüşüm</span>
          <div className="text-xl font-bold text-indigo-600">{metrics.growthAndTraffic?.monthlyVisitors} Ziyaretçi</div>
          <span className="text-[10px] text-slate-400">Pazar Yeri Dönüşümü: {metrics.growthAndTraffic?.conversionRate}</span>
        </motion.div>

        {/* İptal & İade */}
        <motion.div whileHover={{ y: -2 }} className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">İptal & İade Oranları</span>
          <div className="text-xl font-bold text-slate-900 dark:text-slate-100">{metrics.growthAndTraffic?.cancellationRate} İptal</div>
          <span className="text-[10px] text-emerald-600 font-bold">İade Oranı: {metrics.growthAndTraffic?.refundRate} (Çok Düşük)</span>
        </motion.div>

        {/* Destek Kuyruğu */}
        <motion.div whileHover={{ y: -2 }} className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Destek Kuyruğu & Kriz</span>
          <div className="text-xl font-bold text-amber-600">{metrics.ecosystem?.supportQueueOpenCount} Açık Bilet</div>
          <span className="text-[10px] text-emerald-600 font-bold">0 Aktif Güvenlik/Sistem İnsidantı</span>
        </motion.div>
      </div>
    </div>
  );
}
