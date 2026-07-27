'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PublicNavbar } from '@/components/public/PublicNavbar';
import { PublicFooter } from '@/components/public/homepage/PublicFooter';
import { ListingHero } from '@/components/public/vendor-listing/ListingHero';
import { AiRecommendedVendors } from '@/components/public/vendor-listing/AiRecommendedVendors';
import { FilterBar } from '@/components/public/vendor-listing/FilterBar';
import { VendorListingCard } from '@/components/public/vendor-listing/VendorListingCard';
import { MapView } from '@/components/public/vendor-listing/MapView';
import { CompareDrawer } from '@/components/public/vendor-listing/CompareDrawer';
import { ListingSkeleton } from '@/components/public/vendor-listing/ListingSkeleton';
import { VENDOR_LISTING_DATABASE } from '@/lib/data/vendor-listing-data';
import { VendorListingItem, VendorListingFilterState } from '@/types/vendor-listing';
import { Sparkles, RotateCcw } from 'lucide-react';

function VendorListingContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialCity = searchParams.get('city') || '';

  const [vendors] = useState<VendorListingItem[]>(VENDOR_LISTING_DATABASE);
  const [viewMode, setViewMode] = useState<'GRID' | 'MAP'>('GRID');
  const [isLoading, setIsLoading] = useState(false);

  // Filters State
  const [filters, setFilters] = useState<VendorListingFilterState>({
    searchQuery: '',
    category: initialCategory,
    city: initialCity,
    minPrice: 0,
    maxPrice: 500000,
    minRating: 0,
    availabilityOnly: false,
    verifiedOnly: false,
    sortBy: 'RECOMMENDED'
  });

  // State: Selected Compare & Saved Favorites
  const [comparedVendors, setComparedVendors] = useState<VendorListingItem[]>([]);
  const [savedVendorIds, setSavedVendorIds] = useState<string[]>([]);

  // Infinite Scroll / Load More State
  const [visibleCount, setVisibleCount] = useState(6);

  const handleToggleCompare = (vendor: VendorListingItem) => {
    if (comparedVendors.find((v) => v.id === vendor.id)) {
      setComparedVendors(comparedVendors.filter((v) => v.id !== vendor.id));
    } else {
      if (comparedVendors.length >= 3) {
        alert('En fazla 3 firmayı aynı anda karşılaştırabilirsiniz.');
        return;
      }
      setComparedVendors([...comparedVendors, vendor]);
    }
  };

  const handleToggleSave = (vendorId: string) => {
    if (savedVendorIds.includes(vendorId)) {
      setSavedVendorIds(savedVendorIds.filter((id) => id !== vendorId));
    } else {
      setSavedVendorIds([...savedVendorIds, vendorId]);
    }
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      category: '',
      city: '',
      minPrice: 0,
      maxPrice: 500000,
      minRating: 0,
      availabilityOnly: false,
      verifiedOnly: false,
      sortBy: 'RECOMMENDED'
    });
  };

  // Filter & Sort Logic
  const filteredVendors = vendors.filter((v) => {
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      const matchName = v.name.toLowerCase().includes(q);
      const matchDistrict = v.district.toLowerCase().includes(q);
      if (!matchName && !matchDistrict) return false;
    }
    if (filters.category && v.categorySlug !== filters.category) return false;
    if (filters.city && v.city !== filters.city) return false;
    if (filters.availabilityOnly && !v.isAvailable) return false;
    if (filters.verifiedOnly && !v.isVerified) return false;
    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'PRICE_LOW') return a.startingPrice - b.startingPrice;
    if (filters.sortBy === 'PRICE_HIGH') return b.startingPrice - a.startingPrice;
    if (filters.sortBy === 'RATING') return b.rating - a.rating;
    return b.aiMatchScore - a.aiMatchScore;
  });

  const recommendedVendors = vendors.filter((v) => v.isFeatured || v.aiMatchScore >= 95);

  const visibleVendors = filteredVendors.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1D1D1F] selection:bg-[#E6007E] selection:text-white pb-20 overflow-hidden relative">
      <PublicNavbar />

      <main className="space-y-6">
        {/* 1. Hero */}
        <ListingHero
          searchQuery={filters.searchQuery}
          onSearchChange={(q) => setFilters({ ...filters, searchQuery: q })}
          totalCount={filteredVendors.length}
        />

        {/* 2. AI Recommended Vendors */}
        <AiRecommendedVendors recommendedVendors={recommendedVendors} />

        {/* 3. Sticky Filter Bar */}
        <FilterBar
          filters={filters}
          onChangeFilter={(updated) => setFilters({ ...filters, ...updated })}
          onResetFilters={handleResetFilters}
          viewMode={viewMode}
          onToggleViewMode={(m) => setViewMode(m)}
        />

        {/* 4. Content Area: Grid vs Map */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-2">
          {isLoading ? (
            <ListingSkeleton />
          ) : visibleVendors.length === 0 ? (
            <div className="bg-white/50 backdrop-blur-2xl border border-white p-12 rounded-[36px] text-center space-y-4 max-w-xl mx-auto">
              <Sparkles className="w-8 h-8 text-[#E6007E] mx-auto" />
              <h3 className="font-serif font-bold text-[22px]">Filtrelere Uygun Firma Bulunamadı</h3>
              <p className="text-[13px] text-[#6E6E73]">
                Seçtiğiniz kriterlerle eşleşen işletme bulunamadı. Filtreleri sıfırlayarak tekrar arayabilirsiniz.
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-[#1D1D1F] text-white text-[12px] font-bold px-6 py-3 rounded-full inline-flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Filtreleri Sıfırla
              </button>
            </div>
          ) : viewMode === 'GRID' ? (
            <div className="space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleVendors.map((vendor) => (
                  <VendorListingCard
                    key={vendor.id}
                    vendor={vendor}
                    isCompared={!!comparedVendors.find((v) => v.id === vendor.id)}
                    onToggleCompare={handleToggleCompare}
                    isSaved={savedVendorIds.includes(vendor.id)}
                    onToggleSave={handleToggleSave}
                  />
                ))}
              </div>

              {/* Infinite Scroll / Load More Trigger */}
              {visibleCount < filteredVendors.length && (
                <div className="text-center pt-4">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                    className="bg-white/80 hover:bg-white border border-white text-[#1D1D1F] font-bold text-[13px] px-8 py-3.5 rounded-full shadow-xs transition cursor-pointer"
                  >
                    Daha Fazla Firma Göster ({filteredVendors.length - visibleCount} Kaldı)
                  </button>
                </div>
              )}
            </div>
          ) : (
            <MapView vendors={filteredVendors} />
          )}
        </div>
      </main>

      {/* 5. Compare Sticky Drawer */}
      <CompareDrawer
        selectedVendors={comparedVendors}
        onRemoveVendor={(id) => setComparedVendors(comparedVendors.filter((v) => v.id !== id))}
        onClearAll={() => setComparedVendors([])}
      />

      <PublicFooter />
    </div>
  );
}

export default function VendorListingPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-400">Firma Kataloğu Yükleniyor...</div>}>
      <VendorListingContent />
    </Suspense>
  );
}