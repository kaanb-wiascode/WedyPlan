"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AITeamIntelligenceWidget({ aiData }: { aiData: any }) {
  if (!aiData) return null;

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-blue-500/10 via-white/80 to-indigo-500/10 dark:from-blue-950/30 dark:via-slate-900/80 dark:to-indigo-950/20 border border-blue-200/50 dark:border-blue-900/40 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
          ✦ AI Workforce & Burnout Radar
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
          İş Yükü Denge Skoru: %{aiData.teamWorkloadScore}
        </span>
      </div>

      {/* Vardiya Çakışma Uyarısı */}
      {aiData.conflictAlerts && aiData.conflictAlerts.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200/50 text-xs text-rose-900 dark:text-rose-300 space-y-1">
          <span className="font-bold text-[10px] uppercase block text-rose-600">🚨 Vardiya Çakışma Alarmı</span>
          <p className="text-[11px] font-medium">{aiData.conflictAlerts[0]}</p>
        </div>
      )}

      {/* Yüksek İş Yükü Uyarısı */}
      {aiData.overworkedEmployees && aiData.overworkedEmployees.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/50 text-xs text-amber-900 dark:text-amber-300 space-y-1">
          <div className="flex justify-between items-center">
            <span className="font-bold text-[10px] uppercase block text-amber-600">⚠️ Aşırı Yüklenme & Tükenmişlik Riski</span>
            <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-600 text-white">48 SAAT/HAFTA</span>
          </div>
          <p className="text-[11px]">
            <strong>{aiData.overworkedEmployees[0].name}:</strong> Peş peşe 3 etkinlikte görev aldı. Dinlenme izni önerilir.
          </p>
        </div>
      )}

      {/* Vardiya Önerisi */}
      <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-blue-100 dark:border-blue-900/40 text-xs space-y-1">
        <span className="text-[10px] text-blue-600 font-bold uppercase block">💡 AI İdeal Vardiya Takviye Önerisi</span>
        <p className="text-slate-700 dark:text-slate-200 leading-relaxed text-[11px]">{aiData.shiftSuggestions[0]}</p>
      </div>
    </motion.div>
  );
}
