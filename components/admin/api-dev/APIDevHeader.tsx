"use client";

import React from "react";
import { motion } from "framer-motion";

export default function APIDevHeader({
  totalRequestsToday,
  avgLatency,
  apiHealthScore,
  onOpenNewAppModal,
}: {
  totalRequestsToday: number;
  avgLatency: string;
  apiHealthScore: number;
  onOpenNewAppModal: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              ✦ WedyPlan Developer Platform & API Gateway OS
            </span>
            <span className="text-xs text-slate-400">REST, GraphQL, Webhooks, OAuth2 & OpenAPI v3</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">API Developer Platform</h1>
        </div>

        <button
          onClick={onOpenNewAppModal}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          🔑 Yeni API Uygulaması & Key Üret
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Bugün İşlenen API İstekleri</span>
          <div className="text-2xl font-serif font-bold mt-1 text-slate-900 dark:text-slate-100">{totalRequestsToday.toLocaleString("tr-TR")} İstek</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ Rate Limit Kotaları Dahilinde</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">Ortalama Gateway Latency</span>
          <div className="text-2xl font-mono font-bold mt-1 text-purple-600">{avgLatency}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Redis Edge Authentication Active</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">API Altyapı Sağlık Skoru</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600 flex items-center gap-2">
            <span>%{apiHealthScore}</span>
            <span className="text-xs font-mono font-normal text-slate-400">Kusursuz</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">OpenAPI Spec Live Synced</span>
        </motion.div>
      </div>
    </div>
  );
}
