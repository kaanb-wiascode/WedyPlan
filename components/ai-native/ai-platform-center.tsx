"use client";

import React, { useState, useEffect } from "react";
import { Cpu, Sparkles, ShieldCheck, RefreshCw, CheckCircle2, MessageSquare, Brain, Zap, Activity, ArrowRightLeft, Database } from "lucide-react";
import { AiAgentEngine, AgentRecord, InterAgentMessage, AiPlatformSummary } from "@/lib/ai-native/ai-agent-engine";

export const AiPlatformCenter: React.FC = () => {
  const [agents, setAgents] = useState<AgentRecord[]>([]);
  const [messages, setMessages] = useState<InterAgentMessage[]>([]);
  const [summary, setSummary] = useState<AiPlatformSummary | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    AiAgentEngine.getAgents().then(setAgents);
    AiAgentEngine.getInterAgentMessages().then(setMessages);
    AiAgentEngine.getPlatformSummary().then(setSummary);
  }, []);

  const handleTriggerAction = async (agentId: string) => {
    setIsProcessing(true);

    setTimeout(async () => {
      await AiAgentEngine.triggerAgentAction(agentId, "Otonom takvim ve bütçe optimizasyonu çalıştırılıyor...");
      setIsProcessing(false);
      AiAgentEngine.getAgents().then(setAgents);
    }, 500);
  };

  if (!summary) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive AI Platform Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Cpu className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              AI-Native Platform Mimarisi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Health: %{summary.aiPlatformHealthPercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Yapay zekanın birincil etkileşim katmanı olduğu otonom çoklu-ajan mimarisi, ajanlar arası iletişim otobüsü ve vektörel hafıza vault'u.
        </p>

        {/* Executive AI Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Otonom Ajanlar</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.registeredAgentsCount} Agent
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Vektörel Hafıza</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {(summary.activeMemoryEmbeddingsCount / 1000).toFixed(1)}K Vector
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Otomasyon (24s)</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.automatedTasksExecuted24h} Task
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Multi-Agent System Insight Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Sistem & Ajan İletişim Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Multi-Agent Active
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiSystemInsightNote}
          </p>
        </div>
      </div>

      {/* Autonomous AI Agents Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Brain className="w-5 h-5 text-[#D4AF37]" />
          <span>Otonom AI Ajan Kayıtları ({agents.length})</span>
        </h4>

        <div className="space-y-3">
          {agents.map((a) => (
            <div
              key={a.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2.5 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{a.name}</span>
                <span className={`text-[9px] font-mono px-2.5 py-0.5 rounded-full font-bold ${
                  a.status === "EXECUTING_ACTION" || a.status === "THINKING"
                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                }`}>
                  {a.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#86868B]">
                <div>Odak: {a.domainFocus}</div>
                <div>Hafıza Kaydı: {a.memoryItemsCount} Veri</div>
              </div>

              {a.currentTaskDescription && (
                <p className="text-[10px] text-[#D4AF37] font-medium pt-1">
                  ✦ {a.currentTaskDescription}
                </p>
              )}

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center text-[10px]">
                <button
                  onClick={() => handleTriggerAction(a.id)}
                  disabled={isProcessing}
                  className="px-3.5 py-1.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1"
                >
                  {isProcessing ? (
                    <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
                  ) : (
                    <>
                      <Zap className="w-3 h-3 text-[#D4AF37]" />
                      <span>Ajan Görevini Tetikle</span>
                    </>
                  )}
                </button>

                <span className="font-mono text-[#86868B]">
                  Son Aktivite: {new Date(a.lastActiveAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inter-Agent Communication Bus Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <ArrowRightLeft className="w-5 h-5 text-[#D4AF37]" />
          <span>Ajanlar Arası İletişim Akışı (Inter-Agent Bus)</span>
        </h4>

        <div className="space-y-2">
          {messages.map((m) => (
            <div
              key={m.id}
              className="p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-xl space-y-1 text-[11px] font-mono border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{m.senderAgentType} ➔ {m.receiverAgentType}</span>
                <span className="text-[9px] text-[#D4AF37]">{m.intent}</span>
              </div>
              <p className="text-[10px] text-[#86868B]">{m.payloadSummary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};