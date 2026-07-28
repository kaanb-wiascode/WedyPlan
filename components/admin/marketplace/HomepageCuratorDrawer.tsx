"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HomepageCuratorDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex justify-end">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          className="w-full max-w-xl bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 h-full p-6 md:p-8 overflow-y-auto space-y-6 shadow-2xl text-xs"
        >
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase text-purple-600">Ana Sayfa Vitrin & Hero Banner Düzenleyici</span>
              <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100">Public Vitrin Kürasyonu</h2>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold text-sm">✕</button>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200/50 space-y-2">
              <h4 className="font-bold text-purple-900 dark:text-purple-200">🖼️ Hero Banner Kampanya Metni</h4>
              <input
                type="text"
                defaultValue="Erken Düğün Rezervasyonlarında %15 Güvenceli Kapora Fırsatı"
                className="w-full p-2.5 rounded-xl border border-purple-200 dark:border-purple-800 bg-white dark:bg-slate-800 font-medium text-xs"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border space-y-2">
              <h4 className="font-bold text-slate-800 dark:text-slate-100">⭐ Öne Çıkan Tedarikçiler Slider Ağırlığı</h4>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-bold block">Sponsorlu / Ücretli Öncelik (%)</label>
                <input type="range" min="0" max="100" defaultValue="40" className="w-full" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-bold block">CSAT Puan Yüksekliği Önceliği (%)</label>
                <input type="range" min="0" max="100" defaultValue="60" className="w-full" />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button onClick={onClose} className="px-5 py-2.5 rounded-xl border font-semibold">İptal</button>
            <button onClick={() => { alert("✨ Vitrin ayarları canlıya alındı!"); onClose(); }} className="px-5 py-2.5 rounded-xl bg-purple-600 text-white font-bold">
              Canlıya Al ✨
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
