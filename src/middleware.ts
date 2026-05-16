import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip admin, API, static assets
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.match(/\.(ico|png|jpg|svg|webp|css|js)$/)
  ) {
    return NextResponse.next();
  }

  // Read existing lang cookie
  const cookieLang = req.cookies.get("lang")?.value;
  if (cookieLang === "en" || cookieLang === "fr") {
    return NextResponse.next();
  }

  // Auto-detect from Accept-Language header (first visit)
  const acceptLang = req.headers.get("accept-language") || "";
  const isEnglish = acceptLang.toLowerCase().includes("en") && !acceptLang.toLowerCase().startsWith("fr");

  const res = NextResponse.next();
  if (isEnglish) {
    res.cookies.set("lang", "en", { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
  } else {
    res.cookies.set("lang", "fr", { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
  }
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
