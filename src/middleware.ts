import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest){
    const token = req.cookies.get('sb-token')?.value

    const pathname = req.nextUrl.pathname

    if(token) {
        if(pathname === '/') {
           return NextResponse.redirect(new URL('/dashboard', req.url))
        }
    }

     if (!token) {
    if (pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/signup', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/signup'
  ],
};