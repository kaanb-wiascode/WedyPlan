'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import PublicPageLayout from '@/components/public/PublicPageLayout';
import { VendorDetailHero } from '@/components/public/vendor-detail/VendorDetailHero';
import { VendorGalleryGrid } from '@/components/public/vendor-detail/VendorGalleryGrid';
import { VendorAboutSection } from '@/components/public/vendor-detail/VendorAboutSection';
import { VendorPackagesPricing } from '@/components/public/vendor-detail/VendorPackagesPricing';
import { VendorCampaignsSection } from '@/components/public/vendor-detail/VendorCampaignsSection';
import { VendorAvailabilityCalendar } from '@/components/public/vendor-detail/VendorAvailabilityCalendar';
import { VendorMediaSection } from '@/components/public/vendor-detail/VendorMediaSection';
import { VendorAwardsCertificates } from '@/components/public/vendor-detail/VendorAwardsCertificates';
import { VendorReviewsSection } from '@/components/public/vendor-detail/VendorReviewsSection';
import { VendorFaqSection } from '@/components/public/vendor-detail/VendorFaqSection';
import { VendorContactSection } from '@/components/public/vendor-detail/VendorContactSection';
import { VendorAiRecommendation } from '@/components/public/vendor-detail/VendorAiRecommendation';
import { SimilarVendorsGrid } from '@/components/public/vendor-detail/SimilarVendorsGrid';
import { StickyBookingCard } from '@/components/public/vendor-detail/StickyBookingCard';
import { QuickOfferModal } from '@/components/public/vendor-detail/QuickOfferModal';
import { MOCK_VENDOR_DETAIL_FULL } from '@/lib/data/vendor-detail-data';

export default function VendorDetailPage() {
  const params = useParams();
  const vendor = MOCK_VENDOR_DETAIL_FULL;
  const [showOfferModal, setShowOfferModal] = useState(false);

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

  return (
    <PublicPageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        {/* 1. Hero */}
        <VendorDetailHero vendor={vendor} onOpenOfferModal={() => setShowOfferModal(true)} />

        {/* 2. Gallery Grid */}
        <VendorGalleryGrid coverImages={vendor.coverImages} />

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Editorial Flow (18 Required Modules) */}
          <div className="lg:col-span-8 space-y-8">
            {/* 3. About */}
            <VendorAboutSection story={vendor.story} specialties={vendor.specialties} />

            {/* 4 & 5. Packages & Pricing */}
            <VendorPackagesPricing packages={vendor.packages} onOpenOfferModal={() => setShowOfferModal(true)} />

            {/* 12. Campaigns */}
            <VendorCampaignsSection campaigns={vendor.campaigns} />

            {/* 6. Calendar Availability */}
            <VendorAvailabilityCalendar />

            {/* 8. Videos */}
            <VendorMediaSection videos={vendor.videos} />

            {/* 9 & 10. Awards & Certificates */}
            <VendorAwardsCertificates awards={vendor.awards} certificates={vendor.certificates} />

            {/* 7. Reviews */}
            <VendorReviewsSection reviews={vendor.reviews} aiSummary={vendor.aiReviewSummary} />

            {/* 13. FAQ */}
            <VendorFaqSection faq={vendor.faq} />

            {/* 14. Contact & Social */}
            <VendorContactSection vendor={vendor} />

            {/* 17. Similar Vendors */}
            <SimilarVendorsGrid similarVendors={vendor.similarVendors} />
          </div>

          {/* Right Floating Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* 18. Sticky Booking/Offer Card */}
            <StickyBookingCard startingPrice={vendor.startingPrice} onOpenOfferModal={() => setShowOfferModal(true)} />

            {/* 16. AI Recommendation */}
            <VendorAiRecommendation suggestedQuestions={vendor.suggestedAiQuestions} />
          </div>

        </div>
      </div>

      {/* 15. Quick Offer Modal */}
      {showOfferModal && (
        <QuickOfferModal companyName={vendor.companyName} onClose={() => setShowOfferModal(false)} />
      )}
    </PublicPageLayout>
  );
}