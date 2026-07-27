import { NextRequest, NextResponse } from 'next/server';
import { JwtTokenProvider } from '@/lib/identity/infrastructure/jwt-token-provider';

export async function identityGuardMiddleware(req: NextRequest) {
  const token =
    req.cookies.get('wedy_access_token')?.value ||
    req.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized: Missing token' }, { status: 401 });
  }

  const claims = await JwtTokenProvider.verifyAccessToken(token);

  if (!claims) {
    return NextResponse.json({ error: 'Unauthorized: Invalid or expired token' }, { status: 401 });
  }

  const response = NextResponse.next();
  response.headers.set('x-user-id', claims.sub);
  response.headers.set('x-user-email', claims.email);
  response.headers.set('x-[#portal]', claims.activePortal);
  response.headers.set('x-user-permissions', JSON.stringify(claims.permissions));

  return response;
}