"use client";

import React from "react";
import { motion } from "framer-motion";

export default function VendorDashboardHeader({
  vendorName,
  aiBusinessScore,
  profileQualityScore,
  unreadCount,
}: {
  vendorName: string;
  aiBusinessScore: number;
  profileQualityScore: number;
  unreadCount: number;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              ✦ Executive Business OS
            </span>
            <span className="text-xs text-slate-400">Tedarikçi Yönetim Merkezi</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">{vendorName}</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert("📩 Mesajlaşma Merkezine Yönlendiriliyorsunuz...")}
            className="px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold hover:bg-slate-50 transition flex items-center gap-2"
          >
            💬 Okunmamış Mesajlar
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-rose-500 text-white font-bold">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Skorkartlar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">AI Business Health Score</span>
          <div className="text-2xl font-bold mt-1 text-indigo-600">%{aiBusinessScore} Mükemmel</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Sektör Ortalamasının %15 Üzerinde</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Profil Onay & Kalite</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600">%{profileQualityScore} Doğrulanmış</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">WedyPlan Verified Badge Active</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-amber-600 font-medium uppercase">Ortalama Yanıt Süresi</span>
          <div className="text-2xl font-bold mt-1 text-amber-600">14 Dakika</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Anında Dönüş Standartlarında</span>
        </motion.div>
      </div>
    </div>
  );
}
