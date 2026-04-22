import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { defaultLocale } from "@/src/i18n/routing";
import {
  Permissions,
  PermissionKey,
  HttpMethod,
} from "@/src/lib/types/permissions";

const ROUTE_PERMISSIONS: Record<
  string,
  { resource: PermissionKey; method: HttpMethod }
> = {
  "/":                  { resource: "home_permission",            method: "GET" }, // ✅
  "/orders":            { resource: "order_permission",           method: "GET" },
  "/drivers":           { resource: "driver_permission",          method: "GET" },
  "/users":             { resource: "user_permission",            method: "GET" },
  "/payments":          { resource: "payment_permission",         method: "GET" },
  "/invoices":          { resource: "invoice_permission",         method: "GET" },
  "/loading-requests":  { resource: "loading_request_permission", method: "GET" },
  "/management":        { resource: "management_permission",      method: "GET" },
  "/supervisors":       { resource: "supervisor_permission",      method: "GET" },
  "/suppliers":         { resource: "supplier_permission",        method: "GET" },
  "/settings":          { resource: "setting_permission",         method: "GET" },
  "/terms":             { resource: "terms_permission",           method: "GET" },
};

const PUBLIC_PATHS = ["/login", "/register", "/403"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── 1. i18n redirect ──────────────────────────────────────────────────────
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  // ── 2. شيل الـ locale من الـ pathname أولاً ───────────────────────────────
  const pathnameWithoutLocale =
    pathname.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, "") || "/";

  // ── 3. الصفحات العامة تعدي بدون فحص ──────────────────────────────────────
  const isPublic = PUBLIC_PATHS.some((p) => pathnameWithoutLocale.startsWith(p));
  if (isPublic) return NextResponse.next();

  // ── 4. جيب الـ JWT token من NextAuth ─────────────────────────────────────
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // ── 5. مفيش session → روّح login ─────────────────────────────────────────
  if (!token) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}/login`, request.url),
    );
  }

  // ── 6. فحص صلاحية الـ route ───────────────────────────────────────────────
  const routeConfig = ROUTE_PERMISSIONS[pathnameWithoutLocale];

  if (routeConfig) {
    const permissions = token.permissions as Permissions | null;

    if (!permissions) {
      return NextResponse.redirect(
        new URL(`/${defaultLocale}/403`, request.url),
      );
    }

    if (!permissions.is_admin) {
      const resourcePerms = permissions[routeConfig.resource] as HttpMethod[];
      const hasPermission =
        Array.isArray(resourcePerms) &&
        resourcePerms.includes(routeConfig.method);

      if (!hasPermission) {
        return NextResponse.redirect(
          new URL(`/${defaultLocale}/403`, request.url),
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/((?!_next|api|favicon.ico|.*\\..*).*)",
  ],
};