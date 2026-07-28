"use client";

import React, { useState, useEffect } from "react";
import { Star, ShieldCheck, Sparkles, CheckCircle2, ShieldAlert, MessageSquare, AlertCircle, RefreshCw } from "lucide-react";
import { ReviewEngine, ReviewItem, ReputationSummary } from "@/lib/growth/review-engine";

export const ReviewDashboard: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [summary, setSummary] = useState<ReputationSummary | null>(null);
  
  // Review Form States
  const [authorName, setAuthorName] = useState("");
  const [targetName, setTargetName] = useState("Çırağan Palace Kempinski");
  const [rating, setRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [isVerified, setIsVerified] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    ReviewEngine.getReviews().then(setReviews);
    ReviewEngine.getReputationSummary().then(setSummary);
  }, []);

  const handleSubmitReview = async () => {
    if (!authorName.trim() || !reviewComment.trim()) return;
    setIsSubmitting(true);
    setStatusMsg(null);

    const res = await ReviewEngine.submitReview({
      targetId: "v_101",
      targetName,
      targetType: "VENUE",
      authorName,
      ratingScore: rating,
      reviewTitle: reviewTitle || "Mükemmel Deneyim",
      reviewComment,
      mediaType: "TEXT_ONLY",
      isVerifiedCouple: isVerified,
    });

    setIsSubmitting(false);

    if (res.success) {
      setStatusMsg({ type: "success", text: "Değerlendirmeniz WedyAI doğrulamasıyla başarıyla yayınlandı!" });
      setAuthorName("");
      setReviewTitle("");
      setReviewComment("");
      ReviewEngine.getReviews().then(setReviews);
    } else {
      setStatusMsg({ type: "error", text: res.error || "İnceleme yayınlanamadı." });
    }
  };

  if (!summary) return null;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 font-sans p-4">
      {/* Reputation Overview Header Banner */}
      <div className="bg-[#111111] text-[#F5F4F0] p-7 rounded-[36px] border border-white/20 shadow-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Star className="w-6 h-6 text-[#D4AF37] fill-[#D4AF37]" />
            <h3 className="font-serif-editorial text-2xl font-semibold">
              Pazar Yeri İtibar & Değerlendirme
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Doğrulanmış Çiftler
          </span>
        </div>

        <div className="flex justify-between items-end border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] text-[#86868B] block">Pazar Yeri Skoru</span>
            <span className="text-3xl font-mono font-bold text-white flex items-center gap-1.5">
              {summary.overallReputationScore} <span className="text-sm text-[#D4AF37]">/ 5.0</span>
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-[#86868B] block">Toplam Değerlendirme</span>
            <span className="text-xs font-mono font-bold text-emerald-400">
              {summary.verifiedCoupleReviewsCount.toLocaleString()} Doğrulanmış Sözleşme
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
          <div>
            <span className="text-[9px] text-[#86868B] block">Olumlu Duygu</span>
            <span className="font-mono font-bold text-emerald-400 text-base">
              %{summary.sentimentBreakdownPercent.positive}
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">Engellenen Sahte/Spam</span>
            <span className="font-mono font-bold text-red-400 text-base">
              {summary.aiFakeReviewsBlockedCount} Adet
            </span>
          </div>
          <div>
            <span className="text-[9px] text-[#86868B] block">E-İmza Sözleşmeli</span>
            <span className="font-mono font-bold text-white text-base">%96.6</span>
          </div>
        </div>
      </div>

      {/* WedyAI Moderation Tip Card */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-3">
        <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> WedyAI Otomatik Moderasyon & Duygu Analizi
          </span>
          <span className="text-[10px] font-mono text-[#86868B]">NLP Moderation Engine</span>
        </div>

        <div className="p-3.5 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl flex items-start gap-2.5 text-xs">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <p className="text-[#111111] dark:text-[#F5F4F0] text-[11px] leading-relaxed font-medium">
            {summary.aiModerationTip}
          </p>
        </div>
      </div>

      {/* Write New Review Form */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0] flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[#D4AF37]" />
          <span>Değerlendirme & Yorum Ekle</span>
        </h4>

        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Adınız Soyadınız..."
              className="h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none focus:border-[#111111]"
            />
            <input
              type="text"
              value={targetName}
              onChange={(e) => setTargetName(e.target.value)}
              placeholder="Mekan / Tedarikçi..."
              className="h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none focus:border-[#111111]"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl">
            <span className="font-bold text-[#111111] dark:text-[#F5F4F0]">Puanınız</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  onClick={() => setRating(s)}
                  className="p-1 text-[#D4AF37] hover:scale-110 transition-transform"
                >
                  <Star className={`w-5 h-5 ${s <= rating ? "fill-[#D4AF37]" : "text-gray-300"}`} />
                </button>
              ))}
            </div>
          </div>

          <input
            type="text"
            value={reviewTitle}
            onChange={(e) => setReviewTitle(e.target.value)}
            placeholder="Başlık (Örn: Masalsı Bir Düğün)..."
            className="w-full h-11 px-4 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none focus:border-[#111111]"
          />

          <textarea
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            rows={3}
            placeholder="Mekan veya hizmet hakkındaki samimi değerlendirmeniz..."
            className="w-full p-3 bg-[#F5F4F0] dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl text-xs text-[#111111] dark:text-[#F5F4F0] outline-none focus:border-[#111111]"
          />

          <div className="flex items-center justify-between p-3 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl">
            <div>
              <span className="font-bold text-[#111111] dark:text-[#F5F4F0] block">E-İmza Sözleşmeli Çift Doğrulaması</span>
              <span className="text-[10px] text-[#666666]">WedyPlan Escrow sözleşmeniz ile eşleştirilir.</span>
            </div>
            <input
              type="checkbox"
              checked={isVerified}
              onChange={(e) => setIsVerified(e.target.checked)}
              className="w-4 h-4 accent-[#111111]"
            />
          </div>

          <button
            onClick={handleSubmitReview}
            disabled={!authorName.trim() || !reviewComment.trim() || isSubmitting}
            className="w-full h-12 bg-[#111111] dark:bg-[#F5F4F0] text-[#F5F4F0] dark:text-[#111111] text-xs font-semibold rounded-2xl shadow-md hover:opacity-90 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
            ) : (
              <>
                <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                <span>Değerlendirmeyi İlet</span>
              </>
            )}
          </button>

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

      {/* Reviews & Moderation Stream */}
      <div className="bg-white/80 dark:bg-[#141418]/80 backdrop-blur-2xl border border-white/80 dark:border-white/10 rounded-[32px] p-6 shadow-sm space-y-4">
        <h4 className="font-serif-editorial text-lg font-semibold text-[#111111] dark:text-[#F5F4F0]">
          Son İncelemeler & Doğrulanmış Yorumlar ({reviews.length})
        </h4>

        <div className="space-y-3">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-4 bg-[#F5F4F0] dark:bg-black/20 rounded-2xl space-y-2 text-xs"
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold text-sm text-[#111111] dark:text-[#F5F4F0] block">
                    {rev.targetName}
                  </span>
                  <span className="text-[10px] text-[#86868B]">{rev.authorName}</span>
                </div>
                <div className="flex items-center gap-1 font-mono font-bold text-[#D4AF37]">
                  <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                  <span>{rev.ratingScore.toFixed(1)}</span>
                </div>
              </div>

              <div className="p-2.5 bg-white dark:bg-black/40 rounded-xl border border-black/5 dark:border-white/5 space-y-1">
                <span className="font-bold text-[#111111] dark:text-[#F5F4F0] block">{rev.reviewTitle}</span>
                <p className="text-[11px] text-[#555555] dark:text-[#A1A1A6] leading-relaxed">{rev.reviewComment}</p>
              </div>

              <div className="pt-1 flex justify-between items-center text-[10px]">
                {rev.isVerifiedCouple ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Doğrulanmış Çift (Skor: %{rev.aiAuthenticityScore})
                  </span>
                ) : (
                  <span className="text-amber-600 font-bold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> Doğrulanmamış Yorum
                  </span>
                )}

                <span className="text-[9px] bg-black/10 dark:bg-white/10 px-2 py-0.5 rounded-full font-mono">
                  {rev.moderationStatus}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};