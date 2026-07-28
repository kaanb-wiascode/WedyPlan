"use client";

import React from "react";
import { motion } from "framer-motion";

export default function WorkflowHeader({
  successRate,
  totalWorkflows,
  autoRecovered,
  pendingApprovals,
  onOpenSimulatorModal,
}: {
  successRate: number;
  totalWorkflows: string;
  autoRecovered: number;
  pendingApprovals: number;
  onOpenSimulatorModal: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
              ✦ WedyPlan Shared AI Workflow & Multi-Agent Orchestration Engine
            </span>
            <span className="text-xs text-slate-400">Planlama, İnfaz, Delegasyon & Otomatik Hata Kurtarma</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">AI Workflow Engine</h1>
        </div>

        <button
          onClick={onOpenSimulatorModal}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          ⚡ Ajan Orkestrasyonu & Akış Konsolunu Çalıştır
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">İş Akışı Başarı Oranı</span>
          <div className="text-2xl font-bold mt-1 text-purple-600 flex items-center gap-2">
            <span>%{successRate}</span>
            <span className="text-xs font-mono font-normal text-slate-400">Autonomous Execution</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Sıfır İnfaz Kesintisi</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Tamamlanan Ajan Akışı</span>
          <div className="text-2xl font-serif font-bold mt-1 text-slate-900 dark:text-slate-100">{totalWorkflows} Akış</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ Multi-Agent Mesh Active</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Kurtarılan Hata (Retry)</span>
          <div className="text-2xl font-mono font-bold mt-1 text-emerald-600">{autoRecovered} Kurtarma</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Self-Healing Pipeline</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-amber-600 font-medium uppercase">Bekleyen İnsan Onayı</span>
          <div className="text-2xl font-mono font-bold mt-1 text-amber-600">{pendingApprovals} Onay</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Human-In-The-Loop Gate</span>
        </motion.div>
      </div>
    </div>
  );
}
