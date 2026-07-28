export interface SeoMetaTags {
    title: string;
    description: string;
    canonicalUrl: string;
    ogType: "website" | "article" | "business";
    ogImage: string;
    twitterCard: "summary_large_image";
    keywords: string[];
  }
  
  export interface JsonLdSchema {
    "@context": "https://schema.org";
    "@type": "EventVenue" | "LocalBusiness" | "Article" | "BreadcrumbList";
    name: string;
    description: string;
    image?: string[];
    address?: {
      "@type": "PostalAddress";
      streetAddress: string;
      addressLocality: string;
      addressCountry: string;
    };
    aggregateRating?: {
      "@type": "AggregateRating";
      ratingValue: number;
      reviewCount: number;
    };
  }
  
  export interface SeoPageHealth {
    url: string;
    pageType: "VENUE" | "VENDOR" | "CITY_LANDING" | "BLOG";
    healthScore: number; // 0-100
    indexingStatus: "INDEXED" | "CRAWLED_NOT_INDEXED" | "PENDING";
    technicalChecks: {
      hasSchema: boolean;
      hasCanonical: boolean;
      hasOpenGraph: boolean;
      hasMobileViewport: boolean;
    };
    targetKeywords: string[];
  }
  
  export class SeoEngine {
    private static STORAGE_KEY = "WEDYPLAN_SEO_METADATA_V1";
  
    /**
     * Sayfa Türü İçin Otomatik Schema.org JSON-LD Üretir
     */
    public static generateJsonLd(type: "VENUE" | "VENDOR", data: any): JsonLdSchema {
      if (type === "VENUE") {
        return {
          "@context": "https://schema.org",
          "@type": "EventVenue",
          name: data.title || "Çırağan Palace Kempinski",
          description: data.description || "İstanbul'da lüks boğaz manzaralı tarihi düğün mekanı.",
          image: [data.imageUrl || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3"],
          address: {
            "@type": "PostalAddress",
            streetAddress: "Çırağan Cad. No:32",
            addressLocality: "Beşiktaş, İstanbul",
            addressCountry: "TR",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: 4.9,
            reviewCount: 128,
          },
        };
      }
  
      return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: data.title || "WedyPlan Tedarikçi Ekibi",
        description: data.description || "Lüks düğün organizasyon ve fotoğrafçılık hizmetleri.",
      };
    }
  
    /**
     * Site Geneli SEO Sağlık Taraması ve Endeks Durumlarını Getirir
     */
    public static async getSeoPagesHealth(): Promise<SeoPageHealth[]> {
      return [
        {
          url: "/venues/istanbul/ciragan-palace",
          pageType: "VENUE",
          healthScore: 98,
          indexingStatus: "INDEXED",
          technicalChecks: {
            hasSchema: true,
            hasCanonical: true,
            hasOpenGraph: true,
            hasMobileViewport: true,
          },
          targetKeywords: ["istanbul tarihi düğün mekanı", "çırağan düğün fiyatı", "boğaz manzaralı düğün"],
        },
        {
          url: "/cities/bodrum-kir-dugunu",
          pageType: "CITY_LANDING",
          healthScore: 94,
          indexingStatus: "INDEXED",
          technicalChecks: {
            hasSchema: true,
            hasCanonical: true,
            hasOpenGraph: true,
            hasMobileViewport: true,
          },
          targetKeywords: ["bodrum kır düğünü mekanları", "lüks bodrum düğünü"],
        },
        {
          url: "/blog/2026-dugun-trendleri-ve-organizasyon-rehberi",
          pageType: "BLOG",
          healthScore: 91,
          indexingStatus: "INDEXED",
          technicalChecks: {
            hasSchema: true,
            hasCanonical: true,
            hasOpenGraph: true,
            hasMobileViewport: true,
          },
          targetKeywords: ["2026 düğün trendleri", "düğün bütçesi nasıl yapılır"],
        },
      ];
    }
  
    /**
     * WedyAI SEO Yazar: İlgili Sayfa İçin Başlık, Meta ve Anahtar Kelime Üretir
     */
    public static generateAiSeoContent(pageTopic: string): {
      title: string;
      metaDescription: string;
      headingStructure: string[];
      suggestedInternalLinks: { anchorText: string; url: string }[];
    } {
      return {
        title: `${pageTopic} | 2026 Fiyatları & WedyAI Rezerve Et`,
        metaDescription: `${pageTopic} için en lüks seçenekleri keşfedin. Doğrulanmış mekanlar, e-imzalı sözleşmeler ve Escrow kapora güvencesi WedyPlan'da.`,
        headingStructure: [
          `H1: ${pageTopic} rehberi ve en popüler mekanlar`,
          `H2: 2026 Düğün Paketi Fiyatları ve Bütçe Analizi`,
          `H2: WedyAI ile En Uygun Tarihi Seçme`,
          `H3: Escrow Kapora ile Güvenli Rezervasyon`,
        ],
        suggestedInternalLinks: [
          { anchorText: "İstanbul Kır Düğünü Mekanları", url: "/cities/istanbul-kir-dugunu" },
          { anchorText: "Düğün Bütçesi Hesaplama", url: "/tools/budget-calculator" },
        ],
      };
    }
  }