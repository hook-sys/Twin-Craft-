"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { routes } from "@/config/app";
import { requireUser } from "@/lib/auth/guards";
import { ACTIVE_COMPANY_COOKIE, listMyCompanies } from "@/lib/auth/session";

/** Switching workspaces only ever picks from this user's own memberships. */
export async function switchCompanyAction(formData: FormData) {
  const actor = await requireUser();
  const requested = String(formData.get("companyId") ?? "");

  const mine = await listMyCompanies(actor.user.id);
  const match = mine.find((entry) => entry.company.id === requested);
  if (!match) redirect(routes.dashboard);

  const cookieStore = await cookies();
  cookieStore.set(ACTIVE_COMPANY_COOKIE, match.company.id, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  redirect(routes.dashboard);
}
