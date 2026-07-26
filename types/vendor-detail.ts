export interface AiMatchCriteria {
    label: string;
    isMatched: boolean;
    description: string;
  }
  
  export interface AiMatchScoreData {
    score: number;
    summary: string;
    criterias: AiMatchCriteria[];
  }
  
  export interface VendorDetailPackage {
    id: string;
    name: string;
    tagline: string;
    price: number;
    features: string[];
    isPopular?: boolean;
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
  
  export interface VendorPortfolioMedia {
    id: string;
    type: 'PHOTO' | 'VIDEO' | 'TOUR_360';
    url: string;
    title: string;
    caption?: string;
  }
  
  export interface VendorDetail {
    id: string;
    companyName: string;
    tagline: string;
    category: string;
    city: string;
    district: string;
    address: string;
    phone: string;
    startingPrice: number;
    rating: number;
    reviewCount: number;
    isVerified: boolean;
    establishedYear: number;
    coverImages: string[];
    logoUrl: string;
    story: string;
    specialties: string[];
    awards: string[];
    aiMatch: AiMatchScoreData;
    packages: VendorDetailPackage[];
    portfolio: VendorPortfolioMedia[];
    reviews: VendorReview[];
    aiReviewSummary: string;
    suggestedAiQuestions: string[];
    similarVendorsIds: string[];
  }