"use client";

import React, { useState } from "react";
import ReviewHeader from "./ReviewHeader";
import AIReputationWidget from "./AIReputationWidget";
import ReviewListTable from "./ReviewListTable";
import { sendReviewRequestAction } from "@/lib/actions/vendor-reviews";

export default function VendorReviewsClient({ vendorId }: { vendorId: string }) {
  const [aiData] = useState({
    positiveSentimentPercentage: 96,
    reviewSummary: "Çiftler özellikle sunset manzarası, garson ekibinin ilgisi ve yemek sıcaklığından övgüyle bahsediyor. Fotoğraf çekim alanları yüksek puan topluyor.",
    improvementSuggestion: "Açık hava ses ses seviyesi geç saatlerde bazı misafirlerce yüksek bulunmuş. Gece 23:00 sonrası ses izolasyonu ayarı önerilir.",
    crisisAlertsCount: 0,
  });

  const [reviews] = useState([
    {
      id: "rev_1",
      coupleName: "Selin & Kaan Yılmaz",
      rating: 5,
      date: "12 Temmuz 2026",
      weddingConcept: "350 Kişilik Sahil Düğünü",
      isVerifiedCouple: true,
      isPinned: true,
      reviewText: "Hayalimizdeki düğünden bile güzeldi! Bodrum Sunset Venue ekibi her detayla kusursuz ilgilendi. Yemekler sıcak, müzik akışı muazzamdı. Sonsuz teşekkürler!",
      reply: {
        text: "Sayın Selin & Kaan Yılmaz, en özel gününüze ev sahipliği yapmak bizim için büyük bir onurdu. Ömür boyu mutluluklar dileriz! ✨",
      },
    },
    {
      id: "rev_2",
      coupleName: "Zeynep & Can Kaya",
      rating: 5,
      date: "04 Mayıs 2026",
      weddingConcept: "Balo Salonu Nikah & Kokteyl",
      isVerifiedCouple: true,
      isPinned: false,
      reviewText: "Karşılama kokteylinden gece sonuna kadar her şey tıkır tıkır işledi. Konuklarımız yemek kalitesine bayıldı. Kesinlikle tavsiye ediyoruz.",
      reply: null,
    },
  ]);

  const handleSendRequestMock = async () => {
    const res = await sendReviewRequestAction(vendorId, {
      coupleName: "Ece & Mert Demir",
      phoneOrEmail: "ece@wedyplan.demo",
      weddingDate: "12 Eylül 2026",
    });

    if (res.success) {
      alert("✨ " + res.message);
    }
  };

  const pendingCount = reviews.filter((r) => !r.reply).length;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <ReviewHeader
        overallRating={4.9}
        totalReviews={reviews.length}
        reputationScore={98}
        pendingCount={pendingCount}
        onOpenRequestModal={handleSendRequestMock}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIReputationWidget aiData={aiData} />
        </div>

        <div className="lg:col-span-7">
          <ReviewListTable
            reviews={reviews}
            vendorId={vendorId}
          />
        </div>
      </div>
    </div>
  );
}
