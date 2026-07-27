export interface AiSearchVendor {
    id: string;
    name: string;
    category: string;
    city: string;
    district: string;
    startingPrice: number;
    capacity: number;
    rating: number;
    reviewCount: number;
    matchScore: number;
    matchBreakdown: string[];
    imageUrl: string;
    tags: string[];
    isVerified: boolean;
    isAvailable: boolean;
  }
  
  export interface SuggestedPrompt {
    id: string;
    text: string;
    category: string;
  }
  
  export interface AiSearchFilterState {
    prompt: string;
    category: string;
    city: string;
    maxBudget: number;
    minCapacity: number;
    verifiedOnly: boolean;
    minRating: number;
  }
  
  export interface AiRecommendationInsight {
    querySummary: string;
    matchedCount: number;
    topMatchesReason: string;
    budgetAdvice: string;
  }
  
  export interface AiSearchFaqItem {
    id: string;
    question: string;
    answer: string;
  }