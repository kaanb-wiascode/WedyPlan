"use client";

import React, { useState, useEffect } from "react";
import { Users, Sparkles, TrendingUp, DollarSign, Award, Copy, CheckCircle2, ShieldCheck, Zap, BarChart3, ArrowUpRight, RefreshCw } from "lucide-react";
import { AffiliateEngine, AffiliatePartner, AffiliateMetricsOverview, PartnerType } from "@/lib/growth/affiliate-engine";

export const AffiliateDashboard: React.FC = () => {
  const [partners, setPartners] = useState<AffiliatePartner[]>([]);
  const [overview, setOverview] = useState<AffiliateMetricsOverview | null>(null);
  const [partnerNameInput, setPartnerNameInput] = useState("");
  const [partnerTypeInput, setPartnerTypeInput] = useState<PartnerType>("INFLUENCER");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    AffiliateEngine.getPartners().then(setPartners);
    AffiliateEngine.getMetricsOverview().then(setOverview);
  }, []);

  const handleCopyLink = (code: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(`https://wedyplan.com/?aff=${code}`);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2500);
    }
  };

  const handleCreatePartner = () => {
    if (!partnerNameInput.trim()) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const created = AffiliateEngine.createPartner(partnerNameInput, partnerTypeInput);
      setIsSubmitting(false);
      setPartnerNameInput("");
      setStatusMsg(`'${created.partnerName}' için '${created.trackingCode}' affiliate hesabı oluşturuldu!`);
      AffiliateEngine.getPartners().then(setPartners);
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
            <Award className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kurumsal Affiliate Yönetimi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <Zap className="w-3 h-3" /> {overview.activePartnersCount} Aktif Partner
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Influencer, Blogger, Düğün Ajansı ve Medya ortakları için çok kanallı gelir paylaşımı ve WedyAI komisyon optimizasyonu.
        </p>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Affiliate GMV</span>
            <span className="font-mono font-bold text-white text-base">
              ₺{overview.totalAttributedGmv.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Ödenen Komisyon</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              ₺{overview.totalCommissionsPaid.toLocaleString()}
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

      {/* WedyAI Commission Optimization Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Komisyon & Hacim Optimizasyonu
          </span>
          <span className="text-[10px] font-mono text-[#86868B]">AI Dynamic Rates</span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <TrendingUp className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed">
            {overview.aiCommissionOptimizationTip}
          </p>
        </div>
      </div>

      {/* Register New Partner Form */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Users className="w-5 h-5 text-[#D4AF37]" />
          <span>Yeni Affiliate Partner Hesabı Oluştur</span>
        </h4>

        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-1.5">
            {(["INFLUENCER", "BLOGGER", "AGENCY"] as PartnerType[]).map((type) => (
              <button
                key={type}
                onClick={() => setPartnerTypeInput(type)}
                className={`py-2 text-[10px] font-bold rounded-xl border transition-all ${
                  partnerTypeInput === type
                    ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                    : "bg-[#F5F4F0] dark:bg-black/20 text-[#666666] border-transparent"
                }`}
              >
                {type === "INFLUENCER" ? "Influencer" : type === "BLOGGER" ? "Blogger" : "Ajans"}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={partnerNameInput}
              onChange={(e) => setPartnerNameInput(e.target.value)}
              placeholder="Partner / Ajans Adı..."
              className="flex-1 h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none focus:border-[#111111]"
            />
            <button
              onClick={handleCreatePartner}
              disabled={!partnerNameInput.trim() || isSubmitting}
              className="px-5 h-11 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 shrink-0 flex items-center gap-1.5"
            >
              {isSubmitting ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#D4AF37]" />
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Kaydet</span>
                </>
              )}
            </button>
          </div>

          {statusMsg && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{statusMsg}</span>
            </div>
          )}
        </div>
      </div>

      {/* Partners List Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">
          Aktif Affiliate Ortakları ({partners.length})
        </h4>

        <div className="space-y-3">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs"
            >
              <div className="flex justify-between items-center font-bold text-[#111111] dark:text-[#F5F4F0]">
                <div>
                  <span className="text-sm block">{partner.partnerName}</span>
                  <span className="text-[10px] font-mono text-[#86868B]">
                    Kod: {partner.trackingCode} • Komisyon: %{partner.commissionRatePercent}
                  </span>
                </div>
                <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full font-bold">
                  AI Skor: {partner.aiPartnerScore}/100
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1 text-[11px] font-mono text-[#555555] dark:text-[#A1A1A6]">
                <div>Tıklama: {partner.totalClicks.toLocaleString()}</div>
                <div>Dönüşüm: {partner.totalConversions}</div>
                <div>Hakediş: ₺{partner.unpaidEarningsAmount.toLocaleString()}</div>
              </div>

              <div className="pt-2 flex justify-between items-center border-t border-black/5 dark:border-white/5">
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Fraud Risk: {partner.aiFraudRiskLevel}
                </span>

                <button
                  onClick={() => handleCopyLink(partner.trackingCode)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-xl font-bold text-[10px] text-[#111111] dark:text-[#F5F4F0] hover:bg-[#111111] hover:text-[#F5F4F0] transition-all"
                >
                  {copiedCode === partner.trackingCode ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      <span>Kopyalandı</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#D4AF37]" />
                      <span>Takip Linkini Al</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};