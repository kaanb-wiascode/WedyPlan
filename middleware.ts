import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth/jwt";
import { dashboardPathForRole } from "@/lib/auth/redirects";

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
  return (
    pathname.startsWith("/cift") ||
    pathname.startsWith("/vendor") ||
    pathname.startsWith("/firma") ||
    pathname.startsWith("/satici") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/budget") ||
    pathname.startsWith("/guests") ||
    pathname.startsWith("/checklist") ||
    pathname.startsWith("/timeline") ||
    pathname.startsWith("/contracts") ||
    pathname.startsWith("/payments") ||
    pathname.startsWith("/invitations") ||
    pathname.startsWith("/messages") ||
    pathname.startsWith("/website") ||
    pathname.startsWith("/vault") ||
    pathname.startsWith("/insights") ||
    pathname.startsWith("/proposals") ||
    pathname.startsWith("/requests") ||
    pathname.startsWith("/ai-planner") ||
    pathname === "/settings" ||
    pathname.startsWith("/settings/") ||
    pathname === "/onboarding" ||
    pathname.startsWith("/onboarding/")
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
