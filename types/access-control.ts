import { PortalType } from '@/types/auth-core';

// Re-exporting PortalType as PortalScope for access control domain context
export type PortalScope = PortalType;

export type AccessAction =
  | 'VIEW'
  | 'CREATE'
  | 'UPDATE'
  | 'DELETE'
  | 'APPROVE'
  | 'REJECT'
  | 'EXPORT'
  | 'IMPORT'
  | 'ASSIGN'
  | 'TRANSFER'
  | 'ARCHIVE'
  | 'RESTORE'
  | 'MANAGE';

export type AccessScope =
  | 'SYSTEM'
  | 'ORGANIZATION'
  | 'PORTAL'
  | 'MODULE'
  | 'ROUTE'
  | 'API'
  | 'UI'
  | 'FIELD';

export type SystemRoleCode =
  | 'VISITOR'
  | 'REGISTERED_USER'
  | 'COUPLE'
  | 'VENDOR_EMPLOYEE'
  | 'VENDOR_MANAGER'
  | 'VENDOR_OWNER'
  | 'SUPPORT_AGENT'
  | 'MODERATOR'
  | 'FINANCE'
  | 'CONTENT_MANAGER'
  | 'ADMINISTRATOR'
  | 'SUPER_ADMINISTRATOR'
  | 'DEVELOPER'
  | 'SYSTEM';

export type SubscriptionTier = 'FREE' | 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE';

export interface AccessEvaluationRequest {
  userId: string;
  roles: SystemRoleCode[];
  portalContext: PortalScope;
  organizationId?: string;
  subscriptionTier?: SubscriptionTier;
  action: AccessAction;
  resource: string;
  fieldNames?: string[];
  ipAddress?: string;
  userAgent?: string;
}

export interface AccessEvaluationResult {
  isAllowed: boolean;
  reason: string;
  grantedBy: 'SUPER_ADMIN' | 'ROLE_HIERARCHY' | 'DIRECT_PERMISSION' | 'SUBSCRIPTION_TIER' | 'DENIED';
  allowedFields?: string[];
  maskedFields?: string[];
  matchedPermissionCode?: string;
}

export interface UserPermissionContext {
  userId: string;
  roles: SystemRoleCode[];
  inheritedRoles: SystemRoleCode[];
  compiledPermissions: Set<string>;
  deniedPermissions: Set<string>;
  subscriptionTier: SubscriptionTier;
  organizationIds: string[];
}