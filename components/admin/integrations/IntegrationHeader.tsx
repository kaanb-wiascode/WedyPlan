"use client";

import React from "react";
import { motion } from "framer-motion";

export default function IntegrationHeader({
  globalHealthScore,
  activeIntegrationsCount,
  failedWebhooksCount,
  onTriggerGlobalDiagnostic,
}: {
  globalHealthScore: number;
  activeIntegrationsCount: number;
  failedWebhooksCount: number;
  onTriggerGlobalDiagnostic: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              ✦ WedyPlan Global External Integrations OS
            </span>
            <span className="text-xs text-slate-400">Dış Servisler, Webhook Gateway & API Güvenliği</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Integration Operations Center</h1>
        </div>

        <button
          onClick={onTriggerGlobalDiagnostic}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          🔍 AI Entegrasyon Teşhisini Çalıştır
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Entegrasyon Altyapı Sağlık Skoru</span>
          <div className="text-2xl font-bold mt-1 text-indigo-600 flex items-center gap-2">
            <span>%{globalHealthScore}</span>
            <span className="text-xs font-mono font-normal text-slate-400">Kusursuz Uptime</span>
          </div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ %99.99 Servis Erişilebilirliği</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Aktif Bağlı Dış Servisler</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">{activeIntegrationsCount} Servis Sağlayıcı</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Google, Apple, Meta, Stripe, iyzico, Cloudflare & AWS</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-rose-600 font-medium uppercase">Kuyrukta Bekleyen Hatalı Webhook</span>
          <div className="text-2xl font-bold mt-1 text-rose-600 font-mono">{failedWebhooksCount} Hata</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Otonom Replay Worker Hazır</span>
        </motion.div>
      </div>
    </div>
  );
}
