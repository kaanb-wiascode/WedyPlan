"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FinancialKpiBento({
  pendingCollections,
  commissionAmount,
  recurringExpenses,
}: {
  pendingCollections: number;
  commissionAmount: number;
  recurringExpenses: number;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-1">
        <span className="text-xs text-amber-600 font-medium uppercase">Bekleyen Müşteri Tahsilatları</span>
        <div className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100">{pendingCollections.toLocaleString("tr-TR")} ₺</div>
        <span className="text-[10px] text-amber-600 font-bold block">3 Taksitin Vadesi Yaklaşıyor</span>
      </motion.div>

      <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-1">
        <span className="text-xs text-purple-600 font-medium uppercase">WedyPlan Platform Komisyonu</span>
        <div className="text-xl font-serif font-bold text-purple-600">{commissionAmount.toLocaleString("tr-TR")} ₺</div>
        <span className="text-[10px] text-slate-400 block font-normal">%5 Sabit Lüks Komisyon Oranı</span>
      </motion.div>

      <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-1">
        <span className="text-xs text-rose-600 font-medium uppercase">Sabit / Tekrarlayan Giderler</span>
        <div className="text-xl font-serif font-bold text-rose-600">{recurringExpenses.toLocaleString("tr-TR")} ₺</div>
        <span className="text-[10px] text-slate-400 block font-normal">Kira, Personel Maaşları & Yazılımlar</span>
      </motion.div>
    </div>
  );
}
