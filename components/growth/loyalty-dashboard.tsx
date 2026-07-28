"use client";

import React, { useState, useEffect } from "react";
import { Award, Sparkles, CheckCircle2, ShieldCheck, Crown, Gift, Zap, TrendingUp, AlertCircle, RefreshCw } from "lucide-react";
import { LoyaltyEngine, UserLoyaltyProfile, LoyaltyRewardItem } from "@/lib/growth/loyalty-engine";

export const LoyaltyDashboard: React.FC = () => {
  const [profile, setProfile] = useState<UserLoyaltyProfile | null>(null);
  const [catalog, setCatalog] = useState<LoyaltyRewardItem[]>([]);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    LoyaltyEngine.getUserLoyaltyProfile().then(setProfile);
    setCatalog(LoyaltyEngine.getRewardCatalog());
  }, []);

  const handleRedeem = async (rewardId: string) => {
    setIsRedeeming(true);
    setStatusMsg(null);

    const res = await LoyaltyEngine.redeemReward(rewardId);
    setIsRedeeming(false);

    if (res.success) {
      setStatusMsg({ type: "success", text: "Ödül başarıyla hesabınıza tanımlandı ve puanınız düşüldü!" });
      LoyaltyEngine.getUserLoyaltyProfile().then(setProfile);
    } else {
      setStatusMsg({ type: "error", text: res.error || "Ödül alınamadı." });
    }
  };

  if (!profile) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* VIP Overview Header Banner */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Crown className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              VIP Sadakat & Ödül Merkezi
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <Award className="w-3.5 h-3.5" /> {profile.vipTier} Statü
          </span>
        </div>

        <div className="flex justify-between items-end border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] text-[#86868B] block">Mevcut Bakiye</span>
            <span className="text-3xl font-mono font-bold text-white">
              {profile.pointsBalance.toLocaleString()} <span className="text-xs text-[#D4AF37]">WedyPoint</span>
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-[#86868B] block">Sonraki VIP Seviye</span>
            <span className="text-xs font-mono font-bold text-emerald-400">
              BLACK VIP (%{profile.nextTierProgressPercent})
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#D4AF37] h-full transition-all duration-500"
            style={{ width: `${profile.nextTierProgressPercent}%` }}
          />
        </div>
      </div>

      {/* WedyAI Retention & Churn Prediction Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Elde Tutma Analizi (Retention)
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
            Sağlık: %{profile.aiRetentionScorePercent}
          </span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <Gift className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            ✦ Önerilen Ödül: {profile.suggestedReward}
          </p>
        </div>
      </div>

      {/* Unlocked Badges & Milestones */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">
          Kazanılan Başarım Rozetleri ({profile.earnedBadges.length})
        </h4>

        <div className="grid grid-cols-3 gap-2">
          {profile.earnedBadges.map((badge) => (
            <div
              key={badge.id}
              className="p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl text-center space-y-1 text-xs border border-black/5 dark:border-white/5"
            >
              <Award className="w-5 h-5 text-[#D4AF37] mx-auto" />
              <span className="font-bold text-[#111111] dark:text-[#F5F4F0] text-[11px] block truncate">
                {badge.name}
              </span>
              <span className="text-[9px] text-[#86868B] block font-mono">
                {new Date(badge.unlockedAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reward Catalog & Redemption Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <Gift className="w-5 h-5 text-[#D4AF37]" />
          <span>WedyPoint Ödül Kataloğu</span>
        </h4>

        <div className="space-y-3">
          {catalog.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-center justify-between text-xs"
            >
              <div className="space-y-1">
                <span className="font-bold text-sm text-[#111111] dark:text-[#F5F4F0] block">
                  {item.title}
                </span>
                <span className="text-[10px] font-mono text-[#D4AF37] font-bold block">
                  {item.pointsCost} WedyPoint
                </span>
              </div>

              <button
                onClick={() => handleRedeem(item.id)}
                disabled={isRedeeming || profile.pointsBalance < item.pointsCost}
                className="px-4 py-2.5 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 shrink-0"
              >
                Kullan
              </button>
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