"use client";

import React from "react";
import { motion } from "framer-motion";
import { triggerCircuitBreakerResetAction } from "@/lib/actions/service-mesh";

export default function ServiceMeshHeader({
  mtlsGlobalStatus,
  totalServiceLinksCount,
  avgInterServiceLatencyMs,
  globalRetrySuccessRate,
  onOpenPolicyModal,
}: {
  mtlsGlobalStatus: string;
  totalServiceLinksCount: number;
  avgInterServiceLatencyMs: number;
  globalRetrySuccessRate: number;
  onOpenPolicyModal: () => void;
}) {
  const handleResetBreaker = async () => {
    if (confirm("⚡ CIRCUIT BREAKER RESET: Tüm mikroservis devre kesicilerini sınamak ve sıfırlamak istiyor musunuz?")) {
      const res = await triggerCircuitBreakerResetAction("wedyplan-ai-brain-api");
      if (res.success) {
        alert(res.message);
      }
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
              ✦ WedyPlan Shared Enterprise Service Mesh & Microservice Communication Engine
            </span>
            <span className="text-xs text-slate-400">Strict mTLS 1.3, Circuit Breakers, Smart Retries & eBPF</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Enterprise Service Mesh Platform</h1>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleResetBreaker}
            className="px-5 py-3 rounded-2xl bg-indigo-600 text-white font-mono text-xs font-bold hover:bg-indigo-700 transition shadow-md"
          >
            ⚡ RESET CIRCUIT BREAKERS
          </button>

          <button
            onClick={onOpenPolicyModal}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
          >
            🕸️ Trafik Politikaları & mTLS Yöneticisi
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">Küresel mTLS Durumu</span>
          <div className="text-lg font-bold mt-1 text-purple-600 font-mono">{mtlsGlobalStatus}</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ Zero Trust Service Security</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Aktif Servis Bağlantıları</span>
          <div className="text-2xl font-serif font-bold mt-1 text-slate-900 dark:text-slate-100">{totalServiceLinksCount} Bağlantı</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Microservice Mesh Graph</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-teal-600 font-medium uppercase">Ortalama Hop-Latency</span>
          <div className="text-2xl font-mono font-bold mt-1 text-teal-600">{avgInterServiceLatencyMs} ms</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Sub-1ms Mesh Routing</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-cyan-600 font-medium uppercase">Retry Başarı Oranı</span>
          <div className="text-2xl font-mono font-bold mt-1 text-cyan-600">%{globalRetrySuccessRate}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Automated Resilience</span>
        </motion.div>
      </div>
    </div>
  );
}
