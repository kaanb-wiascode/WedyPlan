export const PAYMENT_CONFIG = {
    DEFAULT_CURRENCY: 'TRY',
    DEFAULT_VAT_PERCENT: 20, // Turkey KDV Rate
    DEFAULT_PLATFORM_COMMISSION_PERCENT: 10.0, // 10% Default Marketplace Commission
  
    MAX_FAILED_RETRY_COUNT: 3,
    SUBSCRIPTION_RETRY_BACKOFF_DAYS: [1, 3, 7],
  
    CATEGORY_COMMISSION_RATES: {
      VENUE: 8.0,        // %8
      PHOTOGRAPHY: 12.0,  // %12
      CATERING: 10.0,     // %10
      MUSIC: 10.0,        // %10
      ORGANIZATION: 12.0  // %12
    } as Record<string, number>
  } as const;