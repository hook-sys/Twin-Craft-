import "server-only";
import { cookies } from "next/headers";
import { createServerDb } from "@/lib/db/server";
import * as companies from "@/modules/companies/repository";
import * as users from "@/modules/users/repository";
import type { Actor } from "@/types";

export const ACTIVE_COMPANY_COOKIE = "aladeen_company";

/** The signed-in auth user, or null. Cheap: one Supabase call. */
export async function getAuthUser() {
  const db = await createServerDb();
  const {
    data: { user },
  } = await db.auth.getUser();
  return user;
}

/**
 * Resolves who is acting and on behalf of which company.
 * The active company comes from a cookie, and is always re-checked against
 * this user's memberships — a forged cookie resolves to nothing.
 */
export async function getActor(): Promise<Actor | null> {
  const authUser = await getAuthUser();
  if (!authUser) return null;

  const user = await users.findById(authUser.id);
  if (!user) return null;

  const memberships = await companies.listForUser(user.id);
  if (memberships.length === 0) {
    return { user, company: null, membership: null };
  }

  const cookieStore = await cookies();
  const preferred = cookieStore.get(ACTIVE_COMPANY_COOKIE)?.value;
  const chosen =
    memberships.find((entry) => entry.company.id === preferred) ?? memberships[0];

  return { user, company: chosen.company, membership: chosen.membership };
}

export async function listMyCompanies(userId: string) {
  return companies.listForUser(userId);
}
