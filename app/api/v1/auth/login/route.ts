import { NextRequest, NextResponse } from 'next/server';
import { Argon2Hasher } from '@/lib/identity/infrastructure/argon2-hasher';
import { JwtTokenProvider } from '@/lib/identity/infrastructure/jwt-token-provider';
import { RateLimiter } from '@/lib/identity/infrastructure/rate-limiter';
import { SessionEngine } from '@/lib/identity/shared/session-engine';

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';

  if (RateLimiter.isRateLimited(`login:${ip}`, 5, 60000)) {
    return NextResponse.json({ error: 'Too many login attempts. Please wait.' }, { status: 429 });
  }

  const body = await req.json();
  const { email, password, portalContext } = body;

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }

  // Simulated DB lookup and Argon2 verification
  const mockPasswordHash = await Argon2Hasher.hash('SecurePassword123!');
  const isMatch = await Argon2Hasher.verify(mockPasswordHash, password);

  if (!isMatch) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const tokenFamily = SessionEngine.createTokenFamilyId();
  const sessionId = `sess_${Date.now()}`;

  const accessToken = await JwtTokenProvider.signAccessToken({
    sub: 'usr_109283',
    email,
    fullName: 'Verified User',
    activePortal: portalContext || 'COUPLE',
    roles: ['COUPLE'],
    permissions: ['wedding:budget:write', 'wedding:guests:manage'],
    sessionId,
  });

  const refreshToken = await JwtTokenProvider.signRefreshToken({
    sub: 'usr_109283',
    sessionId,
    tokenFamily,
  });

  const res = NextResponse.json({
    success: true,
    message: 'Authentication successful',
    accessToken,
  });

  res.cookies.set('wedy_access_token', accessToken, { httpOnly: true, secure: true, sameSite: 'strict' });
  res.cookies.set('wedy_refresh_token', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });

  return res;
}