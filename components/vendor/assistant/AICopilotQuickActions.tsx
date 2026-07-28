"use client";

import React, { useState } from "react";
import { generateQuickCopilotDraftAction } from "@/lib/actions/vendor-ai-assistant";

export default function AICopilotQuickActions({
  vendorId,
  onApplyDraft,
}: {
  vendorId: string;
  onApplyDraft: (text: string) => void;
}) {
  const [recipientName, setRecipientName] = useState("Selin Hanım");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (type: any) => {
    setIsGenerating(true);
    const res = await generateQuickCopilotDraftAction(vendorId, {
      draftType: type,
      recipientName,
    });
    setIsGenerating(false);

    if (res.success && res.draft) {
      onApplyDraft(res.draft);
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          ⚡ Hızlı AI Copilot Taslak Üreticisi
        </span>
      </div>

      <div>
        <label className="font-semibold block mb-1">Müşteri / Çift Adı</label>
        <input
          type="text"
          value={recipientName}
          onChange={(e) => setRecipientName(e.target.value)}
          className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-xs"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
        <button
          onClick={() => handleGenerate("WHATSAPP_REPLY")}
          disabled={isGenerating}
          className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/50 text-emerald-800 dark:text-emerald-300 font-bold hover:bg-emerald-100 transition text-left"
        >
          📲 WhatsApp Takip Mesajı
        </button>

        <button
          onClick={() => handleGenerate("REVIEW_RESPONSE")}
          disabled={isGenerating}
          className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200/50 text-indigo-800 dark:text-indigo-300 font-bold hover:bg-indigo-100 transition text-left"
        >
          ⭐️ Müşteri Yorum Yanıtı
        </button>
      </div>
    </div>
  );
}
