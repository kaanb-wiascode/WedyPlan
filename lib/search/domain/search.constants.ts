import { SearchDomainSource } from '@/types/enterprise-search';

export const ENTERPRISE_SEARCH_CONFIG = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  HYBRID_ALPHA_WEIGHT: 0.6, // 60% Keyword Relevancy + 40% Semantic Vector
  MAX_SUGGESTIONS_LIMIT: 8,

  SOURCE_RELEVANCY_WEIGHTS: {
    VENDOR: 1.5,
    CONTRACT: 1.4,
    COUPLE: 1.3,
    CAMPAIGN: 1.2,
    ARTICLE: 1.1,
    FAQ: 1.0,
    USER: 1.0,
    ORGANIZATION: 1.0,
    PAYMENT: 1.0,
    DOCUMENT: 1.0,
    MESSAGE: 0.9,
    SUPPORT_TICKET: 0.9,
    REVIEW: 0.9,
    CATEGORY: 0.8,
    AI_KNOWLEDGE_BASE: 0.8
  } as Record<SearchDomainSource, number>
} as const;