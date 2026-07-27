import { SubscriptionTier } from '@/types/access-control';

const featureFlagRegistry = new Map<string, { isEnabled: boolean; minTier: SubscriptionTier }>();

// Seed default feature flags
featureFlagRegistry.set('ai_budget_optimizer', { isEnabled: true, minTier: 'PROFESSIONAL' });
featureFlagRegistry.set('whatsapp_automation', { isEnabled: true, minTier: 'ENTERPRISE' });

export class FeatureFlagEngine {
  /**
   * Checks if a feature is enabled globally and for user's subscription tier
   */
  static isFeatureAvailable(featureKey: string, userTier: SubscriptionTier = 'FREE'): boolean {
    const flag = featureFlagRegistry.get(featureKey);
    if (!flag || !flag.isEnabled) return false;

    const tierRank: Record<SubscriptionTier, number> = {
      FREE: 1,
      STARTER: 2,
      PROFESSIONAL: 3,
      ENTERPRISE: 4
    };

    return tierRank[userTier] >= tierRank[flag.minTier];
  }
}