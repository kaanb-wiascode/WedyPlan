"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DocumentViewerModal({
  document,
  isOpen,
  onClose,
}: {
  document: any;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen || !document) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
        >
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase text-indigo-600">Doküman Viewer & AI OCR</span>
              <h2 className="text-xl font-serif font-bold">{document.title}</h2>
              <p className="text-xs text-slate-400">{document.folderName} • {document.fileSizeMb} MB • v{document.version || 1}.0</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => alert("📥 İndiriliyor...")} className="px-3 py-1.5 rounded-xl border text-xs font-semibold">İndir 📥</button>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-sm font-bold pl-2">✕</button>
            </div>
          </div>

          {/* AI Özet ve OCR İçeriği */}
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/40 space-y-1">
              <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 block">✦ AI Belge Özeti:</span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {document.aiSummary || "Bu belge otomatik olarak taranmış ve güvenlik kasasına kilitlenmiştir."}
              </p>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">🔍 Taranan OCR Metin Dökümü</span>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-600 dark:text-slate-300 max-h-48 overflow-y-auto">
                {document.ocrText || "OCR taranıyor..."}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
