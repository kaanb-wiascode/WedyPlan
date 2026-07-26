'use client';

import React, { useState, Suspense } from 'react';
import { DISCOVERY_VENDORS, CURATED_COLLECTIONS } from '@/lib/vendor-discovery-constants';
import { DiscoveryVendor, DiscoveryFilterState } from '@/types/vendor-discovery';
import { PublicNavbar } from '@/components/public/PublicNavbar';
import { DiscoveryHero } from '@/components/discovery/DiscoveryHero';
import { SmartFilterBar } from '@/components/discovery/SmartFilterBar';
import { DiscoveryVendorCard } from '@/components/discovery/DiscoveryVendorCard';
import { CuratedCollections } from '@/components/discovery/CuratedCollections';
import { AiComparisonModal } from '@/components/discovery/AiComparisonModal';
import { InteractiveMapView } from '@/components/discovery/InteractiveMapView';
import { MobileBottomNav } from '@/components/discovery/MobileBottomNav';
import { Layers, Map, Grid } from 'lucide-react';

function DiscoveryContent() {
  const [vendors] = useState<DiscoveryVendor[]>(DISCOVERY_VENDORS);
  const [viewMode, setViewMode] = useState<'GRID' | 'MAP'>('GRID');
  const [promptText, setPromptText] = useState('');
  
  const [filters, setFilters] = useState<DiscoveryFilterState>({
    searchPrompt: '',
    category: '',
    city: '',
    style: '',
    guestCount: 0,
    maxBudget: 0,
    verifiedOnly: false,
    dealsOnly: false,
    minRating: 0
  });

  const [comparedVendors, setComparedVendors] = useState<DiscoveryVendor[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const handleToggleCompare = (vendor: DiscoveryVendor) => {
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

  const filteredVendors = vendors.filter((v) => {
    if (filters.category && v.category !== filters.category) return false;
    if (filters.verifiedOnly && !v.isVerified) return false;
    if (filters.dealsOnly && !v.isDeals) return false;
    return true;
  });

  // Schema.org Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: filteredVendors.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'WeddingService',
        name: item.name,
        address: `${item.district}, ${item.city}`,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1D1D1F] selection:bg-[#E6007E] selection:text-white pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PublicNavbar />

      <main className="space-y-10">
        {/* Hero & Prompt Search */}
        <DiscoveryHero
          promptValue={promptText}
          onPromptChange={(val) => setPromptText(val)}
          onSearchSubmit={() => setFilters({ ...filters, searchPrompt: promptText })}
        />

        {/* Smart Liquid Filter Bar */}
        <SmartFilterBar
          filters={filters}
          onChangeFilter={(updated) => setFilters({ ...filters, ...updated })}
          activeCount={filteredVendors.length}
        />

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          
          {/* View Toggle Bar & Compare Bar */}
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-[#6E6E73] font-medium">
              Sizin için doğrulanan <strong className="text-[#1D1D1F]">{filteredVendors.length} özel ekip</strong> listeleniyor
            </span>

            <div className="flex items-center gap-3">
              {comparedVendors.length > 0 && (
                <button
                  onClick={() => setShowCompareModal(true)}
                  className="bg-[#E6007E] text-white text-[12px] font-bold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-md shadow-pink-200 cursor-pointer animate-pulse"
                >
                  <Layers className="w-4 h-4" /> Karşılaştır ({comparedVendors.length})
                </button>
              )}

              <div className="bg-white/60 p-1 rounded-full border border-white flex items-center gap-1 text-[12px] font-bold">
                <button
                  onClick={() => setViewMode('GRID')}
                  className={`px-3 py-1.5 rounded-full transition cursor-pointer flex items-center gap-1 ${
                    viewMode === 'GRID' ? 'bg-[#1D1D1F] text-white' : 'text-[#6E6E73]'
                  }`}
                >
                  <Grid className="w-3.5 h-3.5" /> Liste
                </button>
                <button
                  onClick={() => setViewMode('MAP')}
                  className={`px-3 py-1.5 rounded-full transition cursor-pointer flex items-center gap-1 ${
                    viewMode === 'MAP' ? 'bg-[#1D1D1F] text-white' : 'text-[#6E6E73]'
                  }`}
                >
                  <Map className="w-3.5 h-3.5" /> Harita
                </button>
              </div>
            </div>
          </div>

          {/* Grid View vs Map View */}
          {viewMode === 'GRID' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVendors.map((vendor) => (
                <DiscoveryVendorCard
                  key={vendor.id}
                  vendor={vendor}
                  isCompared={!!comparedVendors.find((v) => v.id === vendor.id)}
                  onToggleCompare={handleToggleCompare}
                />
              ))}
            </div>
          ) : (
            <InteractiveMapView vendors={filteredVendors} />
          )}

          {/* Curated Pinterest Collections */}
          <CuratedCollections collections={CURATED_COLLECTIONS} />
        </div>
      </main>

      {/* Mobile Fixed Nav Bar */}
      <MobileBottomNav />

      {/* AI Comparison Modal */}
      {showCompareModal && (
        <AiComparisonModal vendors={comparedVendors} onClose={() => setShowCompareModal(false)} />
      )}
    </div>
  );
}

export default function DiscoveryPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-400">Keşif Motoru Yükleniyor...</div>}>
      <DiscoveryContent />
    </Suspense>
  );
}