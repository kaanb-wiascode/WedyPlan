"use client";

import React, { useState, useEffect } from "react";
import { CreditCard, Sparkles, ShieldCheck, RefreshCw, CheckCircle2, Globe, Activity, Zap, AlertTriangle, ArrowRightLeft, ShieldAlert } from "lucide-react";
import { RegionalPaymentEngine, PaymentProviderRecord, PaymentRoutingSummary } from "@/lib/global/regional-payment-engine";

export const RegionalPaymentCenter: React.FC = () => {
  const [providers, setProviders] = useState<PaymentProviderRecord[]>([]);
  const [summary, setSummary] = useState<PaymentRoutingSummary | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    RegionalPaymentEngine.getProviders().then(setProviders);
    RegionalPaymentEngine.getSummary().then(setSummary);
  }, []);

  const handleToggleFailover = async (providerId: string) => {
    setIsProcessing(true);

    setTimeout(async () => {
      await RegionalPaymentEngine.toggleProviderStatus(providerId);
      setIsProcessing(false);
      RegionalPaymentEngine.getProviders().then(setProviders);
      RegionalPaymentEngine.getSummary().then(setSummary);
    }, 400);
  };

  if (!summary) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Executive Regional Payment Header */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Bölgesel Ödeme Entegrasyon Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Auth Success: %{summary.overallAuthSuccessRatePercent}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Sağlayıcıdan bağımsız (Provider-Agnostic) bölgesel ödeme mimarisi, APM desteği, otonom failover ve WedyAI akıllı yönlendirme.
        </p>

        {/* Executive Payment Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Kayıtlı Gateway</span>
            <span className="font-mono font-bold text-white text-base">
              {summary.registeredProvidersCount} Adapter
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Sağlıklı Ağ Geçidi</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {summary.activeHealthyGatewaysCount} Gateway
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Yönlendirme Verimi</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              %{summary.aiRoutingEfficiencyScorePercent}
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Routing Optimization & Failure Analysis Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Yönlendirme & Red Tahmin Notu
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Smart Routing AI
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiPaymentInsightNote}
          </p>
        </div>
      </div>

      {/* Payment Providers Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#D4AF37]" />
          <span>Bölgesel Ödeme Ağ Geçitleri ({providers.length})</span>
        </h4>

        <div className="space-y-3">
          {providers.map((p) => (
            <div
              key={p.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2.5 text-xs border border-black/5 dark:border-white/5"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{p.providerName}</span>
                <span className={`text-[9px] font-mono px-2.5 py-0.5 rounded-full font-bold ${
                  p.healthStatus === "HEALTHY"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-red-500/10 text-red-600 dark:text-red-400"
                }`}>
                  {p.healthStatus}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#86868B]">
                <div>Başarı Oranı: %{p.authorizationSuccessRatePercent}</div>
                <div>Ort. Gecikme: {p.averageLatencyMs} ms</div>
                <div>Desteklenen Para: {p.supportedCurrencies.join(", ")}</div>
                <div>Ülkeler: {p.supportedCountries.join(", ")}</div>
              </div>

              <div className="flex flex-wrap gap-1">
                {p.supportedApms.map((apm) => (
                  <span
                    key={apm}
                    className="text-[9px] font-mono bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-0.5 rounded-md font-medium"
                  >
                    {apm}
                  </span>
                ))}
              </div>

              <p className="text-[10px] text-[#86868B] pt-1">
                ✦ WedyAI Yönlendirme: {p.aiRoutingTip}
              </p>

              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex justify-between items-center text-[10px]">
                <button
                  onClick={() => handleToggleFailover(p.id)}
                  disabled={isProcessing}
                  className="px-3.5 py-1.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-[10px] font-bold rounded-xl shadow-sm hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1"
                >
                  {isProcessing ? (
                    <RefreshCw className="w-3 h-3 animate-spin text-[#D4AF37]" />
                  ) : p.healthStatus === "HEALTHY" ? (
                    <>
                      <ShieldAlert className="w-3 h-3 text-red-400" />
                      <span>Simüle Kesinti (Failover Aktif Et)</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-3 h-3 text-emerald-400" />
                      <span>Sistemi Normale Döndür</span>
                    </>
                  )}
                </button>

                {p.fallbackProviderCode && (
                  <span className="font-mono text-[#86868B]">
                    Yedek: {p.fallbackProviderCode}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};