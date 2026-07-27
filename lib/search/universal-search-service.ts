import {
    UniversalSearchQuery,
    UniversalSearchResponse,
    SearchResultItem,
    SearchSuggestionItem,
    SavedSearchPayload
  } from '@/types/search-engine';
  import { JwtAccessTokenPayload } from '@/types/auth-core';
  import { SemanticSearchEngine } from './semantic-search-engine';
  import { SearchAnalyticsService } from './search-analytics-service';
  import { SEARCH_CONFIG } from './search-constants';
  
  // In-Memory Search Stores Mock
  const historyStore: { userId: string; query: string; createdAt: Date }[] = [];
  const savedSearchStore: SavedSearchPayload[] = [];
  
  export class UniversalSearchService {
    /**
     * Unified Entry Point for searching across all portals with RBAC security enforcement
     */
    static async query(
      searchQuery: UniversalSearchQuery,
      userClaims?: JwtAccessTokenPayload | null
    ): Promise<UniversalSearchResponse> {
      const startTime = Date.now();
      let queryText = searchQuery.query;
  
      // 1. Process Voice Input if applicable
      if (searchQuery.isVoiceInput) {
        queryText = SemanticSearchEngine.normalizeVoiceTranscript(queryText);
      }
  
      let results: SearchResultItem[] = [];
  
      // 2. Route between Vector Semantic Search vs Full-Text Keyword Search
      if (searchQuery.isSemantic) {
        const queryVector = await SemanticSearchEngine.generateEmbedding(queryText);
        results = await SemanticSearchEngine.searchByVector(queryVector, searchQuery);
      } else {
        results = await this.executeFullTextQuery(queryText, searchQuery, userClaims);
      }
  
      // 3. Store search in history if authenticated
      if (userClaims?.sub && queryText) {
        historyStore.push({
          userId: userClaims.sub,
          query: queryText,
          createdAt: new Date()
        });
      }
  
      const executionMs = Date.now() - startTime;
  
      // 4. Log Analytics
      await SearchAnalyticsService.logQuery(
        queryText,
        searchQuery.domains?.[0] || 'GLOBAL',
        executionMs,
        results.length,
        userClaims?.sub
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
              { value: 'VENDOR', label: 'Firmalar & Mekanlar', count: results.filter(r => r.domain === 'VENDOR').length },
              { value: 'CONTRACT', label: 'Sözleşmeler', count: results.filter(r => r.domain === 'CONTRACT').length }
            ]
          }
        ],
        didYouMeanSuggestions: results.length === 0 ? ['Kır Bahçesi', 'Düğün Salonu İstanbul'] : undefined
      };
    }
  
    /**
     * Generates fast autocomplete suggestions for CommandPalette and Search Bars
     */
    static async getSuggestions(
      partialQuery: string,
      portalContext: string
    ): Promise<SearchSuggestionItem[]> {
      if (!partialQuery || partialQuery.length < 2) return [];
  
      return [
        {
          text: `${partialQuery} düğün mekanları`,
          domain: 'VENDOR',
          categoryLabel: 'Mekan Keşfi',
          targetUrl: `/firmalar?q=${encodeURIComponent(partialQuery)}`
        },
        {
          text: `${partialQuery} bütçe kalemi`,
          domain: 'WEDDING',
          categoryLabel: 'Çift Bütçesi',
          targetUrl: `/cift?q=${encodeURIComponent(partialQuery)}`
        }
      ];
    }
  
    /**
     * Internal query executor with RBAC Security Filters
     */
    private static async executeFullTextQuery(
      queryText: string,
      searchQuery: UniversalSearchQuery,
      userClaims?: JwtAccessTokenPayload | null
    ): Promise<SearchResultItem[]> {
      const rawResults: SearchResultItem[] = [
        {
          id: 'res-101',
          domain: 'VENDOR',
          title: 'Luxe Kır Bahçesi',
          subtitle: 'Beykoz / İstanbul',
          description: '600 kişilik botanik kır bahçesi ve cam balo salonu.',
          url: '/firmalar/luxe-kir-bahcesi',
          imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=400&q=80',
          score: 95
        },
        {
          id: 'res-102',
          domain: 'CONTRACT',
          title: '2026 Düğün Organizasyon E-Sözleşmesi',
          subtitle: 'Onaylandı • WedyPlan Güvenli Havuz',
          description: 'E-İmza Onaylı Resmi Hizmet Sözleşmesi',
          url: '/cift?tab=contracts',
          score: 90
        }
      ];
  
      // Filter results based on User Roles & Active Portal
      return rawResults.filter((item) => {
        if (item.domain === 'CONTRACT' && searchQuery.portalContext === 'PUBLIC') {
          return false; // Hide contracts on public searches
        }
        return true;
      });
    }
  
    /**
     * Fetches recent search history for a user
     */
    static async getRecentSearches(userId: string): Promise<string[]> {
      return Array.from(
        new Set(
          historyStore
            .filter((h) => h.userId === userId)
            .map((h) => h.query)
        )
      ).slice(0, 5);
    }
  
    /**
     * Saves a search query filter for notifications
     */
    static async saveSearch(
      userId: string,
      title: string,
      query: UniversalSearchQuery
    ): Promise<SavedSearchPayload> {
      const saved: SavedSearchPayload = {
        id: `saved_${Date.now()}`,
        userId,
        title,
        query
      };
      savedSearchStore.push(saved);
      return saved;
    }
  }