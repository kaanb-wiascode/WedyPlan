"use client";

import React, { useState } from "react";
import MarketplaceHeader from "./MarketplaceHeader";
import AIMarketplaceAuditWidget from "./AIMarketplaceAuditWidget";
import ListingManagerTable from "./ListingManagerTable";
import ListingEditorModal from "./ListingEditorModal";
import { duplicateListingAction, toggleListingStatusAction } from "@/lib/actions/vendor-marketplace";

export default function VendorMarketplaceClient({ vendorId }: { vendorId: string }) {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<any>(null);

  const [aiAudit] = useState({
    listingQualityScore: 96,
    seoScore: 94,
    visibilityScore: "%98 Üst Sıra İndeksleme",
    conversionPrediction: "%38 Teklif Alma Oranı (Sektör Üstü)",
    pricingSuggestion: "Belirlediğiniz 340.000 ₺ fiyat, Ege bölgesi lüks segment ortalamasına tam uygundur.",
    missingContentAlerts: [
      "Sıkça Sorulan Sorular bölümünde 'Otopark & Vale Hizmeti' detaylandırılabilir.",
    ],
    competitorBenchmark: "Bodrum bölgesindeki Düğün Mekanı ilanları arasında görünürlük olarak ilk 3 sırada yer almaktasınız.",
  });

  const [listings, setListings] = useState([
    {
      id: "lst_1",
      title: "Bodrum Sunset Venue - Ultra Lüks Sahil Düğünü",
      category: "Düğün Mekanı",
      subCategory: "Açık Hava & Kır Düğünü",
      basePrice: 340000,
      status: "PUBLISHED",
      isFeatured: true,
      isPremium: true,
    },
    {
      id: "lst_2",
      title: "İskele Üstü Kokteyl & Nikah Seremonisi Paketi",
      category: "Düğün Mekanı",
      subCategory: "Kokteyl Alanı",
      basePrice: 180000,
      status: "DRAFT",
      isFeatured: false,
      isPremium: false,
    },
  ]);

  const handleToggleStatus = async (id: string, status: any) => {
    const res = await toggleListingStatusAction(vendorId, id, status);
    if (res.success) {
      setListings((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status } : l))
      );
    }
  };

  const handleDuplicate = async (id: string) => {
    const res = await duplicateListingAction(vendorId, id);
    if (res.success) {
      alert("✨ " + res.message);
    }
  };

  const publishedCount = listings.filter((l) => l.status === "PUBLISHED").length;
  const draftCount = listings.filter((l) => l.status === "DRAFT").length;

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <MarketplaceHeader
        publishedCount={publishedCount}
        draftCount={draftCount}
        overallVisibilityScore={98}
        onOpenNewListing={() => {
          setSelectedListing(null);
          setIsEditorOpen(true);
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIMarketplaceAuditWidget aiAudit={aiAudit} />
        </div>

        <div className="lg:col-span-7">
          <ListingManagerTable
            listings={listings}
            onToggleStatus={handleToggleStatus}
            onDuplicate={handleDuplicate}
            onEdit={(l) => {
              setSelectedListing(l);
              setIsEditorOpen(true);
            }}
          />
        </div>
      </div>

      <ListingEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        vendorId={vendorId}
      />
    </div>
  );
}
