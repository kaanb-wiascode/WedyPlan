"use client";

import React from "react";
import { motion } from "framer-motion";

export default function VendorAIAssistantHeader({
  vendorName,
  aiHealthStatus,
}: {
  vendorName: string;
  aiHealthStatus: string;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-rose-500/20 to-purple-500/20 text-rose-600 dark:text-rose-300 border border-rose-500/30">
              ✦ WedyPlan Flagship AI Business Partner
            </span>
            <span className="text-xs text-slate-400">Proaktif İşletme Asistanı</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">AI Business Assistant</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>AI Model: GPT-4o Enterprise Copilot Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
