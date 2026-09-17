import "server-only";
import { createServerDb } from "@/lib/db/server";
import { AppError } from "@/lib/errors";
import { fieldErrors } from "@/lib/validations/common";
import { signInSchema, signUpSchema } from "./schema";

/**
 * Supabase owns credentials; this service owns the rules around them.
 * The public.users row is created by a database trigger, not here, so an
 * account can never exist without a profile.
 */
export async function signUp(raw: unknown, origin: string) {
  const parsed = signUpSchema.safeParse(raw);
  if (!parsed.success) throw AppError.validation(fieldErrors(parsed.error));

  const db = await createServerDb();
  const { error } = await db.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: { full_name: parsed.data.fullName },
    },
  });

  if (error) {
    if (error.status === 422 || error.code === "user_already_exists") {
      throw AppError.conflict(
        "এই ইমেইলে আগে থেকেই অ্যাকাউন্ট আছে। / An account with this email already exists.",
      );
    }
    throw new AppError("INTERNAL", error.message);
  }

  return { email: parsed.data.email };
}

export async function signIn(raw: unknown) {
  const parsed = signInSchema.safeParse(raw);
  if (!parsed.success) throw AppError.validation(fieldErrors(parsed.error));

  const db = await createServerDb();
  const { error } = await db.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    throw new AppError(
      "UNAUTHENTICATED",
      "ইমেইল বা পাসওয়ার্ড মিলছে না। / Email or password is incorrect.",
    );
  }
}

export async function signOut() {
  const db = await createServerDb();
  await db.auth.signOut();
}
