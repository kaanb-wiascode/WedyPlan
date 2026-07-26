export type WeddingStyle = 'Bohem' | 'Modern Luxury' | 'Kır Düğünü' | 'Minimalist' | 'Deniz Kenarı' | 'Tarihi Mekan';

export interface DiscoveryVendor {
  id: string;
  name: string;
  category: string;
  city: string;
  district: string;
  priceStart: number;
  rating: number;
  reviewCount: number;
  matchScore: number;
  matchBreakdown: string[];
  imageUrl: string;
  galleryUrls: string[];
  styleTags: WeddingStyle[];
  isVerified: boolean;
  isDeals: boolean;
  capacity: number;
  responseTime: string;
  completedEvents: number;
  coordinates: { lat: number; lng: number };
}

export interface CuratedCollection {
  id: string;
  title: string;
  subtitle: string;
  coverUrl: string;
  itemCount: number;
  themeStyle: WeddingStyle;
}

export interface DiscoveryFilterState {
  searchPrompt: string;
  category: string;
  city: string;
  style: string;
  guestCount: number;
  maxBudget: number;
  verifiedOnly: boolean;
  dealsOnly: boolean;
  minRating: number;
}