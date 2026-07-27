"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIInsightsWidget() {
  const insights = [
    { type: "PREDICTION", text: "Bodrum bölgesinde Haziran ayı müzik grupları doluyor. Müzikal ekibinizi en geç 2 hafta içinde kesinleştirin." },
    { type: "SAVING", text: "Catering menüsünde mevsimsel meyve servisine geçerek yaklaşık 25.000 ₺ tasarruf edebilirsiniz." },
  ];

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="h-full backdrop-blur-2xl bg-gradient-to-br from-indigo-500/5 via-white/80 to-purple-500/5 dark:from-indigo-950/30 dark:via-slate-900/80 dark:to-purple-950/20 border border-indigo-200/50 dark:border-indigo-900/40 rounded-3xl p-6 shadow-sm flex flex-col justify-between"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="p-1.5 rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/60 dark:text-indigo-300 text-xs font-bold">
          ✦ AI Insights
        </span>
        <span className="text-xs text-slate-400">Akıllı Analiz Motoru</span>
      </div>

      <div className="space-y-3">
        {insights.map((item, idx) => (
          <div key={idx} className="p-3 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
            <span className="font-semibold text-indigo-600 dark:text-indigo-400 mr-1">
              {item.type === "PREDICTION" ? "Tahmin:" : "Tasarruf Fırsatı:"}
            </span>
            {item.text}
          </div>
        ))}
      </div>

      <div className="mt-3 text-right">
        <button className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
          Tüm Analizleri Gör →
        </button>
      </div>
    </motion.div>
  );
}