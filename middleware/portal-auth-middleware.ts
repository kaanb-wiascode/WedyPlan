import { NextRequest, NextResponse } from 'next/server';
import { JwtService } from '@/lib/auth/jwt-service';
import { PermissionEngine } from '@/lib/auth/permission-engine';
import { AUTH_CONFIG, DEFAULT_PORTAL_REDIRECTS } from '@/lib/auth/auth-constants';
import { PortalType } from '@/types/auth-core';

export async function handlePortalAuthMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Determine requested portal context by route prefix
  let targetPortal: PortalType = 'PUBLIC';
  if (pathname.startsWith('/cift')) targetPortal = 'COUPLE';
  if (pathname.startsWith('/firma') && !pathname.startsWith('/firma-katil')) targetPortal = 'VENDOR';
  if (pathname.startsWith('/admin')) targetPortal = 'ADMIN';

  // Public portal requires no authentication check
  if (targetPortal === 'PUBLIC') {
    return NextResponse.next();
  }

  // Extract token from HttpOnly Cookie or Authorization Header
  const token =
    req.cookies.get(AUTH_CONFIG.COOKIE_NAMES.ACCESS_TOKEN)?.value ||
    req.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    const loginUrl = new URL('/giris', req.url);
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const claims = await JwtService.verifyAccessToken(token);

  if (!claims) {
    // Token invalid or expired -> Redirect to login
    const loginUrl = new URL('/giris', req.url);
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check portal access match
  if (!PermissionEngine.canAccessPortal(claims, targetPortal)) {
    // User logged in, but trying to access unauthorized portal (e.g. Couple accessing Vendor portal)
    const fallbackRedirect = DEFAULT_PORTAL_REDIRECTS[claims.activePortal] || '/giris';
    return NextResponse.redirect(new URL(fallbackRedirect, req.url));
  }

  // Attach verified security context headers for downstream API routes & RSCs
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-user-id', claims.sub);
  requestHeaders.set('x-user-email', claims.email);
  requestHeaders.set('x-portal-context', claims.activePortal);
  requestHeaders.set('x-user-permissions', JSON.stringify(claims.permissions));

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}