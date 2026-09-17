"use server";

import { revalidatePath } from "next/cache";
import { routes } from "@/config/app";
import { requireUser } from "@/lib/auth/guards";
import { fail, ok, type ActionResult } from "@/lib/errors";
import * as users from "@/modules/users/service";

export async function updateProfileAction(
  _previous: ActionResult<null> | null,
  formData: FormData,
): Promise<ActionResult<null>> {
  try {
    const actor = await requireUser();
    await users.updateProfile(actor, {
      fullName: formData.get("fullName"),
      phone: formData.get("phone"),
      locale: formData.get("locale"),
      avatarUrl: formData.get("avatarUrl"),
    });
  } catch (error) {
    return fail(error);
  }

  revalidatePath(routes.profile);
  return ok(null);
}
