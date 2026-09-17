import "server-only";
import { redirect } from "next/navigation";
import { routes } from "@/config/app";
import { AppError } from "@/lib/errors";
import { can, isSuperAdmin, type Permission } from "@/lib/permissions";
import type { Actor, Company, CompanyMember } from "@/types";
import { getActor } from "./session";

export type CompanyActor = Actor & {
  company: Company;
  membership: CompanyMember;
};

/** Signed in, profile loaded. Sends anyone else to the login page. */
export async function requireUser(): Promise<Actor> {
  const actor = await getActor();
  if (!actor) redirect(routes.login);
  return actor;
}

/** Signed in *and* attached to a company. Sends the rest to onboarding. */
export async function requireCompany(): Promise<CompanyActor> {
  const actor = await requireUser();
  if (!actor.company || !actor.membership) redirect(routes.onboarding);
  return actor as CompanyActor;
}

/** The check every mutating service call makes before touching a repository. */
export async function requirePermission(
  permission: Permission,
): Promise<CompanyActor> {
  const actor = await requireCompany();
  if (!can(actor, permission)) throw AppError.forbidden();
  return actor;
}

/** Platform administration. Anything else gets a 404, not a hint. */
export async function requireSuperAdmin(): Promise<Actor> {
  const actor = await requireUser();
  if (!isSuperAdmin(actor)) redirect(routes.dashboard);
  return actor;
}

export function assertPermission(actor: Actor, permission: Permission) {
  if (!can(actor, permission)) throw AppError.forbidden();
}
