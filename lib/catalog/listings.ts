import {
  CATALOG_CATEGORIES,
  CATALOG_CITIES,
  MAJOR_CITY_SLUGS,
  getCategory,
  getCity,
  type CatalogCategory,
  type CatalogCity,
} from "./taxonomy";
import { imagesForCategory } from "./media";

export type PriceType = "PER_PERSON" | "PACKAGE";

export type CatalogMenu = {
  name: string;
  type: string;
  weekdayPrice: number;
  weekendPrice: number;
};

export type CatalogReview = {
  id: string;
  authorName: string;
  weddingDate: string;
  rating: number;
  comment: string;
};

export type CatalogVendor = {
  id: string;
  slug: string;
  categorySlug: string;
  categoryName: string;
  name: string;
  city: string;
  citySlug: string;
  district: string;
  address: string;
  phone: string;
  whatsapp: string;
  rating: number;
  reviewCount: number;
  capacityMin: number;
  capacityMax: number;
  priceType: PriceType;
  price: number;
  oldPrice: number | null;
  discountPct: number | null;
  campaignDaysLeft: number | null;
  tags: string[];
  imageUrl: string;
  gallery: string[];
  yearsOnPlatform: number;
  responseTime: string;
  story: string;
  features: string[];
  menus: CatalogMenu[];
  reviews: CatalogReview[];
  faqs: { question: string; answer: string }[];
  isVerified: boolean;
};

const VENUE_PREFIX = ["Ada", "Boğaziçi", "Lale", "Nar", "Zeytin", "İncir", "Yalı", "Köşk"];
const VENUE_SUFFIX = ["Bahçe", "Davet Evi", "Kır Bahçesi", "Balo Salonu", "Garden", "Köşk"];
const FIRM_PREFIX = ["Kare", "Lumina", "Noir", "Aura", "Frame", "Velvet", "Nokta", "Sahne"];
const FIRM_SUFFIX = ["Studio", "Atelier", "House", "Collective", "Stories"];

const TAGS_BY_GROUP: Record<string, string[]> = {
  mekanlar: ["Çim zemin", "Menü tadımı", "Geniş otopark", "Açık nikah alanı", "DJ", "Canlı müzik", "Fotoğraf alanı", "Vale"],
  firmalar: ["Drone", "Same-day edit", "Prova dahil", "İkinci çekim", "4K video", "Albüm"],
  moda: ["Özel dikim", "Prova randevusu", "Kiralama", "İmza koleksiyon", "Plus size"],
  organizasyon: ["Konsept süsleme", "Kurulum dahil", "Şehir dışı", "Acil teslim"],
  diger: ["Paket fiyat", "Danışmanlık", "Özel gün"],
};

function hash(input: string) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function pick<T>(list: T[], seed: number) {
  return list[seed % list.length];
}

function money(seed: number, base: number) {
  return Math.round((base + (seed % 40) * (base / 20)) / 10) * 10;
}

function buildVendor(category: CatalogCategory, city: CatalogCity, index: number): CatalogVendor {
  const seed = hash(`${category.slug}-${city.slug}-${index}`);
  const district = pick(city.districts, seed);
  const isVenue = category.isVenue;
  const prefix = pick(isVenue ? VENUE_PREFIX : FIRM_PREFIX, seed);
  const suffix = pick(isVenue ? VENUE_SUFFIX : FIRM_SUFFIX, seed + 3);
  const name = `${prefix} ${district} ${suffix}`;
  const slug = `${prefix}-${district}-${suffix}-${index}`
    .toLocaleLowerCase("tr-TR")
    .replaceAll("ı", "i")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const priceType: PriceType = isVenue ? (seed % 3 === 0 ? "PACKAGE" : "PER_PERSON") : "PACKAGE";
  const base = isVenue ? (priceType === "PER_PERSON" ? 1200 : 180000) : 28000;
  const price = money(seed, base);
  const hasDiscount = seed % 4 !== 0;
  const discountPct = hasDiscount ? 15 + (seed % 25) : null;
  const oldPrice = discountPct ? Math.round(price / (1 - discountPct / 100)) : null;
  const tags = TAGS_BY_GROUP[category.group].filter((_, i) => (seed + i) % 3 !== 0).slice(0, 6);
  const photos = imagesForCategory(category.group, category.slug);
  const imageUrl = pick(photos, seed);
  const gallery = photos.map((_, i) => pick(photos, seed + i + 1)).slice(0, 8);
  const rating = 4.4 + (seed % 6) / 10;
  const reviewCount = 4 + (seed % 48);
  const capMin = isVenue ? 50 + (seed % 8) * 25 : 0;
  const capMax = isVenue ? capMin + 200 + (seed % 6) * 50 : 0;

  return {
    id: `${category.slug}-${city.slug}-${index}`,
    slug,
    categorySlug: category.slug,
    categoryName: category.name,
    name,
    city: city.name,
    citySlug: city.slug,
    district,
    address: `${district} Caddesi No:${10 + (seed % 80)}, ${district} / ${city.name}`,
    phone: `0212 ${400 + (seed % 500)} ${10 + (seed % 80)} ${10 + ((seed * 3) % 80)}`.slice(0, 16),
    whatsapp: "905551112233",
    rating: Number(rating.toFixed(1)),
    reviewCount,
    capacityMin: capMin,
    capacityMax: capMax,
    priceType,
    price,
    oldPrice,
    discountPct,
    campaignDaysLeft: hasDiscount ? 5 + (seed % 20) : null,
    tags,
    imageUrl,
    gallery,
    yearsOnPlatform: 1 + (seed % 8),
    responseTime: seed % 2 === 0 ? "1 saatte cevap verir" : "Aynı gün cevap",
    story: `${name}, ${city.name} ${district} bölgesinde ${category.name.toLocaleLowerCase("tr-TR")} hizmeti sunar. WedyPlan üzerinden teklif, takvim ve sözleşme tek yerden yürür.`,
    features: tags,
    menus: isVenue
      ? [
          { name: "Kokteyl Menü", type: "Kokteyl", weekdayPrice: Math.round(price * 0.75), weekendPrice: price },
          { name: "Yemekli Menü", type: "Yemekli", weekdayPrice: Math.round(price * 1.1), weekendPrice: Math.round(price * 1.45) },
          { name: "Açık Büfe", type: "Açık Büfe", weekdayPrice: Math.round(price * 0.95), weekendPrice: Math.round(price * 1.25) },
        ]
      : [
          { name: "Standart Paket", type: "Paket", weekdayPrice: price, weekendPrice: Math.round(price * 1.15) },
          { name: "Premium Paket", type: "Paket", weekdayPrice: Math.round(price * 1.4), weekendPrice: Math.round(price * 1.65) },
        ],
    reviews: [
      {
        id: `${slug}-r1`,
        authorName: pick(["Elif & Can", "Selin & Kaan", "Deniz & Mert", "Ayşe & Emre"], seed),
        weddingDate: "2026-06-14",
        rating: 5,
        comment: `${district} konumunda ekip çok ilgiliydi. Teklif WedyPlan üzerinden net ilerledi.`,
      },
      {
        id: `${slug}-r2`,
        authorName: pick(["Ceren & Ozan", "İrem & Burak", "Gizem & Arda"], seed + 2),
        weddingDate: "2025-09-20",
        rating: 4,
        comment: "Fiyat-performans dengesi iyiydi, menü tadımı karar vermemizi kolaylaştırdı.",
      },
    ],
    faqs: [
      { question: "Teklif ücretsiz mi?", answer: "Evet. Çiftlerden komisyon veya teklif ücreti alınmaz." },
      { question: "Tarih nasıl kilitlenir?", answer: "Teklif onayından sonra firma panosunda takvim ve sözleşme oluşur." },
    ],
    isVerified: seed % 5 !== 0,
  };
}

export type CatalogFilter = {
  category?: string;
  city?: string;
  search?: string;
  venueOnly?: boolean;
  sortBy?: "RECOMMENDED" | "RATING" | "PRICE_LOW" | "PRICE_HIGH";
  limit?: number;
};

export function getCatalogListings(filter: CatalogFilter = {}): CatalogVendor[] {
  const categories = filter.category
    ? CATALOG_CATEGORIES.filter((c) => c.slug === filter.category)
    : CATALOG_CATEGORIES.filter((c) => (filter.venueOnly ? c.isVenue : true));
  const city = filter.city ? getCity(filter.city) : null;
  const cities = city
    ? [city]
    : CATALOG_CITIES.filter((c) => MAJOR_CITY_SLUGS.includes(c.slug));

  const perCity = city ? (filter.category ? 12 : 2) : filter.category ? 4 : 1;
  let items = categories.flatMap((category) =>
    cities.flatMap((c) => Array.from({ length: perCity }, (_, i) => buildVendor(category, c, i + 1)))
  );

  if (filter.search) {
    const q = filter.search.toLocaleLowerCase("tr-TR");
    items = items.filter(
      (v) =>
        v.name.toLocaleLowerCase("tr-TR").includes(q) ||
        v.district.toLocaleLowerCase("tr-TR").includes(q) ||
        v.categoryName.toLocaleLowerCase("tr-TR").includes(q)
    );
  }

  switch (filter.sortBy) {
    case "RATING":
      items.sort((a, b) => b.rating - a.rating);
      break;
    case "PRICE_LOW":
      items.sort((a, b) => a.price - b.price);
      break;
    case "PRICE_HIGH":
      items.sort((a, b) => b.price - a.price);
      break;
    default:
      items.sort((a, b) => Number(Boolean(b.discountPct)) - Number(Boolean(a.discountPct)) || b.rating - a.rating);
  }

  if (filter.limit) items = items.slice(0, filter.limit);
  return items;
}

export function getCatalogVendor(categorySlug: string, citySlug: string, slug: string) {
  const category = getCategory(categorySlug);
  const city = getCity(citySlug);
  if (!category || !city) return null;
  return (
    Array.from({ length: 12 }, (_, i) => buildVendor(category, city, i + 1)).find((v) => v.slug === slug) ?? null
  );
}

export function getCatalogVendorById(id: string) {
  const category = [...CATALOG_CATEGORIES]
    .sort((a, b) => b.slug.length - a.slug.length)
    .find((c) => id.startsWith(`${c.slug}-`));
  if (!category) return null;
  const rest = id.slice(category.slug.length + 1);
  const city = [...CATALOG_CITIES]
    .sort((a, b) => b.slug.length - a.slug.length)
    .find((c) => rest.startsWith(`${c.slug}-`));
  if (!city) return null;
  const index = Number(rest.slice(city.slug.length + 1));
  if (!Number.isFinite(index) || index < 1) return null;
  return buildVendor(category, city, index);
}

export function similarVendors(vendor: CatalogVendor, limit = 3) {
  return getCatalogListings({ category: vendor.categorySlug, city: vendor.citySlug })
    .filter((v) => v.id !== vendor.id)
    .slice(0, limit);
}

export function catalogCount(categorySlug?: string) {
  const category = categorySlug ? getCategory(categorySlug) : null;
  return category?.vendorCount ?? CATALOG_CATEGORIES.reduce((sum, c) => sum + c.vendorCount, 0);
}
