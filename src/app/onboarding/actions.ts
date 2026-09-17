"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { routes } from "@/config/app";
import { requireUser } from "@/lib/auth/guards";
import { ACTIVE_COMPANY_COOKIE } from "@/lib/auth/session";
import { fail, type ActionResult } from "@/lib/errors";
import * as companies from "@/modules/companies/service";

export async function createCompanyAction(
  _previous: ActionResult<null> | null,
  formData: FormData,
): Promise<ActionResult<null>> {
  let companyId: string;

  try {
    const actor = await requireUser();
    const company = await companies.createCompany(actor, {
      name: formData.get("name"),
      slug: formData.get("slug"),
      phone: formData.get("phone"),
      address: formData.get("address"),
    });
    companyId = company.id;
  } catch (error) {
    return fail(error);
  }

  const cookieStore = await cookies();
  cookieStore.set(ACTIVE_COMPANY_COOKIE, companyId, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  redirect(routes.dashboard);
}
