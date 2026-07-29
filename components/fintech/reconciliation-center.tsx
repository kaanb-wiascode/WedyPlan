"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, Sparkles, ShieldCheck, RefreshCw, AlertTriangle, Scale, CheckCheck, Activity, AlertCircle } from "lucide-react";
import { ReconciliationEngine, ReconciliationBatchRecord, FinancialClosingSummary, ReconciliationDomain } from "@/lib/fintech/reconciliation-engine";

export const ReconciliationCenter: React.FC = () => {
  const [batches, setBatches] = useState<ReconciliationBatchRecord[]>([]);
  const [summary, setSummary] = useState<FinancialClosingSummary | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<ReconciliationDomain | "ALL">("ALL");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    ReconciliationEngine.getReconciliationBatches().then(setBatches);
    ReconciliationEngine.getClosingSummary().then(setSummary);
  }, []);

  const handleResolveManual = async (batchId: string) => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await ReconciliationEngine.resolveExceptionManually(batchId);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: "Mutabakat uyuşmazlığı manuel eşleştirilerek kapatıldı!" });
        ReconciliationEngine.getReconciliationBatches().then(setBatches);
        ReconciliationEngine.getClosingSummary().then(setSummary);
      } else {
        setStatusMsg({ type: "error", text: "Eşleştirme yapılamadı." });
      }
    }, 600);
  };

  if (!summary) return null;

  const filteredBatches = selectedDomain === "ALL"
    ? batches
    : batches.filter((b) => b.domain === selectedDomain);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Reconciliation Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Scale className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Mutabakat & Günlük Kapanış Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <CheckCheck className="w-3.5 h-3.5" /> Daily Closing: {summary.dailyClosingStatus}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Cüzdan, ödemeler, Escrow, hakedişler, iadeler, abonelikler ve komisyonlar arasında sıfır sapmalı otonom mutabakat motoru.
        </p>

        {/* Executive Closing Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Mutabakat Yapılan Hacim</span>
            <span className="font-mono font-bold text-white text-base">
              ₺{(summary.totalReconciledVolume / 1000000).toFixed(1)}M TL
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Uyuşmazlık (Exceptions)</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.unmatchedExceptionsCount} Adet
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Toplam Sapma (Variance)</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              ₺{summary.totalVarianceAmount} TL
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Anomaly & Closing Insight Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Mutabakat Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Zero Data Duplication
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiClosingInsight}
          </p>
        </div>
      </div>

      {/* Domain Filters Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "ESCROW", "VENDOR_PAYOUTS", "WALLET", "PAYMENTS"] as (ReconciliationDomain | "ALL")[]).map((dom) => (
          <button
            key={dom}
            onClick={() => setSelectedDomain(dom)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedDomain === dom
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10"
            }`}
          >
            {dom === "ALL" ? "Tüm Alanlar" : dom}
          </button>
        ))}
      </div>

      {/* Reconciliation Batches Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#D4AF37]" />
          <span>Mutabakat & Uyuşmazlık Kütüğü ({filteredBatches.length})</span>
        </h4>

        <div className="space-y-3">
          {filteredBatches.map((b) => (
            <div
              key={b.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>Ref: {b.externalGatewayTxRef}</span>
                <span className={`text-[9px] font-mono px-2.5 py-0.5 rounded-full font-bold ${
                  b.matchStatus === "MATCHED_AUTOMATIC" || b.matchStatus === "MATCHED_MANUAL"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                }`}>
                  {b.matchStatus}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#86868B]">
                <div>Beklenen: ₺{b.expectedAmount.toLocaleString()}</div>
                <div>Gerçekleşen: ₺{b.actualAmount.toLocaleString()}</div>
              </div>

              <div className="p-2.5 bg-white dark:bg-black/40 rounded-xl border border-black/5 dark:border-white/5 text-[10px] text-[#D4AF37] font-medium">
                ✦ WedyAI Analizi: {b.aiReconciliationSuggestion}
              </div>

              <div className="pt-1 flex justify-between items-center text-[10px]">
                {b.matchStatus === "DISCREPANCY_DETECTED" || b.matchStatus === "UNMATCHED_EXCEPTION" ? (
                  <button
                    onClick={() => handleResolveManual(b.id)}
                    disabled={isProcessing}
                    className="px-3.5 py-1.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1"
                  >
                    {isProcessing ? (
                      <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
                    ) : (
                      <>
                        <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
                        <span>Manuel Eşleştir & Sapmayı Kapat</span>
                      </>
                    )}
                  </button>
                ) : (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Mutabakat Doğrulandı
                  </span>
                )}
                <span className="font-mono text-[#86868B]">{b.internalLedgerAuditHash}</span>
              </div>
            </div>
          ))}
        </div>

        {statusMsg && (
          <div
            className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
              statusMsg.type === "success"
                ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300"
                : "bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-300"
            }`}
          >
            {statusMsg.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{statusMsg.text}</span>
          </div>
        )}
      </div>
    </div>
  );
};