import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Herkese açık (Public) Sayfalar — Güvenlik kontrolüne takılmamalı
  const publicRoutes = [
    "/",
    "/firmalar",
    "/mekanlar",
    "/gelinlik-modelleri",
    "/ceyiz",
    "/kampanyalar",
    "/blog",
    "/araclar",
    "/hizli-teklif",
    "/giris",
    "/kayit",
    "/firma-katil",
  ];

  // Statik dosyalar veya public rotalar için kontrol yapmadan devam et
  const isPublic = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isPublic) {
    return NextResponse.next();
  }

  // Korunan rotalar (örn. /dashboard, /firma-paneli vb.) için oturum kontrolü
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Aşağıdaki yollar dışındaki tüm isteklerde middleware çalıştır:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public klasöründeki görseller
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};