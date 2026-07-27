export interface VendorListingItem {
    id: string;
    name: string;
    category: string;
    categorySlug: string;
    city: string;
    district: string;
    startingPrice: number;
    capacity: number;
    rating: number;
    reviewCount: number;
    aiMatchScore: number;
    imageUrl: string;
    galleryUrls: string[];
    tags: string[];
    isVerified: boolean;
    isFeatured: boolean;
    isAvailable: boolean;
    responseTime: string;
    coordinates: { lat: number; lng: number };
  }
  
  export interface VendorListingFilterState {
    searchQuery: string;
    category: string;
    city: string;
    minPrice: number;
    maxPrice: number;
    minRating: number;
    availabilityOnly: boolean;
    verifiedOnly: boolean;
    sortBy: 'RECOMMENDED' | 'PRICE_LOW' | 'PRICE_HIGH' | 'RATING';
  }