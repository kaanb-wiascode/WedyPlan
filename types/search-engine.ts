import { PortalType } from '@/types/auth-core';

export type SearchDomain = 
  | 'GLOBAL' 
  | 'VENDOR' 
  | 'WEDDING' 
  | 'CUSTOMER' 
  | 'CONTRACT' 
  | 'DOCUMENT';

export interface GeoLocationQuery {
  latitude: number;
  longitude: number;
  radiusInKm: number;
}

export interface SearchFacet {
  field: string;
  label: string;
  options: { value: string; label: string; count: number }[];
}

export interface UniversalSearchQuery {
  query: string;
  domains?: SearchDomain[];
  portalContext: PortalType;
  page?: number;
  limit?: number;
  geoQuery?: GeoLocationQuery;
  filters?: Record<string, string | number | boolean | string[]>;
  isSemantic?: boolean;
  isVoiceInput?: boolean;
  sortBy?: 'RELEVANCE' | 'DATE_DESC' | 'PRICE_LOW' | 'PRICE_HIGH' | 'RATING_DESC';
}

export interface SearchResultItem {
  id: string;
  domain: SearchDomain;
  title: string;
  subtitle?: string;
  description?: string;
  url: string;
  imageUrl?: string;
  score: number;
  metadata?: Record<string, unknown>;
  highlights?: Record<string, string[]>;
}

export interface UniversalSearchResponse {
  query: string;
  totalHits: number;
  executionMs: number;
  page: number;
  limit: number;
  results: SearchResultItem[];
  facets: SearchFacet[];
  didYouMeanSuggestions?: string[];
  semanticInsights?: string;
}

export interface SearchSuggestionItem {
  text: string;
  domain: SearchDomain;
  categoryLabel: string;
  targetUrl: string;
}

export interface SavedSearchPayload {
  id: string;
  userId: string;
  title: string;
  query: UniversalSearchQuery;
}