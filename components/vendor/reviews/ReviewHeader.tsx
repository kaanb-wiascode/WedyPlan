"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ReviewHeader({
  overallRating,
  totalReviews,
  reputationScore,
  pendingCount,
  onOpenRequestModal,
}: {
  overallRating: number;
  totalReviews: number;
  reputationScore: number;
  pendingCount: number;
  onOpenRequestModal: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
              ✦ Reputation & Review Management OS
            </span>
            <span className="text-xs text-slate-400">Müşteri Yorumları & İtibar Kasası</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Review & Reputation Center</h1>
        </div>

        <button
          onClick={onOpenRequestModal}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold hover:shadow-lg transition flex items-center gap-2"
        >
          + Çiftten Yorum & Puan İste
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-amber-600 font-medium uppercase">Genel Müşteri Puanı</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <span className="text-amber-500">★ {overallRating}</span>
            <span className="text-xs text-slate-400 font-normal">/ 5.0</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">{totalReviews} Doğrulanmış Müşteri Yorumu</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Marka İtibar Skoru</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600">%{reputationScore} Mükemmel</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Sektör Standartlarının %12 Üzerinde</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Yanıt Bekleyen Yorumlar</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">{pendingCount} Yorum</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">AI Destekli Hızlı Yanıt Hazır</span>
        </motion.div>
      </div>
    </div>
  );
}
