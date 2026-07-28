"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function AICommandCenterWidget({ aiData }: { aiData: any }) {
  const [activeTab, setActiveTab] = useState<"MORNING" | "EVENING" | "RISKS">("MORNING");

  if (!aiData) return null;

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-amber-500/10 via-white/80 to-purple-500/10 dark:from-amber-950/30 dark:via-slate-900/80 dark:to-purple-950/20 border border-amber-200/50 dark:border-amber-900/40 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
          ✦ AI Executive Copilot & Command Intelligence
        </span>

        {/* Tab Değiştirici */}
        <div className="flex p-1 bg-white/60 dark:bg-slate-800/60 rounded-xl text-[10px] font-bold">
          <button
            onClick={() => setActiveTab("MORNING")}
            className={"px-2.5 py-1 rounded-lg transition " + (activeTab === "MORNING" ? "bg-amber-500 text-white shadow-sm" : "text-slate-500")}
          >
            ☀️ Sabah Brifingi
          </button>
          <button
            onClick={() => setActiveTab("EVENING")}
            className={"px-2.5 py-1 rounded-lg transition " + (activeTab === "EVENING" ? "bg-indigo-600 text-white shadow-sm" : "text-slate-500")}
          >
            🌙 Akşam Özeti
          </button>
          <button
            onClick={() => setActiveTab("RISKS")}
            className={"px-2.5 py-1 rounded-lg transition " + (activeTab === "RISKS" ? "bg-rose-600 text-white shadow-sm" : "text-slate-500")}
          >
            🚨 Risk & Fırsat
          </button>
        </div>
      </div>

      {activeTab === "MORNING" && (
        <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-amber-100 dark:border-amber-900/40 space-y-1 text-xs">
          <span className="text-[10px] text-amber-600 font-bold uppercase block">☀️ Günün Yönetici Brifingi</span>
          <p className="text-slate-800 dark:text-slate-100 leading-relaxed font-medium text-[11px]">{aiData.morningBriefing}</p>
        </div>
      )}

      {activeTab === "EVENING" && (
        <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-indigo-100 dark:border-indigo-900/40 space-y-1 text-xs">
          <span className="text-[10px] text-indigo-600 font-bold uppercase block">🌙 Dünün Performans Özeti</span>
          <p className="text-slate-800 dark:text-slate-100 leading-relaxed font-medium text-[11px]">{aiData.eveningSummary}</p>
        </div>
      )}

      {activeTab === "RISKS" && (
        <div className="space-y-2 text-xs">
          <div className="p-3 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200/50 text-rose-900 dark:text-rose-200">
            🚨 <strong>Ciro Riski:</strong> {aiData.revenueRisks[0]}
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/50 text-emerald-900 dark:text-emerald-200">
            💡 <strong>Büyüme Fırsatı:</strong> {aiData.growthOpportunities[0]}
          </div>
        </div>
      )}

      {/* Rakip Sinyali */}
      <div className="p-3 rounded-2xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200/50 text-xs text-purple-900 dark:text-purple-200 flex justify-between items-center">
        <span>🏆 <strong>Bölgesel Rakip Sinyali:</strong> {aiData.competitorSignals}</span>
        <span className="font-mono text-[10px] font-bold text-purple-600 bg-white dark:bg-slate-800 px-2 py-0.5 rounded">Pazar Lideri</span>
      </div>
    </motion.div>
  );
}
