"use client";

import React, { useState, useEffect } from "react";
import { Bot, Sparkles, ShieldCheck, RefreshCw, CheckCircle2, Zap, Brain, Wrench, Layers, Play } from "lucide-react";
import { AiAgentPlatformEngine, EnterpriseAgentProfile, AgentPlatformSummary, SpecializedAgentRole } from "@/lib/ai-native/ai-agent-platform-engine";

export const AiAgentCenter: React.FC = () => {
  const [agents, setAgents] = useState<EnterpriseAgentProfile[]>([]);
  const [summary, setSummary] = useState<AgentPlatformSummary | null>(null);
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<SpecializedAgentRole | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    AiAgentPlatformEngine.getEnterpriseAgents().then(setAgents);
    AiAgentPlatformEngine.getPlatformSummary().then(setSummary);
  }, []);

  const handleRunTask = async (agentId: string) => {
    setIsProcessing(true);

    setTimeout(async () => {
      await AiAgentPlatformEngine.executeAgentTask(agentId, "Otonom araç bağlaması çalıştırılıyor...");
      setIsProcessing(false);
      AiAgentPlatformEngine.getEnterpriseAgents().then(setAgents);
    }, 500);
  };

  if (!summary) return null;

  const filteredAgents = selectedRoleFilter === "ALL"
    ? agents
    : agents.filter((a) => a.role === selectedRoleFilter);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive AI Agent Platform Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kurumsal AI Ajan Platformu
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Health: %{summary.aiCoordinationHealthPercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          9 uzmanlaşmış AI ajanı (Couple, Vendor, Admin, Sales, Marketing, Finance, Support, Developer, Executive), otonom araç bağlama ve görev koordinasyonu.
        </p>

        {/* Executive Agent Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Uzman AI Ajanlar</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.totalSpecializedAgentsCount} Agent
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Bağlı Fonksiyonlar</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.activeBoundToolsCount} Tool
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Tamamlanan Görevler</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.tasksCompletedTodayCount} Task
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Multi-Agent Coordination Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Ajan Koordinasyon Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Autonomous Delegation
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiAgentPlatformInsightNote}
          </p>
        </div>
      </div>

      {/* Role Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "COUPLE_AGENT", "VENDOR_AGENT", "FINANCE_AGENT", "SUPPORT_AGENT", "EXECUTIVE_AGENT"] as (SpecializedAgentRole | "ALL")[]).map((role) => (
          <button
            key={role}
            onClick={() => setSelectedRoleFilter(role)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedRoleFilter === role
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {role === "ALL" ? "Tüm Ajanlar" : role.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Specialized AI Agents Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Brain className="w-5 h-5 text-[#D4AF37]" />
          <span>Uzmanlaşmış AI Ajan Profilleri ({filteredAgents.length})</span>
        </h4>

        <div className="space-y-3">
          {filteredAgents.map((a) => (
            <div
              key={a.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2.5 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{a.title}</span>
                <span className="text-[9px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-0.5 rounded-full font-bold">
                  Öncelik: {a.priorityScore}
                </span>
              </div>

              <p className="text-[11px] text-[#555555] dark:text-[#A1A1A6] leading-relaxed">
                {a.description}
              </p>

              <div className="flex flex-wrap gap-1">
                {a.primaryToolsBound.map((tool) => (
                  <span
                    key={tool}
                    className="text-[9px] font-mono bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded-md text-[#666666] dark:text-[#A1A1A6] flex items-center gap-1"
                  >
                    <Wrench className="w-3 h-3 text-[#D4AF37]" /> {tool}
                  </span>
                ))}
              </div>

              <div className="p-2 bg-white dark:bg-black/40 rounded-xl border border-black/5 dark:border-white/5 text-[10px] text-[#D4AF37] font-medium">
                ✦ Aktif Görev: {a.activeTaskName}
              </div>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center text-[10px]">
                <button
                  onClick={() => handleRunTask(a.id)}
                  disabled={isProcessing}
                  className="px-3.5 py-1.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1"
                >
                  {isProcessing ? (
                    <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
                  ) : (
                    <>
                      <Play className="w-3 h-3 text-[#D4AF37]" />
                      <span>Araç Görevini Çalıştır</span>
                    </>
                  )}
                </button>

                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  Başarı Oranı: %{a.aiSuccessRatePercent}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};