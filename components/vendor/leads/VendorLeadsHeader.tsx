"use client";

import React from "react";
import { motion } from "framer-motion";

export default function VendorLeadsHeader({
  totalLeads,
  wonLeadsCount,
  activePipelineValue,
  viewMode,
  setViewMode,
}: {
  totalLeads: number;
  wonLeadsCount: number;
  activePipelineValue: number;
  viewMode: "KANBAN" | "TABLE";
  setViewMode: (mode: "KANBAN" | "TABLE") => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              ✦ Vendor Sales CRM
            </span>
            <span className="text-xs text-slate-400">Müşteri & İhale Boru Hattı</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Lead Management Platform</h1>
        </div>

        {/* Görünüm Değiştirici */}
        <div className="flex items-center gap-3">
          <div className="flex p-1 bg-slate-200/60 dark:bg-slate-800 rounded-2xl">
            <button
              onClick={() => setViewMode("KANBAN")}
              className={"px-3.5 py-1.5 rounded-xl text-xs font-semibold transition " +
                (viewMode === "KANBAN" ? "bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white" : "text-slate-500")
              }
            >
              📊 Kanban Board
            </button>
            <button
              onClick={() => setViewMode("TABLE")}
              className={"px-3.5 py-1.5 rounded-xl text-xs font-semibold transition " +
                (viewMode === "TABLE" ? "bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white" : "text-slate-500")
              }
            >
              📋 Liste Tablosu
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">Aktif Pipeline Potansiyel Değeri</span>
          <div className="text-2xl font-serif font-bold mt-1 text-slate-900 dark:text-slate-100">{activePipelineValue.toLocaleString("tr-TR")} ₺</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">{totalLeads} Aktif Düğün Talebi</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-emerald-600 font-medium uppercase">Kazanılan Satışlar (Won)</span>
          <div className="text-2xl font-bold mt-1 text-emerald-600">{wonLeadsCount} Sözleşme Imzalandı</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Dönüşüm Oranı: %34</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-amber-600 font-medium uppercase">AI Tahmini Satış Kapama</span>
          <div className="text-2xl font-bold mt-1 text-amber-600">3 Teklif Beklemede</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Bu Hafta İmzalanması Beklenen</span>
        </motion.div>
      </div>
    </div>
  );
}
