"use client";

import React from "react";
import { motion } from "framer-motion";

export default function LoadTestingHeader({
  maxUsersCount,
  maxRps,
  avgP95Ms,
  overallScalabilityScore,
  onOpenGeneratorModal,
}: {
  maxUsersCount: number;
  maxRps: number;
  avgP95Ms: number;
  overallScalabilityScore: string;
  onOpenGeneratorModal: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300">
              ✦ WedyPlan Shared Enterprise Scalability & Distributed Load Testing Platform
            </span>
            <span className="text-xs text-slate-400">Concurrent VU, Peak RPS, P95/P99 Latency & Capacity Forecast</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Load Testing Platform</h1>
        </div>

        <button
          onClick={onOpenGeneratorModal}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-600 via-teal-600 to-indigo-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          🚀 Yeni Dağıtık Yük Testi Tetikle
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-cyan-600 font-medium uppercase">Maksimum Güvenli Kullanıcı (VU)</span>
          <div className="text-2xl font-bold mt-1 text-cyan-600 flex items-center gap-2">
            <span>{maxUsersCount.toLocaleString()} VU</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Eşzamanlı Yük Kapasitesi</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Desteklenen Maksimum RPS</span>
          <div className="text-2xl font-serif font-bold mt-1 text-slate-900 dark:text-slate-100">{maxRps.toLocaleString()} İstek/sn</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ Ultra-High Throughput</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-teal-600 font-medium uppercase">Ortalama P95 Latens</span>
          <div className="text-2xl font-mono font-bold mt-1 text-teal-600">{avgP95Ms} ms</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Zirve Trafikte Hızlı Yanıt</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">Ölçeklenebilirlik Notu</span>
          <div className="text-lg font-bold mt-1 text-purple-600 font-mono">{overallScalabilityScore}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">High Scale Certified</span>
        </motion.div>
      </div>
    </div>
  );
}
