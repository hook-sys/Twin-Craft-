"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { routes } from "@/config/app";
import { fail, ok, type ActionResult } from "@/lib/errors";
import * as auth from "@/modules/auth/service";

async function requestOrigin() {
  const list = await headers();
  return (
    list.get("origin") ??
    `https://${list.get("host") ?? "localhost:3000"}`
  );
}

export async function signInAction(
  _previous: ActionResult<null> | null,
  formData: FormData,
): Promise<ActionResult<null>> {
  try {
    await auth.signIn({
      email: formData.get("email"),
      password: formData.get("password"),
    });
  } catch (error) {
    return fail(error);
  }

  redirect(routes.dashboard);
}

export async function signUpAction(
  _previous: ActionResult<{ email: string }> | null,
  formData: FormData,
): Promise<ActionResult<{ email: string }>> {
  try {
    const result = await auth.signUp(
      {
        email: formData.get("email"),
        password: formData.get("password"),
        fullName: formData.get("fullName"),
      },
      await requestOrigin(),
    );
    return ok(result);
  } catch (error) {
    return fail(error);
  }
}

export async function signOutAction() {
  await auth.signOut();
  redirect(routes.login);
}
