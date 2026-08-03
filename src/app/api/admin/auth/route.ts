import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_TOKEN = process.env.ADMIN_SECRET ?? "__no_admin_secret_configured__";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  if (password === ADMIN_TOKEN) {
    cookies().set("admin_token", ADMIN_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: "/",
    });
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "invalid_password" }, { status: 401 });
}
