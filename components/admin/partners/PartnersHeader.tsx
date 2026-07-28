"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PartnersHeader({
  activePartnersCount,
  pendingAppsCount,
  totalPayoutsMonth,
  ecosystemHealthScore,
  onOpenNewPartnerModal,
}: {
  activePartnersCount: number;
  pendingAppsCount: number;
  totalPayoutsMonth: string;
  ecosystemHealthScore: number;
  onOpenNewPartnerModal: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              ✦ WedyPlan Strategic Partner & Affiliate OS
            </span>
            <span className="text-xs text-slate-400">7 Farklı Ortaklık Modeli, Komisyonlar & Fraud Kalkanı</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Partner & Affiliate Management Platform</h1>
        </div>

        <button
          onClick={onOpenNewPartnerModal}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          🤝 Yeni İş Ortağı / Influencer Davet Et
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Aktif İş Ortakları Ekosistemi</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">{activePartnersCount} Ortak</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Plancılar, Ajanslar & Influencerlar</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Bu Ay Dağıtılan Toplam Hakediş</span>
          <div className="text-2xl font-serif font-bold mt-1 text-indigo-600">{totalPayoutsMonth}</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ Otomatik E-Fatura & Stopaj Hesabı</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-amber-600 font-medium uppercase">Bekleyen Başvurular (Applications)</span>
          <div className="text-2xl font-bold mt-1 text-amber-600 font-mono">{pendingAppsCount} Başvuru</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">AI Otomatik Ön Taramadan Geçti</span>
        </motion.div>
      </div>
    </div>
  );
}
