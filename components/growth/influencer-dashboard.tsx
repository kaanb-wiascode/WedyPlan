"use client";

import React, { useState, useEffect } from "react";
import { Camera, Sparkles, ShieldCheck, ShieldAlert, Zap } from "lucide-react";
import { InfluencerEngine, InfluencerProfile, InfluencerCampaignSummary, InfluencerCategory } from "@/lib/growth/influencer-engine";

export const InfluencerDashboard: React.FC = () => {
  const [creators, setCreators] = useState<InfluencerProfile[]>([]);
  const [summary, setSummary] = useState<InfluencerCampaignSummary | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<InfluencerCategory | "ALL">("ALL");

  useEffect(() => {
    InfluencerEngine.getInfluencers().then(setCreators);
    InfluencerEngine.getCampaignSummary().then(setSummary);
  }, []);

  if (!summary) return null;

  const filteredCreators = selectedCategory === "ALL"
    ? creators
    : creators.filter((c) => c.category === selectedCategory);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Header Banner */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Camera className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kurumsal Influencer & Creator Paneli
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> ROI: {summary.campaignRoiMultiplier}x
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Düğün bloggerları, içerik üreticileri ve fotoğrafçılar için WedyAI sahtecilik korumalı sponsorlu yayın ve dönüşüm takip altyapısı.
        </p>

        {/* Top ROI & Analytics Grid */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Influencer GMV</span>
            <span className="font-mono font-bold text-white text-base">
              ₺{(summary.totalRevenueGmv / 1000000).toFixed(2)}M TL
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Toplam Erişim</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              {(summary.totalReachCount / 1000000).toFixed(2)}M
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Dönüşen Sözleşme</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              {summary.totalConversionsCount} Adet
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Creator Matching & Fraud Protection Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Akıllı Creator Eşleştirme & Bot Kalkanı
          </span>
          <span className="text-[10px] font-mono text-[#86868B]">AI Fraud Guard</span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ En Yüksek Performans: Selin Yılmaz (@selingelin_blog) %98 takipçi özgünlüğü ve 8.4x kampanya ROI çarpanı ile öne çıkıyor.
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {(["ALL", "WEDDING_BLOGGER", "VIDEOGRAPHER", "PHOTOGRAPHER", "LIFESTYLE_CREATOR"] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-2xl text-[11px] font-bold border whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                : "bg-white dark:bg-[#141418] text-[#666666] border-black/10 dark:border-white/10 hover:bg-black/5"
            }`}
          >
            {cat === "ALL" ? "Tüm Üreticiler" : cat === "WEDDING_BLOGGER" ? "Blogger" : cat === "VIDEOGRAPHER" ? "Video/Vlog" : cat === "PHOTOGRAPHER" ? "Fotoğrafçı" : "Lifestyle"}
          </button>
        ))}
      </div>

      {/* Creators List Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">
          Sözleşmeli Creator & Influencer Ekosistemi ({filteredCreators.length})
        </h4>

        <div className="space-y-3">
          {filteredCreators.map((creator) => (
            <div
              key={creator.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs"
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold text-sm text-[#111111] dark:text-[#F5F4F0] block">
                    {creator.creatorName}
                  </span>
                  <span className="text-[10px] font-mono text-[#D4AF37]">
                    {creator.handle} • {creator.primaryPlatform}
                  </span>
                </div>

                <div className="text-right">
                  {creator.aiAudienceAuthenticityScore > 80 ? (
                    <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full font-bold flex items-center gap-1 justify-end">
                      <ShieldCheck className="w-3 h-3" /> %{creator.aiAudienceAuthenticityScore} Gerçek
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono bg-red-500/10 text-red-600 dark:text-red-400 px-2.5 py-1 rounded-full font-bold flex items-center gap-1 justify-end">
                      <ShieldAlert className="w-3 h-3" /> Sahte Takipçi
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[10px] text-[#555555] dark:text-[#A1A1A6]">
                <div>Takipçi: {(creator.followerCount / 1000).toFixed(0)}K</div>
                <div>Etkileşim: %{creator.engagementRatePercent}</div>
                <div>GMV: ₺{(creator.totalAttributedGmv / 1000).toFixed(0)}K</div>
              </div>

              {creator.activePromoCode && (
                <div className="p-2 bg-white dark:bg-black/40 rounded-xl border border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#86868B]">Promo Kod:</span>
                  <span className="font-bold text-[#D4AF37]">{creator.activePromoCode}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};