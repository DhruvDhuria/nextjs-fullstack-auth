import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPulicPath = path === '/login' || path === '/signup' || path === '/verifyemail' 

  const token = request.cookies.get('token')?.value || ""

  if(isPulicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if(!isPulicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/profile/:path*',
    '/verifyemail'
  ]
};
