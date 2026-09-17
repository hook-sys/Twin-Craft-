import { NextResponse, type NextRequest } from "next/server";
import { routes } from "@/config/app";
import { createServerDb } from "@/lib/db/server";

/** Turns the PKCE code from a confirmation email into a session. */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");

  if (code) {
    const db = await createServerDb();
    const { error } = await db.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${routes.dashboard}`);
    }
  }

  return NextResponse.redirect(`${origin}${routes.login}?error=link`);
}
