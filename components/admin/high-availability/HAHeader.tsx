"use client";

import React from "react";
import { motion } from "framer-motion";
import { triggerHAFailoverAction } from "@/lib/actions/high-availability";

export default function HAHeader({
  uptimePct,
  activeClustersCount,
  failoverMode,
  availabilityTarget,
  onOpenTrafficModal,
}: {
  uptimePct: number;
  activeClustersCount: number;
  failoverMode: string;
  availabilityTarget: string;
  onOpenTrafficModal: () => void;
}) {
  const handleTestFailover = async () => {
    if (confirm("⚡ HA FAILOVER TESTİ: Trafiği ikincil yedek düğüme (Hot Standby Node) kesintisiz aktarmak istiyor musunuz?")) {
      const res = await triggerHAFailoverAction({
        clusterId: "cls_db_01",
        targetNode: "eu-west-1-standby-node-02",
        reason: "MANUAL_HA_TEST",
      });
      if (res.success) {
        alert("✨ " + res.message);
      }
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              ✦ WedyPlan Shared Enterprise High Availability (HA) & Uninterrupted Service Engine
            </span>
            <span className="text-xs text-slate-400">99.999% Target, Auto Failover, L7 Load Balancing & Cluster Sync</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">High Availability (HA) Platform</h1>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleTestFailover}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white font-mono text-xs font-bold hover:shadow-lg transition shadow-md"
          >
            ⚡ TEST AUTO FAILOVER
          </button>

          <button
            onClick={onOpenTrafficModal}
            className="px-6 py-3 rounded-2xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
          >
            🌐 Yük Dengeleme & Trafik Yönlendirici
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Canlı Kullanılabilirlik (Uptime)</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600 flex items-center gap-2">
            <span>%{uptimePct}</span>
            <span className="text-xs font-mono font-normal text-slate-400">Five Nines</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Sıfır Kesinti Garantisi</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Aktif HA Kümeleri</span>
          <div className="text-2xl font-serif font-bold mt-1 text-slate-900 dark:text-slate-100">{activeClustersCount} Küme</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ DB, Redis, Queue & LB Synced</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-teal-600 font-medium uppercase">Otomatik Failover Modu</span>
          <div className="text-lg font-bold mt-1 text-teal-600 font-mono">{failoverMode}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Zero-Downtime Hot Standby</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">SLA Hedef Seviyesi</span>
          <div className="text-lg font-bold mt-1 text-purple-600 font-mono">{availabilityTarget}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Enterprise Availability Standard</span>
        </motion.div>
      </div>
    </div>
  );
}
