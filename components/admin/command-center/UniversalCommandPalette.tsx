"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { executeUniversalCommandAction } from "@/lib/actions/admin-command-center";

export default function UniversalCommandPalette({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleExecute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsProcessing(true);
    const res = await executeUniversalCommandAction({ query, isVoiceInput: false });
    setIsProcessing(false);

    if (res.success) {
      alert("✨ " + res.message);
      setQuery("");
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xl flex items-start justify-center pt-20 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-xs"
        >
          <form onSubmit={handleExecute} className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
            <span className="text-xl">💬</span>
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Doğal dilde komut yazın (Örn: Bodrum'daki onay bekleyen mekanları göster, kampanya başlat)..."
              className="flex-1 bg-transparent text-sm font-medium outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={isProcessing || !query.trim()}
              className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition text-xs disabled:opacity-50"
            >
              {isProcessing ? "İşleniyor..." : "Çalıştır (Enter)"}
            </button>
          </form>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 text-[11px] space-y-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">💡 Örnek Yönetici Komutları</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setQuery("Onay bekleyen 3 tedarikçiyi aktifleştir")}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border hover:border-purple-500 text-slate-700 dark:text-slate-300"
              >
                "Onay bekleyen 3 tedarikçiyi aktifleştir"
              </button>
              <button
                onClick={() => setQuery("Sözleşme modülünde son 24 saatlik audit logları fırlat")}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border hover:border-purple-500 text-slate-700 dark:text-slate-300"
              >
                "Audit logları fırlat"
              </button>
            </div>
          </div>

          <div className="p-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px] text-slate-400">
            <span>WedyPlan Universal NLP Command Engine</span>
            <span>Kapatmak için ESC</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
