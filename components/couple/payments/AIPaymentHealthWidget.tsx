"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIPaymentHealthWidget({
  healthScore,
  forecastMessage,
  lateAlerts,
  savingsTips,
}: {
  healthScore: number;
  forecastMessage: string;
  lateAlerts: string[];
  savingsTips: string[];
}) {
  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-emerald-500/10 via-white/80 to-teal-500/10 dark:from-emerald-950/30 dark:via-slate-900/80 dark:to-teal-950/20 border border-emerald-200/50 dark:border-emerald-900/40 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          ✦ AI Financial Health & Cash Flow
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          %{healthScore} Mükemmel
        </span>
      </div>

      <div>
        <span className="text-[10px] text-slate-400 uppercase font-semibold">90 Günlük Nakit Akışı Projeksiyonu</span>
        <p className="text-xs text-slate-700 dark:text-slate-200 mt-1 leading-relaxed">
          {forecastMessage}
        </p>
      </div>

      <div className="space-y-3 pt-2 border-t border-emerald-100 dark:border-emerald-900/40 text-xs">
        {lateAlerts.length > 0 && (
          <div>
            <span className="text-[10px] text-amber-600 font-bold uppercase block mb-1">🔔 Vade & Uyarı Hatırlatıcıları</span>
            {lateAlerts.map((alert, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/50 text-amber-800 dark:text-amber-300">
                ⏰ {alert}
              </div>
            ))}
          </div>
        )}

        {savingsTips.length > 0 && (
          <div>
            <span className="text-[10px] text-emerald-600 font-bold uppercase block mb-1">💡 AI Erken Ödeme İndirim İpuçları</span>
            {savingsTips.map((tip, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/50 text-emerald-800 dark:text-emerald-300">
                ✨ {tip}
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
