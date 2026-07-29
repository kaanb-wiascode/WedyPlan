import { z } from 'zod';

export const publishInsightAssetSchema = z.object({
  title: z.string().min(3, 'Başlık en az 3 karakter olmalıdır'),
  description: z.string().min(10, 'Açıklama en az 10 karakter olmalıdır'),
  assetType: z.enum(['DASHBOARD', 'REPORT', 'KPI', 'METRIC', 'FORECAST', 'TEMPLATE']),
  category: z.enum(['REVENUE', 'VENDORS', 'COUPLES', 'MARKETING', 'OPERATIONS']),
  author: z.string().min(2, 'Yazar bilgisi zorunludur'),
  version: z.string().default('1.0.0'),
  isFeatured: z.boolean().default(false),
});

export const subscribeAssetSchema = z.object({
  assetId: z.string().min(1, 'Asset ID zorunludur'),
  userId: z.string().min(1, 'User ID zorunludur'),
});

export type PublishInsightAssetInput = z.infer<typeof publishInsightAssetSchema>;
export type SubscribeAssetInput = z.infer<typeof subscribeAssetSchema>;