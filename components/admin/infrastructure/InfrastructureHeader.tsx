"use client";

import React from "react";
import { motion } from "framer-motion";

export default function InfrastructureHeader({
  healthScore,
  avgLatency,
  activeNodesCount,
  onTriggerGlobalPing,
}: {
  healthScore: number;
  avgLatency: string;
  activeNodesCount: number;
  onTriggerGlobalPing: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              ✦ WedyPlan Central Infrastructure & SRE Control OS
            </span>
            <span className="text-xs text-slate-400">Sunucular, Veritabanları, Redis, CDN & SSL Canlı İzleme</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Infrastructure Monitoring Center</h1>
        </div>

        <button
          onClick={onTriggerGlobalPing}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          ⚡ Global Altyapı Ping & Sağlık Taraması
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Altyapı Genel Sağlık Skoru</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600 flex items-center gap-2">
            <span>%{healthScore}</span>
            <span className="text-xs font-mono font-normal text-slate-400">Kusursuz Uptime</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">%99.99 Yıllık Servis Kesintisizliği</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Ortalama Global Latency</span>
          <div className="text-2xl font-mono font-bold mt-1 text-indigo-600">{avgLatency}</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ Cloudflare Anycast CDN Aktif</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">İzlenen Aktif Kaynak Düğümleri</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">{activeNodesCount} Düğüm</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">K8s, Postgres, Redis, BullMQ, S3</span>
        </motion.div>
      </div>
    </div>
  );
}
