import { SignJWT, jwtVerify } from 'jose';
import { JwtAccessTokenPayload, JwtRefreshTokenPayload, PortalType } from '@/types/auth-core';
import { AUTH_CONFIG } from './auth-constants';

const encoder = new TextEncoder();
const secretAccessKey = encoder.encode(AUTH_CONFIG.JWT_ACCESS_SECRET);
const secretRefreshKey = encoder.encode(AUTH_CONFIG.JWT_REFRESH_SECRET);

export class JwtService {
  /**
   * Generates a portal-scoped, short-lived Access Token
   */
  static async generateAccessToken(payload: Omit<JwtAccessTokenPayload, 'iat' | 'exp'>): Promise<string> {
    return new SignJWT({ ...payload })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setIssuedAt()
      .setExpirationTime(`${AUTH_CONFIG.ACCESS_TOKEN_TTL_SECONDS}s`)
      .sign(secretAccessKey);
  }

  /**
   * Generates a long-lived Refresh Token bound to a session
   */
  static async generateRefreshToken(payload: Omit<JwtRefreshTokenPayload, 'iat' | 'exp'>): Promise<string> {
    return new SignJWT({ ...payload })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setIssuedAt()
      .setExpirationTime(`${AUTH_CONFIG.REFRESH_TOKEN_TTL_SECONDS}s`)
      .sign(secretRefreshKey);
  }

  /**
   * Verifies and decodes an Access Token
   */
  static async verifyAccessToken(token: string): Promise<JwtAccessTokenPayload | null> {
    try {
      const { payload } = await jwtVerify(token, secretAccessKey);
      return payload as unknown as JwtAccessTokenPayload;
    } catch {
      return null;
    }
  }

  /**
   * Verifies and decodes a Refresh Token
   */
  static async verifyRefreshToken(token: string): Promise<JwtRefreshTokenPayload | null> {
    try {
      const { payload } = await jwtVerify(token, secretRefreshKey);
      return payload as unknown as JwtRefreshTokenPayload;
    } catch {
      return null;
    }
  }
}