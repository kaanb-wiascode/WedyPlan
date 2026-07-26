'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { MOCK_VENDOR_DETAIL } from '@/lib/vendor-detail-constants';
import { PublicNavbar } from '@/components/public/PublicNavbar';
import { VendorHeroSection } from '@/components/public/VendorHeroSection';
import { VendorEditorialAbout } from '@/components/public/VendorEditorialAbout';
import { VendorPackagesSection } from '@/components/public/VendorPackagesSection';
import { VendorAvailabilityCalendar } from '@/components/public/VendorAvailabilityCalendar';
import { VendorReviewsSection } from '@/components/public/VendorReviewsSection';
import { MobileStickyCta } from '@/components/public/MobileStickyCta';
import { Sparkles, X } from 'lucide-react';

export default function VendorDetailPage() {
  const params = useParams();
  const vendor = MOCK_VENDOR_DETAIL; // Gelecekte [id] parametresine göre Firestore'dan çekilir

  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteForm, setQuoteForm] = useState({ fullName: '', phone: '', weddingDate: '', guestCount: 300 });

  // Schema.org Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WeddingVendor',
    name: vendor.companyName,
    description: vendor.tagline,
    image: vendor.coverImages[0],
    telephone: vendor.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: vendor.district,
      addressRegion: vendor.city,
      addressCountry: 'TR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: vendor.rating,
      reviewCount: vendor.reviewCount,
    },
  };

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Tebrikler! ${vendor.companyName} firmasına WedyAI teklif talebiniz başarıyla iletildi.`);
    setShowQuoteModal(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1D1D1F] selection:bg-[#E6007E] selection:text-white pb-24 md:pb-12">
      {/* Schema.org SEO Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PublicNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-28 space-y-12">
        {/* Hero & Visual Gallery */}
        <VendorHeroSection vendor={vendor} onOpenQuoteModal={() => setShowQuoteModal(true)} />

        {/* Editorial Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10">
            <VendorEditorialAbout vendor={vendor} />
            <VendorPackagesSection packages={vendor.packages} onSelectPackage={() => setShowQuoteModal(true)} />
            <VendorReviewsSection reviews={vendor.reviews} aiSummary={vendor.aiReviewSummary} />
          </div>

          <div className="space-y-8">
            <VendorAvailabilityCalendar />
            
            {/* WedyAI Smart Questions Box */}
            <div className="bg-white/50 backdrop-blur-3xl border border-white/90 p-6 rounded-[32px] space-y-3">
              <span className="text-[11px] font-bold text-[#E6007E] uppercase tracking-wider block">WedyAI Tavsiyesi</span>
              <h4 className="font-serif font-bold text-[16px] text-[#1D1D1F]">Firmaya Sorabileceğiniz Sorular</h4>
              <ul className="space-y-2 text-[12px] text-[#6E6E73]">
                {vendor.suggestedAiQuestions.map((q, idx) => (
                  <li key={idx} className="p-2.5 bg-white/80 rounded-xl border border-white">💡 {q}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Bar */}
      <MobileStickyCta startingPrice={vendor.startingPrice} onOpenQuoteModal={() => setShowQuoteModal(true)} />

      {/* Quote Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] max-w-md w-full p-8 space-y-4 relative shadow-2xl animate-in fade-in zoom-in duration-200">
            <button onClick={() => setShowQuoteModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 p-1">
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#E6007E] bg-pink-50 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> WedyAI Teklif İste
              </span>
              <h3 className="font-serif font-bold text-[22px] text-[#1D1D1F]">{vendor.companyName}</h3>
            </div>

            <form onSubmit={handleSendQuote} className="space-y-3 pt-2">
              <input
                type="text"
                required
                placeholder="Ad Soyad"
                value={quoteForm.fullName}
                onChange={(e) => setQuoteForm({ ...quoteForm, fullName: e.target.value })}
                className="w-full p-3 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#E6007E]"
              />
              <input
                type="tel"
                required
                placeholder="Telefon Numarası"
                value={quoteForm.phone}
                onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                className="w-full p-3 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#E6007E]"
              />
              <input
                type="date"
                required
                value={quoteForm.weddingDate}
                onChange={(e) => setQuoteForm({ ...quoteForm, weddingDate: e.target.value })}
                className="w-full p-3 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#E6007E]"
              />
              <button
                type="submit"
                className="w-full bg-[#1D1D1F] text-white text-xs font-bold py-3.5 rounded-full hover:bg-black transition shadow-md cursor-pointer"
              >
                WedyAI İle Teklif Talebini Gönder
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}