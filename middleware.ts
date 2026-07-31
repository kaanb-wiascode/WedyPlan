// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';

/**
 * Role'a göre izin verilen rotalar
 */
const PROTECTED_ROUTES: Record<string, string[]> = {
  '/cift': ['COUPLE'],
  '/satici': ['VENDOR'],
  '/admin': ['ADMIN'],
};

/**
 * Auth gerekmeyen public rotalar
 */
const PUBLIC_ROUTES = [
  '/',
  '/giris',
  '/kayit',
  '/sifremi-unuttum',
  '/eposta-dogrulama',
  '/arama',
  '/kategori',
  '/blog',
  '/firmalar',
  '/mekanlar',
  '/api/v1/auth/login',
  '/api/v1/auth/register',
  '/api/v1/auth/forgot-password',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Türkçe → İngilizce uyarı (legacy rotalar)
  if (pathname.startsWith('/budget')) {
    return NextResponse.redirect(new URL('/cift/butce', request.url));
  }
  if (pathname.startsWith('/guests')) {
    return NextResponse.redirect(new URL('/cift/davetliler', request.url));
  }
  if (pathname.startsWith('/checklist')) {
    return NextResponse.redirect(new URL('/cift/gorevler', request.url));
  }
  if (pathname.startsWith('/ai-planner')) {
    return NextResponse.redirect(new URL('/cift/ai-asistan', request.url));
  }
  if (pathname.startsWith('/vendor/dashboard')) {
    return NextResponse.redirect(new URL('/satici', request.url));
  }
  if (pathname.startsWith('/vendor/proposals')) {
    return NextResponse.redirect(new URL('/satici/teklif-hazirla', request.url));
  }

  // 2. Public route ise devam et
  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // 3. Protected route ise token doğrula
  const token = request.cookies.get('wedyplan_session')?.value;

  if (!token) {
    // Token yok ise login'e yönlendir
    return NextResponse.redirect(new URL('/giris', request.url));
  }

  // 4. Token'ı doğrula
  try {
    const payload = await verifyToken(token);

    if (!payload) {
      return NextResponse.redirect(new URL('/giris', request.url));
    }

    // 5. Role check - protected routes için
    const protectedRoute = Object.keys(PROTECTED_ROUTES).find((route) =>
      pathname.startsWith(route)
    );

    if (protectedRoute) {
      const allowedRoles = PROTECTED_ROUTES[protectedRoute];

      if (!allowedRoles.includes(payload.role)) {
        // Yanlış role ise ilgili paneline yönlendir
        if (payload.role === 'COUPLE') {
          return NextResponse.redirect(new URL('/cift', request.url));
        } else if (payload.role === 'VENDOR') {
          return NextResponse.redirect(new URL('/satici', request.url));
        } else if (payload.role === 'ADMIN') {
          return NextResponse.redirect(new URL('/admin', request.url));
        }
      }
    }

    // 6. Request'e user bilgisini ekle
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', payload.userId);
    requestHeaders.set('x-user-email', payload.email);
    requestHeaders.set('x-user-role', payload.role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.redirect(new URL('/giris', request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Tüm path'ler match et, EXCEPT:
     * - api (API routes farklı yerde handled)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
