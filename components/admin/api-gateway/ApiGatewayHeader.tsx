"use client";

import React from "react";
import { motion } from "framer-motion";
import { triggerApiCachePurgeAction } from "@/lib/actions/api-gateway";

export default function ApiGatewayHeader({
  totalRequestsToday,
  currentRps,
  avgLatencyMs,
  cacheHitRatio,
  onOpenRouteModal,
}: {
  totalRequestsToday: number;
  currentRps: number;
  avgLatencyMs: number;
  cacheHitRatio: number;
  onOpenRouteModal: () => void;
}) {
  const handlePurgeCache = async () => {
    if (confirm("🧹 API CACHE PURGE: Tüm API Edge önbelleklerini temizlemek istediğinize emin misiniz?")) {
      const res = await triggerApiCachePurgeAction();
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
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
              ✦ WedyPlan Shared Enterprise API Gateway & Centralized Route Engine
            </span>
            <span className="text-xs text-slate-400">OAuth2/JWT Auth, Dynamic Rate Limiting, Edge Caching & Transformation</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Enterprise API Gateway Platform</h1>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handlePurgeCache}
            className="px-5 py-3 rounded-2xl bg-amber-600 text-white font-mono text-xs font-bold hover:bg-amber-700 transition shadow-md"
          >
            🧹 PURGE API CACHE
          </button>

          <button
            onClick={onOpenRouteModal}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
          >
            🚀 Rota & Rate Limit Yöneticisini Aç
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-violet-600 font-medium uppercase">Günlük İşlem Hacmi</span>
          <div className="text-2xl font-bold mt-1 text-violet-600 flex items-center gap-2">
            <span>{(totalRequestsToday / 1000000).toFixed(2)}M İstek</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Centralized API Proxy</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Anlık Trafik (RPS)</span>
          <div className="text-2xl font-serif font-bold mt-1 text-slate-900 dark:text-slate-100">{currentRps.toLocaleString()} Req/sec</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ Ultra-High Throughput</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-teal-600 font-medium uppercase">Ortalama Gateway Latensi</span>
          <div className="text-2xl font-mono font-bold mt-1 text-teal-600">{avgLatencyMs} ms</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Sub-20ms Response Time</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">Edge Cache Hit Oranı</span>
          <div className="text-2xl font-mono font-bold mt-1 text-purple-600">%{cacheHitRatio}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Fast Edge Cache Served</span>
        </motion.div>
      </div>
    </div>
  );
}
