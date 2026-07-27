import { PortalScope } from '../domain/enums';

export interface DeviceInfo {
  ipAddress: string;
  userAgent: string;
  deviceFingerprint?: string;
}

export class SessionEngine {
  /**
   * Evaluates token reuse during Refresh Token Rotation
   * If a revoked or already used token is presented, revokes entire token family!
   */
  static shouldRevokeTokenFamily(isAlreadyRevoked: boolean): boolean {
    return isAlreadyRevoked;
  }

  static createTokenFamilyId(): string {
    return `tf_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
  }
}