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
  // Ne poser le cookie que pour EN — les visiteurs FR (défaut) n'ont pas de Set-Cookie
  // ce qui permet à Vercel CDN de mettre les pages ISR en cache pour eux.
  const acceptLang = req.headers.get("accept-language") || "";
  const isEnglish = acceptLang.toLowerCase().includes("en") && !acceptLang.toLowerCase().startsWith("fr");

  if (isEnglish) {
    const res = NextResponse.next();
    res.cookies.set("lang", "en", { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
    return res;
  }
  // FR par défaut : pas de Set-Cookie → réponse cacheable par Vercel CDN
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
