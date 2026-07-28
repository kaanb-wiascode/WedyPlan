"use client";

import React, { useState } from "react";
import { generateAIReviewReplyAction, pinReviewAction, replyToReviewAction } from "@/lib/actions/vendor-reviews";

export default function ReviewListTable({
  reviews,
  vendorId,
}: {
  reviews: any[];
  vendorId: string;
}) {
  const [replyingReviewId, setReplyingReviewId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  const handleGenerateAi = async (review: any) => {
    setIsGeneratingAi(true);
    const res = await generateAIReviewReplyAction(review.coupleName, review.rating, review.reviewText);
    setIsGeneratingAi(false);

    if (res.success && res.suggestedReply) {
      setReplyText(res.suggestedReply);
    }
  };

  const handleSendReply = async (reviewId: string) => {
    if (!replyText.trim()) return;
    const res = await replyToReviewAction(vendorId, { reviewId, replyText });
    if (res.success) {
      alert("✨ " + res.message);
      setReplyingReviewId(null);
      setReplyText("");
    }
  };

  const handleTogglePin = async (reviewId: string, currentPinned: boolean) => {
    const res = await pinReviewAction(vendorId, reviewId, !currentPinned);
    if (res.success) {
      alert(res.message);
    }
  };

  return (
    <div className="p-6 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl shadow-sm overflow-x-auto space-y-4 text-xs">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          💬 Müşteri Değerlendirmeleri ({reviews.length} Yorum)
        </span>
      </div>

      <div className="space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className={"p-5 rounded-3xl border transition space-y-3 " +
              (rev.isPinned
                ? "bg-amber-50/40 dark:bg-amber-950/20 border-amber-200/60 dark:border-amber-900/40"
                : "bg-white dark:bg-slate-800/50 border-slate-200/60 dark:border-slate-700/60")
            }
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{rev.coupleName}</h4>
                  {rev.isVerifiedCouple && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                      ✓ Doğrulanmış Çift
                    </span>
                  )}
                  {rev.isPinned && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                      📌 Vitrinde Sabitlendi
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-slate-400">{rev.date} • {rev.weddingConcept}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-amber-500 font-bold text-sm">★ {rev.rating}.0</span>
                <button
                  onClick={() => handleTogglePin(rev.id, rev.isPinned)}
                  className="text-slate-400 hover:text-amber-500 transition text-xs font-bold"
                >
                  {rev.isPinned ? "📌 Sabitlemeyi Kaldır" : "📌 Vitrine Sabitle"}
                </button>
              </div>
            </div>

            <p className="text-slate-700 dark:text-slate-200 leading-relaxed text-[11px]">{rev.reviewText}</p>

            {/* Mevcut Yanıt Varsa */}
            {rev.reply && (
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <span className="text-[10px] font-bold text-indigo-600 uppercase block">🏢 İşletme Yanıtınız</span>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 italic">{rev.reply.text}</p>
              </div>
            )}

            {/* Yanıt Ver Modalı/Alanı */}
            {!rev.reply && (
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                {replyingReviewId === rev.id ? (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-700 dark:text-slate-200 text-[10px]">Yanıt Taslağı</span>
                      <button
                        onClick={() => handleGenerateAi(rev)}
                        disabled={isGeneratingAi}
                        className="text-[10px] font-bold text-amber-600 hover:underline"
                      >
                        {isGeneratingAi ? "AI Üretiyor..." : "✦ AI Yanıt Önerisi Üret"}
                      </button>
                    </div>
                    <textarea
                      rows={3}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Müşterinize vereceğiniz profesyonel yanıtı yazın..."
                      className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-[11px] leading-relaxed resize-none"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setReplyingReviewId(null)}
                        className="px-3 py-1.5 rounded-xl border text-[10px] font-semibold"
                      >
                        İptal
                      </button>
                      <button
                        onClick={() => handleSendReply(rev.id)}
                        className="px-4 py-1.5 rounded-xl bg-amber-600 text-white font-bold text-[10px] hover:bg-amber-700 transition"
                      >
                        Yanıtı Yayınla ✨
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setReplyingReviewId(rev.id);
                      setReplyText("");
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-[10px]"
                  >
                    💬 Yorumu Yanıtla
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
