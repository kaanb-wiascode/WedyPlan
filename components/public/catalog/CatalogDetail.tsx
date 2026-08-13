"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import type { CatalogVendor } from "@/lib/catalog/listings";
import { catalogHref } from "@/lib/catalog/taxonomy";
import { formatCatalogPrice, toVendorDetail } from "@/lib/catalog/map";
import { VendorDetailHero } from "@/components/public/vendor-detail/VendorDetailHero";
import { VendorGalleryGrid } from "@/components/public/vendor-detail/VendorGalleryGrid";
import { VendorAboutSection } from "@/components/public/vendor-detail/VendorAboutSection";
import { VendorPackagesPricing } from "@/components/public/vendor-detail/VendorPackagesPricing";
import { VendorCampaignsSection } from "@/components/public/vendor-detail/VendorCampaignsSection";
import { VendorAvailabilityCalendar } from "@/components/public/vendor-detail/VendorAvailabilityCalendar";
import { VendorReviewsSection } from "@/components/public/vendor-detail/VendorReviewsSection";
import { VendorFaqSection } from "@/components/public/vendor-detail/VendorFaqSection";
import { VendorContactSection } from "@/components/public/vendor-detail/VendorContactSection";
import { SimilarVendorsGrid } from "@/components/public/vendor-detail/SimilarVendorsGrid";
import { StickyBookingCard } from "@/components/public/vendor-detail/StickyBookingCard";
import { CatalogQuoteModal } from "./CatalogQuoteModal";
import { CatalogCard } from "./CatalogCard";

type CatalogDetailProps = {
  vendor: CatalogVendor;
  similar: CatalogVendor[];
};

export function CatalogDetail({ vendor, similar }: CatalogDetailProps) {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const detail = toVendorDetail(vendor);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": vendor.capacityMax > 0 ? "EventVenue" : "LocalBusiness",
    name: vendor.name,
    description: vendor.story,
    image: vendor.gallery,
    telephone: vendor.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: vendor.address,
      addressLocality: vendor.district,
      addressRegion: vendor.city,
      addressCountry: "TR",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: vendor.rating,
      reviewCount: vendor.reviewCount,
    },
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="text-[13px] text-[#86868b]">
        <Link href={catalogHref(vendor.categorySlug)} className="hover:text-[#1d1d1f]">
          {vendor.categoryName}
        </Link>
        <span className="px-1.5">/</span>
        <Link href={catalogHref(vendor.categorySlug, vendor.citySlug)} className="hover:text-[#1d1d1f]">
          {vendor.city}
        </Link>
        <span className="px-1.5">/</span>
        <span className="text-[#1d1d1f]">{vendor.name}</span>
      </nav>

      <VendorDetailHero vendor={detail} onOpenOfferModal={() => setQuoteOpen(true)} />
      <VendorGalleryGrid coverImages={detail.coverImages} />

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-8">
          <VendorAboutSection story={detail.story} specialties={detail.specialties} />

          <section className="apple-panel space-y-4 rounded-[24px] p-6">
            <h2 className="text-[22px] font-semibold tracking-tight text-[#1d1d1f]">
              {vendor.capacityMax > 0 ? "Hafta içi / hafta sonu menü" : "Paket fiyatları"}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[14px]">
                <thead className="text-[12px] uppercase tracking-wide text-[#86868b]">
                  <tr>
                    <th className="pb-3 font-medium">Menü</th>
                    <th className="pb-3 font-medium">Hafta içi</th>
                    <th className="pb-3 font-medium">Hafta sonu</th>
                  </tr>
                </thead>
                <tbody>
                  {vendor.menus.map((menu) => (
                    <tr key={menu.name} className="border-t border-black/8">
                      <td className="py-3 font-medium text-[#1d1d1f]">{menu.name}</td>
                      <td className="py-3 text-[#1d1d1f]">{formatCatalogPrice(menu.weekdayPrice)}</td>
                      <td className="py-3 text-[#1d1d1f]">{formatCatalogPrice(menu.weekendPrice)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[12px] text-[#86868b]">
              Fiyatlar başlangıçtır. Kesin teklif tarih, davetli sayısı ve menüye göre oluşur.
            </p>
          </section>

          <VendorPackagesPricing packages={detail.packages} onOpenOfferModal={() => setQuoteOpen(true)} />
          <VendorCampaignsSection campaigns={detail.campaigns} />
          <VendorAvailabilityCalendar />
          <VendorReviewsSection reviews={detail.reviews} aiSummary={detail.aiReviewSummary} />
          <VendorFaqSection faq={detail.faq} />
          <VendorContactSection
            vendor={{
              phone: vendor.phone,
              email: detail.email,
              website: detail.websiteUrl,
              instagram: detail.instagramUrl,
              fullAddress: vendor.address,
            }}
          />

          <div className="flex flex-wrap gap-3">
            <a href={`tel:${vendor.phone.replaceAll(" ", "")}`} className="apple-btn-secondary apple-btn-compact inline-flex items-center gap-1.5">
              <Phone className="h-4 w-4" /> {vendor.phone}
            </a>
            <a
              href={`https://wa.me/${vendor.whatsapp}?text=${encodeURIComponent(`${vendor.name} için WedyPlan üzerinden teklif almak istiyorum.`)}`}
              target="_blank"
              rel="noreferrer"
              className="apple-btn-secondary apple-btn-compact inline-flex items-center gap-1.5"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <button
              type="button"
              className="apple-btn apple-btn-compact"
              onClick={async () => {
                const { startVendorCoupleChatAction } = await import('@/lib/actions/vendor-messages');
                const res = await startVendorCoupleChatAction(vendor.id);
                window.location.href = res.success ? '/cift/messages' : `/giris?next=/cift/messages`;
              }}
            >
              WedyPlan mesaj
            </button>
          </div>

          {similar.length > 0 ? (
            <section className="space-y-4">
              <h2 className="text-[22px] font-semibold tracking-tight text-[#1d1d1f]">Aynı bölgede benzer ilanlar</h2>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {similar.map((item) => (
                  <CatalogCard key={item.id} vendor={item} />
                ))}
              </div>
            </section>
          ) : (
            <SimilarVendorsGrid similarVendors={detail.similarVendors} />
          )}
        </div>

        <div className="space-y-4 lg:col-span-4">
          <StickyBookingCard startingPrice={vendor.price} onOpenOfferModal={() => setQuoteOpen(true)} />
          <p className="px-2 text-center text-[12px] text-[#86868b]">
            WedyPlan çiftlerden komisyon almaz. Teklif firma panosuna düşer, takvim ve sözleşme oradan yürür.
          </p>
        </div>
      </div>

      {quoteOpen ? (
        <CatalogQuoteModal
          vendorId={vendor.id}
          vendorName={vendor.name}
          categorySlug={vendor.categorySlug}
          city={vendor.city}
          district={vendor.district}
          onClose={() => setQuoteOpen(false)}
        />
      ) : null}
    </div>
  );
}
