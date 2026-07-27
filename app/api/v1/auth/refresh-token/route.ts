import { NextRequest, NextResponse } from 'next/server';
import { JwtTokenProvider } from '@/lib/identity/infrastructure/jwt-token-provider';

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get('wedy_refresh_token')?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: 'Missing refresh token' }, { status: 401 });
  }

  const refreshClaims = await JwtTokenProvider.verifyRefreshToken(refreshToken);

  if (!refreshClaims) {
    return NextResponse.json({ error: 'Invalid or expired refresh token' }, { status: 401 });
  }

  // Generate new Access and Refreshed Token (Token Rotation)
  const newAccessToken = await JwtTokenProvider.signAccessToken({
    sub: refreshClaims.sub,
    email: 'user@wedyplan.com',
    fullName: 'Verified User',
    activePortal: 'COUPLE',
    roles: ['COUPLE'],
    permissions: ['wedding:budget:write'],
    sessionId: refreshClaims.sessionId,
  });

  const newRefreshToken = await JwtTokenProvider.signRefreshToken({
    sub: refreshClaims.sub,
    sessionId: refreshClaims.sessionId,
    tokenFamily: refreshClaims.tokenFamily,
  });

  const res = NextResponse.json({ success: true, accessToken: newAccessToken });
  res.cookies.set('wedy_access_token', newAccessToken, { httpOnly: true, secure: true, sameSite: 'strict' });
  res.cookies.set('wedy_refresh_token', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });

  return res;
}