"use client";

import React, { useState } from "react";
import { processSalesAgentAction, optimizeDealProposalAction } from "@/lib/actions/sales-agent";

export default function SalesConsoleAndPipelineTable() {
  const [userQuery, setUserQuery] = useState("Selin & Kaan çifti 450.000 TL teklifimizi bütçeyi aşıyor diyerek reddetti. Teklifi nasıl optimize edebiliriz?");
  const [salesResult, setSalesResult] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcessSales = async () => {
    if (!userQuery.trim()) return;
    setIsProcessing(true);

    const res = await processSalesAgentAction({
      opportunityId: "opp_bodrum_wedding_101",
      userQuery,
      offeredAmount: 450000,
      callerPortal: "ADMIN",
    });

    setIsProcessing(false);

    if (res.success) {
      setSalesResult(res.data);
      alert("✨ " + res.message);
    }
  };

  const handleOptimizeProposal = async () => {
    if (!salesResult) return;
    const res = await optimizeDealProposalAction({
      opportunityId: salesResult.opportunityId,
      targetUpsellItem: "After-Party DJ Paketi",
      discountRatePct: 5,
    });

    if (res.success) {
      alert("🚀 " + res.message);
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Live Sales Agent Console */}
      <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            💬 Live Sales Conversion & Negotiation Coach Console
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            Sales Agent Online
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <label className="font-semibold block mb-1 text-slate-700 dark:text-slate-200">Fırsat / Pazarlık Durumu Sorusu</label>
            <textarea
              rows={2}
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-[11px] resize-none"
            />
          </div>

          <button
            onClick={handleProcessSales}
            disabled={isProcessing}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white font-bold hover:shadow-md transition disabled:opacity-50"
          >
            {isProcessing ? "Satış Ajanı Pazarlık Stratejisi Hazırlıyor..." : "🎯 Dönüşüm & Pazarlık Stratejisi Üret"}
          </button>

          {salesResult && (
            <div className="p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-white border-b border-slate-800 pb-2">
                <span className="font-bold">● Fırsat Skoru: %{salesResult.opportunityScore}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold text-[10px]">
                  Kapanış Olasılığı: %{salesResult.closingProbabilityPct}
                </span>
              </div>

              {/* Satış Koçluğu Tavsiyesi */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-indigo-400 font-bold block text-xs">💡 AI Satış Koçluğu Stratejisi:</span>
                <p className="text-slate-100 font-sans leading-relaxed text-xs">{salesResult.salesCoachAdvice}</p>
              </div>

              {/* Önerilen İkna Metni */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-bold block text-xs">💬 Önerilen İkna edici Pazarlık Metni:</span>
                <p className="text-slate-200 font-sans leading-relaxed text-xs italic">"{salesResult.suggestedNegotiationReply}"</p>
              </div>

              {/* Upsell Önerileri */}
              <div className="space-y-1.5 pt-1 border-t border-slate-800">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">🚀 Önerilen Çapraz & Üst Satış Paketleri (Upsell):</span>
                {salesResult.recommendedUpsellItems.map((up: any, i: number) => (
                  <div key={i} className="text-[10px] text-slate-200 font-sans flex justify-between items-center p-2 rounded bg-slate-900">
                    <span className="font-bold">{up.title}</span>
                    <span className="text-purple-400 font-mono font-bold">{up.estimatedPrice} (Olasılık: %{(up.probability * 100).toFixed(0)})</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleOptimizeProposal}
                className="w-full py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition font-sans text-xs pt-2"
              >
                Teklifi Optimize Et & Çifte Fırlat 🚀
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
