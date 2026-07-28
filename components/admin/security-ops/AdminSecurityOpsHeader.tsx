"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AdminSecurityOpsHeader({
  securityScore,
  blockedThreats24h,
  activeIncidentsCount,
  onOpenEmergencyLock,
}: {
  securityScore: number;
  blockedThreats24h: number;
  activeIncidentsCount: number;
  onOpenEmergencyLock: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
              ✦ WedyPlan Security Operations Center (SOC)
            </span>
            <span className="text-xs text-slate-400">Zero-Trust Siber Tehdit & Anomali Komuta Merkezi</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Security Operations Center</h1>
        </div>

        <button
          onClick={onOpenEmergencyLock}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          🚨 Acil Durum Oturum Dondurucusu (Panic Lock)
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Platform Siber Sağlık Skoru</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600 flex items-center gap-2">
            <span>%{securityScore}</span>
            <span className="text-xs font-mono font-normal text-slate-400">Kusursuz</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">256-bit AES & WAF Kalkanı Devrede</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Engellenen Saldırılar (Son 24s)</span>
          <div className="text-2xl font-serif font-bold mt-1 text-indigo-600">{blockedThreats24h} Saldırı</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ Bot & Brute-Force Otonom Engellendi</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-rose-600 font-medium uppercase">Aktif Siber İnsidant Kuyruğu</span>
          <div className="text-2xl font-bold mt-1 text-rose-600 flex items-center gap-2">
            <span>{activeIncidentsCount} İnsidant</span>
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">SOC Mühendis İncelemesinde</span>
        </motion.div>
      </div>
    </div>
  );
}
