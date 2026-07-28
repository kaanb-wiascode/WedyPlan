"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AILeadInsightsWidget({
  selectedLead,
  aiReplyData,
  onGenerateAIReply,
  onCopyReply,
}: {
  selectedLead: any;
  aiReplyData: any;
  onGenerateAIReply: () => void;
  onCopyReply: (text: string) => void;
}) {
  if (!selectedLead) {
    return (
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm text-center text-xs text-slate-400">
        AI Analizini ve Yanıt Önerisini görmek için listeden veya Kanban'dan bir talep seçiniz.
      </div>
    );
  }

  return (
    <motion.div whileHover={{ y: -2 }} className="p-6 backdrop-blur-2xl bg-gradient-to-br from-indigo-500/10 via-white/80 to-purple-500/10 dark:from-indigo-950/30 dark:via-slate-900/80 dark:to-purple-950/20 border border-indigo-200/50 dark:border-indigo-900/40 rounded-3xl shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
          ✦ AI Lead Intelligence: {selectedLead.coupleName}
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
          Skor: %{selectedLead.leadScore || 92}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-800/50 border border-indigo-100 dark:border-indigo-900/40">
          <span className="text-[10px] text-slate-400 font-semibold block uppercase">Kazanma İhtimali</span>
          <span className="font-bold text-emerald-600 text-sm">%{selectedLead.winProbability || 88} Yüksek</span>
        </div>
        <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-800/50 border border-indigo-100 dark:border-indigo-900/40">
          <span className="text-[10px] text-slate-400 font-semibold block uppercase">En İyi Takip Zamanı</span>
          <span className="font-bold text-indigo-600 text-xs">{selectedLead.bestFollowUpTime || "Bugün 14:30"}</span>
        </div>
      </div>

      {/* AI Tarafından Üretilen Yanıt */}
      <div className="space-y-2 text-xs">
        <div className="flex justify-between items-center">
          <span className="font-bold text-slate-700 dark:text-slate-200">💡 Önerilen WhatsApp/E-posta Yanıtı</span>
          <button
            onClick={onGenerateAIReply}
            className="text-[10px] font-bold text-indigo-600 hover:underline"
          >
            ✦ Yanıt Yeniden Üret
          </button>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-200 italic leading-relaxed text-[11px]">
          "{aiReplyData?.suggestedReply || "Yapay zeka yanıt taslağı bekleniyor..."}"
        </div>

        {aiReplyData?.suggestedReply && (
          <button
            onClick={() => onCopyReply(aiReplyData.suggestedReply)}
            className="w-full py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition"
          >
            📋 Yanıtı Kopyala & WhatsApp'a Yapıştır
          </button>
        )}
      </div>
    </motion.div>
  );
}
