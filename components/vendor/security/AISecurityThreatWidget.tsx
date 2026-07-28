"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AISecurityThreatWidget({ aiData }: { aiData: any }) {
  if (!aiData) return null;

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-emerald-500/10 via-white/80 to-teal-500/10 dark:from-emerald-950/30 dark:via-slate-900/80 dark:to-teal-950/20 border border-emerald-200/50 dark:border-emerald-900/40 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          ✦ AI Threat Detection & Suspicious Login Radar
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          Engellenen Tehdit: {aiData.blockedThreatsCount}
        </span>
      </div>

      {/* Engellenen Şüpheli Giriş Uyarısı */}
      {aiData.suspiciousLogins && aiData.suspiciousLogins.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200/50 text-xs text-rose-900 dark:text-rose-300 space-y-1">
          <div className="flex justify-between items-center">
            <span className="font-bold text-[10px] uppercase block text-rose-600">🚨 Şüpheli Giriş Engellendi (İmkansız Seyahat)</span>
            <span className="text-[9px] font-mono font-bold bg-rose-600 text-white px-2 py-0.5 rounded">BLOCKED</span>
          </div>
          <p className="text-[11px] font-medium leading-relaxed">
            <strong>{aiData.suspiciousLogins[0].location}:</strong> IP ({aiData.suspiciousLogins[0].ip}) üzerinden yapılan yetkisiz erişim denemesi yapay zeka tarafından 0.2 saniyede engellendi.
          </p>
        </div>
      )}

      {/* AI Tavsiyeleri */}
      <div className="space-y-1.5 text-xs">
        <span className="text-[10px] text-emerald-600 font-bold uppercase block">💡 AI Güvenlik Sertifikasyon Önerileri</span>
        {aiData.aiSecurityRecommendations?.map((rec: string, i: number) => (
          <div key={i} className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border text-[11px] text-slate-700 dark:text-slate-200">
            🛡️ {rec}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
