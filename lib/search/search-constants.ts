import { SearchDomain } from '@/types/search-engine';

export const SEARCH_CONFIG = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  VECTOR_EMBEDDING_DIMENSIONS: 1536, // OpenAI text-embedding-3-small dimension
  MAX_SUGGESTIONS_LIMIT: 8,
  
  DOMAIN_WEIGHTS: {
    VENDOR: 1.5,
    WEDDING: 1.2,
    CONTRACT: 1.4,
    CUSTOMER: 1.1,
    DOCUMENT: 1.0,
    GLOBAL: 1.0,
  } as Record<SearchDomain, number>,

  OPENSEARCH_INDEX_MAP: {
    VENDOR: 'wedyplan_vendors_idx',
    WEDDING: 'wedyplan_weddings_idx',
    CONTRACT: 'wedyplan_contracts_idx',
    CUSTOMER: 'wedyplan_customers_idx',
    DOCUMENT: 'wedyplan_documents_idx',
    GLOBAL: 'wedyplan_global_idx',
  } as Record<SearchDomain, string>
} as const;