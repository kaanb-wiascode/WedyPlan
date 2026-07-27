export type PortalType = 'PUBLIC' | 'COUPLE' | 'VENDOR' | 'ADMIN';

export type UserStatus = 'ACTIVE' | 'SUSPENDED' | 'PENDING_VERIFICATION';

export interface JwtAccessTokenPayload {
  sub: string;            // User ID
  email: string;
  fullName: string;
  activePortal: PortalType;
  roles: string[];        // Assigned roles in current active portal
  permissions: string[];  // Flattened permission codes
  sessionId: string;      // Associated Session ID for instant revocation check
  iat: number;            // Issued At
  exp: number;            // Expiration
}

export interface JwtRefreshTokenPayload {
  sub: string;
  sessionId: string;
  tokenFamily: string;
  iat: number;
  exp: number;
}

export interface DeviceInfo {
  ipAddress: string;
  userAgent: string;
  deviceOs?: string;
  browser?: string;
}

export interface AuthSession {
  sessionId: string;
  userId: string;
  portalContext: PortalType;
  deviceInfo: DeviceInfo;
  isRevoked: boolean;
  createdAt: Date;
  expiresAt: Date;
}

export interface OAuthNormalizedUser {
  provider: 'google' | 'apple';
  providerAccountId: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  isEmailVerified: boolean;
}