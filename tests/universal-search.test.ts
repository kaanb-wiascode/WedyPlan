import { describe, it } from 'node:test';
import assert from 'node:assert';
import { EnterpriseSearchService } from '../lib/search/application/enterprise-search.service';
import { SynonymFuzzyEngine } from '../lib/search/infrastructure/synonym-fuzzy.engine';
import { RankingEngine } from '../lib/search/application/ranking-engine';

describe('Phase 03: Universal Search Platform Test Suite', () => {
  it('should expand synonyms and correct Turkish typos', () => {
    const typoResult = SynonymFuzzyEngine.correctTypo('dıgün mekanları');
    assert.strictEqual(typoResult.isCorrected, true);
    assert.strictEqual(typoResult.correctedText, 'düğün mekanları');

    const synonyms = SynonymFuzzyEngine.expandSynonyms('mekan');
    assert.ok(synonyms.includes('salon'));
    assert.ok(synonyms.includes('otel'));
  });

  it('should rank search hits and apply RBAC security filtering', () => {
    const mockHits: any[] = [
      { id: '1', source: 'VENDOR', score: 80, metadata: { isPublic: true } },
      { id: '2', source: 'CONTRACT', score: 90, metadata: { isPublic: false } }
    ];

    // Public User Search -> Private CONTRACT hit must be stripped
    const publicResults = RankingEngine.rankAndScoreHits(mockHits, ['VISITOR']);
    assert.strictEqual(publicResults.length, 1);
    assert.strictEqual(publicResults[0].source, 'VENDOR');

    // Super Admin Search -> All hits preserved
    const adminResults = RankingEngine.rankAndScoreHits(mockHits, ['SUPER_ADMINISTRATOR']);
    assert.strictEqual(adminResults.length, 2);
  });

  it('should execute hybrid search and return structured facets', async () => {
    const response = await EnterpriseSearchService.query({
      query: 'kır bahçesi',
      portalContext: 'PUBLIC',
      sources: ['VENDOR']
    });

    assert.ok(response.totalHits > 0);
    assert.strictEqual(response.searchType, 'HYBRID');
    assert.ok(response.facets.length > 0);
  });
});