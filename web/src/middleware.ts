import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get("refresh_token");

  const nextPathName = req.nextUrl.pathname;

  if (!refreshToken && nextPathName === "/dashboard") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (refreshToken) {
    if (nextPathName === "/login" || nextPathName === "/signup") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/login", "/signup"],
};
0;
