import { AuthSession, DeviceInfo, PortalType } from '@/types/auth-core';
import { AUTH_CONFIG } from './auth-constants';

// In-Memory / Redis Mock Store representation for Session Revocation
const activeSessionsStore = new Map<string, AuthSession>();

export class SessionManager {
  /**
   * Creates a new device session record
   */
  static async createSession(
    userId: string,
    portalContext: PortalType,
    deviceInfo: DeviceInfo,
    refreshTokenHash: string
  ): Promise<AuthSession> {
    const sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const expiresAt = new Date(Date.now() + AUTH_CONFIG.REFRESH_TOKEN_TTL_SECONDS * 1000);

    const session: AuthSession = {
      sessionId,
      userId,
      portalContext,
      deviceInfo,
      isRevoked: false,
      createdAt: new Date(),
      expiresAt,
    };

    activeSessionsStore.set(sessionId, session);
    return session;
  }

  /**
   * Validates if a session is active and not revoked
   */
  static async isSessionValid(sessionId: string): Promise<boolean> {
    const session = activeSessionsStore.get(sessionId);
    if (!session) return false;
    if (session.isRevoked) return false;
    if (new Date() > session.expiresAt) return false;

    return true;
  }

  /**
   * Revokes a specific session (Log out from single device)
   */
  static async revokeSession(sessionId: string): Promise<void> {
    const session = activeSessionsStore.get(sessionId);
    if (session) {
      session.isRevoked = true;
      activeSessionsStore.set(sessionId, session);
    }
  }

  /**
   * Revokes all active sessions for a user across all devices (Security Compromise Recovery)
   */
  static async revokeAllUserSessions(userId: string): Promise<void> {
    activeSessionsStore.forEach((session, key) => {
      if (session.userId === userId) {
        session.isRevoked = true;
        activeSessionsStore.set(key, session);
      }
    });
  }
}