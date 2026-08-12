'use client';

import React, { useState } from 'react';
import { PublicNavbar } from '@/components/public/PublicNavbar';
import { PublicFooter } from '@/components/public/homepage/PublicFooter';
import { MagazineHeroFeatured } from '@/components/public/magazine/MagazineHeroFeatured';
import { MagazineCategoriesBar } from '@/components/public/magazine/MagazineCategoriesBar';
import { MagazineAiSearchBox } from '@/components/public/magazine/MagazineAiSearchBox';
import { TrendingArticlesGrid } from '@/components/public/magazine/TrendingArticlesGrid';
import { EditorialGuidesBento } from '@/components/public/magazine/EditorialGuidesBento';
import { MAGAZINE_ARTICLES, EDITORIAL_GUIDES } from '@/lib/data/wedding-magazine-data';
import { MagazineArticle } from '@/types/wedding-magazine';

export default function WeddingMagazinePage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredArticle = MAGAZINE_ARTICLES.find((a) => a.isFeatured) || MAGAZINE_ARTICLES[0];
  
  const filteredArticles = MAGAZINE_ARTICLES.filter((a) => {
    if (selectedCategory && a.categorySlug !== selectedCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = a.title.toLowerCase().includes(q);
      const matchExcerpt = a.excerpt.toLowerCase().includes(q);
      if (!matchTitle && !matchExcerpt) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1D1D1F] selection:bg-[#0071e3] selection:text-white pb-16">
      <PublicNavbar />

      <main className="space-y-6">
        {/* 1. Featured Cover Story */}
        <MagazineHeroFeatured article={featuredArticle} />

        {/* 2. Magazine Categories */}
        <MagazineCategoriesBar
          selectedSlug={selectedCategory}
          onSelectCategory={(slug) => setSelectedCategory(slug)}
        />

        {/* 3. AI Natural Language Magazine Search */}
        <MagazineAiSearchBox onSearchSubmit={(q) => setSearchQuery(q)} />

        {/* 4. Trending Articles */}
        <TrendingArticlesGrid articles={filteredArticles} />

        {/* 5. Editorial Step-by-step Guides */}
        <EditorialGuidesBento guides={EDITORIAL_GUIDES} />
      </main>

      <PublicFooter />
    </div>
  );
}