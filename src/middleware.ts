import { NextRequest, NextResponse } from "next/server";
import { defaultLocale } from "@/src/i18n/routing";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};