import { getAuth, withClerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Set the paths that don't require the user to be signed in
const publicPaths = ["/login*"];

const isPublic = (path: string) => {
    return publicPaths.find((x) =>
        path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
    );
};

export default withClerkMiddleware((request) => {
    if (isPublic(request.nextUrl.pathname)) {
        return NextResponse.next();
    }
    const { userId } = getAuth(request);
    if (!userId) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect_url", request.url);
        return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
});

// Stop Middleware running on static files and public folder
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next
         * - static (static files)
         * - favicon.ico (favicon file)
         * - public folder
         * - public folder
         */
        "/((?!static|.*\\..*|_next|favicon.ico).*)",
        "/",
    ],
}