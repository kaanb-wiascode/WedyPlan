'use server';

import { InsightMarketplaceEngine } from '@/lib/ai-native/ai-insight-marketplace-engine';
import { publishInsightAssetSchema, subscribeAssetSchema } from '@/lib/validations/ai-insight-marketplace';
import { revalidatePath } from 'next/cache';

// Mock Kurumsal Analitik Varlıklar Kataloğu
let mockAssets = [
  {
    id: 'asset-101',
    title: 'Executive Wedding Revenue 360',
    description: 'Tüm bölge ve kategori bazlı komisyon ve abonelik gelirlerinin 360 derece gerçek zamanlı görünümü.',
    assetType: 'DASHBOARD',
    category: 'REVENUE',
    author: 'WedyPlan Data Team',
    version: '2.4.0',
    rating: 4.9,
    ratingCount: 28,
    subscriberCount: 142,
    isFeatured: true,
    status: 'PUBLISHED',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'asset-102',
    title: 'Vendor Churn Risk & Retention Forecast',
    description: 'Gelecek 6 ay için tedarikçi kaybedilme risklerini AI ile tahminleyen gelişmiş projeksiyon raporu.',
    assetType: 'FORECAST',
    category: 'VENDORS',
    author: 'AI Analytics Lab',
    version: '1.2.0',
    rating: 4.8,
    ratingCount: 19,
    subscriberCount: 89,
    isFeatured: true,
    status: 'PUBLISHED',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'asset-103',
    title: 'Couple Onboarding Funnel KPI Template',
    description: 'Çiftlerin kayıt ve ilk teklif isteme süreçlerindeki darboğazları ölçen hazır KPI metriği şablonu.',
    assetType: 'TEMPLATE',
    category: 'COUPLES',
    author: 'Product Intelligence',
    version: '1.0.1',
    rating: 4.6,
    ratingCount: 12,
    subscriberCount: 54,
    isFeatured: false,
    status: 'PUBLISHED',
    createdAt: new Date().toISOString(),
  },
];

let userSubscriptions = ['asset-101'];

export async function getInsightMarketplaceOverviewAction() {
  const recommendations = InsightMarketplaceEngine.generateRecommendations('FINANCE_LEAD', mockAssets);

  return {
    success: true,
    data: {
      assets: mockAssets,
      subscriptions: userSubscriptions,
      recommendations,
      stats: {
        totalPublishedAssets: mockAssets.length,
        totalSubscribers: mockAssets.reduce((acc, curr) => acc + curr.subscriberCount, 0),
        avgRating: 4.8,
        featuredCount: mockAssets.filter(a => a.isFeatured).length,
      }
    }
  };
}

export async function publishInsightAssetAction(formData: FormData) {
  const rawData = {
    title: String(formData.get('title') || ''),
    description: String(formData.get('description') || ''),
    assetType: String(formData.get('assetType') || ''),
    category: String(formData.get('category') || ''),
    author: String(formData.get('author') || ''),
    version: String(formData.get('version') || '1.0.0'),
    isFeatured: formData.get('isFeatured') === 'true',
  };

  const validated = publishInsightAssetSchema.parse(rawData);

  const newAsset = {
    id: `asset-${Date.now()}`,
    ...validated,
    rating: 5.0,
    ratingCount: 1,
    subscriberCount: 0,
    status: 'PUBLISHED',
    createdAt: new Date().toISOString(),
  };

  mockAssets.unshift(newAsset);
  revalidatePath('/admin/ai-insight-marketplace');
  return { success: true, asset: newAsset };
}

export async function toggleSubscribeAssetAction(assetId: string) {
  const index = userSubscriptions.indexOf(assetId);
  if (index > -1) {
    userSubscriptions.splice(index, 1);
  } else {
    userSubscriptions.push(assetId);
  }

  revalidatePath('/admin/ai-insight-marketplace');
  return { success: true, isSubscribed: userSubscriptions.includes(assetId) };
}