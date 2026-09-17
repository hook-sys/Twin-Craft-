import type { Lang } from "@/lib/i18n";

const ZONE = "Asia/Dhaka";

export function fmtNumber(value: unknown, lang: Lang) {
  const n = Number(value ?? 0);
  if (!Number.isFinite(n)) return "—";
  return new Intl.NumberFormat(lang === "bn" ? "bn-BD" : "en-US", {
    maximumFractionDigits: 2,
  }).format(n);
}

export function fmtMoney(value: unknown, lang: Lang) {
  return `৳ ${fmtNumber(value, lang)}`;
}

export function fmtDate(value: unknown, lang: Lang) {
  if (!value) return "—";
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat(lang === "bn" ? "bn-BD" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: ZONE,
  }).format(date);
}

export const toneClass: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  violet: "bg-violet-50 text-violet-600",
  rose: "bg-rose-50 text-rose-500",
  slate: "bg-slate-100 text-slate-500",
};
