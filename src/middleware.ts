import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Skip middleware for login page
    if (pathname === '/admin/login') {
        return NextResponse.next();
    }

    // Protect admin routes
    if (pathname.startsWith('/admin')) {
        try {
            const token = await getToken({
                req: request,
                secret: process.env.NEXTAUTH_SECRET,
            });

            if (!token) {
                // Use nextUrl.clone() to safely create redirect URL
                const url = request.nextUrl.clone();
                url.pathname = '/admin/login';
                url.searchParams.set('callbackUrl', pathname);
                return NextResponse.redirect(url);
            }
        } catch (error) {
            // On any error, redirect to login
            const url = request.nextUrl.clone();
            url.pathname = '/admin/login';
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
