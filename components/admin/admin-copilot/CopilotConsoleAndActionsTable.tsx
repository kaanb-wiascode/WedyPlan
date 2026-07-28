"use client";

import React, { useState } from "react";
import { interactWithAdminCopilotAction, executeCopilotSuggestedAction } from "@/lib/actions/admin-copilot-agent";

export default function CopilotConsoleAndActionsTable() {
  const [userQuery, setUserQuery] = useState("Onay bekleyen tedarikçileri tara, sahtecilik riski taşıyan IP'leri göster ve sistem altyapısını denetle");
  const [copilotResult, setCopilotResult] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInteract = async () => {
    if (!userQuery.trim()) return;
    setIsProcessing(true);

    const res = await interactWithAdminCopilotAction({
      adminUserId: "admin_executive_kaan",
      userMessage: userQuery,
      targetScope: "ALL",
    });

    setIsProcessing(false);

    if (res.success) {
      setCopilotResult(res.data);
      alert("✨ " + res.message);
    }
  };

  const handleExecuteAction = async (actionType: any, targetId: string) => {
    const res = await executeCopilotSuggestedAction({
      actionType,
      targetId,
      reason: "Admin Copilot tarafından önerildi ve yönetici tarafından onaylandı.",
    });

    if (res.success) {
      alert("🚀 " + res.message);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Live Admin Copilot Console */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            💬 Executive Admin Copilot Console (ReAct Loop)
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            Copilot Online
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Yönetici Komutu / Doğal Dil Talebi</label>
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
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 text-white font-bold hover:shadow-md transition disabled:opacity-50"
          >
            {isProcessing ? "Copilot Analiz Ediyor & Araçları Çalıştırıyor..." : "👑 Admin Copilot'a Komut Ver"}
          </button>

          {copilotResult && (
            <div className="p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-white border-b border-slate-800 pb-2">
                <span className="font-bold">● Copilot Düşünce Süreci (ReAct Thought):</span>
                <span className="text-slate-400 text-[10px]">İşlem Süresi: {copilotResult.executionTimeMs}ms</span>
              </div>

              <div className="text-slate-300 font-sans italic p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                "{copilotResult.thoughtProcess}"
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-[10px]">Çalıştırılan Yönetici Araçları:</span>
                {copilotResult.toolsCalled.map((t: string, i: number) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 font-bold text-[9px]">
                    🛠️ {t}
                  </span>
                ))}
              </div>

              {/* Copilot Yanıtı */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-indigo-400 font-bold block text-xs">💬 Platform Admin Copilot Yanıtı:</span>
                <p className="text-slate-100 font-sans leading-relaxed text-xs">{copilotResult.replyMessage}</p>
              </div>

              {/* Önerilen Tek Tık Eylemleri (Human-in-the-Loop) */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">⚡ Tek Tıkla Yürütülebilir Otonom Eylemler:</span>
                {copilotResult.recommendedActions.map((act: any, i: number) => (
                  <div key={i} className="p-2 rounded bg-slate-900 border border-slate-800 flex justify-between items-center font-sans text-[10px]">
                    <span className="text-slate-200 font-bold">{act.title}</span>
                    <button
                      onClick={() => handleExecuteAction(act.actionType, act.targetId)}
                      className="px-3 py-1 rounded bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition"
                    >
                      Eylemi Yürüt ✓
                    </button>
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
