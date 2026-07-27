export interface VendorPackage {
    id: string;
    name: string;
    tagline: string;
    price: number;
    isPopular?: boolean;
    features: string[];
  }
  
  export interface VendorCampaign {
    id: string;
    title: string;
    discountBadge: string;
    description: string;
    validUntil: string;
  }
  
  export interface VendorReview {
    id: string;
    authorName: string;
    weddingDate: string;
    rating: number;
    comment: string;
    verifiedBooking: boolean;
    photos?: string[];
    vendorReply?: string;
  }
  
  export interface VendorVideo {
    id: string;
    title: string;
    thumbnailUrl: string;
    videoUrl: string;
    duration: string;
  }
  
  export interface VendorDetailFull {
    id: string;
    companyName: string;
    tagline: string;
    category: string;
    city: string;
    district: string;
    address: string;
    phone: string;
    email: string;
    websiteUrl: string;
    instagramUrl: string;
    startingPrice: number;
    capacity: number;
    rating: number;
    reviewCount: number;
    aiMatchScore: number;
    isVerified: boolean;
    establishedYear: number;
    coverImages: string[];
    logoUrl: string;
    story: string;
    specialties: string[];
    awards: string[];
    certificates: string[];
    packages: VendorPackage[];
    campaigns: VendorCampaign[];
    reviews: VendorReview[];
    aiReviewSummary: string;
    videos: VendorVideo[];
    faq: { question: string; answer: string }[];
    suggestedAiQuestions: string[];
    similarVendors: {
      id: string;
      name: string;
      category: string;
      city: string;
      startingPrice: number;
      rating: number;
      imageUrl: string;
    }[];
  }