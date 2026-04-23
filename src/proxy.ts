import { NextRequest, NextResponse } from 'next/server';

export function proxy(req: NextRequest) {
  const token = req.cookies.get('sb-token')?.value;
  const { pathname } = req.nextUrl;

  console.log("Current Path:", pathname); // سطر للدييباج

  const isPublicRoute = 
    pathname === '/' || 
    pathname === '/signup' || 
    pathname === '/reset-password' || 
    pathname === '/forgot-password';
    // pathname.startsWith('/auth/');

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};