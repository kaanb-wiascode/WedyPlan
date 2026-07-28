"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Mic, MicOff, Camera, TrendingUp, CheckCircle, ArrowRight, Lightbulb } from "lucide-react";
import { MobileAiEngine, AiDailyBriefing } from "@/lib/mobile/mobile-ai-engine";

interface MobileAiDashboardProps {
  onNavigateToModule?: (module: string) => void;
}

export const MobileAiDashboard: React.FC<MobileAiDashboardProps> = ({ onNavigateToModule }) => {
  const [briefing, setBriefing] = useState<AiDailyBriefing | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState("");
  const [activeTab, setActiveTab] = useState<"SUMMARY" | "BUDGET" | "SEARCH">("SUMMARY");

  useEffect(() => {
    MobileAiEngine.getDailyBriefing().then(setBriefing);
  }, []);

  const toggleVoiceListening = () => {
    if (isListening) {
      setIsListening(false);
      if (voiceText) {
        const res = MobileAiEngine.processVoiceCommand(voiceText);
        console.log("WedyAI Voice Command Intent:", res);
      }
    } else {
      setIsListening(true);
      setVoiceText("Kadıköy bölgesindeki en popüler 5 düğün mekanını listele...");
    }
  };

  if (!briefing) return null;

  return (
    <div className="w-full max-w-md mx-auto space-y-5 font-sans">
      {/* WedyAI Voice & Multimodal Command Bar */}
      <div className="bg-gradient-to-r from-[#111111] to-[#222222] text-[#F5F4F0] p-5 rounded-[32px] border border-white/20 shadow-xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-lg font-semibold">
              WedyAI Mobil Komuta
            </h3>
          </div>
          <span className="text-[10px] bg-white/10 px-2.5 py-1 rounded-full font-mono text-[#D4AF37]">
            Online
          </span>
        </div>

        <div className="relative">
          <input
            type="text"
            value={voiceText}
            onChange={(e) => setVoiceText(e.target.value)}
            placeholder="WedyAI'ya sesli komut verin veya yazın..."
            className="w-full h-12 pl-4 pr-20 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl text-xs text-[#F5F4F0] placeholder:text-[#86868B] outline-none"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <button
              onClick={toggleVoiceListening}
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                isListening ? "bg-red-500 text-white animate-pulse" : "bg-white/20 text-[#F5F4F0]"
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Daily Briefing & Context Engine Card */}
      <div className="bg-white/70 dark:bg-[#141418]/70 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">
            Günün Yapay Zeka Özeti
          </span>
          <span className="text-xs font-mono font-bold text-[#111111] dark:text-[#F5F4F0]">
            İlerleme: %{briefing.timelineProgressPercent}
          </span>
        </div>

        <p className="text-xs leading-relaxed text-[#424245] dark:text-[#A1A1A6]">
          {briefing.summary}
        </p>

        <div className="p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2 text-xs">
          <Lightbulb className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-tight">
            {briefing.budgetOptimizationTip}
          </p>
        </div>

        <div className="pt-2 flex justify-between items-center">
          <span className="text-xs text-[#666666]">Bekleyen {briefing.pendingTaskCount} Görev Var</span>
          <button
            onClick={() => onNavigateToModule && onNavigateToModule("PLANNER")}
            className="flex items-center gap-1 text-xs font-semibold text-[#111111] dark:text-[#F5F4F0] hover:underline"
          >
            <span>Planlayıcıya Git</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};