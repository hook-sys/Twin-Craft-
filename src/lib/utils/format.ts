import { app } from "@/config/app";

export type Locale = "bn" | "en";

const ZONE = "Asia/Dhaka";

const intlLocale = (locale: Locale) => (locale === "bn" ? "bn-BD" : "en-US");

export function formatNumber(value: number, locale: Locale = app.defaultLocale) {
  return new Intl.NumberFormat(intlLocale(locale), {
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatMoney(value: number, locale: Locale = app.defaultLocale) {
  return `৳ ${formatNumber(value, locale)}`;
}

export function formatDate(
  value: string | Date | null | undefined,
  locale: Locale = app.defaultLocale,
) {
  if (!value) return "—";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat(locale === "bn" ? "bn-BD" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: ZONE,
  }).format(date);
}

/** "Rahim Variety Store" -> "rahim-variety-store" */
export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((part) => part.charAt(0).toUpperCase()).join("") || "?";
}
