"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, Users, Sparkles, Share2, Award, Zap, Target, ArrowUpRight, Copy, CheckCircle2, RefreshCw, BarChart3, ShieldCheck } from "lucide-react";
import { GrowthEngine, GrowthKpiMetrics, ReferralCampaign, AiGrowthInsight } from "@/lib/growth/growth-engine";

export const GrowthDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<GrowthKpiMetrics | null>(null);
  const [campaigns, setCampaigns] = useState<ReferralCampaign[]>([]);
  const [insights, setInsights] = useState<AiGrowthInsight[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [newCodeInput, setNewCodeInput] = useState("");
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    GrowthEngine.getGrowthKpiMetrics().then(setMetrics);
    setCampaigns(GrowthEngine.getReferralCampaigns());
    GrowthEngine.getAiGrowthInsights().then(setInsights);
  }, []);

  const handleCopyCode = (code: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(`https://wedyplan.com/invite?ref=${code}`);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2500);
    }
  };

  const handleCreateCode = () => {
    if (!newCodeInput.trim()) return;
    const created = GrowthEngine.createReferralCode("COUPLE_REFER_COUPLE", newCodeInput);
    setCampaigns(GrowthEngine.getReferralCampaigns());
    setNewCodeInput("");
    setStatusMsg(`'${created.code}' referans kodu başarıyla oluşturuldu!`);
    setTimeout(() => setStatusMsg(null), 3000);
  };

  if (!metrics) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Header Banner */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Büyüme & Pazar Yeri Paneli
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <Zap className="w-3 h-3" /> Phase 10 Growth Engine
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          B2C Çift ve B2B Tedarikçi kazanım metrikleri, LTV/CAC oranları ve Pazar Yeri Likidite analizleri.
        </p>

        {/* Top High-Level KPIs Grid */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">LTV / CAC Oranı</span>
            <span className="font-mono font-bold text-[#D4AF37] text-lg">
              {metrics.ltv.ltvCacRatio}x
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Viral Katsayı (K-Factor)</span>
            <span className="font-mono font-bold text-emerald-400 text-lg">
              {metrics.referralKFactor}
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Likidite Eşleşmesi</span>
            <span className="font-mono font-bold text-white text-lg">
              %{metrics.marketplaceLiquidity.matchRatePercent}
            </span>
          </div>
        </div>
      </div>

      {/* Unit Economics & Acquisition Metrics */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-[#D4AF37]" />
          <span>Birim Ekonomisi & Dönüşüm Metrikleri</span>
        </h4>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-1">
            <span className="text-[10px] text-[#86868B] block font-bold">Çift Kazanım Maliyeti (CAC)</span>
            <span className="font-mono font-bold text-[#111111] dark:text-[#F5F4F0] text-base">
              ₺{metrics.cac.coupleCac}
            </span>
            <span className="text-[9px] text-emerald-600 dark:text-emerald-400 block pt-0.5">
              LTV: ₺{metrics.ltv.coupleLtv.toLocaleString()}
            </span>
          </div>

          <div className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-1">
            <span className="text-[10px] text-[#86868B] block font-bold">Tedarikçi CAC (B2B)</span>
            <span className="font-mono font-bold text-[#111111] dark:text-[#F5F4F0] text-base">
              ₺{metrics.cac.vendorCac}
            </span>
            <span className="text-[9px] text-emerald-600 dark:text-emerald-400 block pt-0.5">
              LTV: ₺{metrics.ltv.vendorLtv.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs pt-1">
          <div className="p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl text-center">
            <span className="text-[9px] text-[#86868B] block">Aktivasyon</span>
            <span className="font-mono font-bold text-[#111111] dark:text-[#F5F4F0] text-sm">
              %{metrics.activationRatePercent}
            </span>
          </div>
          <div className="p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl text-center">
            <span className="text-[9px] text-[#86868B] block">Elde Tutma (Retention)</span>
            <span className="font-mono font-bold text-[#111111] dark:text-[#F5F4F0] text-sm">
              %{metrics.retentionRatePercent}
            </span>
          </div>
          <div className="p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl text-center">
            <span className="text-[9px] text-[#86868B] block">Kaybedilme (Churn)</span>
            <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-sm">
              %{metrics.churnRatePercent}
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Growth Insights & Forecasting */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Büyüme Tavsiyeleri
          </span>
          <span className="text-[10px] font-mono text-[#86868B]">Tahminsel Analiz</span>
        </div>

        <div className="space-y-3">
          {insights.map((item) => (
            <div key={item.id} className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs">
              <div className="flex justify-between items-center font-bold">
                <span className="text-[#111111] dark:text-[#F5F4F0] text-sm">{item.title}</span>
                <span className="text-[9px] font-mono bg-[#D4AF37]/15 text-[#D4AF37] px-2 py-0.5 rounded-full">
                  {item.category}
                </span>
              </div>

              <p className="text-[11px] text-[#555555] dark:text-[#A1A1A6] leading-relaxed">
                {item.insightSummary}
              </p>

              <div className="p-2.5 bg-white dark:bg-black/40 rounded-xl border border-black/5 dark:border-white/5 text-[10px] space-y-1">
                <span className="font-bold text-[#111111] dark:text-[#F5F4F0] block">
                  ✦ Aksiyon Önerisi: {item.recommendedAction}
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold block">
                  Beklenen Etki: {item.predictedImpact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Referral & Affiliate Campaign Center */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Share2 className="w-5 h-5 text-[#D4AF37]" />
          <span>Davet Et & Kazan (Referral & Affiliate)</span>
        </h4>

        {/* Create Referral Code Form */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newCodeInput}
            onChange={(e) => setNewCodeInput(e.target.value.toUpperCase())}
            placeholder="Örn: WEDY-SUMMER2026"
            className="flex-1 h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs font-mono outline-none focus:border-[#111111]"
          />
          <button
            onClick={handleCreateCode}
            disabled={!newCodeInput.trim()}
            className="px-5 h-11 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 shrink-0"
          >
            Kod Üret
          </button>
        </div>

        {statusMsg && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{statusMsg}</span>
          </div>
        )}

        {/* Active Campaigns Stream */}
        <div className="space-y-2 pt-1">
          {campaigns.map((camp) => (
            <div
              key={camp.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-center justify-between text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-[#111111] dark:text-[#F5F4F0]">
                    {camp.code}
                  </span>
                  <span className="text-[9px] bg-black/10 dark:bg-white/10 px-2 py-0.5 rounded-full font-bold">
                    {camp.type === "VENDOR_AFFILIATE" ? "B2B Ortak" : "Çift Daveti"}
                  </span>
                </div>
                <div className="text-[10px] text-[#86868B]">
                  {camp.successfulConversions} Başarılı Kazanım • ₺{camp.earnedRewardsTotal.toLocaleString()} Hakediş
                </div>
              </div>

              <button
                onClick={() => handleCopyCode(camp.code)}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-xl font-bold text-[11px] text-[#111111] dark:text-[#F5F4F0] hover:bg-[#111111] hover:text-[#F5F4F0] transition-all"
              >
                {copiedCode === camp.code ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Kopyalandı</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Linki Kopyala</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};