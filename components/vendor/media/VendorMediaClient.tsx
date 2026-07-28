"use client";

import React, { useState } from "react";
import MediaHeader from "./MediaHeader";
import AIMediaIntelligenceWidget from "./AIMediaIntelligenceWidget";
import AlbumCollectionManager from "./AlbumCollectionManager";
import MediaGridAndUploader from "./MediaGridAndUploader";
import { createVendorAlbumAction, uploadVendorMediaAction } from "@/lib/actions/vendor-media";

export default function VendorMediaClient({ vendorId }: { vendorId: string }) {
  const [aiData] = useState({
    portfolioQualityScore: 98,
    recommendedCoverUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80",
    duplicateDetectedCount: 0,
    blurDetectedCount: 0,
    generatedAltText: "Bodrum Yalıkavak deniz kenarında lüks şamdanlı ve taze çiçekli düğün masası düzeni.",
    suggestedTags: ["#BodrumLüksDüğün", "#GünBatımıNikah", "#WedyPlanVerified"],
  });

  const [albums, setAlbums] = useState([
    { id: "alb_1", name: "Bodrum Yalıkavak Sahil Düğünü", category: "Düğün Mekanı", itemCount: 12, isFeatured: true },
    { id: "alb_2", name: "Lüks Balo Salonu Işıklandırması", category: "Ses & Işık", itemCount: 8, isFeatured: false },
  ]);

  const [assets, setAssets] = useState([
    {
      id: "ast_1",
      title: "Ana Sahne Gün Batımı Çekimi",
      category: "Açık Hava",
      url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "ast_2",
      title: "Masa Süslemesi & Şamdan Detayı",
      category: "Dekorasyon",
      url: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "ast_3",
      title: "Karşılama Kokteyli İskelesi",
      category: "Kokteyl",
      url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80",
    },
  ]);

  const handleCreateAlbum = async (name: string, category: string) => {
    const res = await createVendorAlbumAction(vendorId, { name, category, isFeatured: false });
    if (res.success) {
      setAlbums([...albums, { id: res.albumId || "alb_" + Date.now(), name, category, itemCount: 0, isFeatured: false }]);
      alert("✨ " + res.message);
    }
  };

  const handleUploadMock = async () => {
    const mockUrl = "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=600&q=80";
    const res = await uploadVendorMediaAction(vendorId, {
      title: "Yeni Yüklenen HD Düğün Görseli",
      type: "IMAGE",
      url: mockUrl,
      category: "Düğün Mekanı",
      isFeatured: false,
      watermarkEnabled: true,
    });

    if (res.success) {
      setAssets([
        ...assets,
        {
          id: res.assetId || "ast_" + Date.now(),
          title: "Yeni Yüklenen HD Düğün Görseli",
          category: "Düğün Mekanı",
          url: mockUrl,
        },
      ]);
      alert("✨ " + res.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <MediaHeader
        totalAssetsCount={assets.length}
        albumsCount={albums.length}
        qualityScore={aiData.portfolioQualityScore}
        onOpenUploader={handleUploadMock}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIMediaIntelligenceWidget aiData={aiData} />
          <AlbumCollectionManager albums={albums} onCreateAlbum={handleCreateAlbum} />
        </div>

        <div className="lg:col-span-7">
          <MediaGridAndUploader assets={assets} onUploadClick={handleUploadMock} />
        </div>
      </div>
    </div>
  );
}
