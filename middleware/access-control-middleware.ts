import { NextRequest, NextResponse } from 'next/server';
import { JwtTokenProvider } from '@/lib/identity/infrastructure/jwt-token-provider';
import { AccessControlEngine } from '@/lib/access-control/application/access-control.engine';

export async function accessControlMiddleware(req: NextRequest) {
  const token =
    req.cookies.get('wedy_access_token')?.value ||
    req.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized: Missing token' }, { status: 401 });
  }

  const claims = await JwtTokenProvider.verifyAccessToken(token);

  if (!claims) {
    return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
  }

  // Extract Route & Action from URL pathname
  const pathname = req.nextUrl.pathname;
  const method = req.method;

  let action: any = 'VIEW';
  if (method === 'POST') action = 'CREATE';
  if (method === 'PUT' || method === 'PATCH') action = 'UPDATE';
  if (method === 'DELETE') action = 'DELETE';

  const evaluation = await AccessControlEngine.evaluateAccess({
    userId: claims.sub,
    roles: claims.roles as any,
    portalContext: claims.activePortal as any,
    resource: pathname.split('/')[3] || 'general',
    action,
    ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
    userAgent: req.headers.get('user-agent') || ''
  });

  if (!evaluation.isAllowed) {
    return NextResponse.json(
      { error: 'Forbidden: Access Denied', reason: evaluation.reason },
      { status: 403 }
    );
  }

  const response = NextResponse.next();
  response.headers.set('x-access-granted-by', evaluation.grantedBy);
  return response;
}