import { PortalScope } from '@/types/access-control';

export type SearchDomainSource =
  | 'VENDOR'
  | 'COUPLE'
  | 'USER'
  | 'ORGANIZATION'
  | 'CONTRACT'
  | 'PAYMENT'
  | 'DOCUMENT'
  | 'CAMPAIGN'
  | 'MESSAGE'
  | 'SUPPORT_TICKET'
  | 'REVIEW'
  | 'CATEGORY'
  | 'ARTICLE'
  | 'FAQ'
  | 'AI_KNOWLEDGE_BASE';

export type SearchType =
  | 'KEYWORD'
  | 'SEMANTIC'
  | 'HYBRID'
  | 'FULL_TEXT'
  | 'GEO'
  | 'VOICE'
  | 'IMAGE';

export interface GeoLocationFilter {
  latitude: number;
  longitude: number;
  radiusInKm: number;
}

export interface EnterpriseSearchQueryDTO {
  query: string;
  sources?: SearchDomainSource[];
  portalContext: PortalScope;
  searchType?: SearchType;
  page?: number;
  limit?: number;
  geoFilter?: GeoLocationFilter;
  filters?: Record<string, string | number | boolean | string[]>;
  sortBy?: 'RELEVANCE' | 'DATE_DESC' | 'POPULARITY_DESC' | 'PRICE_LOW' | 'PRICE_HIGH';
  userId?: string;
  userRoles?: string[];
  organizationId?: string;
}

export interface SearchHitItemDTO {
  id: string;
  source: SearchDomainSource;
  title: string;
  subtitle?: string;
  description?: string;
  url: string;
  imageUrl?: string;
  score: number; // 0-100 Relevancy Score
  highlights?: Record<string, string[]>;
  metadata?: Record<string, unknown>;
}

export interface SearchFacetOption {
  value: string;
  label: string;
  count: number;
}

export interface SearchFacetGroup {
  field: string;
  label: string;
  options: SearchFacetOption[];
}

export interface EnterpriseSearchResponseDTO {
  query: string;
  correctedQuery?: string;
  searchType: SearchType;
  totalHits: number;
  executionMs: number;
  page: number;
  limit: number;
  results: SearchHitItemDTO[];
  facets: SearchFacetGroup[];
  didYouMean?: string[];
}

export interface AutocompleteSuggestionDTO {
  text: string;
  source: SearchDomainSource;
  categoryLabel: string;
  targetUrl: string;
  isTrending?: boolean;
}