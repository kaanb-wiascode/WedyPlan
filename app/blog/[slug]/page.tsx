import React from 'react';
import { notFound } from 'next/navigation';
import { MAGAZINE_ARTICLES } from '@/lib/data/wedding-magazine-data';
import { PublicNavbar } from '@/components/public/PublicNavbar';
import { PublicFooter } from '@/components/public/homepage/PublicFooter';
import { ReadingProgressBar } from '@/components/public/magazine/ReadingProgressBar';
import { AuthorCard } from '@/components/public/magazine/AuthorCard';
import { Clock, Calendar, Share2, Heart, Sparkles } from 'lucide-react';

export function generateStaticParams() {
  return MAGAZINE_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export default function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const article = MAGAZINE_ARTICLES.find((a) => a.slug === params.slug) || MAGAZINE_ARTICLES[0];

  if (!article) {
    notFound();
  }

  // Schema.org BlogPosting Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    image: article.coverImage,
    datePublished: article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.title,
    },
    publisher: {
      '@type': 'Organization',
      name: 'WedyPlan Magazine',
    },
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1D1D1F] selection:bg-[#0071e3] selection:text-white pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Top Reading Progress Line */}
      <ReadingProgressBar />

      <PublicNavbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-8 pt-16 space-y-8">
        {/* Editorial Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/80 text-[#0071e3] border border-pink-200 rounded-full text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> {article.category}
          </span>

          <h1 className="font-serif font-bold text-[32px] sm:text-[48px] text-[#1D1D1F] leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center justify-center gap-4 text-[12px] text-[#6E6E73] font-light">
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {article.readTimeMinutes} Dk Okuma</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {article.publishedAt}</span>
          </div>
        </div>

        {/* Hero Cover Image */}
        <div className="rounded-[36px] overflow-hidden border border-white/80 shadow-xl h-[420px] sm:h-[500px]">
          <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
        </div>

        {/* Article Body & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
          <article className="lg:col-span-8 bg-white/50 backdrop-blur-3xl p-8 rounded-[36px] border border-white/90 shadow-xs space-y-6">
            <div
              className="prose prose-slate max-w-none font-sans text-[15px] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.contentHtml || article.excerpt }}
            />

            {/* Tags */}
            <div className="pt-6 border-t border-black/5 flex flex-wrap gap-2">
              {article.tags.map((tag: string, idx: number) => (
                <span key={idx} className="text-[11px] font-semibold bg-white/80 text-[#6E6E73] px-3 py-1 rounded-full border border-slate-200">
                  #{tag}
                </span>
              ))}
            </div>
          </article>

          {/* Author Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            <AuthorCard author={article.author} />
          </aside>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}