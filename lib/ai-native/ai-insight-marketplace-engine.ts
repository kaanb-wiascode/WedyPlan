export interface InsightRecommendation {
    assetId: string;
    relevanceScore: number; // 0 - 100
    recommendationReason: string;
    trendingScore: number;
  }
  
  export class InsightMarketplaceEngine {
    /**
     * Kullanıcının geçmiş rolüne ve kullanım alışkanlıklarına göre en iyi analitik varlıkları önerir.
     */
    static generateRecommendations(
      userRole: string,
      assets: Array<{ id: string; assetType: string; category: string; rating: number; subscriberCount: number }>
    ): InsightRecommendation[] {
      return assets.map((asset) => {
        let score = Math.round(asset.rating * 15 + Math.min(25, asset.subscriberCount / 10));
        let reason = 'Yüksek puan ve abonelik popülaritesi nedeniyle öneriliyor.';
  
        if (userRole === 'FINANCE_LEAD' && asset.category === 'REVENUE') {
          score += 20;
          reason = 'Finans lideri rolünüz için özel gelir analiz panosu.';
        } else if (userRole === 'MARKETING_LEAD' && asset.category === 'MARKETING') {
          score += 20;
          reason = 'Pazarlama dönüşüm analizlerinde en çok kullanılan rapor.';
        }
  
        return {
          assetId: asset.id,
          relevanceScore: Math.min(100, score),
          recommendationReason: reason,
          trendingScore: Number((asset.subscriberCount * 0.12 + asset.rating).toFixed(1)),
        };
      });
    }
  }