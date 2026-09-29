import { prisma } from '@/lib/db';
import type { SearchDomain } from '@/types/search-engine';

const DOMAIN_SOURCE_MAP: Record<SearchDomain, 'VENDOR' | 'COUPLE' | 'USER' | 'CONTRACT' | 'DOCUMENT'> = {
  GLOBAL: 'VENDOR',
  VENDOR: 'VENDOR',
  WEDDING: 'COUPLE',
  CUSTOMER: 'USER',
  CONTRACT: 'CONTRACT',
  DOCUMENT: 'DOCUMENT',
};

export class SearchAnalyticsService {
  static async logQuery(
    queryText: string,
    domain: SearchDomain,
    executionMs: number,
    resultCount: number,
    userId?: string,
  ): Promise<void> {
    if (!queryText.trim()) return;

    await prisma.searchAnalyticsLog
      .create({
        data: {
          queryText: queryText.trim(),
          domainSource: DOMAIN_SOURCE_MAP[domain],
          executionMs,
          resultCount,
          userId,
        },
      })
      .catch((error: unknown) => {
        console.warn('Search analytics log could not be persisted:', error);
      });
  }

  static async logClickThrough(
    queryText: string,
    clickedResultId: string,
    domain: SearchDomain,
    userId?: string,
  ): Promise<void> {
    if (!queryText.trim() || !clickedResultId.trim()) return;

    await prisma.searchAnalyticsLog
      .create({
        data: {
          queryText: queryText.trim(),
          domainSource: DOMAIN_SOURCE_MAP[domain],
          executionMs: 0,
          resultCount: 0,
          clickedEntityId: clickedResultId,
          userId,
        },
      })
      .catch((error: unknown) => {
        console.warn('Search click analytics could not be persisted:', error);
      });
  }
}
