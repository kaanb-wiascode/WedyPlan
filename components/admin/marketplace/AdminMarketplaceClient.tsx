"use client";

import React, { useState } from "react";
import MarketplaceControlHeader from "./MarketplaceControlHeader";
import AIMarketplaceHealthWidget from "./AIMarketplaceHealthWidget";
import TaxonomyAndListingsTable from "./TaxonomyAndListingsTable";
import HomepageCuratorDrawer from "./HomepageCuratorDrawer";
import { toggleFeaturedListingPlacementAction } from "@/lib/actions/admin-marketplace";

export default function AdminMarketplaceClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCuratorOpen, setIsCuratorOpen] = useState(false);

  const [aiReport] = useState({
    healthScore: 97,
    searchDemandMatchRate: "%94 Eşleşme Oranı",
    searchGaps: [
      "Bodrum bölgesinde 'Sualtı Düğün Çekimi' araması son 30 günde 420 kez yapıldı ancak aktif ilan sayısı 0.",
      "İzmir bölgesinde 'Gluten-Free Düğün Pastası' arama talebi %80 arttı.",
    ],
    lowQualityContentAlertsCount: 3,
    aiRecommendation: "Arama boşluğu tespit edilen kategorilere yeni tedarikçi davet kampanyası başlatılması önerilir.",
  });

  const [categories] = useState([
    {
      id: "cat_101",
      name: "Düğün Mekanları",
      slug: "dugun-mekanlari",
      icon: "🏰",
      commissionPercentage: 5,
      listingCount: 340,
      status: "ACTIVE",
    },
    {
      id: "cat_102",
      name: "Fotoğraf & Sinema",
      slug: "fotograf-sinema",
      icon: "📸",
      commissionPercentage: 8,
      listingCount: 520,
      status: "ACTIVE",
    },
    {
      id: "cat_103",
      name: "Müzik & Orkestra",
      slug: "muzik-orkestra",
      icon: "🎷",
      commissionPercentage: 7,
      listingCount: 180,
      status: "ACTIVE",
    },
  ]);

  const handleToggleFeatured = async (listingId: string, current: boolean) => {
    const res = await toggleFeaturedListingPlacementAction({
      listingId,
      isFeatured: !current,
      positionIndex: 1,
    });

    if (res.success) {
      alert("✨ " + res.message);
    }
  };

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <div className="flex justify-between items-center max-w-[1600px] mx-auto">
        <MarketplaceControlHeader
          totalCategories={categories.length}
          totalActiveListings={1240}
          featuredListingsCount={18}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      <div className="flex justify-end max-w-[1600px] mx-auto">
        <button
          onClick={() => setIsCuratorOpen(true)}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-md hover:shadow-lg transition"
        >
          🖼️ Ana Sayfa Vitrin & Banner Küratörünü Aç
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-5 space-y-6">
          <AIMarketplaceHealthWidget aiReport={aiReport} />
        </div>

        <div className="lg:col-span-7">
          <TaxonomyAndListingsTable
            categories={filteredCategories}
            onToggleFeatured={handleToggleFeatured}
          />
        </div>
      </div>

      <HomepageCuratorDrawer
        isOpen={isCuratorOpen}
        onClose={() => setIsCuratorOpen(false)}
      />
    </div>
  );
}
