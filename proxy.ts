import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
  const token = await getToken({ req: request });
  const pathname = request.nextUrl.pathname;

  // Not logged in → trying to access protected pages
  if (!token && pathname.startsWith("/pages")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Logged in → trying to access auth pages
  if (token && (pathname === "/login" || pathname === "/sign")) {
    return NextResponse.redirect(new URL("/pages/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/sign", "/pages/:path*"],
};
