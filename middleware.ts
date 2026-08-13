import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth/jwt";
import { dashboardPathForRole } from "@/lib/auth/redirects";
import { CATALOG_SLUGS } from "@/lib/catalog/taxonomy";

const AUTH_PAGES = new Set(["/giris", "/login", "/kayit"]);

function isPublicPath(pathname: string) {
  if (pathname.startsWith("/_next")) return true;
  if (pathname.startsWith("/assets")) return true;
  if (pathname.startsWith("/api")) return true;
  if (pathname.startsWith("/firma-katil")) return true;
  if (pathname.includes(".")) return true;
  return false;
}

function isProtectedPath(pathname: string) {
  if (pathname.startsWith("/cift")) return true;
  if (pathname.startsWith("/satici")) return true;
  if (pathname.startsWith("/admin")) return true;
  if (pathname.startsWith("/vendor")) return true;
  // Public vendor storefront lives at /firma/[id]; only portal subpaths are private.
  if (pathname === "/firma" || pathname.startsWith("/firma/")) {
    const rest = pathname.slice("/firma/".length);
    if (!rest) return true;
    const first = rest.split("/")[0];
    const portalSegments = new Set([
      "dashboard",
      "talepler",
      "takvim",
      "sozlesmeler",
      "finans",
      "vitrin",
      "degerlendirmeler",
      "organizasyon",
      "ayarlar",
      "ai-asistan",
    ]);
    return portalSegments.has(first);
  }
  return false;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const firstSegment = pathname.split("/").filter(Boolean)[0];
  if (firstSegment && CATALOG_SLUGS.has(firstSegment) && !pathname.startsWith("/kesfet/")) {
    const url = request.nextUrl.clone();
    url.pathname = `/kesfet${pathname}`;
    return NextResponse.rewrite(url);
  }

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("wedyplan_session")?.value;
  const session = token ? await verifyToken(token) : null;

  if (AUTH_PAGES.has(pathname) && session) {
    return NextResponse.redirect(
      new URL(dashboardPathForRole(session.role), request.url)
    );
  }

  if (isProtectedPath(pathname) && !session) {
    const loginUrl = new URL("/giris", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/admin") && session && session.role !== "ADMIN") {
    return NextResponse.redirect(new URL(dashboardPathForRole(session.role), request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
