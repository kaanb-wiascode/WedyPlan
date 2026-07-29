"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, Sparkles, Radio, Newspaper, Twitter, Instagram, PieChart } from "lucide-react";
import { BrandIntelligenceEngine, BrandIntelligenceSummary, BrandMention, MentionSource } from "@/lib/growth/brand-intelligence-engine";

export const BrandIntelligenceDashboard: React.FC = () => {
  const [summary, setSummary] = useState<BrandIntelligenceSummary | null>(null);
  const [mentions, setMentions] = useState<BrandMention[]>([]);
  const [selectedSource, setSelectedSource] = useState<MentionSource | "ALL">("ALL");

  useEffect(() => {
    BrandIntelligenceEngine.getBrandSummary().then(setSummary);
    BrandIntelligenceEngine.getBrandMentions().then(setMentions);
  }, []);

  if (!summary) return null;

  const filteredMentions = selectedSource === "ALL"
    ? mentions
    : mentions.filter((m) => m.source === selectedSource);

  const renderSourceIcon = (src: MentionSource) => {
    switch (src) {
      case "NEWS_MEDIA": return <Newspaper className="w-4 h-4 text-blue-400" />;
      case "INSTAGRAM": return <Instagram className="w-4 h-4 text-pink-400" />;
      case "TWITTER": return <Twitter className="w-4 h-4 text-sky-400" />;
      default: return <Radio className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Header Banner */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Radio className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Marka İstihbaratı & İtibar Paneli
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Brand Reputation: {summary.overallBrandReputationScore}/100
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Sosyal dinleme (Social Listening), haber medyası takibi, Share of Voice pazar payı analizi ve WedyAI marka risk kalkanı.
        </p>

        {/* High-Level Executive Reputation Metrics */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Marka Bilinirliği</span>
            <span className="font-mono font-bold text-white text-base">
              %{summary.brandAwarenessIndexPercent}
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Net Tavsiye (NPS)</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              +{summary.netPromoterScore} NPS
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Aktif Risk Alarmı</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.aiActiveRiskAlertsCount} Risk
            </span>
          </div>
        </div>
      </div>

      {/* Share of Voice Market Breakdown */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <PieChart className="w-5 h-5 text-[#D4AF37]" />
          <span>Pazar Payı & Ses Payı (Share of Voice)</span>
        </h4>

        <div className="space-y-3">
          {summary.shareOfVoiceBreakdown.map((item, idx) => (
            <div key={idx} className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-1.5 text-xs">
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <span>{item.brandName}</span>
                <span className="font-mono text-sm">%{item.marketSharePercent}</span>
              </div>

              <div className="w-full bg-black/10 dark:bg-white/10 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    item.isMainBrand ? "bg-[#D4AF37]" : "bg-black/30 dark:bg-white/30"
                  }`}
                  style={{ width: `${item.marketSharePercent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WedyAI Brand Recommendations & Risk Guard */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Stratejik Marka Tavsiyesi
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Risk: Düşük
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ {summary.aiStrategicRecommendation}
          </p>
        </div>
      </div>

      {/* Social Listening Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">
          Canlı Sosyal Dinleme & Medya Takibi ({filteredMentions.length})
        </h4>

        <div className="space-y-3">
          {filteredMentions.map((m) => (
            <div
              key={m.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <div className="flex items-center gap-2">
                  {renderSourceIcon(m.source)}
                  <span>{m.authorHandle}</span>
                </div>
                <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                  Olumlu Duygu (%{m.sentimentScorePercent})
                </span>
              </div>

              <p className="text-[11px] text-[#555555] dark:text-[#A1A1A6] leading-relaxed">{m.contentText}</p>

              <div className="pt-1 flex justify-between items-center text-[10px] text-[#86868B] font-mono">
                <span>Erişim Etkisi: {m.reachImpactCount.toLocaleString()} Kişi</span>
                <span>{new Date(m.publishedAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};