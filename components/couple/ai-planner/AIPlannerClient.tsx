"use client";

import React, { useState } from "react";
import ChatInterface from "./ChatInterface";
import AIRiskRadar from "./widgets/AIRiskRadar";
import AITimelinePreview from "./widgets/AITimelinePreview";
import AIMoodBoardIdeas from "./widgets/AIMoodBoardIdeas";
import { AIChatMessage } from "@/lib/validations/ai-planner";

export default function AIPlannerClient({ userId }: { userId: string }) {
  const [activeIntentPayload, setActiveIntentPayload] = useState<{
    type: AIChatMessage["intent"];
    data: any;
  }>({
    type: "RISK_CHECK",
    data: {
      risks: [
        { level: "HIGH", title: "Fotoğrafçı Rezervasyonu Gecikti", desc: "Haziran ayı için kontenjanlar doluyor." },
        { level: "MEDIUM", title: "Catering Bütçe Aşımı Riski", desc: "İçki menüsü seçimi bütçenizi %12 zorlayabilir." },
      ],
    },
  });

  const handleAIResponseReceived = (message: AIChatMessage) => {
    if (message.intent && message.payload) {
      setActiveIntentPayload({
        type: message.intent,
        data: message.payload,
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8">
      <div className="max-w-[1600px] mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-sm">
                ✦ Flagship AI Engine
              </span>
              <span className="text-xs text-slate-400">Kişisel Düğün Mimarı</span>
            </div>
            <h1 className="text-3xl font-serif font-light mt-1 tracking-tight">AI Wedding Planner</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-180px)] min-h-[650px]">
          <div className="lg:col-span-7 h-full">
            <ChatInterface userId={userId} onAIResponse={handleAIResponseReceived} />
          </div>

          <div className="lg:col-span-5 h-full space-y-6 overflow-y-auto pr-1">
            <AIRiskRadar data={activeIntentPayload.type === "RISK_CHECK" ? activeIntentPayload.data : null} />
            <AITimelinePreview data={activeIntentPayload.type === "TIMELINE" ? activeIntentPayload.data : null} />
            <AIMoodBoardIdeas data={activeIntentPayload.type === "MOODBOARD" ? activeIntentPayload.data : null} />
          </div>
        </div>
      </div>
    </div>
  );
}