// import { NextRequest, NextResponse } from 'next/server';
// import { createServer } from '@/lib/supabase'
// export function middleware(req: NextRequest){
//     const token = req.cookies.get('sb-token')?.value

//     const pathname = req.nextUrl.pathname

//     if(token) {
//         if(pathname === '/') {
//            return NextResponse.redirect(new URL('/dashboard', req.url))
//         }
//     }

//      if (!token) {
//     if (pathname.startsWith('/dashboard')) {
//       return NextResponse.redirect(new URL('/signup', req.url))
//     }
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: [
//     '/',
//     '/dashboard/:path*',
//     '/signup'
//   ],
// };

import { NextRequest, NextResponse } from 'next/server';

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get('sb-token')?.value;
//   const pathname = req.nextUrl.pathname;

//   console.log("Current Path:", pathname, "| Token Found:", !!token); // ضيفي هاد السطر للـ Debugging

//   if (token) {
//     // لو مسجل دخول وحاول يروح للوجن أو الساين أب
//     if (pathname === '/' || pathname === '/signup') {
//       return NextResponse.redirect(new URL('/dashboard', req.url));
//     }
//   }

//   if (!token && pathname.startsWith('/dashboard')) {
//     // لو مش مسجل دخول، رجعيه للوجن (/) مش للساين أب
//     // هيك اليوزر بعرف إنه محتاج يدخل بياناته مش يعمل حساب جديد
//     return NextResponse.redirect(new URL('/', req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/', '/dashboard/:path*', '/signup'],
// };

export function middleware(req: NextRequest) {
  // هاد السطر السحري اللي رح يحل المشكلة
  const supabaseCookie = req.cookies.getAll().find(c => 
    c.name.startsWith('sb-') && c.name.endsWith('-auth-token')
  );
  
  const token = supabaseCookie?.value;
  const pathname = req.nextUrl.pathname;

  console.log("Found Token Name:", supabaseCookie?.name); // رح تشوفي الاسم الطويل طلع هون

  if (token) {
    if (pathname === '/' || pathname === '/signup') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  if (!token && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}