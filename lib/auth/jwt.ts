import { jwtVerify, SignJWT, decodeJwt } from 'jose';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-super-secret-key-change-in-production'
);

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
    .sign(secret);

  return token;
}

/**
 * JWT Token doğrula
 */
export async function verifyToken(token: string): Promise<WedyJWTPayload | null> {
  try {
    const verified = await jwtVerify(token, secret);
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