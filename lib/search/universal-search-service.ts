import { prisma } from '@/lib/db';
import type {
  SearchDomain,
  SearchResultItem,
  SearchSuggestionItem,
  SavedSearchPayload,
  UniversalSearchQuery,
  UniversalSearchResponse,
} from '@/types/search-engine';
import type { JwtAccessTokenPayload } from '@/types/auth-core';
import { SemanticSearchEngine } from './semantic-search-engine';
import { SearchAnalyticsService } from './search-analytics-service';
import { SEARCH_CONFIG } from './search-constants';

const DOMAIN_SOURCES: Record<SearchDomain, string[]> = {
  GLOBAL: [],
  VENDOR: ['VENDOR', 'REVIEW', 'CATEGORY'],
  WEDDING: ['COUPLE'],
  CUSTOMER: ['USER', 'ORGANIZATION'],
  CONTRACT: ['CONTRACT'],
  DOCUMENT: ['DOCUMENT', 'ARTICLE', 'FAQ', 'AI_KNOWLEDGE_BASE'],
};

const SOURCE_DOMAIN: Record<string, SearchDomain> = {
  VENDOR: 'VENDOR',
  REVIEW: 'VENDOR',
  CATEGORY: 'VENDOR',
  COUPLE: 'WEDDING',
  USER: 'CUSTOMER',
  ORGANIZATION: 'CUSTOMER',
  CONTRACT: 'CONTRACT',
  DOCUMENT: 'DOCUMENT',
  ARTICLE: 'DOCUMENT',
  FAQ: 'DOCUMENT',
  AI_KNOWLEDGE_BASE: 'DOCUMENT',
  PAYMENT: 'GLOBAL',
  MESSAGE: 'GLOBAL',
  SUPPORT_TICKET: 'GLOBAL',
  CAMPAIGN: 'GLOBAL',
};

function metadataRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return value as Record<string, unknown>;
}

function metadataString(
  metadata: Record<string, unknown>,
  key: string,
): string | undefined {
  const value = metadata[key];
  return typeof value === 'string' && value.trim() ? value : undefined;
}

function fallbackUrl(entityType: string, entityId: string) {
  switch (entityType) {
    case 'VENDOR':
      return `/firmalar/${entityId}`;
    case 'CONTRACT':
      return '/cift/odeme';
    case 'COUPLE':
      return '/cift/dashboard';
    case 'FAQ':
      return '/sss';
    default:
      return '/arama';
  }
}

function requestedSources(domains?: SearchDomain[]) {
  if (!domains?.length || domains.includes('GLOBAL')) return [];
  return Array.from(
    new Set(domains.flatMap((domain) => DOMAIN_SOURCES[domain] || [])),
  );
}

export class UniversalSearchService {
  static async query(
    searchQuery: UniversalSearchQuery,
    userClaims?: JwtAccessTokenPayload | null,
  ): Promise<UniversalSearchResponse> {
    const startTime = Date.now();
    let queryText = searchQuery.query.trim();

    if (searchQuery.isVoiceInput) {
      queryText = SemanticSearchEngine.normalizeVoiceTranscript(queryText);
    }

    let results: SearchResultItem[] = [];

    if (searchQuery.isSemantic && queryText) {
      try {
        const queryVector =
          await SemanticSearchEngine.generateEmbedding(queryText);
        results = await SemanticSearchEngine.searchByVector(
          queryVector,
          searchQuery,
        );
      } catch (error) {
        console.warn(
          'Semantic search unavailable; falling back to indexed text search.',
          error,
        );
        results = await this.executeFullTextQuery(
          queryText,
          searchQuery,
          userClaims,
        );
      }
    } else {
      results = await this.executeFullTextQuery(
        queryText,
        searchQuery,
        userClaims,
      );
    }

    if (userClaims?.sub && queryText) {
      await prisma.searchHistory
        .create({
          data: {
            userId: userClaims.sub,
            portalContext: searchQuery.portalContext,
            queryText,
            domainSource:
              searchQuery.domains?.[0] === 'CONTRACT'
                ? 'CONTRACT'
                : searchQuery.domains?.[0] === 'DOCUMENT'
                  ? 'DOCUMENT'
                  : 'VENDOR',
            resultCount: results.length,
          },
        })
        .catch(() => null);
    }

    const executionMs = Date.now() - startTime;

    await SearchAnalyticsService.logQuery(
      queryText,
      searchQuery.domains?.[0] || 'GLOBAL',
      executionMs,
      results.length,
      userClaims?.sub,
    );

    return {
      query: queryText,
      totalHits: results.length,
      executionMs,
      page: searchQuery.page || 1,
      limit: searchQuery.limit || SEARCH_CONFIG.DEFAULT_PAGE_SIZE,
      results,
      facets: [
        {
          field: 'domain',
          label: 'Kategori',
          options: [
            {
              value: 'VENDOR',
              label: 'Firmalar & Mekanlar',
              count: results.filter((result) => result.domain === 'VENDOR').length,
            },
            {
              value: 'CONTRACT',
              label: 'Sözleşmeler',
              count: results.filter((result) => result.domain === 'CONTRACT').length,
            },
            {
              value: 'DOCUMENT',
              label: 'Dokümanlar',
              count: results.filter((result) => result.domain === 'DOCUMENT').length,
            },
          ],
        },
      ],
      didYouMeanSuggestions:
        results.length === 0 ? ['Kır Bahçesi', 'Düğün Salonu İstanbul'] : undefined,
    };
  }

  static async getSuggestions(
    partialQuery: string,
    portalContext: string,
  ): Promise<SearchSuggestionItem[]> {
    const query = partialQuery.trim();
    if (query.length < 2) return [];

    const rows = await prisma.searchIndexRegistry.findMany({
      where: {
        syncStatus: 'INDEXED',
        ...(portalContext === 'PUBLIC' ? { isPublic: true } : {}),
        OR: [
          { documentTitle: { contains: query, mode: 'insensitive' } },
          { documentContent: { contains: query, mode: 'insensitive' } },
        ],
      },
      orderBy: {
        popularityScore: 'desc',
      },
      take: SEARCH_CONFIG.MAX_SUGGESTIONS_LIMIT,
    });

    return rows.map((row) => {
      const metadata = metadataRecord(row.metadata);
      const domain = SOURCE_DOMAIN[row.entityType] || 'GLOBAL';

      return {
        text: row.documentTitle,
        domain,
        categoryLabel:
          metadataString(metadata, 'categoryLabel') ||
          (domain === 'VENDOR' ? 'Firma' : 'Arama Sonucu'),
        targetUrl:
          metadataString(metadata, 'url') ||
          fallbackUrl(row.entityType, row.entityId),
      };
    });
  }

  private static async executeFullTextQuery(
    queryText: string,
    searchQuery: UniversalSearchQuery,
    userClaims?: JwtAccessTokenPayload | null,
  ): Promise<SearchResultItem[]> {
    if (!queryText) return [];

    const sources = requestedSources(searchQuery.domains);
    const tokens = queryText
      .toLocaleLowerCase('tr-TR')
      .split(/\s+/)
      .map((token) => token.trim())
      .filter((token) => token.length >= 2)
      .slice(0, 12);

    const rows = await prisma.searchIndexRegistry.findMany({
      where: {
        syncStatus: 'INDEXED',
        ...(sources.length
          ? { entityType: { in: sources as never[] } }
          : {}),
        OR: [
          { documentTitle: { contains: queryText, mode: 'insensitive' } },
          { documentContent: { contains: queryText, mode: 'insensitive' } },
          ...(tokens.length ? [{ keywords: { hasSome: tokens } }] : []),
        ],
        AND: [
          userClaims?.sub
            ? {
                OR: [
                  { isPublic: true },
                  { ownerUserId: userClaims.sub },
                ],
              }
            : { isPublic: true },
        ],
      },
      orderBy: {
        popularityScore: 'desc',
      },
      take: Math.min(
        SEARCH_CONFIG.MAX_PAGE_SIZE,
        Math.max(searchQuery.limit || SEARCH_CONFIG.DEFAULT_PAGE_SIZE, 20),
      ),
    });

    const page = Math.max(1, searchQuery.page || 1);
    const limit = Math.min(
      SEARCH_CONFIG.MAX_PAGE_SIZE,
      Math.max(1, searchQuery.limit || SEARCH_CONFIG.DEFAULT_PAGE_SIZE),
    );
    const start = (page - 1) * limit;

    return rows.slice(start, start + limit).map((row) => {
      const metadata = metadataRecord(row.metadata);
      const domain = SOURCE_DOMAIN[row.entityType] || 'GLOBAL';

      return {
        id: row.entityId,
        domain,
        title: row.documentTitle,
        subtitle: metadataString(metadata, 'subtitle'),
        description: row.documentContent,
        url:
          metadataString(metadata, 'url') ||
          fallbackUrl(row.entityType, row.entityId),
        imageUrl: metadataString(metadata, 'imageUrl'),
        score: Math.round(Math.min(100, Math.max(1, row.popularityScore * 10))),
        metadata: {
          ...metadata,
          searchIndexId: row.id,
        },
      };
    });
  }

  static async getRecentSearches(userId: string): Promise<string[]> {
    const rows = await prisma.searchHistory.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20,
      select: { queryText: true },
    });

    return Array.from(new Set(rows.map((row) => row.queryText))).slice(0, 5);
  }

  static async saveSearch(
    userId: string,
    title: string,
    query: UniversalSearchQuery,
  ): Promise<SavedSearchPayload> {
    const saved = await prisma.savedSearchQuery.create({
      data: {
        userId,
        title,
        queryText: query.query,
        filtersJson: {
          domains: query.domains,
          portalContext: query.portalContext,
          page: query.page,
          limit: query.limit,
          geoQuery: query.geoQuery,
          filters: query.filters,
          isSemantic: query.isSemantic,
          isVoiceInput: query.isVoiceInput,
          sortBy: query.sortBy,
        },
      },
    });

    return {
      id: saved.id,
      userId: saved.userId,
      title: saved.title,
      query,
    };
  }
}
