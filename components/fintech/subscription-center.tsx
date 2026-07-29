"use client";

import React, { useState, useEffect } from "react";
import { CreditCard, Sparkles, ShieldCheck, CheckCircle2, Zap, ArrowUpRight, AlertCircle, RefreshCw, Layers, TrendingUp, XCircle } from "lucide-react";
import { SubscriptionEngine, SubscriptionRecord, BillingSummary, SubscriptionPlanType } from "@/lib/fintech/subscription-engine";

export const SubscriptionCenter: React.FC = () => {
  const [subs, setSubs] = useState<SubscriptionRecord[]>([]);
  const [summary, setSummary] = useState<BillingSummary | null>(null);
  const [selectedSub, setSelectedSub] = useState<SubscriptionRecord | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    SubscriptionEngine.getSubscriptions().then((data) => {
      setSubs(data);
      if (data.length > 0) setSelectedSub(data[0]);
    });
    SubscriptionEngine.getBillingSummary().then(setSummary);
  }, []);

  const handlePlanUpgrade = async (newPlan: SubscriptionPlanType, newFee: number) => {
    if (!selectedSub) return;
    setIsProcessing(true);
    setStatusMsg(null);

    setTimeout(async () => {
      const ok = await SubscriptionEngine.changePlan(selectedSub.id, newPlan, newFee);
      setIsProcessing(false);

      if (ok) {
        setStatusMsg({ type: "success", text: `Abonelik planı '${newPlan}' olarak yükseltildi!` });
        SubscriptionEngine.getSubscriptions().then((data) => {
          setSubs(data);
          const updated = data.find((s) => s.id === selectedSub.id);
          if (updated) setSelectedSub(updated);
        });
        SubscriptionEngine.getBillingSummary().then(setSummary);
      } else {
        setStatusMsg({ type: "error", text: "Plan değiştirilemedi." });
      }
    }, 600);
  };

  const handleCancel = async () => {
    if (!selectedSub) return;
    setIsProcessing(true);

    setTimeout(async () => {
      await SubscriptionEngine.cancelSubscription(selectedSub.id);
      setIsProcessing(false);
      setStatusMsg({ type: "error", text: "Abonelik dönemi sonunda yenilenmeyecek şekilde iptal edildi." });
      SubscriptionEngine.getSubscriptions().then((data) => {
        setSubs(data);
        const updated = data.find((s) => s.id === selectedSub.id);
        if (updated) setSelectedSub(updated);
      });
    }, 600);
  };

  if (!summary || !selectedSub) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Billing Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kurumsal Abonelik & Faturalandırma
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> MRR Growth
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Çift, Tedarikçi, Kurumsal ve Acente abonelik planları, kullanım kotaları, otomatik yenilemeler ve WedyAI churn tahmini.
        </p>

        {/* Executive Billing Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Aylık Gelir (MRR)</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              ₺{summary.monthlyRecurringRevenueMrr.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">30 Gün Tahmini MRR</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              ₺{summary.aiMrrForecast30Days.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Terk Oranı (Churn)</span>
            <span className="font-mono font-bold text-white text-base">
              %{summary.churnRatePercent}
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Churn & Smart Upgrade Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Terk Riski & Akıllı Yükseltme
          </span>
          <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
            Churn Riski: %{selectedSub.aiChurnRiskPercent}
          </span>
        </div>

        <div className="space-y-1">
          <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">
            {selectedSub.tenantName}
          </h4>
          <span className="text-[10px] font-mono text-[#86868B]">
            Plan: {selectedSub.planType} • Ücret: ₺{selectedSub.monthlyFeeAmount.toLocaleString()} TRY/ay
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-1.5 text-xs border border-black/5 dark:border-white/5">
          <span className="font-bold text-[#D4AF37] text-[10px] block">✦ WedyAI Önerisi</span>
          <p className="text-[11px] text-[#111111] dark:text-[#F5F4F0] font-medium leading-relaxed">
            {selectedSub.aiUpgradeRecommendation}
          </p>
        </div>

        {/* Usage Quota Metering Bar */}
        <div className="space-y-2 pt-1 text-xs">
          <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
            <span>Kullanım Kotası (Usage Metering)</span>
            <span className="font-mono text-xs">
              {selectedSub.usageQuotaCurrent} / {selectedSub.usageQuotaMax} Adet
            </span>
          </div>

          <div className="w-full bg-black/10 dark:bg-white/10 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#D4AF37] h-full transition-all duration-500"
              style={{
                width: `${Math.min(100, (selectedSub.usageQuotaCurrent / selectedSub.usageQuotaMax) * 100)}%`,
              }}
            />
          </div>
        </div>

        {/* Plan Upgrade & Cancel Actions */}
        <div className="pt-2 flex gap-2">
          <button
            onClick={() => handlePlanUpgrade("FRANCHISE", 25000)}
            disabled={isProcessing || selectedSub.planType === "FRANCHISE"}
            className="flex-1 py-2.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-bold rounded-2xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center justify-center gap-1.5"
          >
            {isProcessing ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#D4AF37]" />
            ) : (
              <>
                <Zap className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Franchise Plana Yükselt</span>
              </>
            )}
          </button>

          {selectedSub.status !== "CANCELED" && (
            <button
              onClick={handleCancel}
              disabled={isProcessing}
              className="px-4 py-2.5 bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold rounded-2xl border border-red-500/20 hover:bg-red-500/20 transition-all flex items-center gap-1 shrink-0"
            >
              <XCircle className="w-3.5 h-3.5" /> İptal Et
            </button>
          )}
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

      {/* Subscriptions List Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">
          Tüm Kayıtlı Abonelikler ({subs.length})
        </h4>

        <div className="space-y-3">
          {subs.map((sub) => (
            <div
              key={sub.id}
              onClick={() => setSelectedSub(sub)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer text-xs space-y-2 ${
                selectedSub.id === sub.id
                  ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                  : "bg-[#F5F4F0] dark:bg-black/20 border-transparent text-[#111111] dark:text-[#F5F4F0]"
              }`}
            >
              <div className="flex justify-between items-center font-bold">
                <span className="text-sm">{sub.tenantName}</span>
                <span className="text-[10px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-0.5 rounded-full">
                  {sub.status}
                </span>
              </div>

              <div className="flex justify-between items-center text-[10px] opacity-80 font-mono">
                <span>Plan: {sub.planType}</span>
                <span>₺{sub.monthlyFeeAmount.toLocaleString()} TRY/ay</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};