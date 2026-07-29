"use client";

import React, { useState, useEffect } from "react";
import { Percent, Sparkles, ShieldCheck, CheckCircle2, Zap, Layers, RefreshCw, AlertCircle } from "lucide-react";
import { CommissionEngine, CommissionRule, CommissionSettlementRecord, CommissionRevenueSummary } from "@/lib/fintech/commission-engine";

export const CommissionCenter: React.FC = () => {
  const [rules, setRules] = useState<CommissionRule[]>([]);
  const [settlements, setSettlements] = useState<CommissionSettlementRecord[]>([]);
  const [summary, setSummary] = useState<CommissionRevenueSummary | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    CommissionEngine.getRules().then(setRules);
    CommissionEngine.getSettlements().then(setSettlements);
    CommissionEngine.getSummary().then(setSummary);
  }, []);

  const handleReconcile = async (settlementId: string) => {
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await CommissionEngine.reconcileSettlement(settlementId);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: "Komisyon mutabakatı (Reconciliation) başarıyla doğrulandı!" });
        CommissionEngine.getSettlements().then(setSettlements);
      } else {
        setStatusMsg({ type: "error", text: "Mutabakat gerçekleştirilemedi." });
      }
    }, 600);
  };

  if (!summary) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Commission Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Percent className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Komisyon & Gelir Paylaşım Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> Take Rate: %{summary.averageTakeRatePercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Sabit, yüzdelik, kademeli, kampanya ve partner bazlı komisyon modelleri, otomatik mutabakat (reconciliation) ve WedyAI gelir optimizasyonu.
        </p>

        {/* Executive Commission Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Toplam Pazaryeri GMV</span>
            <span className="font-mono font-bold text-white text-base">
              ₺{(summary.totalGrossMarketplaceVolumeGmv / 1000000).toFixed(1)}M TL
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Toplanan Komisyon</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              ₺{(summary.totalCommissionCollected / 1000000).toFixed(2)}M TL
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">30 Gün Tahmini Gelir</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              ₺{(summary.aiCommissionForecast30Days / 1000000).toFixed(2)}M TL
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Revenue Optimization & Anomaly Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Gelir Optimizasyonu
          </span>
          <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
            Anomali: {summary.aiAnomalyDetectionAlertCount} Risk
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiRevenueOptimizationTip}
          </p>
        </div>
      </div>

      {/* Active Commission Rules Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#D4AF37]" />
          <span>Tanımlı Komisyon & Gelir Paylaşım Kuralları ({rules.length})</span>
        </h4>

        <div className="space-y-3">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{rule.ruleName}</span>
                <span className="text-[9px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-0.5 rounded-full">
                  {rule.modelType}
                </span>
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-[#86868B]">
                <span>
                  Oran/Ücret: {rule.percentageRate ? `%${rule.percentageRate}` : `₺${rule.fixedFeeAmount} TRY`}
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  {rule.isActive ? "Aktif Kural" : "Pasif"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Commission Settlement & Reconciliation Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">
          Hakediş Mutabakatı & Kesinti Kütüğü ({settlements.length})
        </h4>

        <div className="space-y-3">
          {settlements.map((s) => (
            <div
              key={s.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{s.vendorName}</span>
                <span className="font-mono text-[#D4AF37]">
                  Komisyon: ₺{s.commissionCollectedAmount.toLocaleString()} {s.currency}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#86868B]">
                <div>Brüt Hacim: ₺{s.grossTransactionAmount.toLocaleString()}</div>
                <div>Net Hakediş: ₺{s.netVendorPayoutAmount.toLocaleString()}</div>
              </div>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center text-[10px]">
                {s.isReconciled ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Mutabakat Doğrulandı
                  </span>
                ) : (
                  <button
                    onClick={() => handleReconcile(s.id)}
                    disabled={isProcessing}
                    className="px-3.5 py-1.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1"
                  >
                    {isProcessing ? (
                      <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
                    ) : (
                      <>
                        <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
                        <span>Mutabakatı Onayla (Reconcile)</span>
                      </>
                    )}
                  </button>
                )}
                <span className="font-mono text-[#86868B]">{s.auditHash}</span>
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