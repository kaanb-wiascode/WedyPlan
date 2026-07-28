"use client";

import React from "react";
import { motion } from "framer-motion";

export default function MultimodalHeader({
  ocrAccuracy,
  totalProcessed,
  avgLatencyMs,
  supportedFormats,
  onOpenSimulatorModal,
}: {
  ocrAccuracy: number;
  totalProcessed: string;
  avgLatencyMs: number;
  supportedFormats: number;
  onOpenSimulatorModal: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-950 dark:text-fuchsia-300">
              ✦ WedyPlan Shared AI Multimodal Platform & Cross-Modal Vision Engine
            </span>
            <span className="text-xs text-slate-400">Görsel Anlama, OCR, PDF Sözleşme Çıkarımı & Stil Tespiti</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Multimodal AI Platform</h1>
        </div>

        <button
          onClick={onOpenSimulatorModal}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-fuchsia-600 via-pink-600 to-indigo-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          🖼️ Canlı Multimodal İşleme & Vision Konsolunu Aç
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-fuchsia-600 font-medium uppercase">OCR Doküman Doğruluğu</span>
          <div className="text-2xl font-bold mt-1 text-fuchsia-600 flex items-center gap-2">
            <span>%{ocrAccuracy}</span>
            <span className="text-xs font-mono font-normal text-slate-400">PDF Extraction</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Sözleşme & Fatura Taraması</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">İşlenen Medya Sayısı</span>
          <div className="text-2xl font-serif font-bold mt-1 text-slate-900 dark:text-slate-100">{totalProcessed} Dosya</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ Visual Index Active</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-teal-600 font-medium uppercase">Ortalama İşlem Hızı</span>
          <div className="text-2xl font-mono font-bold mt-1 text-teal-600">{avgLatencyMs}ms</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Işık Hızında Vision Processing</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-pink-600 font-medium uppercase">Desteklenen Medya Formatı</span>
          <div className="text-2xl font-mono font-bold mt-1 text-pink-600">{supportedFormats} Format</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">JPG, PNG, PDF, MP4, MP3, WAV</span>
        </motion.div>
      </div>
    </div>
  );
}
