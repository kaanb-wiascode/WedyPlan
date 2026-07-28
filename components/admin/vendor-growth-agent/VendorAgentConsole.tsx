"use client";

import React, { useState } from "react";
import { interactWithVendorGrowthAgentAction, generateAIVendorProposalAction } from "@/lib/actions/vendor-growth-agent";

export default function VendorAgentConsole() {
  const [userQuery, setUserQuery] = useState("Bodrum'daki mekanım için Mayıs ayı doluluk oranını artıracak kampanya ve satış stratejisi öner");
  const [agentResult, setAgentResult] = useState<any>(null);
  const [proposalResult, setProposalResult] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInteract = async () => {
    if (!userQuery.trim()) return;
    setIsProcessing(true);

    const res = await interactWithVendorGrowthAgentAction({
      vendorId: "vendor_bodrum_venue_101",
      userMessage: userQuery,
      category: "VENUE",
      city: "Bodrum",
    });

    setIsProcessing(false);

    if (res.success) {
      setAgentResult(res.data);
      alert("✨ " + res.message);
    }
  };

  const handleGenerateProposal = async () => {
    const res = await generateAIVendorProposalAction({
      vendorId: "vendor_bodrum_venue_101",
      leadId: "lead_couple_c101",
      offeredPrice: 350000,
      specialDiscountPct: 10,
    });

    if (res.success && res.proposalText) {
      setProposalResult(res.proposalText);
      alert("🚀 " + res.message);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Live Vendor Growth Coach Console */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            💬 Live Vendor Growth & Sales Coach Console (ReAct Loop)
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            Coach Online
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Tedarikçi Sorusu / İşletme Danışmanlığı İsteği</label>
            <textarea
              rows={2}
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-[11px] resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={handleInteract}
              disabled={isProcessing}
              className="py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:shadow-md transition disabled:opacity-50"
            >
              {isProcessing ? "Satış Koçu Analiz Ediyor..." : "📈 B2B Satış Koçuna Danış"}
            </button>

            <button
              onClick={handleGenerateProposal}
              className="py-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition"
            >
              📝 Otomatik Akıllı Teklif Metni Yazdır
            </button>
          </div>

          {proposalResult && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/50 space-y-1">
              <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-bold uppercase block">
                ✓ Yapay Zeka Tarafından Üretilen Kişiselleştirilmiş Teklif Metni:
              </span>
              <p className="text-slate-800 dark:text-slate-100 font-medium text-[11px] leading-relaxed">{proposalResult}</p>
            </div>
          )}

          {agentResult && (
            <div className="p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-white border-b border-slate-800 pb-2">
                <span className="font-bold">● Satış Koçu Düşünce Süreci (ReAct Thought):</span>
                <span className="text-slate-400 text-[10px]">Ciro Fırsatı: {agentResult.revenueOpportunityEstimate}</span>
              </div>

              <div className="text-slate-300 font-sans italic p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                "{agentResult.thoughtProcess}"
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-[10px]">Çağrılan B2B Araçlar:</span>
                {agentResult.toolsCalled.map((t: string, i: number) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 font-bold text-[9px]">
                    🛠️ {t}
                  </span>
                ))}
              </div>

              {/* Ajan Yanıtı */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-indigo-400 font-bold block text-xs">💬 Vendor Growth Coach AI Yanıtı:</span>
                <p className="text-slate-100 font-sans leading-relaxed text-xs">{agentResult.replyMessage}</p>
              </div>

              {/* Önerilen Büyüme Eylemleri */}
              <div className="space-y-1 pt-2 border-t border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">📌 Önerilen B2B Büyüme Adımları:</span>
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
