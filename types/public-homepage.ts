export type UserJourneyType = 'COUPLE' | 'VENDOR';

export interface CategoryItem {
  id: string;
  title: string;
  slug: string;
  itemCount: string;
  imageUrl: string;
  iconName: string;
}

export interface FeaturedPublicVendor {
  id: string;
  name: string;
  category: string;
  city: string;
  district: string;
  startingPrice: number;
  rating: number;
  reviewCount: number;
  aiMatchScore: number;
  imageUrl: string;
  isVerified: boolean;
  isSponsor: boolean;
  tags: string[];
}

export interface PlatformFeature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  badge: string;
  colSpan?: string;
}

export interface HowItWorksStep {
  stepNumber: string;
  title: string;
  description: string;
  audience: UserJourneyType;
}

export interface TestimonialItem {
  id: string;
  authorNames: string;
  role: string;
  avatarUrl: string;
  quote: string;
  weddingLocation: string;
  rating: number;
  verifiedBooking: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'GENERAL' | 'COUPLES' | 'VENDORS' | 'AI';
}