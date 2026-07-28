"use client";

import React from "react";
import { motion } from "framer-motion";

export default function OnboardingHeader({
  currentStep,
  totalSteps,
  qualityScore,
}: {
  currentStep: number;
  totalSteps: number;
  qualityScore: number;
}) {
  const progressPercentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="max-w-[1200px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              ✦ Vendor Business OS
            </span>
            <span className="text-xs text-slate-400">İşletme Kurulum Sihirbazı</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Business Onboarding</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Profil Kalite Skoru</span>
            <span className="text-sm font-mono font-bold text-emerald-600">%{qualityScore} Mükemmel</span>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold">
            Adım {currentStep} / {totalSteps}
          </div>
        </div>
      </div>

      {/* Apple Tarzı İlerleme Çubuğu */}
      <div className="w-full bg-slate-200/60 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: progressPercentage + "%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 rounded-full"
        />
      </div>
    </div>
  );
}
