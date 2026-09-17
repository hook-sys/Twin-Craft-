"use server";

import { revalidatePath } from "next/cache";
import { routes } from "@/config/app";
import { requireCompany } from "@/lib/auth/guards";
import { fail, ok, type ActionResult } from "@/lib/errors";
import * as members from "@/modules/members/service";

export async function changeRoleAction(
  _previous: ActionResult<null> | null,
  formData: FormData,
): Promise<ActionResult<null>> {
  try {
    const actor = await requireCompany();
    await members.changeRole(actor, {
      memberId: formData.get("memberId"),
      role: formData.get("role"),
    });
  } catch (error) {
    return fail(error);
  }

  revalidatePath(routes.team);
  return ok(null);
}

export async function removeMemberAction(
  _previous: ActionResult<null> | null,
  formData: FormData,
): Promise<ActionResult<null>> {
  try {
    const actor = await requireCompany();
    await members.removeMember(actor, { memberId: formData.get("memberId") });
  } catch (error) {
    return fail(error);
  }

  revalidatePath(routes.team);
  return ok(null);
}
