"use client";

import React from "react";
import { motion } from "framer-motion";

export default function MonitoringHeader({
  availabilityPct,
  healthyServicesCount,
  totalServicesCount,
  avgLatencyMs,
  onOpenAnalysisModal,
}: {
  availabilityPct: number;
  healthyServicesCount: number;
  totalServicesCount: number;
  avgLatencyMs: number;
  onOpenAnalysisModal: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              ✦ WedyPlan Shared Enterprise Service Monitoring & Real-Time Health Platform
            </span>
            <span className="text-xs text-slate-400">Liveness, Readiness, SLA, Heartbeat & AI Root Cause</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Enterprise Monitoring Platform</h1>
        </div>

        <button
          onClick={onOpenAnalysisModal}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          🔮 AI Predictive Failure & Capacity Konsolunu Aç
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Genel Kullanılabilirlik (SLA)</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600 flex items-center gap-2">
            <span>%{availabilityPct}</span>
            <span className="text-xs font-mono font-normal text-slate-400">99.99% Target</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Sıfır Kesinti Hedefi</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Sağlıklı Servis Sayısı</span>
          <div className="text-2xl font-serif font-bold mt-1 text-slate-900 dark:text-slate-100">{healthyServicesCount} / {totalServicesCount} Servis</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ All Systems Nominal</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-teal-600 font-medium uppercase">Ortalama Sistem Latensi</span>
          <div className="text-2xl font-mono font-bold mt-1 text-teal-600">{avgLatencyMs}ms</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Mikro-Saniyeler Düzeyinde Tepki</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">Heartbeat Frekansı</span>
          <div className="text-2xl font-mono font-bold mt-1 text-purple-600">5 SANİYE</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Kesintisiz Canlı Denetim</span>
        </motion.div>
      </div>
    </div>
  );
}