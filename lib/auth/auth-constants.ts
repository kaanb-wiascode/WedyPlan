import { PortalType } from '@/types/auth-core';

export const AUTH_CONFIG = {
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'wedyplan-core-access-secret-production-key-32bytes!',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'wedyplan-core-refresh-secret-production-key-32bytes!',
  ACCESS_TOKEN_TTL_SECONDS: 15 * 60, // 15 Dakika
  REFRESH_TOKEN_TTL_SECONDS: 7 * 24 * 60 * 60, // 7 Gün
  COOKIE_NAMES: {
    ACCESS_TOKEN: 'wedy_at',
    REFRESH_TOKEN: 'wedy_rt',
    ACTIVE_PORTAL: 'wedy_portal',
  }
} as const;

// System Permissions Definition Matrix
export const SYSTEM_PERMISSIONS = {
  // Couple Portal Permissions
  COUPLE: {
    BUDGET_READ: 'couple:budget:read',
    BUDGET_WRITE: 'couple:budget:write',
    GUESTS_MANAGE: 'couple:guests:manage',
    TIMELINE_MANAGE: 'couple:timeline:manage',
    CONTRACTS_SIGN: 'couple:contracts:sign',
  },
  // Vendor Portal Permissions (WOS)
  VENDOR: {
    LEADS_READ: 'vendor:leads:read',
    OFFERS_CREATE: 'vendor:offers:create',
    CALENDAR_SYNC: 'vendor:calendar:sync',
    FINANCE_READ: 'vendor:finance:read',
    STAFF_MANAGE: 'vendor:staff:manage',
  },
  // Admin Portal Permissions
  ADMIN: {
    VENDOR_APPROVE: 'admin:vendor:approve',
    USER_BAN: 'admin:user:ban',
    FINANCE_OVERVIEW: 'admin:finance:overview',
    SYSTEM_CONFIG: 'admin:system:config',
  }
} as const;

export const DEFAULT_PORTAL_REDIRECTS: Record<PortalType, string> = {
  PUBLIC: '/',
  COUPLE: '/cift',
  VENDOR: '/firma/talepler',
  ADMIN: '/admin/dashboard',
};