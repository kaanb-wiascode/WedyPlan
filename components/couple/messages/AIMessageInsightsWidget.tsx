"use client";

import React from "react";

export default function AIMessageInsightsWidget({
  summary,
  reminders,
  suggestedReplies,
  onSelectReply,
}: {
  summary: string;
  reminders: any[];
  suggestedReplies: string[];
  onSelectReply: (text: string) => void;
}) {
  return (
    <div className="p-4 backdrop-blur-2xl bg-gradient-to-br from-rose-500/10 via-white/80 to-amber-500/10 dark:from-rose-950/30 dark:via-slate-900/80 dark:to-amber-950/20 border border-rose-200/50 dark:border-rose-900/40 rounded-2xl space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          ✦ AI Conversation Copilot
        </span>
        <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
          Canlı Analiz
        </span>
      </div>

      <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
        {summary}
      </p>

      {/* Otomatik Çıkarılan Hatırlatıcılar */}
      {reminders.length > 0 && (
        <div className="space-y-1">
          <span className="text-[9px] text-amber-600 font-bold uppercase block">📌 Tespit Edilen Söz & Vade</span>
          {reminders.map((r, i) => (
            <div key={i} className="p-2 rounded-xl bg-white/60 dark:bg-slate-800/40 border border-amber-200/40 text-[10px] text-slate-700 dark:text-slate-300 flex justify-between">
              <span>{r.title}</span>
              <span className="font-bold text-amber-600">{r.date}</span>
            </div>
          ))}
        </div>
      )}

      {/* Akıllı Yanıt Önerileri */}
      {suggestedReplies.length > 0 && (
        <div className="space-y-1 pt-1">
          <span className="text-[9px] text-slate-400 font-bold uppercase block">💡 Önerilen Hızlı Yanıtlar</span>
          <div className="flex flex-wrap gap-1.5">
            {suggestedReplies.map((reply, i) => (
              <button
                key={i}
                onClick={() => onSelectReply(reply)}
                className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 hover:bg-rose-50 text-slate-700 dark:text-slate-200 text-[10px] font-medium transition border border-slate-200/60 dark:border-slate-700"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
