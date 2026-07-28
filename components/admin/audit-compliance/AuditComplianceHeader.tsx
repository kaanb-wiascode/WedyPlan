"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AuditComplianceHeader({
  complianceHealthScore,
  pendingDataRequestsCount,
  expiredRetentionCount,
  onOpenRequestsDrawer,
}: {
  complianceHealthScore: number;
  pendingDataRequestsCount: number;
  expiredRetentionCount: number;
  onOpenRequestsDrawer: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              ✦ WedyPlan Global Audit & KVKK/GDPR Compliance OS
            </span>
            <span className="text-xs text-slate-400">Şifreli Denetim İzleri & Yasal Uyum Kasası</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Audit & Compliance Center</h1>
        </div>

        <button
          onClick={onOpenRequestsDrawer}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          📂 KVKK / GDPR Veri Talepleri ({pendingDataRequestsCount})
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">KVKK / GDPR Yasal Uyum Skoru</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600 flex items-center gap-2">
            <span>%{complianceHealthScore}</span>
            <span className="text-xs font-mono font-normal text-slate-400">Tam Uyumlu</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">SHA-256 Kriptografik Denetim Zinciri</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Açık Rıza Onaylı Kullanıcılar</span>
          <div className="text-2xl font-bold mt-1 text-indigo-600">%100 Onaylı</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">IP & Zaman Damgalı Dijital İmzalı</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">Anonimleştirme Bekleyen Kayıt</span>
          <div className="text-2xl font-bold mt-1 text-purple-600 font-mono">{expiredRetentionCount} Kayıt</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">2 Yıllık Saklama Süresi Doldu</span>
        </motion.div>
      </div>
    </div>
  );
}
