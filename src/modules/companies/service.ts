import "server-only";
import { AppError } from "@/lib/errors";
import { can } from "@/lib/permissions";
import { fieldErrors } from "@/lib/validations/common";
import * as audit from "@/modules/audit/repository";
import * as members from "@/modules/members/repository";
import type { Actor, Company } from "@/types";
import * as repository from "./repository";
import { createCompanySchema, updateCompanySchema } from "./schema";

/**
 * Creates the company and the founder's OWNER membership together — a company
 * without an owner would be unreachable by anyone.
 */
export async function createCompany(
  actor: Actor,
  raw: unknown,
): Promise<Company> {
  const parsed = createCompanySchema.safeParse(raw);
  if (!parsed.success) throw AppError.validation(fieldErrors(parsed.error));

  if (await repository.slugExists(parsed.data.slug)) {
    throw AppError.conflict(
      "এই ঠিকানাটা আগেই নেওয়া হয়েছে। / That address is already taken.",
    );
  }

  const { company, conflict } = await repository.insert({
    name: parsed.data.name,
    slug: parsed.data.slug,
    phone: parsed.data.phone || undefined,
    address: parsed.data.address,
    createdBy: actor.user.id,
  });

  if (conflict) {
    throw AppError.conflict(
      "এই ঠিকানাটা আগেই নেওয়া হয়েছে। / That address is already taken.",
    );
  }
  if (!company) throw new AppError("INTERNAL");

  const membership = await members.insert({
    companyId: company.id,
    userId: actor.user.id,
    role: "OWNER",
  });

  if (!membership) {
    // The company row exists but nobody can reach it; fail loudly rather than
    // leave the user staring at an empty dashboard.
    throw new AppError(
      "INTERNAL",
      "কোম্পানি তৈরি হয়েছে কিন্তু মালিকানা বসানো যায়নি। / Company created but ownership could not be set.",
    );
  }

  await audit.append({
    companyId: company.id,
    actorId: actor.user.id,
    action: "company.created",
    entity: "company",
    entityId: company.id,
    detail: { name: company.name, slug: company.slug },
  });

  return company;
}

export async function updateCompany(
  actor: Actor,
  companyId: string,
  raw: unknown,
): Promise<Company> {
  if (!actor.company || actor.company.id !== companyId) {
    throw AppError.forbidden();
  }
  if (!can(actor, "company:update")) throw AppError.forbidden();

  const parsed = updateCompanySchema.safeParse(raw);
  if (!parsed.success) throw AppError.validation(fieldErrors(parsed.error));

  const company = await repository.update(companyId, {
    name: parsed.data.name,
    phone: parsed.data.phone || null,
    address: parsed.data.address ?? null,
  });

  if (!company) throw AppError.notFound();

  await audit.append({
    companyId,
    actorId: actor.user.id,
    action: "company.updated",
    entity: "company",
    entityId: companyId,
    detail: { name: company.name },
  });

  return company;
}

export async function getCompany(actor: Actor, companyId: string) {
  const company = await repository.findById(companyId);
  if (!company) throw AppError.notFound();

  const membership = await members.findFor(companyId, actor.user.id);
  if (!membership && actor.user.role !== "SUPER_ADMIN") {
    throw AppError.forbidden();
  }

  return company;
}
