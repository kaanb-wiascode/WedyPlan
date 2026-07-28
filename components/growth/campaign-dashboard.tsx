"use client";

import React, { useState, useEffect } from "react";
import { Megaphone, Sparkles, Send, Tag, Users, CheckCircle2, RefreshCw, MessageSquare, Mail, Bell, Zap, BarChart3, Clock } from "lucide-react";
import { CampaignEngine, MarketingCampaign, CampaignMetricsOverview, CampaignChannel } from "@/lib/growth/campaign-engine";

export const CampaignDashboard: React.FC = () => {
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>([]);
  const [overview, setOverview] = useState<CampaignMetricsOverview | null>(null);
  const [nameInput, setNameInput] = useState("");
  const [segmentInput, setSegmentInput] = useState("Tüm Aktif Çiftler");
  const [channelInput, setChannelInput] = useState<CampaignChannel>("WHATSAPP");
  const [promoInput, setPromoInput] = useState("");
  const [discountInput, setDiscountInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    CampaignEngine.getCampaigns().then(setCampaigns);
    CampaignEngine.getMetricsOverview().then(setOverview);
  }, []);

  const handleCreateCampaign = () => {
    if (!nameInput.trim()) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const created = CampaignEngine.createCampaign(
        nameInput,
        channelInput,
        segmentInput,
        promoInput.toUpperCase() || undefined,
        discountInput || undefined
      );

      setIsSubmitting(false);
      setNameInput("");
      setPromoInput("");
      setDiscountInput("");
      setStatusMsg(`'${created.name}' kampanyası başarıyla yayına alındı!`);
      CampaignEngine.getCampaigns().then(setCampaigns);
      setTimeout(() => setStatusMsg(null), 3000);
    }, 600);
  };

  if (!overview) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Header Banner */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Megaphone className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kurumsal Kampanya Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <Zap className="w-3 h-3" /> {overview.activeCampaignsCount} Aktif Kampanya
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Çok kanallı pazarlama otomasyonu, WedyAI en uygun gönderim zamanı tahmini ve promo kod yönetimi.
        </p>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Ulaşılan Kitle</span>
            <span className="font-mono font-bold text-white text-base">
              {overview.totalReachAudience.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Kampanya GMV</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              ₺{overview.totalCampaignAttributedGmv.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Ort. Dönüşüm</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              %{overview.averageConversionRatePercent}
            </span>
          </div>
        </div>
      </div>

      {/* WedyAI Campaign Optimization Tip Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Kanal & Zaman Optimizasyonu
          </span>
          <span className="text-[10px] font-mono text-[#86868B]">AI Multi-Channel</span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed">
            {overview.aiOptimizationTip}
          </p>
        </div>
      </div>

      {/* Create Campaign & Promo Form */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Send className="w-5 h-5 text-[#D4AF37]" />
          <span>Yeni Kampanya / Promo Kodu Başlat</span>
        </h4>

        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-4 gap-1.5">
            {(["WHATSAPP", "EMAIL", "PUSH", "PROMO_CODE"] as CampaignChannel[]).map((chan) => (
              <button
                key={chan}
                onClick={() => setChannelInput(chan)}
                className={`py-2 text-[10px] font-bold rounded-xl border transition-all ${
                  channelInput === chan
                    ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                    : "bg-[#F5F4F0] dark:bg-black/20 text-[#666666] border-transparent"
                }`}
              >
                {chan}
              </button>
            ))}
          </div>

          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Kampanya Adı (Örn: Bahar Fırsatları)..."
            className="w-full h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none focus:border-[#111111]"
          />

          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
              placeholder="Promo Kod (Opsiyonel: SPRING2026)"
              className="h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs font-mono text-[#111111] dark:text-[#F5F4F0] outline-none focus:border-[#111111]"
            />
            <input
              type="text"
              value={discountInput}
              onChange={(e) => setDiscountInput(e.target.value)}
              placeholder="İndirim Tutar (Örn: ₺500 İndirim)"
              className="h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none focus:border-[#111111]"
            />
          </div>

          <button
            onClick={handleCreateCampaign}
            disabled={!nameInput.trim() || isSubmitting}
            className="w-full h-12 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
            ) : (
              <>
                <Send className="w-4 h-4 text-[#D4AF37]" />
                <span>Kampanyayı Başlat</span>
              </>
            )}
          </button>

          {statusMsg && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{statusMsg}</span>
            </div>
          )}
        </div>
      </div>

      {/* Active Campaigns Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">
          Pazarlama Kampanyaları ({campaigns.length})
        </h4>

        <div className="space-y-3">
          {campaigns.map((camp) => (
            <div
              key={camp.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <div>
                  <span className="text-sm block">{camp.name}</span>
                  <span className="text-[10px] font-mono text-[#86868B]">
                    Kanal: {camp.channel} • Hedef: {camp.targetSegment}
                  </span>
                </div>
                <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full font-bold">
                  {camp.status}
                </span>
              </div>

              {camp.promoCode && (
                <div className="p-2 bg-white dark:bg-black/40 rounded-xl border border-black/5 dark:border-white/5 flex items-center justify-between text-[11px]">
                  <span className="font-mono font-bold text-[#D4AF37] flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" /> {camp.promoCode}
                  </span>
                  <span className="text-[#555555] dark:text-[#A1A1A6]">{camp.discountValue}</span>
                </div>
              )}

              <div className="pt-1 flex justify-between items-center text-[10px] text-[#86868B]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#D4AF37]" /> {camp.aiBestSendTime}
                </span>
                <span className="font-mono font-bold text-[#111111] dark:text-[#F5F4F0]">
                  GMV: ₺{camp.attributedGmv.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};