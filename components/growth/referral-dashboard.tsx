"use client";

import React, { useState, useEffect } from "react";
import { Users, Sparkles, ShieldAlert, CheckCircle2, Share2, Award, Zap, Copy, AlertTriangle, TrendingUp, Lock, RefreshCw } from "lucide-react";
import { ReferralEngine, ReferralClaim, ReferralMetricsForecast, ReferralType } from "@/lib/growth/referral-engine";

export const ReferralDashboard: React.FC = () => {
  const [claims, setClaims] = useState<ReferralClaim[]>([]);
  const [forecast, setForecast] = useState<ReferralMetricsForecast | null>(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [selectedType, setSelectedType] = useState<ReferralType>("COUPLE_REFERRAL");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    ReferralEngine.getReferralClaims().then(setClaims);
    ReferralEngine.getForecastMetrics().then(setForecast);
  }, []);

  const handleSendInvite = async () => {
    if (!inviteEmail.trim()) return;
    setIsSubmitting(true);
    setStatusMsg(null);

    const res = await ReferralEngine.submitClaim(inviteEmail, selectedType, "WEDY-KAAN2026");
    setIsSubmitting(false);

    if (res.success) {
      setStatusMsg({ type: "success", text: "Davet başarıyla gönderildi ve referans kaydı oluşturuldu!" });
      setInviteEmail("");
      ReferralEngine.getReferralClaims().then(setClaims);
    } else {
      setStatusMsg({ type: "error", text: res.error || "Davet gönderilemedi." });
    }
  };

  if (!forecast) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Header Banner */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Kurumsal Referans & Viral Büyüme
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <Zap className="w-3 h-3" /> Viral K: {forecast.viralKFactor}
          </span>
        </div>

        <p className="text-xs text-[#D1D1D6] leading-relaxed">
          Çift, Tedarikçi, Çalışan ve Ortak referans döngüleri, WedyAI sahtecilik koruma kalkanı ve otomatik hakediş dağıtımı.
        </p>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs">
          <div>
            <span className="text-[9px] text-[#86868B] block">Referans GMV</span>
            <span className="font-mono font-bold text-white text-base">
              ₺{forecast.totalReferralGmv.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Dağıtılan Ödül</span>
            <span className="font-mono font-bold text-[#D4AF37] text-base">
              ₺{forecast.totalRewardsDistributed.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Engellenen Sahtecilik</span>
            <span className="font-mono font-bold text-amber-400 text-base">
              {forecast.fraudBlockedCount} Adet
            </span>
          </div>
        </div>
      </div>

      {/* Referral Invite Submission Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Share2 className="w-3.5 h-3.5" /> Yeni Referans Daveti Gönder
          </span>
          <span className="text-[10px] font-mono text-[#86868B]">AI Fraud Guard</span>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {(["COUPLE_REFERRAL", "VENDOR_REFERRAL"] as ReferralType[]).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`py-2.5 px-2 text-xs font-bold rounded-xl border transition-all ${
                  selectedType === type
                    ? "bg-[#111111] text-[#F5F4F0] border-[#111111]"
                    : "bg-[#F5F4F0] dark:bg-black/20 text-[#666666] border-transparent"
                }`}
              >
                {type === "COUPLE_REFERRAL" ? "Çift Daveti (₺750)" : "Tedarikçi Daveti (₺2.500)"}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="Davet edilecek e-posta adresi..."
              className="flex-1 h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none focus:border-[#111111]"
            />
            <button
              onClick={handleSendInvite}
              disabled={!inviteEmail.trim() || isSubmitting}
              className="px-5 h-11 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 shrink-0 flex items-center gap-1.5"
            >
              {isSubmitting ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#D4AF37]" />
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Davet Et</span>
                </>
              )}
            </button>
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
                <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
              )}
              <span>{statusMsg.text}</span>
            </div>
          )}
        </div>
      </div>

      {/* Claims Stream & AI Fraud Status Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Users className="w-5 h-5 text-[#D4AF37]" />
          <span>Referans Geçmişi & WedyAI Güvenlik Takibi</span>
        </h4>

        <div className="space-y-2">
          {claims.map((claim) => (
            <div
              key={claim.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-center justify-between text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-bold text-[#111111] dark:text-[#F5F4F0]">
                  <span>{claim.referredEmail}</span>
                  <span className="text-[9px] bg-black/10 dark:bg-white/10 px-2 py-0.5 rounded-full font-mono">
                    {claim.referralCode}
                  </span>
                </div>
                <div className="text-[10px] text-[#86868B]">
                  Ödül: ₺{claim.rewardValueAmount} • Fraud Risk Skoru: %{claim.aiFraudRiskScore}
                </div>
              </div>

              <div className="text-right">
                {claim.status === "FLAGGED_FRAUD" ? (
                  <span className="text-[10px] font-bold text-red-600 dark:text-red-400 bg-red-500/10 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3" /> Engellendi
                  </span>
                ) : claim.status === "PAID" ? (
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Ödendi
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full">
                    Onaylandı
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