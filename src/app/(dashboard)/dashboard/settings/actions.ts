"use server";

import { revalidatePath } from "next/cache";
import { routes } from "@/config/app";
import { requireCompany } from "@/lib/auth/guards";
import { fail, ok, type ActionResult } from "@/lib/errors";
import * as companies from "@/modules/companies/service";

export async function updateCompanyAction(
  _previous: ActionResult<null> | null,
  formData: FormData,
): Promise<ActionResult<null>> {
  try {
    const actor = await requireCompany();
    await companies.updateCompany(actor, actor.company.id, {
      name: formData.get("name"),
      phone: formData.get("phone"),
      address: formData.get("address"),
    });
  } catch (error) {
    return fail(error);
  }

  revalidatePath(routes.companySettings);
  revalidatePath(routes.dashboard);
  return ok(null);
}
