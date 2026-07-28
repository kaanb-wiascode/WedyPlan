"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FinanceHeader({
  monthlyRevenue,
  monthlyExpenses,
  netProfit,
  onOpenNewTransaction,
}: {
  monthlyRevenue: number;
  monthlyExpenses: number;
  netProfit: number;
  onOpenNewTransaction: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              ✦ Enterprise Finance & Accounting OS
            </span>
            <span className="text-xs text-slate-400">Finans, Fatura & Kar-Zarar Paneli</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Finance & Accounting Center</h1>
        </div>

        <button
          onClick={onOpenNewTransaction}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold hover:shadow-lg transition flex items-center gap-2"
        >
          + Yeni Gelir / Gider / Fatura Ekle
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Bu Ayki Toplam Gelir</span>
          <div className="text-2xl font-serif font-bold mt-1 text-slate-900 dark:text-slate-100">{monthlyRevenue.toLocaleString("tr-TR")} ₺</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ %18 Büyüme Oranı</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-rose-600 font-medium uppercase">Bu Ayki Toplam Gider</span>
          <div className="text-2xl font-serif font-bold mt-1 text-rose-600">{monthlyExpenses.toLocaleString("tr-TR")} ₺</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Personel, Tedarikçi & Faturalar</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Net Kar Marjı (%38)</span>
          <div className="text-2xl font-serif font-bold mt-1 text-indigo-600">{netProfit.toLocaleString("tr-TR")} ₺</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Vergi Karşılıkları Düşülmüş</span>
        </motion.div>
      </div>
    </div>
  );
}
