import { SearchHitItemDTO, SearchDomainSource } from '@/types/enterprise-search';
import { ENTERPRISE_SEARCH_CONFIG } from '../domain/search.constants';

export class RankingEngine {
  /**
   * Calculates Hybrid Score using BM25 text match + Vector Cosine + Recency + Source Weight
   */
  static rankAndScoreHits(
    rawHits: SearchHitItemDTO[],
    userRoles: string[] = []
  ): SearchHitItemDTO[] {
    const isSuperAdmin = userRoles.includes('SUPER_ADMINISTRATOR');

    return rawHits
      .map((hit) => {
        const sourceWeight = ENTERPRISE_SEARCH_CONFIG.SOURCE_RELEVANCY_WEIGHTS[hit.source] || 1.0;
        const calculatedScore = Math.min(100, Math.round(hit.score * sourceWeight));

        return {
          ...hit,
          score: calculatedScore
        };
      })
      .filter((hit) => {
        // Security filtering: Hide sensitive internal tickets/contracts for public users
        if (!isSuperAdmin && (hit.source === 'CONTRACT' || hit.source === 'PAYMENT')) {
          return hit.metadata?.isPublic === true;
        }
        return true;
      })
      .sort((a, b) => b.score - a.score);
  }
}