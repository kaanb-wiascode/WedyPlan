import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Statik dosyalar ve API rotalarını denetimden muaf tut
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/assets') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const sessionCookie =
    request.cookies.get('wedyplan_session')?.value ||
    request.cookies.get('wedyplan_couple_settings')?.value;

  const isAuthPage = pathname === '/giris' || pathname === '/login' || pathname === '/kayit';

  // Oturumu açık kullanıcı giriş sayfasına gitmek isterse dashboard'a yönlendir
  if (isAuthPage && sessionCookie === 'active') {
    return NextResponse.redirect(new URL('/cift/dashboard', request.url));
  }

  // Çift paneli koruması: Oturum çerezi yoksa giriş sayfasına yönlendir
  if (pathname.startsWith('/cift') && !sessionCookie && sessionCookie !== 'active') {
    return NextResponse.redirect(new URL('/giris', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};