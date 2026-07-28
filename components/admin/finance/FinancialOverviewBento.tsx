"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FinancialOverviewBento({ financials }: { financials: any }) {
  if (!financials) return null;

  return (
    <div className="space-y-4 text-xs">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
        📊 Gelir, Gider, Vergi & Ters İbraz Bento Grid
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Payouts Released */}
        <motion.div whileHover={{ y: -2 }} className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-[10px] text-emerald-600 font-bold uppercase block">Aktarılan Tedarikçi Hakedişleri</span>
          <div className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100">{financials.releasedPayouts}</div>
          <span className="text-[10px] text-slate-400">Banka Transferi Tamamlandı</span>
        </motion.div>

        {/* Pending Escrow */}
        <motion.div whileHover={{ y: -2 }} className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-[10px] text-indigo-600 font-bold uppercase block">Bekleyen Escrow Bakiyesi</span>
          <div className="text-xl font-serif font-bold text-indigo-600">{financials.pendingEscrow}</div>
          <span className="text-[10px] text-slate-400">Düğün Sonu Onayı Bekliyor</span>
        </motion.div>

        {/* Taxes & KDV */}
        <motion.div whileHover={{ y: -2 }} className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-[10px] text-purple-600 font-bold uppercase block">Vergi & KDV Karşılıkları</span>
          <div className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100">{financials.taxReserves}</div>
          <span className="text-[10px] text-emerald-600 font-bold">✓ Otomatik E-Fatura Entegre</span>
        </motion.div>

        {/* Chargebacks */}
        <motion.div whileHover={{ y: -2 }} className="p-4 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 space-y-1 shadow-sm">
          <span className="text-[10px] text-rose-600 font-bold uppercase block">Ters İbraz / İtirazlı İşlem</span>
          <div className="text-xl font-bold text-rose-600">{financials.chargebacksCount} Adet ({financials.chargebacksAmount})</div>
          <span className="text-[10px] text-slate-400">Banka İtiraz Sürecinde</span>
        </motion.div>
      </div>
    </div>
  );
}
