import { cookies } from "next/headers";
import { isLang, LANG_COOKIE, type Lang } from "./i18n";

/** Panel language for the signed-in owner; the public site uses its own column. */
export async function getLang(): Promise<Lang> {
  const store = await cookies();
  const value = store.get(LANG_COOKIE)?.value;
  return isLang(value) ? value : "bn";
}
