"use client";

import React, { useState } from "react";
import ProfileHeader from "./ProfileHeader";
import AIProfileOptimizerWidget from "./AIProfileOptimizerWidget";
import MediaManagerWidget from "./MediaManagerWidget";
import ProfileTabNavigation from "./ProfileTabNavigation";
import { generateAISEOAndKeywordsAction } from "@/lib/actions/vendor-profile";

export default function VendorProfileClient({ vendorId }: { vendorId: string }) {
  const [isPublishing, setIsPublishing] = useState(false);

  const [seoData, setSeoData] = useState({
    metaTitle: "Bodrum Sunset Venue | Muğla Düğün Mekanı & Organizasyonu",
    metaDescription: "Muğla bölgesinin en popüler Düğün Mekanı firması Bodrum Sunset Venue. Lüks düğün paketleri ve güncel fiyatlar için tıklayın.",
    suggestedKeywords: ["#BodrumDüğünMekanı", "#DüğünMekanıFiyatları", "#LüksDüğünMuğla", "#WedyPlanVerified"],
    missingFields: [
      "Sıkça Sorulan Sorular (SSS) sekmesinde henüz 'İptal ve İade Şartları' belirtilmemiş.",
      "Portföy galerisinde en az 5 yüksek çözünürlüklü görsel bulunmalıdır (Mevcut: 3).",
    ],
  });

  const [photos] = useState([
    { url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=400&q=80", title: "Ana Sahne" },
    { url: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=400&q=80", title: "Masa Düzeni" },
    { url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=400&q=80", title: "Gün Batımı" },
  ]);

  const handlePublish = async () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      alert("✨ Vitrin bilgileriniz başarıyla canlıya alındı ve arama motorlarına güncellendi!");
    }, 1000);
  };

  const handleApplySEO = async () => {
    const res = await generateAISEOAndKeywordsAction("Bodrum Sunset Venue", "Düğün Mekanı", "Muğla");
    if (res.success) {
      setSeoData({
        metaTitle: res.metaTitle || seoData.metaTitle,
        metaDescription: res.metaDescription || seoData.metaDescription,
        suggestedKeywords: res.suggestedKeywords || seoData.suggestedKeywords,
        missingFields: res.missingFields || seoData.missingFields,
      });
      alert("✨ AI SEO bilgileri başarıyla üretildi!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <ProfileHeader
        businessName="Bodrum Sunset Venue & Events"
        profileScore={92}
        onPublish={handlePublish}
        isPublishing={isPublishing}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-4 space-y-6">
          <AIProfileOptimizerWidget
            metaTitle={seoData.metaTitle}
            metaDescription={seoData.metaDescription}
            suggestedKeywords={seoData.suggestedKeywords}
            missingFields={seoData.missingFields}
            onApplySEO={handleApplySEO}
          />

          <MediaManagerWidget
            photos={photos}
            onUploadNew={() => alert("➕ Görsel Yükleme Modalı")}
          />
        </div>

        <div className="lg:col-span-8">
          <ProfileTabNavigation vendorId={vendorId} />
        </div>
      </div>
    </div>
  );
}
