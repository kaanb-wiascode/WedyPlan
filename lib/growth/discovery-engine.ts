export type DiscoveryCategory = "VENUE" | "PHOTOGRAPHY" | "DECORATION" | "CATERING" | "MUSIC_DJ";
export type CollectionTag = "TRENDING" | "FEATURED" | "NEARBY" | "LUXURY_COLLECTION" | "BOHEM_VIBES";

export interface VendorDiscoveryCard {
  id: string;
  title: string;
  category: DiscoveryCategory;
  cityLocation: string;
  distanceKm?: number;
  ratingScore: number;
  reviewsCount: number;
  startingPriceText: string;
  imageUrl: string;
  collectionTags: CollectionTag[];
  aiMatchScorePercent: number; // 0-100%
  aiMatchReason: string;
  isEscrowGuaranteed: boolean;
}

export interface CuratedCollection {
  id: string;
  title: string;
  subtitle: string;
  coverImageUrl: string;
  itemCount: number;
  tag: CollectionTag;
}

export class DiscoveryEngine {
  private static STORAGE_KEY = "WEDYPLAN_DISCOVERY_FEED_V1";

  /**
   * Kişiselleştirilmiş Keşif Akışını Getirir
   */
  public static async getPersonalizedFeed(userIntentQuery?: string): Promise<VendorDiscoveryCard[]> {
    return [
      {
        id: "disc_101",
        title: "Çırağan Palace Kempinski",
        category: "VENUE",
        cityLocation: "Beşiktaş, İstanbul",
        distanceKm: 2.4,
        ratingScore: 5.0,
        reviewsCount: 128,
        startingPriceText: "₺150.000 TL'den başlayan",
        imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
        collectionTags: ["FEATURED", "TRENDING", "LUXURY_COLLECTION"],
        aiMatchScorePercent: 98,
        aiMatchReason: "WedyAI Tespiti: Bosphorus Lüks Teması ve 300+ Davetli Bütçenize %98 Mükemmel Uyum.",
        isEscrowGuaranteed: true,
      },
      {
        id: "disc_102",
        title: "Ahenk Çiçekçilik & Bohem Tasarım",
        category: "DECORATION",
        cityLocation: "Kadıköy, İstanbul",
        distanceKm: 6.8,
        ratingScore: 4.9,
        reviewsCount: 84,
        startingPriceText: "₺25.000 TL'den başlayan",
        imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
        collectionTags: ["BOHEM_VIBES", "TRENDING"],
        aiMatchScorePercent: 94,
        aiMatchReason: "Görsel ilham panonuzdaki pastel tonlar ile stili %94 örtüşüyor.",
        isEscrowGuaranteed: true,
      },
      {
        id: "disc_103",
        title: "Bodrum Yalı Düğünü Bahçesi",
        category: "VENUE",
        cityLocation: "Yalıkavak, Bodrum",
        distanceKm: 460,
        ratingScore: 4.95,
        reviewsCount: 62,
        startingPriceText: "₺180.000 TL'den başlayan",
        imageUrl: "https://images.unsplash.com/photo-1544077960-604201fe74bc",
        collectionTags: ["LUXURY_COLLECTION", "FEATURED"],
        aiMatchScorePercent: 91,
        aiMatchReason: "Yaz dönemi açık hava düğünü arayışınız için yüksek öneri skoru.",
        isEscrowGuaranteed: true,
      },
    ];
  }

  /**
   * Editöryal Kürasyon Koleksiyonlarını Getirir
   */
  public static async getCuratedCollections(): Promise<CuratedCollection[]> {
    return [
      {
        id: "coll_1",
        title: "2026 Boğaz Manzaralı Tarihi Mekanlar",
        subtitle: "İstanbul'un en prestijli 10 balo salonu",
        coverImageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
        itemCount: 10,
        tag: "LUXURY_COLLECTION",
      },
      {
        id: "coll_2",
        title: "Ege & Bodrum Kır Düğünü Konseptleri",
        subtitle: "Açık hava ve doğa ile iç içe masalsı mekanlar",
        coverImageUrl: "https://images.unsplash.com/photo-1544077960-604201fe74bc",
        itemCount: 14,
        tag: "BOHEM_VIBES",
      },
    ];
  }

  /**
   * WedyAI Niyet Tespiti (Intent Detection) ve Arama Filtreleyici
   */
  public static detectUserIntent(searchPrompt: string): {
    detectedCategory?: DiscoveryCategory;
    priceTier: "BUDGET" | "PREMIUM" | "LUXURY";
    aiIntentSummary: string;
  } {
    const promptLower = searchPrompt.toLowerCase();
    const isLuxury = promptLower.includes("lüks") || promptLower.includes("çırağan") || promptLower.includes("yalı");

    return {
      detectedCategory: promptLower.includes("foto") ? "PHOTOGRAPHY" : promptLower.includes("çiçek") ? "DECORATION" : "VENUE",
      priceTier: isLuxury ? "LUXURY" : "PREMIUM",
      aiIntentSummary: `Arama Niyeti: ${isLuxury ? "Lüks Segment Düğün Planlaması" : "Premium Tedarikçi Arayışı"} (Eşleşme Oranı %96)`,
    };
  }
}