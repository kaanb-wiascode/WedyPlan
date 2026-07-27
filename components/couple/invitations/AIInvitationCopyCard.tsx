"use client";

import React, { useState } from "react";
import { generateAIInvitationCopyAction, sendRSVPReminderAction } from "@/lib/actions/invitation";

export default function AIInvitationCopyCard({
  userId,
  pendingCount,
}: {
  userId: string;
  pendingCount: number;
}) {
  const [tone, setTone] = useState("ROMANTIC");
  const [generatedText, setGeneratedText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSendingReminder, setIsSendingReminder] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    const res = await generateAIInvitationCopyAction(tone, "Selin & Kaan", "Bodrum Sunset Venue");
    setIsGenerating(false);

    if (res.success && res.generatedText) {
      setGeneratedText(res.generatedText);
    }
  };

  const handleSendReminder = async () => {
    setIsSendingReminder(true);
    const res = await sendRSVPReminderAction(userId, {
      guestIds: ["g1", "g2", "g3"],
      reminderChannel: "WHATSAPP",
    });
    setIsSendingReminder(false);

    if (res.success) {
      alert(res.message);
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-gradient-to-br from-rose-500/10 via-white/80 to-amber-500/10 dark:from-rose-950/30 dark:via-slate-900/80 dark:to-amber-950/20 border border-rose-200/50 dark:border-rose-900/40 rounded-3xl space-y-4 shadow-sm">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          ✦ AI Copywriting & Smart Reminder
        </span>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
          Otomatik Hatırlatıcı
        </span>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex justify-between items-center">
          <label className="font-semibold text-slate-700 dark:text-slate-300">Davetiye Üslubu</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="px-2 py-1 rounded-lg border bg-white dark:bg-slate-800 text-[11px]"
          >
            <option value="ROMANTIC">Romantik & Şık</option>
            <option value="LUXURY">Lüks & Editoryal</option>
            <option value="HUMOROUS">Eğlenceli & Samimi</option>
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-[11px] hover:opacity-90 transition disabled:opacity-50"
        >
          {isGenerating ? "AI Kaleme Alıyor..." : "✦ AI Davetiye Metni Üret"}
        </button>

        {generatedText && (
          <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-800/50 border text-[11px] text-slate-700 dark:text-slate-200 italic leading-relaxed">
            "{generatedText}"
          </div>
        )}
      </div>

      {/* Akıllı Hatırlatıcı Alanı */}
      <div className="pt-3 border-t border-rose-100 dark:border-rose-900/40 space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-500">Yanıt Vermeyen: <strong className="text-rose-600">{pendingCount} Konuk</strong></span>
          <span className="text-[10px] text-amber-600 font-bold">Önerilen Zaman: Salı 19:00</span>
        </div>

        <button
          onClick={handleSendReminder}
          disabled={isSendingReminder}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold text-xs hover:shadow-lg transition disabled:opacity-50"
        >
          {isSendingReminder ? "Gönderiliyor..." : "📲 WhatsApp LCV Hatırlatması Gönder"}
        </button>
      </div>
    </div>
  );
}
