"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SubscriptionHeader({
  currentPlanName,
  billingCycle,
  nextRenewalDate,
  monthlyCost,
  onOpenUpgradeModal,
}: {
  currentPlanName: string;
  billingCycle: string;
  nextRenewalDate: string;
  monthlyCost: number;
  onOpenUpgradeModal: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              ✦ Vendor Subscription & Billing OS
            </span>
            <span className="text-xs text-slate-400">Kurumsal Paket & Ödeme Merkezi</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Subscription & Billing Center</h1>
        </div>

        <button
          onClick={onOpenUpgradeModal}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold hover:shadow-lg transition flex items-center gap-2"
        >
          ⚡ Paketi Yükselt / Değiştir
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Aktif Abonelik Planı</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>{currentPlanName}</span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              {billingCycle}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">WedyPlan Verified Partner</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Abonelik Bedeli</span>
          <div className="text-2xl font-serif font-bold mt-1 text-indigo-600">{monthlyCost.toLocaleString("tr-TR")} ₺ / Ay</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Otomatik Yenileme Aktif</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-amber-600 font-medium uppercase">Sonraki Yenileme Tarihi</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">{nextRenewalDate}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Kredi Kartından Otomatik Çekim</span>
        </motion.div>
      </div>
    </div>
  );
}
