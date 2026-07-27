"use client";

import React, { useState } from "react";
import { generateAIStoryAction } from "@/lib/actions/website";

export default function AIWebsiteStoryWidget({
  onStoryGenerated,
}: {
  onStoryGenerated: (title: string, content: string) => void;
}) {
  const [howWeMet, setHowWeMet] = useState("Üniversite kütüphanesinde aynı kitabı ararken tanıştık.");
  const [proposal, setProposal] = useState("Bodrum'da gün batımında teknede evlilik teklifi.");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    const res = await generateAIStoryAction({
      howWeMet,
      proposalDetails: proposal,
      tone: "ROMANTIC",
    });
    setIsGenerating(false);

    if (res.success && res.storyContent) {
      onStoryGenerated(res.storyTitle || "Bizim Masalımız", res.storyContent);
      alert("✨ AI 'Bizim Hikayemiz' metnini kaleme aldı ve siteye ekledi!");
    }
  };

  return (
    <div className="p-4 backdrop-blur-2xl bg-gradient-to-br from-rose-500/10 via-white/80 to-amber-500/10 dark:from-rose-950/30 dark:via-slate-900/80 dark:to-amber-950/20 border border-rose-200/50 dark:border-rose-900/40 rounded-3xl space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          ✦ AI Story & Copy Copilot
        </span>
        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-rose-500 text-white">
          Sihirli Kalem
        </span>
      </div>

      <div className="space-y-2 text-xs">
        <div>
          <label className="text-[10px] text-slate-400 font-semibold block mb-0.5">Nasıl Tanıştınız?</label>
          <input
            type="text"
            value={howWeMet}
            onChange={(e) => setHowWeMet(e.target.value)}
            className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-[11px]"
          />
        </div>

        <div>
          <label className="text-[10px] text-slate-400 font-semibold block mb-0.5">Evlilik Teklifi Anı</label>
          <input
            type="text"
            value={proposal}
            onChange={(e) => setProposal(e.target.value)}
            className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-[11px]"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-[11px] hover:opacity-90 transition disabled:opacity-50"
        >
          {isGenerating ? "AI Hikaye Kaleme Alıyor..." : "✦ AI 'Bizim Hikayemiz' Yazısını Üret"}
        </button>
      </div>
    </div>
  );
}
