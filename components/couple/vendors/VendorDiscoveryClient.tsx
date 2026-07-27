"use client";

import React, { useState } from "react";
import VendorDiscoveryHeader from "./VendorDiscoveryHeader";
import VendorFilterSidebar from "./VendorFilterSidebar";
import VendorCard from "./VendorCard";
import VendorCompareModal from "./VendorCompareModal";

export default function VendorDiscoveryClient({ userId }: { userId: string }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [viewMode, setViewMode] = useState<"GRID" | "MAP">("GRID");

  const [selectedCity, setSelectedCity] = useState("ALL");
  const [selectedPrice, setSelectedPrice] = useState("ALL");
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [onlyCampaigns, setOnlyCampaigns] = useState(false);

  const [comparedVendors, setComparedVendors] = useState<any[]>([]);

  const [vendors, setVendors] = useState([
    {
      id: "v1",
      name: "Bodrum Sunset Venue",
      category: "VENUE",
      categoryName: "Düğün Mekanı",
      city: "Bodrum",
      rating: 4.9,
      reviewCount: 48,
      priceRange: "₺₺₺₺",
      capacity: 450,
      isVerified: true,
      isPremium: true,
      campaign: true,
      isFavorite: false,
      aiMatchScore: 98,
      styleTag: "Bohem Lüks",
      imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "v2",
      name: "Studio Aegean Photography",
      category: "PHOTOGRAPHY",
      categoryName: "Fotoğraf & Video",
      city: "Bodrum",
      rating: 4.8,
      reviewCount: 32,
      priceRange: "₺₺₺",
      capacity: 0,
      isVerified: true,
      isPremium: false,
      campaign: false,
      isFavorite: true,
      aiMatchScore: 94,
      styleTag: "Cinematic / Belgesel",
      imageUrl: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "v3",
      name: "Ege Gourmet Catering",
      category: "CATERING",
      categoryName: "Catering",
      city: "İzmir",
      rating: 4.7,
      reviewCount: 19,
      priceRange: "₺₺₺",
      capacity: 600,
      isVerified: true,
      isPremium: false,
      campaign: true,
      isFavorite: false,
      aiMatchScore: 91,
      styleTag: "Ege & Akdeniz Menü",
      imageUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80",
    },
  ]);

  const handleToggleFavorite = (id: string) => {
    setVendors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, isFavorite: !v.isFavorite } : v))
    );
  };

  const handleCompare = (vendor: any) => {
    if (comparedVendors.some((v) => v.id === vendor.id)) {
      setComparedVendors((prev) => prev.filter((v) => v.id !== vendor.id));
    } else {
      if (comparedVendors.length >= 3) {
        alert("En fazla 3 tedarikçi karşılaştırabilirsiniz.");
        return;
      }
      setComparedVendors((prev) => [...prev, vendor]);
    }
  };

  const filteredVendors = vendors.filter((v) => {
    const matchesCategory = activeCategory === "ALL" || v.category === activeCategory;
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) || v.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity === "ALL" || v.city === selectedCity;
    const matchesPrice = selectedPrice === "ALL" || v.priceRange === selectedPrice;
    const matchesVerified = !onlyVerified || v.isVerified;
    const matchesCampaign = !onlyCampaigns || v.campaign;

    return matchesCategory && matchesSearch && matchesCity && matchesPrice && matchesVerified && matchesCampaign;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 md:p-8 space-y-8">
      <VendorDiscoveryHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        <div className="lg:col-span-3">
          <VendorFilterSidebar
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            onlyVerified={onlyVerified}
            setOnlyVerified={setOnlyVerified}
            onlyCampaigns={onlyCampaigns}
            setOnlyCampaigns={setOnlyCampaigns}
          />
        </div>

        <div className="lg:col-span-9">
          {viewMode === "GRID" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVendors.map((v) => (
                <VendorCard
                  key={v.id}
                  vendor={v}
                  onToggleFavorite={handleToggleFavorite}
                  onCompare={handleCompare}
                  isCompared={comparedVendors.some((cv) => cv.id === v.id)}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 backdrop-blur-2xl bg-white/70 dark:bg-slate-900/70 border border-white/60 dark:border-slate-800 rounded-3xl text-center space-y-2">
              <span className="text-4xl">🗺️</span>
              <h3 className="text-sm font-bold">İnteraktif Bölge Haritası</h3>
              <p className="text-xs text-slate-400">Seçilen {filteredVendors.length} tedarikçi harita üzerinde konumlandırıldı.</p>
            </div>
          )}
        </div>
      </div>

      <VendorCompareModal
        vendors={comparedVendors}
        onRemove={(id) => setComparedVendors((prev) => prev.filter((v) => v.id !== id))}
        onClose={() => setComparedVendors([])}
      />
    </div>
  );
}
