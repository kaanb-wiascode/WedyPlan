export type SystemRoleCode =
  | 'VISITOR'
  | 'CUSTOMER'
  | 'COUPLE'
  | 'VENDOR_STAFF'
  | 'VENDOR_MANAGER'
  | 'VENDOR_OWNER'
  | 'MODERATOR'
  | 'SUPPORT'
  | 'FINANCE'
  | 'ADMIN'
  | 'SUPER_ADMIN'
  | 'DEVELOPER';

export type PortalScope = 'PUBLIC' | 'COUPLE' | 'VENDOR' | 'ADMIN';

export type OAuthProvider = 'google' | 'apple' | 'microsoft';

export interface JwtAccessTokenPayload {
  sub: string;            // User ID
  email: string;
  fullName: string;
  activePortal: PortalScope;
  roles: SystemRoleCode[];
  permissions: string[];  // Database-driven flattened permissions
  sessionId: string;
  iat: number;
  exp: number;
}

export interface JwtRefreshTokenPayload {
  sub: string;
  sessionId: string;
  tokenFamily: string;
  iat: number;
  exp: number;
}