import { AuditActionCategory } from '@/types/enterprise-audit';

export const AUDIT_CONFIG = {
  DEFAULT_RETENTION_DAYS: 365,
  METRICS_RETENTION_DAYS: 30,
  ACTIVITY_RETENTION_DAYS: 180,

  SENSITIVE_KEYS_TO_MASK: [
    'password',
    'passwordHash',
    'creditCard',
    'cardNumber',
    'cvv',
    'secret',
    'accessToken',
    'refreshToken',
    'apiKey',
    'identityNumber'
  ],

  CATEGORY_RETENTION_MAP: {
    AUTHENTICATION: 365,
    PERMISSION_CHANGE: 730, // 2 Years Compliance
    PAYMENT: 1825,          // 5 Years Financial Compliance
    CONTRACT: 1825,         // 5 Years Legal Compliance
    SUBSCRIPTION: 365,
    VENDOR_UPDATE: 180,
    CUSTOMER_UPDATE: 180,
    AI_REQUEST: 90,
    MESSAGING: 180,
    DOCUMENT: 365,
    CAMPAIGN: 90,
    SUPPORT_TICKET: 180,
    SYSTEM_ERROR: 365,
    API_REQUEST: 30
  } as Record<AuditActionCategory, number>
} as const;