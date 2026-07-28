"use client";

import React from "react";
import { motion } from "framer-motion";

export default function CampaignHeader({
  activeCampaignsCount,
  totalLeadsGenerated,
  averageRoi,
  onOpenBuilder,
}: {
  activeCampaignsCount: number;
  totalLeadsGenerated: number;
  averageRoi: number;
  onOpenBuilder: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
              ✦ Growth & Marketing Engine
            </span>
            <span className="text-xs text-slate-400">Pazarlama & Büyüme Paneli</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Campaign & Marketing Manager</h1>
        </div>

        <button
          onClick={onOpenBuilder}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold hover:shadow-lg transition flex items-center gap-2"
        >
          + Yeni Kampanya & Kupon Oluştur
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">Yayındaki Aktif Kampanyalar</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">{activeCampaignsCount} Kampanya</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Platform İçi Öne Çıkarılan</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Kampanyalardan Gelen Talep</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600">+{totalLeadsGenerated} Nitelikli Talep</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Dönüşüm Oranı: %28</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Ortalama Kampanya ROI</span>
          <div className="text-2xl font-serif font-bold mt-1 text-indigo-600">%{averageRoi} ROI</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">3.4x Reklam Bütçesi Çarpanı</span>
        </motion.div>
      </div>
    </div>
  );
}
