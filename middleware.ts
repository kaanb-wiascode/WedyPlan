// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. İngilizce Çift Rotasını Türkçe Rotalara Yönlendir
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

  // 2. İngilizce Satıcı Rotasını Türkçe Rotalara Yönlendir
  if (pathname.startsWith('/vendor/dashboard')) {
    return NextResponse.redirect(new URL('/satici', request.url));
  }
  if (pathname.startsWith('/vendor/proposals')) {
    return NextResponse.redirect(new URL('/satici/teklif-hazirla', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/budget/:path*',
    '/guests/:path*',
    '/checklist/:path*',
    '/ai-planner/:path*',
    '/vendor/:path*',
  ],
};