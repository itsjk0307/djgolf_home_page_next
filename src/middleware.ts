import { auth } from "@/lib/auth";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default auth((req: NextRequest & { auth?: { user?: unknown } | null }) => {
  const { pathname } = req.nextUrl;

  // Skip API routes
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Check auth for mypage (any locale prefix)
  const mypagePattern = /^\/(?:ko|en|zh|ja)?\/?(mypage)(\/.*)?$/;
  if (mypagePattern.test(pathname) && !req.auth?.user) {
    const locale = pathname.match(/^\/(ko|en|zh|ja)\//)?.[1] ?? "ko";
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }

  return intlMiddleware(req as Parameters<typeof intlMiddleware>[0]);
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|brochures|videos|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf|mp4|webm)$).*)",
  ],
};
