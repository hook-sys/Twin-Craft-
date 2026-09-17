import "server-only";
import { AppError } from "@/lib/errors";
import { fieldErrors } from "@/lib/validations/common";
import * as audit from "@/modules/audit/repository";
import type { Actor, User } from "@/types";
import * as repository from "./repository";
import { updateProfileSchema } from "./schema";

/** A user may edit their own profile and nothing else — role is not in the schema. */
export async function updateProfile(actor: Actor, raw: unknown): Promise<User> {
  const parsed = updateProfileSchema.safeParse(raw);
  if (!parsed.success) throw AppError.validation(fieldErrors(parsed.error));

  const user = await repository.updateProfile(actor.user.id, {
    full_name: parsed.data.fullName,
    phone: parsed.data.phone || null,
    locale: parsed.data.locale,
    avatar_url: parsed.data.avatarUrl ?? null,
  });

  if (!user) throw new AppError("INTERNAL");

  await audit.append({
    companyId: actor.company?.id ?? null,
    actorId: actor.user.id,
    action: "profile.updated",
    entity: "user",
    entityId: actor.user.id,
  });

  return user;
}
