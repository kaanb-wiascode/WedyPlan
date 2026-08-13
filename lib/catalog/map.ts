import { catalogHref } from "./taxonomy";
import { similarVendors, type CatalogVendor } from "./listings";
import type { VendorDetailFull } from "@/types/vendor-detail-page";
import type { VendorListingItem } from "@/types/vendor-listing";

export function formatCatalogPrice(value: number) {
  return `${value.toLocaleString("tr-TR")} ₺`;
}

export function catalogVendorHref(vendor: CatalogVendor) {
  return catalogHref(vendor.categorySlug, vendor.citySlug, vendor.slug);
}

export function toListingItem(vendor: CatalogVendor): VendorListingItem {
  return {
    id: vendor.id,
    name: vendor.name,
    category: vendor.categoryName,
    categorySlug: vendor.categorySlug,
    city: vendor.city,
    district: vendor.district,
    startingPrice: vendor.price,
    capacity: vendor.capacityMax,
    rating: vendor.rating,
    reviewCount: vendor.reviewCount,
    aiMatchScore: Math.round(88 + (vendor.rating - 4.4) * 20),
    imageUrl: vendor.imageUrl,
    galleryUrls: vendor.gallery,
    tags: vendor.tags,
    isVerified: vendor.isVerified,
    isFeatured: Boolean(vendor.discountPct),
    isAvailable: true,
    responseTime: vendor.responseTime,
    coordinates: { lat: 41.0082, lng: 28.9784 },
  };
}

export function toVendorDetail(vendor: CatalogVendor): VendorDetailFull {
  const similar = similarVendors(vendor, 4);
  return {
    id: vendor.id,
    companyName: vendor.name,
    tagline: `${vendor.district}, ${vendor.city} · ${vendor.categoryName}`,
    category: vendor.categoryName,
    city: vendor.city,
    district: vendor.district,
    address: vendor.address,
    phone: vendor.phone,
    email: `info@${vendor.slug}.wedyplan.com`,
    websiteUrl: catalogVendorHref(vendor),
    instagramUrl: vendor.slug,
    startingPrice: vendor.price,
    capacity: vendor.capacityMax,
    rating: vendor.rating,
    reviewCount: vendor.reviewCount,
    aiMatchScore: Math.round(88 + (vendor.rating - 4.4) * 20),
    isVerified: vendor.isVerified,
    establishedYear: 2026 - vendor.yearsOnPlatform,
    coverImages: vendor.gallery,
    logoUrl: vendor.imageUrl,
    story: vendor.story,
    specialties: vendor.features,
    awards: vendor.isVerified ? ["WedyPlan Onaylı İşletme", `${vendor.yearsOnPlatform} yıldır platformda`] : [],
    certificates: ["WedyPlan Güvenli Teklif", "Çiftlerden komisyon alınmaz"],
    packages: vendor.menus.map((menu, index) => ({
      id: `${vendor.id}-menu-${index}`,
      name: menu.name,
      tagline: `${menu.type} · hafta içi ${formatCatalogPrice(menu.weekdayPrice)}`,
      price: menu.weekendPrice,
      isPopular: index === 1,
      features: [
        `Hafta içi ${formatCatalogPrice(menu.weekdayPrice)}`,
        `Hafta sonu ${formatCatalogPrice(menu.weekendPrice)}`,
        vendor.priceType === "PER_PERSON" ? "Kişi başı fiyat" : "Paket fiyat",
        "Teklif WedyPlan üzerinden ilerler",
      ],
    })),
    campaigns: vendor.discountPct
      ? [
          {
            id: `${vendor.id}-cmp`,
            title: `%${vendor.discountPct} erken rezervasyon`,
            discountBadge: `%${vendor.discountPct}`,
            description: `${vendor.oldPrice ? formatCatalogPrice(vendor.oldPrice) : ""} yerine ${formatCatalogPrice(vendor.price)}.`,
            validUntil: vendor.campaignDaysLeft
              ? `${vendor.campaignDaysLeft} gün içinde geçerli`
              : "Kampanya devam ediyor",
          },
        ]
      : [],
    reviews: vendor.reviews.map((review) => ({
      ...review,
      verifiedBooking: true,
    })),
    aiReviewSummary: `${vendor.name} için çiftler özellikle ${vendor.district} konumunu, yanıt süresini (${vendor.responseTime.toLocaleLowerCase("tr-TR")}) ve net fiyatlandırmayı öne çıkarıyor.`,
    videos: [
      {
        id: `${vendor.id}-video`,
        title: `${vendor.name} tanıtım`,
        thumbnailUrl: vendor.imageUrl,
        videoUrl: vendor.imageUrl,
        duration: "01:20",
      },
    ],
    faq: vendor.faqs,
    suggestedAiQuestions: [
      "Hafta sonu menü fiyatı nedir?",
      "Tarihim açık mı?",
      "Teklif sonrası sözleşme nasıl oluşur?",
    ],
    similarVendors: similar.map((item) => ({
      id: item.id,
      name: item.name,
      category: item.categoryName,
      city: `${item.district}, ${item.city}`,
      startingPrice: item.price,
      rating: item.rating,
      imageUrl: item.imageUrl,
    })),
  };
}
