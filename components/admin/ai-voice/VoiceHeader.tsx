"use client";

import React from "react";
import { motion } from "framer-motion";

export default function VoiceHeader({
  sttAccuracy,
  totalSessions,
  avgLatencyMs,
  translationReady,
  onOpenSimulatorModal,
}: {
  sttAccuracy: number;
  totalSessions: string;
  avgLatencyMs: number;
  translationReady: boolean;
  onOpenSimulatorModal: () => void;
}) {
  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
              ✦ WedyPlan Shared AI Voice Platform & Conversational Intelligence
            </span>
            <span className="text-xs text-slate-400">STT, TTS, Sesli Komut, Duygu Analizi & Toplantı Notları</span>
          </div>
          <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">Voice AI Platform</h1>
        </div>

        <button
          onClick={onOpenSimulatorModal}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white text-xs font-bold hover:shadow-xl transition flex items-center gap-2"
        >
          🎙️ Canlı Ses İşleme & Komut Konsolunu Aç
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-violet-600 font-medium uppercase">STT Tanıma Doğruluğu</span>
          <div className="text-2xl font-bold mt-1 text-violet-600 flex items-center gap-2">
            <span>%{sttAccuracy}</span>
            <span className="text-xs font-mono font-normal text-slate-400">Low WER Rate</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Kusursuz Ses Metin Çevrimi</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-indigo-600 font-medium uppercase">İşlenen Sesli Oturum</span>
          <div className="text-2xl font-serif font-bold mt-1 text-slate-900 dark:text-slate-100">{totalSessions} Oturum</div>
          <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">✓ Speaker Diarization Active</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-teal-600 font-medium uppercase">Ortalama Yanıt Hızı</span>
          <div className="text-2xl font-mono font-bold mt-1 text-teal-600">{avgLatencyMs}ms</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Gerçek Zamanlı Ses Akışı</span>
        </motion.div>

        <motion.div whileHover={{ y: -2 }} className="p-5 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm">
          <span className="text-xs text-purple-600 font-medium uppercase">Canlı Çeviri Durumu</span>
          <div className="text-2xl font-mono font-bold mt-1 text-purple-600">{translationReady ? "READY" : "PAUSED"}</div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Çok Dilli Ses Desteği</span>
        </motion.div>
      </div>
    </div>
  );
}
