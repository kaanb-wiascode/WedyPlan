"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ExecutiveHeader({
  vendorName,
  businessHealthScore,
  monthlyRevenue,
  onOpenQuickAction,
}: {
  vendorName: string;
  businessHealthScore: number;
  monthlyRevenue: number;
  onOpenQuickAction: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500/20 to-rose-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
              👑 Flagship Executive Command Center
            </span>
            <span className="text-xs text-slate-400">Tepe Yönetici & Üst Düzey Kontrol Paneli</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">{vendorName}</h1>
        </div>

        <button
          onClick={onOpenQuickAction}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-600 via-rose-600 to-purple-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          ⚡ Yönetici Hızlı Aksiyon Paneli
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-amber-600 font-medium uppercase">İşletme Genel Sağlık Skoru</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span className="text-amber-500">%{businessHealthScore}</span>
            <span className="text-xs font-normal text-emerald-600">Kusursuz İvme</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Satış, Operasyon & Finans Konsolide</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Konsolide Aylık Ciro</span>
          <div className="text-2xl font-serif font-bold mt-1 text-emerald-600">{monthlyRevenue.toLocaleString("tr-TR")} ₺</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Tahsilat Başarı Oranı: %96</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Müşteri Memnuniyeti (CSAT)</span>
          <div className="text-2xl font-bold mt-1 text-indigo-600">★ 4.9 / 5.0</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">98 Doğrulanmış Çift Yorumu</span>
        </motion.div>
      </div>
    </div>
  );
}
