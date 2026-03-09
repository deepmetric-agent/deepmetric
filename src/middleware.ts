import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth/config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

const ADMIN_ROLES = ["ADMIN"];
const CMS_ROLES = ["ADMIN", "CONTENT_MANAGER"];

export default auth((req) => {
  const { pathname } = req.nextUrl;

  if (!req.auth) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const role = (req.auth.user as Record<string, unknown>)?.role as
    | string
    | undefined;

  if (pathname.startsWith("/keystatic")) {
    if (!role || !CMS_ROLES.includes(role)) {
      return NextResponse.redirect(new URL("/denied", req.url));
    }
  }

  if (pathname.startsWith("/admin")) {
    const allowedRoles = ["ADMIN", "CONTENT_MANAGER", "COLLABORATOR"];
    if (!role || !allowedRoles.includes(role)) {
      return NextResponse.redirect(new URL("/denied", req.url));
    }

    if (pathname.startsWith("/admin/users") && !ADMIN_ROLES.includes(role)) {
      return NextResponse.redirect(new URL("/denied", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/keystatic/:path*", "/api/admin/:path*"],
};
