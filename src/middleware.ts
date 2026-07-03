import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession, decrypt } from './lib/auth';

export async function middleware(request: NextRequest) {
  // Update session
  const res = await updateSession(request);

  // Protected routes logic
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (request.nextUrl.pathname === '/admin/login') {
      return res || NextResponse.next();
    }

    const sessionCookie = request.cookies.get('session')?.value;
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const parsed = await decrypt(sessionCookie);
      if (!parsed) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    } catch (err) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return res || NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
