import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ADMIN_HOST = "admin.wazifa.app";
const MAIN_HOST = "wazifa.app";

const isDashboardPath = (pathname: string) =>
  pathname === "/dashboard" || pathname.startsWith("/dashboard/");

export function proxy(request: NextRequest) {
  // Strip the port (e.g. "admin.wazifa.app:3000") so host comparisons are exact
  const hostname = (request.headers.get('host') ?? "").toLowerCase().split(":")[0];
  const { pathname } = request.nextUrl;

  // Admin subdomain only serves the dashboard. Only redirect paths outside it,
  // otherwise /dashboard would redirect to itself forever.
  if (hostname === ADMIN_HOST) {
    if (!isDashboardPath(pathname)) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // Main domain (and www) must not expose the dashboard
  const isMainDomain = hostname === MAIN_HOST || hostname === `www.${MAIN_HOST}`;
  if (isMainDomain && isDashboardPath(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
