import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const host = (request.headers.get('host') ?? "").toLowerCase();
  const url = request.nextUrl;
  const pathname = url.pathname;
  console.log("Host: ",host);
  console.log("Pathname: ",pathname);

  const isAdminHost = host.includes("admin.wazifa.app");
  if(isAdminHost) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  const isMainDomain = host.includes("wazifa.app");
  if(isMainDomain && pathname.includes("/dashboard")) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher: ['/((?!api|_next/static|_next/image).*)'],
}