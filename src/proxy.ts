import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/login', '/forgot-password', '/otp-verify', '/reset-password'];

const ROLE_PREFIX_MAP: Record<string, string[]> = {
  student: ['/student'],
  teacher: ['/teacher'],
  admin: ['/admin'],
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths always
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const role = request.cookies.get('nexus-role')?.value;

  // Not authenticated → redirect to login
  if (!role) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Role mismatch guard: redirect to the role's own dashboard
  for (const [r, prefixes] of Object.entries(ROLE_PREFIX_MAP)) {
    if (prefixes.some((p) => pathname.startsWith(p)) && role !== r) {
      return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url));
    }
  }

  // Root redirect → role dashboard
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
