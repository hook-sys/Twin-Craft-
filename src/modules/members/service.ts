import "server-only";
import { AppError } from "@/lib/errors";
import { can } from "@/lib/permissions";
import { fieldErrors } from "@/lib/validations/common";
import * as audit from "@/modules/audit/repository";
import type { Actor, CompanyMemberWithUser } from "@/types";
import * as repository from "./repository";
import { changeRoleSchema, removeMemberSchema } from "./schema";

export async function listMembers(
  actor: Actor,
  companyId: string,
): Promise<CompanyMemberWithUser[]> {
  if (!actor.company || actor.company.id !== companyId) throw AppError.forbidden();
  if (!can(actor, "member:read")) throw AppError.forbidden();
  return repository.listByCompany(companyId);
}

/** Guards the one mistake that locks everyone out: removing the last owner. */
async function assertNotLastOwner(companyId: string, memberRole: string) {
  if (memberRole !== "OWNER") return;
  if ((await repository.countOwners(companyId)) <= 1) {
    throw AppError.forbidden(
      "অন্তত একজন মালিক থাকতেই হবে। / A company must keep at least one owner.",
    );
  }
}

export async function changeRole(actor: Actor, raw: unknown) {
  if (!actor.company) throw AppError.forbidden();
  if (!can(actor, "member:role")) throw AppError.forbidden();

  const parsed = changeRoleSchema.safeParse(raw);
  if (!parsed.success) throw AppError.validation(fieldErrors(parsed.error));

  const member = await repository.findById(parsed.data.memberId);
  if (!member || member.company_id !== actor.company.id) throw AppError.notFound();

  if (member.role !== parsed.data.role) {
    await assertNotLastOwner(member.company_id, member.role);
  }

  const updated = await repository.updateRole(member.id, parsed.data.role);
  if (!updated) throw new AppError("INTERNAL");

  await audit.append({
    companyId: member.company_id,
    actorId: actor.user.id,
    action: "member.role_changed",
    entity: "company_member",
    entityId: member.id,
    detail: { from: member.role, to: parsed.data.role },
  });

  return updated;
}

export async function removeMember(actor: Actor, raw: unknown) {
  if (!actor.company) throw AppError.forbidden();
  if (!can(actor, "member:remove")) throw AppError.forbidden();

  const parsed = removeMemberSchema.safeParse(raw);
  if (!parsed.success) throw AppError.validation(fieldErrors(parsed.error));

  const member = await repository.findById(parsed.data.memberId);
  if (!member || member.company_id !== actor.company.id) throw AppError.notFound();

  await assertNotLastOwner(member.company_id, member.role);
  await repository.remove(member.id);

  await audit.append({
    companyId: member.company_id,
    actorId: actor.user.id,
    action: "member.removed",
    entity: "company_member",
    entityId: member.id,
    detail: { role: member.role },
  });
}
