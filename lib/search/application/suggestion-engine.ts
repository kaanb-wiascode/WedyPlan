import { AutocompleteSuggestionDTO } from '@/types/enterprise-search';

export class SuggestionEngine {
  private static TRENDING_TOPICS: AutocompleteSuggestionDTO[] = [
    { text: 'Kır Bahçesi Düğün Mekanları', source: 'VENDOR', categoryLabel: 'Mekan Keşfi', targetUrl: '/firmalar?q=kir-bahcesi', isTrending: true },
    { text: '2026 Düğün Bütçesi Planlama', source: 'ARTICLE', categoryLabel: 'Rehber', targetUrl: '/rehber/butce-planlama', isTrending: true },
    { text: 'Gelinlik Fiyatları & Modelleri', source: 'VENDOR', categoryLabel: 'Giyim', targetUrl: '/firmalar?q=gelinlik', isTrending: true }
  ];

  /**
   * Generates fast autocomplete and trending search topics
   */
  static getSuggestions(partialQuery: string): AutocompleteSuggestionDTO[] {
    if (!partialQuery || partialQuery.trim().length < 2) {
      return this.TRENDING_TOPICS;
    }

    const cleaned = partialQuery.toLowerCase().trim();

    const matches: AutocompleteSuggestionDTO[] = [
      {
        text: `${cleaned} firmaları`,
        source: 'VENDOR',
        categoryLabel: 'Tedarikçi Keşfi',
        targetUrl: `/firmalar?q=${encodeURIComponent(cleaned)}`
      },
      {
        text: `${cleaned} sözleşme taslağı`,
        source: 'CONTRACT',
        categoryLabel: 'E-Sözleşme',
        targetUrl: `/cift?tab=contracts&q=${encodeURIComponent(cleaned)}`
      }
    ];

    return matches;
  }
}