import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const protectedPaths = ['/doctor', '/patient', 'configuracoes']; // Include '/' in protected paths
    const { pathname } = request.nextUrl;
    console.log("pathname: ", pathname);

    // Verify the presence of the "session" cookie
    const hasSessionCookie = request.cookies.get('session');
    console.log("hasSessionCookie: ", hasSessionCookie);

    // Redirect unauthenticated users to the login page if they try to access protected paths
    if (protectedPaths.some(path => pathname.startsWith(path)) || pathname === '/') {
        if (!hasSessionCookie) {
            const loginUrl = new URL('/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    // Redirect authenticated users away from the login page
    if ((pathname === '/login' || pathname === '/register') && hasSessionCookie) {
        console.log("Redirecting to home");
        const homeUrl = new URL('/', request.url); // Redirect to home or dashboard
        return NextResponse.redirect(homeUrl);
    }

    return NextResponse.next(); // Allow access if authenticated
}

export const config = {
    matcher: ['/', '/doctor/:path*', '/patient/:path*', '/configuracoes/:path*', '/login', '/register'], // Include '/login' in matcher
};