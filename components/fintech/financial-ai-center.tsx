"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Bot, User, Send, ShieldCheck, RefreshCw, CheckCircle2, TrendingUp, DollarSign, Wallet, Brain, MessageSquare } from "lucide-react";
import { FinancialAiEngine, FinancialAssistantPersona, FinancialAiInsightCard, FinancialAiChatMessage } from "@/lib/fintech/financial-ai-engine";

export const FinancialAiCenter: React.FC = () => {
  const [selectedPersona, setSelectedPersona] = useState<FinancialAssistantPersona>("COUPLE_ASSISTANT");
  const [insights, setInsights] = useState<FinancialAiInsightCard[]>([]);
  const [messages, setMessages] = useState<FinancialAiChatMessage[]>([
    {
      id: "msg_init",
      sender: "WEDY_AI",
      text: "Merhaba! Ben WedyAI Finansal Danışmanınız. Bütçe, hakediş, nakit akışı veya gelir durumunuz hakkında bana soru sorabilirsiniz.",
      timestamp: new Date(),
    },
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    FinancialAiEngine.getPersonaInsights(selectedPersona).then(setInsights);
  }, [selectedPersona]);

  const handleSendQuery = async () => {
    if (!inputQuery.trim() || isProcessing) return;
    const userMsg: FinancialAiChatMessage = {
      id: `usr_${Date.now()}`,
      sender: "USER",
      text: inputQuery,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentQuery = inputQuery;
    setInputQuery("");
    setIsProcessing(true);

    setTimeout(async () => {
      const aiReply = await FinancialAiEngine.processUserQuery(selectedPersona, currentQuery);
      setMessages((prev) => [...prev, aiReply]);
      setIsProcessing(false);
    }, 500);
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Financial AI Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              WedyAI Finansal Danışman
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> AI Advisor Active
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Çiftler, tedarikçiler, finans ekibi ve üst düzey yöneticiler için kişiselleştirilmiş akıllı finansal analiz ve karar destek asistanı.
        </p>

        {/* Persona Selector Tabs */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs">
          {(["COUPLE_ASSISTANT", "VENDOR_ASSISTANT", "FINANCE_TEAM_ASSISTANT", "EXECUTIVE_ASSISTANT"] as FinancialAssistantPersona[]).map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPersona(p)}
              className={`py-2 px-3 rounded-2xl text-[11px] font-bold border transition-all text-center ${
                selectedPersona === p
                  ? "bg-[#D4AF37] text-[#111111] border-[#D4AF37]"
                  : "bg-white/5 text-[#D1D1D6] border-white/10 hover:bg-white/10"
              }`}
            >
              {p === "COUPLE_ASSISTANT" ? "Çift Asistanı" : p === "VENDOR_ASSISTANT" ? "Tedarikçi Asistanı" : p === "FINANCE_TEAM_ASSISTANT" ? "Finans Ekibi" : "Executive C-Suite"}
            </button>
          ))}
        </div>
      </div>

      {/* AI Persona Insights Cards Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#D4AF37]" />
          <span>WedyAI Akıllı Analiz & Öneriler</span>
        </h4>

        <div className="space-y-3">
          {insights.map((ins) => (
            <div
              key={ins.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{ins.title}</span>
                <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
                  %{ins.confidenceScorePercent} Güven
                </span>
              </div>

              <p className="text-[11px] text-[#555555] dark:text-[#A1A1A6] leading-relaxed">{ins.insightSummary}</p>

              <div className="p-2.5 bg-white dark:bg-black/40 rounded-xl border border-black/5 dark:border-white/5 text-[10px] text-[#D4AF37] font-semibold">
                ✦ Öneri: {ins.actionableRecommendation}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive AI Chat Console */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[#D4AF37]" />
          <span>Finansal Danışman Sorularınızı Yanıtlıyor</span>
        </h4>

        <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`p-3.5 rounded-2xl text-xs space-y-1 ${
                m.sender === "USER"
                  ? "bg-[#111111] text-[#F5F4F0] ml-8"
                  : "bg-[#F5F4F0] dark:bg-black/20 text-[#111111] dark:text-[#F5F4F0] mr-8 border border-black/5 dark:border-white/5"
              }`}
            >
              <div className="flex justify-between items-center text-[9px] opacity-70 font-mono">
                <span>{m.sender === "USER" ? "Siz" : "WedyAI Financial Advisor"}</span>
                <span>{new Date(m.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
              <p className="text-[11px] leading-relaxed font-medium">{m.text}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2 text-xs pt-1">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendQuery()}
            placeholder="Finansal bir soru sorun (Örn: Bütçemde ne kadar kaldı?)..."
            className="flex-1 h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none"
          />
          <button
            onClick={handleSendQuery}
            disabled={!inputQuery.trim() || isProcessing}
            className="w-11 h-11 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] rounded-2xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 flex items-center justify-center shrink-0"
          >
            {isProcessing ? (
              <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
            ) : (
              <Send className="w-4 h-4 text-[#D4AF37]" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};