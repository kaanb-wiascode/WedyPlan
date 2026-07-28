"use client";

import React from "react";
import { motion } from "framer-motion";

export default function BIHeader({
  healthScore,
  activeCouples,
  activeVendors,
  selectedTab,
  setSelectedTab,
  onExportReport,
}: {
  healthScore: number;
  activeCouples: number;
  activeVendors: number;
  selectedTab: string;
  setSelectedTab: (tab: any) => void;
  onExportReport: () => void;
}) {
  const tabs = [
    { key: "EXECUTIVE", label: "👑 Executive" },
    { key: "SALES", label: "📈 Sales" },
    { key: "MARKETING", label: "🎯 Marketing" },
    { key: "FINANCE", label: "💳 Finance" },
    { key: "SUPPORT", label: "🎧 Support" },
    { key: "OPERATIONS", label: "⚙️ Operations" },
    { key: "AI", label: "🤖 AI LLM" },
    { key: "MARKETPLACE", label: "🏪 Marketplace" },
    { key: "GROWTH", label: "🚀 Growth" },
  ];

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
              ✦ WedyPlan Enterprise Business Intelligence OS
            </span>
            <span className="text-xs text-slate-400">360° Ölçülebilir Platform Analitiği</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Enterprise BI Platform</h1>
        </div>

        <button
          onClick={onExportReport}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-900 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          📊 Yönetici BI Raporunu İndir (PDF/Excel)
        </button>
      </div>

      {/* Sekmeler Barı */}
      <div className="flex overflow-x-auto pb-2 gap-2 border-b border-slate-200/60 dark:border-slate-800 text-xs font-bold scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedTab(tab.key)}
            className={"px-4 py-2 rounded-2xl whitespace-nowrap transition " +
              (selectedTab === tab.key
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-white/60 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800")
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Platform Genel Sağlık Skoru</span>
          <div className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span className="text-indigo-600">%{healthScore}</span>
            <span className="text-xs font-normal text-emerald-600">Mükemmel Denge</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">9 Boyutlu Konsolide Analiz</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Aktif Çift Ekosistemi</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600">{activeCouples.toLocaleString("tr-TR")} Çift</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Aktivasyon Oranı: %88.1</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">Doğrulanmış Tedarikçi Ekosistemi</span>
          <div className="text-2xl font-bold mt-1 text-purple-600">{activeVendors} Tedarikçi</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Retention (Elde Tutma): %92.4</span>
        </motion.div>
      </div>
    </div>
  );
}
