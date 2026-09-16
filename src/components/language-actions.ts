"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { isLang, LANG_COOKIE } from "@/lib/i18n";

export async function setLanguage(formData: FormData) {
  const lang = formData.get("lang");

  if (!isLang(lang)) {
    return;
  }

  const store = await cookies();
  store.set(LANG_COOKIE, lang, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  revalidatePath("/", "layout");
}
