"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ContractHeader({
  signedCount,
  pendingCount,
  riskAlertsCount,
  activeTab,
  setActiveTab,
}: {
  signedCount: number;
  pendingCount: number;
  riskAlertsCount: number;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  const tabs = [
    { id: "ALL", label: "Tüm Sözleşmeler" },
    { id: "PENDING", label: "İmza Bekleyenler" },
    { id: "SIGNED", label: "İmzalananlar" },
    { id: "EXPIRED", label: "Süresi Dolanlar" },
  ];

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              ✦ Secure Digital Vault
            </span>
            <span className="text-xs text-slate-400">Dijital Sözleşme & Hukuki Kasa</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Digital Contract Center</h1>
        </div>

        <div className="flex gap-2">
          <button className="px-4 py-2.5 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-medium hover:opacity-90 transition">
            + Dışarıdan Sözleşme / PDF Yükle
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">İmzalanan Sözleşmeler</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600">{signedCount} Doküman</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Hukuki Güvence Altında</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-amber-600 font-medium uppercase">Onay / İmza Bekleyenler</span>
          <div className="text-2xl font-bold mt-1 text-amber-600">{pendingCount} Doküman</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">İncelemeniz Gerekiyor</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-rose-600 font-medium uppercase">AI Tarafından Bulunan Riskler</span>
          <div className="text-2xl font-bold mt-1 text-rose-600">{riskAlertsCount} Dikkat Notu</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Incelenmesi Önerilir</span>
        </motion.div>
      </div>

      <div className="flex gap-2 border-b border-slate-200/60 dark:border-slate-800 pb-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={"px-4 py-2.5 rounded-2xl text-xs font-semibold transition " +
              (activeTab === tab.id
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                : "bg-white dark:bg-slate-900 text-slate-500 border border-slate-200 dark:border-slate-800 hover:border-slate-300")
            }
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
