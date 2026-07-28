"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SupportOperationsHeader({
  openTicketsCount,
  escalatedCount,
  slaComplianceRate,
  onOpenKnowledgeBase,
}: {
  openTicketsCount: number;
  escalatedCount: number;
  slaComplianceRate: number;
  onOpenKnowledgeBase: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
              ✦ WedyPlan Global Support Operations OS
            </span>
            <span className="text-xs text-slate-400">Çift & Tedarikçi Destek Komuta Merkezi</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Support Operations Center</h1>
        </div>

        <button
          onClick={onOpenKnowledgeBase}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          📚 Bilgi Bankası & Makro Şablonları
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-sky-600 font-medium uppercase">Açık / İşlemdeki Biletler</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">{openTicketsCount} Aktif Bilet</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Ort. İlk Yanıt Süresi: 4.2 Dakika</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">SLA Uyum Başarı Oranı</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600">%{slaComplianceRate} Mükemmel</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Hedef: %98 Üzeri</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-rose-600 font-medium uppercase">Tırmandırılan Kriz Biletleri</span>
          <div className="text-2xl font-bold mt-1 text-rose-600 flex items-center gap-2">
            <span>{escalatedCount} Escalated</span>
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Üst Düzey Yönetici İncelemesinde</span>
        </motion.div>
      </div>
    </div>
  );
}
