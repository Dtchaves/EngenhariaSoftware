import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const protectedPaths = ['/dashboard', '/profile', '/settings']; // Define paths requiring authentication
    const { pathname } = request.nextUrl;

    // Check if the path is protected
    if (protectedPaths.some(path => pathname.startsWith(path))) {
        // Verify the presence of the "session" cookie
        const hasSessionCookie = request.cookies.get('session');

        if (!hasSessionCookie) {
            // Redirect unauthenticated users to the launchpad/login page
            const loginUrl = new URL('/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }
    return NextResponse.next(); // Allow access if authenticated
}

export const config = {
    matcher: ['/dashboard/:path*', '/profile/:path*', '/settings/:path*'], // Adjust to match your protected routes
};
