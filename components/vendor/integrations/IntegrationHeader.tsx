"use client";

import React from "react";
import { motion } from "framer-motion";

export default function IntegrationHeader({
  connectedCount,
  totalServicesCount,
  healthScore,
  searchQuery,
  setSearchQuery,
}: {
  connectedCount: number;
  totalServicesCount: number;
  healthScore: number;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              ✦ Enterprise Integration Hub
            </span>
            <span className="text-xs text-slate-400">Harici Servisler, API & Webhook Yönetimi</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Integration Hub</h1>
        </div>

        <div className="w-full md:w-80">
          <input
            type="text"
            placeholder="Servis veya API arayın (Örn: WhatsApp, iyzico)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Bağlı Aktif Servisler</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">{connectedCount} / {totalServicesCount} Servis</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Canlı Senkronizasyon Devrede</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Genel Entegrasyon Sağlık Skoru</span>
          <div className="text-2xl font-bold mt-1 text-indigo-600">%{healthScore} Mükemmel</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Ortalama Yanıt Hızı: 38ms</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-amber-600 font-medium uppercase">API & Webhook İsteği</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">12.480 Req/Ay</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">%0.01 Hata Oranı</span>
        </motion.div>
      </div>
    </div>
  );
}
