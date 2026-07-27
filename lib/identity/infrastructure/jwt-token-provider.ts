import { SignJWT, jwtVerify } from 'jose';
import { JwtAccessTokenPayload, JwtRefreshTokenPayload } from '../domain/enums';

const JWT_ACCESS_SECRET = new TextEncoder().encode(
  process.env.JWT_ACCESS_SECRET || 'wedyplan-super-secret-access-key-32-bytes-long!'
);

const JWT_REFRESH_SECRET = new TextEncoder().encode(
  process.env.JWT_REFRESH_SECRET || 'wedyplan-super-secret-refresh-key-32-bytes-long!'
);

export class JwtTokenProvider {
  static async signAccessToken(payload: Omit<JwtAccessTokenPayload, 'iat' | 'exp'>): Promise<string> {
    return new SignJWT({ ...payload })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setIssuedAt()
      .setExpirationTime('15m')
      .sign(JWT_ACCESS_SECRET);
  }

  static async signRefreshToken(payload: Omit<JwtRefreshTokenPayload, 'iat' | 'exp'>): Promise<string> {
    return new SignJWT({ ...payload })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(JWT_REFRESH_SECRET);
  }

  static async verifyAccessToken(token: string): Promise<JwtAccessTokenPayload | null> {
    try {
      const { payload } = await jwtVerify(token, JWT_ACCESS_SECRET);
      return payload as unknown as JwtAccessTokenPayload;
    } catch {
      return null;
    }
  }

  static async verifyRefreshToken(token: string): Promise<JwtRefreshTokenPayload | null> {
    try {
      const { payload } = await jwtVerify(token, JWT_REFRESH_SECRET);
      return payload as unknown as JwtRefreshTokenPayload;
    } catch {
      return null;
    }
  }
}