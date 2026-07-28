"use client";

import React from "react";
import { motion } from "framer-motion";

export default function CustomerSuccessHeader({
  averageHealthScore,
  riskAccountsCount,
  vipAccountsCount,
  onOpenNewPlanModal,
}: {
  averageHealthScore: number;
  riskAccountsCount: number;
  vipAccountsCount: number;
  onOpenNewPlanModal: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              ✦ WedyPlan Customer Success & Retention OS
            </span>
            <span className="text-xs text-slate-400">Sağlık Skorları, Onboarding & Churn Önleme</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Customer Success Center</h1>
        </div>

        <button
          onClick={onOpenNewPlanModal}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          + Yeni Müşteri Başarı Planı Oluştur
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Ortalama Ekosistem Sağlık Skoru</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600 flex items-center gap-2">
            <span>%{averageHealthScore}</span>
            <span className="text-xs font-mono font-normal text-slate-400">Yüksek Benimseme</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Ürün Kullanım & Etkileşim İdeal</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-rose-600 font-medium uppercase">Risk Altındaki Hesaplar (Churn Risk)</span>
          <div className="text-2xl font-bold mt-1 text-rose-600 flex items-center gap-2">
            <span>{riskAccountsCount} Hesap</span>
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Proaktif Müdahale Bekliyor</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">Yönetilen VIP Hesaplar</span>
          <div className="text-2xl font-bold mt-1 text-purple-600 font-mono">{vipAccountsCount} VIP Marka</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Özel CSM Danışmanlığı Atanmış</span>
        </motion.div>
      </div>
    </div>
  );
}
