"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SecurityHeader({
  blockedThreatsCount,
  wafRulesCount,
  kvkkScore,
  gdprScore,
  onOpenScanModal,
}: {
  blockedThreatsCount: number;
  wafRulesCount: number;
  kvkkScore: number;
  gdprScore: number;
  onOpenScanModal: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
              ✦ WedyPlan Shared Enterprise Security & Zero Trust Architecture
            </span>
            <span className="text-xs text-slate-400">WAF, IAM, Encryption, KVKK, GDPR & OWASP Top 10</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Enterprise Security Engineering Platform</h1>
        </div>

        <button
          onClick={onOpenScanModal}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-rose-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          🛡️ AI Zafiyet & Uyum Taramasını Başlat
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">Engellenen Tehditler (24s)</span>
          <div className="text-2xl font-bold mt-1 text-purple-600 flex items-center gap-2">
            <span>{blockedThreatsCount}</span>
            <span className="text-xs font-mono font-normal text-slate-400">100% Mitigated</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">WAF & Anomaly Shield Active</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Aktif WAF Kural Sayısı</span>
          <div className="text-2xl font-serif font-bold mt-1 text-slate-900 dark:text-slate-100">{wafRulesCount} Kural</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ Zero Trust Enforced</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">KVKK & GDPR Uyum Skoru</span>
          <div className="text-2xl font-mono font-bold mt-1 text-emerald-600">%{kvkkScore} / %{gdprScore}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">AES-256 Maskeleme Aktif</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-rose-600 font-medium uppercase">SOC2 / ISO27001 Durumu</span>
          <div className="text-lg font-bold mt-1 text-rose-600 font-mono">READY & COMPLIANT</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Sürekli Denetim İzleri</span>
        </motion.div>
      </div>
    </div>
  );
}
