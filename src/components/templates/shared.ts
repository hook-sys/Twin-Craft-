import type { Lang } from "@/lib/i18n";

/**
 * Wide letter-spacing is what makes a Latin eyebrow label look considered, and
 * it is also what splits Bangla conjuncts apart, so it is applied by language
 * rather than baked into the class list.
 */
export function eyebrow(lang: Lang) {
  return lang === "en" ? "uppercase tracking-[0.22em]" : "tracking-normal";
}

export function displayTracking(lang: Lang) {
  return lang === "en" ? "tracking-tight" : "tracking-normal";
}
