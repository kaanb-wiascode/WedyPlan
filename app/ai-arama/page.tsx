'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PublicNavbar } from '@/components/public/PublicNavbar';
import { PublicFooter } from '@/components/public/homepage/PublicFooter';
import { AiSearchHero } from '@/components/public/ai-search/AiSearchHero';
import { SuggestedPrompts } from '@/components/public/ai-search/SuggestedPrompts';
import { AiRecommendationCard } from '@/components/public/ai-search/AiRecommendationCard';
import { AiFilterPanel } from '@/components/public/ai-search/AiFilterPanel';
import { AiSearchResultCard } from '@/components/public/ai-search/AiSearchResultCard';
import { AiSearchLoadingSkeleton } from '@/components/public/ai-search/AiSearchLoadingSkeleton';
import { AiSearchEmptyState } from '@/components/public/ai-search/AiSearchEmptyState';
import { AiSearchFaq } from '@/components/public/ai-search/AiSearchFaq';
import { MOCK_AI_SEARCH_VENDORS } from '@/lib/data/ai-search-data';
import { AiSearchVendor, AiSearchFilterState } from '@/types/ai-search';

function AiSearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [prompt, setPrompt] = useState(initialQuery);
  const [isProcessing, setIsProcessing] = useState(false);
  const [vendors, setVendors] = useState<AiSearchVendor[]>(MOCK_AI_SEARCH_VENDORS);

  const [filters, setFilters] = useState<AiSearchFilterState>({
    prompt: initialQuery,
    category: '',
    city: '',
    maxBudget: 0,
    minCapacity: 0,
    verifiedOnly: false,
    minRating: 0
  });

  const handleRunSearch = (queryOverride?: string) => {
    const activePrompt = queryOverride !== undefined ? queryOverride : prompt;
    setIsProcessing(true);

    setTimeout(() => {
      setFilters((prev) => ({ ...prev, prompt: activePrompt }));
      setIsProcessing(false);
    }, 450);
  };

  const handleResetFilters = () => {
    setPrompt('');
    setFilters({
      prompt: '',
      category: '',
      city: '',
      maxBudget: 0,
      minCapacity: 0,
      verifiedOnly: false,
      minRating: 0
    });
  };

  const filteredVendors = vendors.filter((v) => {
    if (filters.category && v.category !== filters.category) return false;
    if (filters.city && v.city !== filters.city) return false;
    if (filters.maxBudget > 0 && v.startingPrice > filters.maxBudget) return false;
    if (filters.verifiedOnly && !v.isVerified) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1D1D1F] selection:bg-[#E6007E] selection:text-white pb-12 overflow-hidden relative">
      <PublicNavbar />

      <main className="space-y-10">
        {/* 1. Hero & Natural Language Input */}
        <AiSearchHero
          prompt={prompt}
          onPromptChange={(val) => setPrompt(val)}
          onSearch={() => handleRunSearch()}
          onReset={handleResetFilters}
          isProcessing={isProcessing}
        />

        {/* 2. Suggested Prompts */}
        <SuggestedPrompts
          onSelectPrompt={(selectedText) => {
            setPrompt(selectedText);
            handleRunSearch(selectedText);
          }}
        />

        {/* Main Content Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Filter Panel */}
            <div className="lg:col-span-4">
              <AiFilterPanel
                filters={filters}
                onChangeFilter={(updated) => setFilters((prev) => ({ ...prev, ...updated }))}
                onResetFilters={handleResetFilters}
              />
            </div>

            {/* Right Results & AI Insight */}
            <div className="lg:col-span-8 space-y-6">
              {/* 3. AI Recommendation Insight Card */}
              <AiRecommendationCard
                queryPrompt={filters.prompt}
                resultCount={filteredVendors.length}
              />

              {/* 4. Results List / Skeleton / Empty State */}
              {isProcessing ? (
                <AiSearchLoadingSkeleton />
              ) : filteredVendors.length === 0 ? (
                <AiSearchEmptyState onReset={handleResetFilters} />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {filteredVendors.map((vendor) => (
                    <AiSearchResultCard key={vendor.id} vendor={vendor} />
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* 5. AI Search FAQ */}
        <AiSearchFaq />
      </main>

      <PublicFooter />
    </div>
  );
}

export default function AiSearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-slate-400">WedyAI Arama Motoru Yükleniyor...</div>}>
      <AiSearchContent />
    </Suspense>
  );
}