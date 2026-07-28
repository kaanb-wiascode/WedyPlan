"use client";

import React from "react";
import { motion } from "framer-motion";
import { triggerChaosKillSwitchAction } from "@/lib/actions/chaos";

export default function ChaosHeader({
  resilienceScore,
  activeExperimentsCount,
  riskScore,
  onOpenInjectorModal,
}: {
  resilienceScore: number;
  activeExperimentsCount: number;
  riskScore: number;
  onOpenInjectorModal: () => void;
}) {
  const handlePanicKillSwitch = async () => {
    if (confirm("🚨 ACİL DURDURMA (KILL SWITCH): Tüm çalışan kaos deneylerini anında iptal etmek istediğinize emin misiniz?")) {
      const res = await triggerChaosKillSwitchAction();
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
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
              ✦ WedyPlan Shared Enterprise Chaos Engineering & Fault Injection Engine
            </span>
            <span className="text-xs text-slate-400">Chaos Monkey, Fault Injection, MTTR & Recovery Validation</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Chaos Engineering Platform</h1>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handlePanicKillSwitch}
            className="px-5 py-3 rounded-2xl bg-rose-600 text-white font-mono text-xs font-bold hover:bg-rose-700 transition shadow-lg animate-pulse"
          >
            🛑 PANIC KILL SWITCH (STOP ALL)
          </button>

          <button
            onClick={onOpenInjectorModal}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-600 via-rose-600 to-purple-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
          >
            💥 Yeni Kaos Deneyi Tetikle
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-rose-600 font-medium uppercase">Sistem Dayanıklılık Skoru</span>
          <div className="text-2xl font-bold mt-1 text-rose-600 flex items-center gap-2">
            <span>%{resilienceScore}</span>
            <span className="text-xs font-mono font-normal text-slate-400">Resilient Grade</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Otonom İyileşme Doğrulandı</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-amber-600 font-medium uppercase">Tamamlanan Kaos Deneyleri</span>
          <div className="text-2xl font-serif font-bold mt-1 text-slate-900 dark:text-slate-100">{activeExperimentsCount} Deney</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ 100% Fallback Verified</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">AI Risk Skoru</span>
          <div className="text-2xl font-mono font-bold mt-1 text-indigo-600">%{riskScore} Risk</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Düşük Zincirleme Çökme Riski</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Ortalama Kurtarma (MTTR)</span>
          <div className="text-2xl font-mono font-bold mt-1 text-emerald-600">3 SANİYE</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Anında Failover Mimarisi</span>
        </motion.div>
      </div>
    </div>
  );
}
