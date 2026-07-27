"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AIVaultInsightsWidget({
  ocrScannedCount,
  duplicateAlertsCount,
  suggestedFolder,
}: {
  ocrScannedCount: number;
  duplicateAlertsCount: number;
  suggestedFolder: string;
}) {
  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-indigo-500/10 via-white/80 to-purple-500/10 dark:from-indigo-950/30 dark:via-slate-900/80 dark:to-purple-950/20 border border-indigo-200/50 dark:border-indigo-900/40 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
          ✦ AI OCR & Smart Organization
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
          {ocrScannedCount} Dosya Taranmış
        </span>
      </div>

      <div>
        <span className="text-[10px] text-slate-400 uppercase font-semibold">Akıllı Düzenleme Önerisi</span>
        <p className="text-xs text-slate-700 dark:text-slate-200 mt-1 leading-relaxed">
          Son yüklenen 3 fatura otomatik olarak <span className="font-bold text-indigo-600">"{suggestedFolder}"</span> klasörüne kategorize edildi ve bütçe modülüne işlendi.
        </p>
      </div>

      <div className="space-y-2 pt-2 border-t border-indigo-100 dark:border-indigo-900/40 text-xs">
        {duplicateAlertsCount > 0 ? (
          <div className="p-2.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/50 text-amber-800 dark:text-amber-300">
            ⚠️ <span className="font-semibold">Mükerrer Tespiti:</span> Yüklenen "Bodrum_Fatura_2.pdf" dosyası arşivde zaten mevcut olabilir.
          </div>
        ) : (
          <div className="p-2.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/50 text-emerald-800 dark:text-emerald-300">
            ✓ Tüm dokümanlar şifrelendi ve mükerrer kayıt bulunmadı.
          </div>
        )}
      </div>
    </motion.div>
  );
}
