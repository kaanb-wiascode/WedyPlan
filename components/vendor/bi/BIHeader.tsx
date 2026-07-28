"use client";

import React from "react";
import { motion } from "framer-motion";

export default function BIHeader({
  viewMode,
  setViewMode,
  timeframe,
  setTimeframe,
}: {
  viewMode: string;
  setViewMode: (mode: any) => void;
  timeframe: string;
  setTimeframe: (tf: any) => void;
}) {
  const views = [
    { id: "EXECUTIVE", label: "🏛️ Executive Summary" },
    { id: "SALES", label: "📊 Satış & Dönüşüm" },
    { id: "MARKETING", label: "📢 Pazarlama & ROI" },
    { id: "FINANCE", label: "💳 Finans & Nakit" },
    { id: "OPERATIONS", label: "🚚 Lojistik & Operasyon" },
  ];

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
              ✦ Executive Business Intelligence Engine
            </span>
            <span className="text-xs text-slate-400">Üst Düzey Analitik & Karar Paneli</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Business Intelligence Center</h1>
        </div>

        {/* Zaman Aralığı Seçici */}
        <div className="flex items-center gap-2">
          {["DAILY", "WEEKLY", "MONTHLY", "ANNUAL"].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={"px-3 py-1.5 rounded-xl text-xs font-semibold transition " +
                (timeframe === tf
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                  : "bg-white dark:bg-slate-900 text-slate-500 border border-slate-200 dark:border-slate-800")
              }
            >
              {tf === "DAILY" ? "Günlük" : tf === "WEEKLY" ? "Haftalık" : tf === "MONTHLY" ? "Aylık" : "Yıllık"}
            </button>
          ))}
        </div>
      </div>

      {/* Yönetici Dashboard Switcher */}
      <div className="flex gap-2 border-b border-slate-200/60 dark:border-slate-800 pb-2 overflow-x-auto">
        {views.map((v) => (
          <button
            key={v.id}
            onClick={() => setViewMode(v.id)}
            className={"px-4 py-2 rounded-2xl text-xs font-semibold transition whitespace-nowrap " +
              (viewMode === v.id
                ? "bg-violet-600 text-white shadow-md"
                : "bg-white dark:bg-slate-900 text-slate-500 border border-slate-200 dark:border-slate-800 hover:border-slate-300")
            }
          >
            {v.label}
          </button>
        ))}
      </div>
    </div>
  );
}
