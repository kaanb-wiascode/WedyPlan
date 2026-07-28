"use client";

import React from "react";
import { motion } from "framer-motion";

export default function DevExHeader({
  totalDocsCount,
  designComponentsCount,
  apiEndpointsDocumentedCount,
  avgOnboardingDays,
  onOpenCopilotModal,
}: {
  totalDocsCount: number;
  designComponentsCount: number;
  apiEndpointsDocumentedCount: number;
  avgOnboardingDays: number;
  onOpenCopilotModal: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
              ✦ WedyPlan Shared Enterprise Developer Experience (DevEx) & Productivity Hub
            </span>
            <span className="text-xs text-slate-400">Engineering Wiki, Monorepo Search, Storybook Tokens, API Sandbox & AI Copilot</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Developer Experience (DevEx) Platform</h1>
        </div>

        <button
          onClick={onOpenCopilotModal}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          🤖 AI Developer Copilot & Code Assistant
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-violet-600 font-medium uppercase">Mühendislik Wiki Dokümanları</span>
          <div className="text-2xl font-bold mt-1 text-violet-600 flex items-center gap-2">
            <span>{totalDocsCount} Doküman</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Engineering Knowledge Base</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">UI Bileşen Kataloğu</span>
          <div className="text-2xl font-serif font-bold mt-1 text-slate-900 dark:text-slate-100">{designComponentsCount} Bileşen</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ Storybook & Tokens Synced</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-teal-600 font-medium uppercase">Dokümante API Uç Noktaları</span>
          <div className="text-2xl font-mono font-bold mt-1 text-teal-600">{apiEndpointsDocumentedCount} API</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">OpenAPI v3.1 Interactive Spec</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">Geliştirici Onboarding Süresi</span>
          <div className="text-2xl font-mono font-bold mt-1 text-emerald-600">{avgOnboardingDays} Gün</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Ultra-Fast Onboarding Velocity</span>
        </motion.div>
      </div>
    </div>
  );
}
