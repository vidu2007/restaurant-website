import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

const secret = new TextEncoder().encode(process.env.SECRET);

export async function proxy(request) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === '/' || path === '/sign-in' || path === '/sign-up' || path === '/menu' || path === '/about';
    const token = request.cookies.get('AuthToken')?.value;

    if(!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/sign-in', request.url));

    } else if(token) {
        try {
            const {payload} = await jwtVerify(token, secret);
            const tokenExpiration = new Date(payload.exp * 1000);

            if(tokenExpiration <= new Date()) {
                return NextResponse.redirect(new URL('/sign-in', request.url));
            }

            if(isPublicPath) {
                return NextResponse.next();
            }

        } catch(err) {
            console.log(err);
        }
    }

    return NextResponse.next();
};

export const config = {
    matcher: [
        '/', '/cart', '/reservations', '/user',
    ]
};