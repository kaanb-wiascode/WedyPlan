import { jwtVerify, SignJWT, decodeJwt } from 'jose';

const DEVELOPMENT_JWT_SECRET = 'wedyplan-development-secret-change-before-production';

function getJwtSecret(): Uint8Array {
  const configuredSecret = process.env.JWT_SECRET?.trim();

  if (configuredSecret) {
    return new TextEncoder().encode(configuredSecret);
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET production ortamında zorunludur.');
  }

  return new TextEncoder().encode(DEVELOPMENT_JWT_SECRET);
}

/**
 * Custom JWT Payload type (renamed to avoid conflict with jose)
 */
export interface WedyJWTPayload {
  userId: string;
  email: string;
  role: 'ADMIN' | 'VENDOR' | 'COUPLE';
  portalContext: string;
  [key: string]: any;
}

/**
 * JWT Token oluştur
 */
export async function createToken(payload: WedyJWTPayload): Promise<string> {
  const token = await new SignJWT(payload as Record<string, any>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getJwtSecret());

  return token;
}

/**
 * JWT Token doğrula
 */
export async function verifyToken(token: string): Promise<WedyJWTPayload | null> {
  try {
    const verified = await jwtVerify(token, getJwtSecret());
    return verified.payload as unknown as WedyJWTPayload;
  } catch {
    return null;
  }
}

/**
 * Refresh Token oluştur (long-lived)
 */
export async function createRefreshToken(userId: string): Promise<string> {
  const token = await new SignJWT({ userId } as Record<string, any>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(secret);

  return token;
}

/**
 * Token'dan süre dolma zamanını al (Edge Runtime & Vercel Uyumlu)
 */
export function getTokenExpiration(token: string): Date | null {
  try {
    const payload = decodeJwt(token);

    if (payload.exp) {
      return new Date(payload.exp * 1000);
    }
    return null;
  } catch {
    return null;
  }
}