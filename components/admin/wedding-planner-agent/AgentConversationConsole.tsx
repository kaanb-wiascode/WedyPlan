"use client";

import React, { useState } from "react";
import { interactWithWeddingPlannerAgentAction } from "@/lib/actions/wedding-planner-agent";

export default function AgentConversationConsole() {
  const [userQuery, setUserQuery] = useState("Bodrum'da deniz kenarında 200 kişilik lüks kır düğünü için mekan bul ve bütçe planı hazırla");
  const [agentResult, setAgentResult] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInteract = async () => {
    if (!userQuery.trim()) return;
    setIsProcessing(true);

    const res = await interactWithWeddingPlannerAgentAction({
      coupleId: "couple_bodrum_2026",
      userMessage: userQuery,
      totalBudget: 850000,
      city: "Bodrum",
    });

    setIsProcessing(false);

    if (res.success) {
      setAgentResult(res.data);
      alert("✨ " + res.message);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Live Agent Conversation & ReAct Console */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            💬 Live Wedding Planner Copilot Console (ReAct Loop)
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            Agent Online
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Çiftin İsteği / Mesajı</label>
            <textarea
              rows={2}
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-[11px] resize-none"
            />
          </div>

          <button
            onClick={handleInteract}
            disabled={isProcessing}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white font-bold hover:shadow-md transition disabled:opacity-50"
          >
            {isProcessing ? "Yapay Zeka Düşünüyor & Araç Çalıştırıyor..." : "💍 Düğün Asistanına Gönder"}
          </button>

          {agentResult && (
            <div className="p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-white border-b border-slate-800 pb-2">
                <span className="font-bold">● Ajan Düşünce Süreci (ReAct Thought):</span>
                <span className="text-slate-400 text-[10px]">İşlem Süresi: {agentResult.executionTimeMs}ms</span>
              </div>

              <div className="text-slate-300 font-sans italic p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                "{agentResult.thoughtProcess}"
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-[10px]">Çağrılan Araçlar:</span>
                {agentResult.toolsCalled.map((t: string, i: number) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 font-bold text-[9px]">
                    🛠️ {t}
                  </span>
                ))}
              </div>

              {/* Ajan Yanıtı */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-pink-400 font-bold block text-xs">💬 Wedding Planner AI Yanıtı:</span>
                <p className="text-slate-100 font-sans leading-relaxed text-xs">{agentResult.replyMessage}</p>
              </div>

              {/* Önerilen Aksiyonlar */}
              <div className="space-y-1 pt-2 border-t border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">📌 Önerilen Eylem Adımları:</span>
                {agentResult.suggestedActionItems.map((act: string, i: number) => (
                  <div key={i} className="text-[10px] text-slate-200 font-sans flex items-center gap-2">
                    <span>✓</span>
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
