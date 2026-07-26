export type PartnerBadge = 'VERIFIED_PARTNER' | 'PREMIUM_PARTNER' | 'ELITE_PARTNER';

export interface BasicCompanyInfo {
  companyName: string;
  category: string;
  authorizedPerson: string;
  phone: string;
  email: string;
  website?: string;
  instagram?: string;
}

export interface ServiceDetailInfo {
  primaryCategory: string;
  subServices: string[];
  maxGuestCapacity?: number;
  hasIndoorSpace?: boolean;
  hasOutdoorSpace?: boolean;
}

export interface LocationInfo {
  city: string;
  district: string;
  serviceRegions: string[];
  fullAddress: string;
}

export interface PortfolioInfo {
  coverPhotoUrl: string;
  galleryUrls: string[];
  awardsAndCertificates: string[];
}

export interface BusinessDetailInfo {
  startingPrice: number;
  minimumBudget: number;
  monthlyCapacity: number;
}

export interface VendorOnboardingFormData {
  basic: BasicCompanyInfo;
  services: ServiceDetailInfo;
  location: LocationInfo;
  portfolio: PortfolioInfo;
  business: BusinessDetailInfo;
}

export interface AiQualityRecommendation {
  type: 'CRITICAL' | 'WARNING' | 'OPTIMIZATION';
  title: string;
  actionText: string;
  scoreImpact: number;
}

export interface AiQualityScoreResult {
  score: number; // 0-100
  badge: PartnerBadge;
  seoScore: number;
  predictedMonthlyLeads: number;
  recommendations: AiQualityRecommendation[];
}

export interface PartnerPlan {
  id: 'starter' | 'professional' | 'enterprise';
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  isPopular?: boolean;
  badgeGranted: PartnerBadge;
  features: string[];
}