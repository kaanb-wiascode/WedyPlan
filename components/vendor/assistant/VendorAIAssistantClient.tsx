"use client";

import React, { useState } from "react";
import VendorAIAssistantHeader from "./VendorAIAssistantHeader";
import AIDailyBriefingWidget from "./AIDailyBriefingWidget";
import AICopilotQuickActions from "./AICopilotQuickActions";
import AIBusinessChatWindow from "./AIBusinessChatWindow";
import { getVendorAIDailyBriefingAction } from "@/lib/actions/vendor-ai-assistant";

export default function VendorAIAssistantClient({ vendorId }: { vendorId: string }) {
  const [briefing] = useState({
    date: "Bugün (Canlı Rapor)",
    priorities: [
      "Selin & Kaan çiftinin 320.000 ₺'lik teklifine WhatsApp üzerinden takip mesajı gönderilmeli.",
      "Saat 15:00'teki Ece & Mert menü tadımı toplantısı için mutfak ekibine hatırlatma yapıldı.",
    ],
    revenuePrediction: "Bu ay hedeflenen cironun %85'ine ulaşıldı (380.000 / 450.000 ₺).",
    competitorInsight: "Bodrum bölgesinde açık hava düğün talepleri bu hafta %25 arttı.",
  });

  const [draftText, setDraftText] = useState("");

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <VendorAIAssistantHeader
        vendorName="Bodrum Sunset Venue & Events"
        aiHealthStatus="Mükemmel"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIDailyBriefingWidget briefing={briefing} />
          <AICopilotQuickActions
            vendorId={vendorId}
            onApplyDraft={(text) => {
              setDraftText(text);
              navigator.clipboard.writeText(text);
              alert("✨ AI Taslağı kopyalandı ve panoya aktarıldı!");
            }}
          />
        </div>

        <div className="lg:col-span-7">
          <AIBusinessChatWindow
            vendorId={vendorId}
            draftText={draftText}
          />
        </div>
      </div>
    </div>
  );
}
