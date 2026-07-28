"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ObservabilityHeader({
  cpuUsage,
  ramUsage,
  p99Latency,
  errorRate,
  onOpenAlertModal,
}: {
  cpuUsage: number;
  ramUsage: number;
  p99Latency: number;
  errorRate: number;
  onOpenAlertModal: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300">
              ✦ WedyPlan Shared Enterprise Observability & Telemetry Control Center
            </span>
            <span className="text-xs text-slate-400">Metrikler, Merkezi Loglar, Dağıtık İzleme (Tracing) & Alarm Merkezi</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Enterprise Observability Platform</h1>
        </div>

        <button
          onClick={onOpenAlertModal}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-600 via-teal-600 to-indigo-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          🚨 Canlı Alarm & Bildirim Konsolunu Aç
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-cyan-600 font-medium uppercase">CPU Kullanımı</span>
          <div className="text-2xl font-bold mt-1 text-cyan-600 flex items-center gap-2">
            <span>%{cpuUsage}</span>
            <span className="text-xs font-mono font-normal text-slate-400">24 Containers</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Dengeli Altyapı Yükü</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">RAM Tüketimi</span>
          <div className="text-2xl font-serif font-bold mt-1 text-slate-900 dark:text-slate-100">{ramUsage} MB</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ Memory Leak Safe</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-teal-600 font-medium uppercase">API P99 Gecikmesi</span>
          <div className="text-2xl font-mono font-bold mt-1 text-teal-600">{p99Latency}ms</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Ultra-Fast Response Rate</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Sistem Hata Oranı</span>
          <div className="text-2xl font-mono font-bold mt-1 text-emerald-600">%{errorRate}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Neredeyse Kusursuz (0.04%)</span>
        </motion.div>
      </div>
    </div>
  );
}
