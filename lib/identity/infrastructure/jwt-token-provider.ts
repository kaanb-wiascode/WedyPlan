import { SignJWT, jwtVerify } from 'jose';
import { JwtAccessTokenPayload, JwtRefreshTokenPayload } from '../domain/enums';

function secret(name: 'secret('JWT_ACCESS_SECRET')' | 'secret('JWT_REFRESH_SECRET')'): Uint8Array {
  const value = process.env[name]?.trim();
  if (value) return new TextEncoder().encode(value);
  if (process.env.NODE_ENV === 'production') throw new Error(`${name} is required in production`);
  return new TextEncoder().encode(`dev-${name.toLowerCase()}`);
}

export class JwtTokenProvider {
  static async signAccessToken(payload: Omit<JwtAccessTokenPayload, 'iat' | 'exp'>): Promise<string> {
    return new SignJWT({ ...payload })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setIssuedAt()
      .setExpirationTime('15m')
      .sign(secret('JWT_ACCESS_SECRET'));
  }

  static async signRefreshToken(payload: Omit<JwtRefreshTokenPayload, 'iat' | 'exp'>): Promise<string> {
    return new SignJWT({ ...payload })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(secret('JWT_REFRESH_SECRET'));
  }

  static async verifyAccessToken(token: string): Promise<JwtAccessTokenPayload | null> {
    try {
      const { payload } = await jwtVerify(token, secret('JWT_ACCESS_SECRET'));
      return payload as unknown as JwtAccessTokenPayload;
    } catch {
      return null;
    }
  }

  static async verifyRefreshToken(token: string): Promise<JwtRefreshTokenPayload | null> {
    try {
      const { payload } = await jwtVerify(token, secret('JWT_REFRESH_SECRET'));
      return payload as unknown as JwtRefreshTokenPayload;
    } catch {
      return null;
    }
  }
}