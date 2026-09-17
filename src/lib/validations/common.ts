import { z } from "zod";

export const email = z
  .string()
  .trim()
  .min(1, "ইমেইল দিন / Email is required")
  .email("ইমেইলটি ঠিক নয় / That email looks wrong")
  .max(255);

export const password = z
  .string()
  .min(8, "কমপক্ষে ৮ অক্ষর / At least 8 characters")
  .max(72);

export const personName = z.string().trim().min(2).max(120);

export const companyName = z
  .string()
  .trim()
  .min(2, "কমপক্ষে ২ অক্ষর / At least 2 characters")
  .max(120);

export const slug = z
  .string()
  .trim()
  .toLowerCase()
  .regex(
    /^[a-z0-9][a-z0-9-]{1,46}[a-z0-9]$/,
    "ছোট হাতের অক্ষর, সংখ্যা ও হাইফেন / Lowercase letters, numbers and hyphens",
  );

export const phone = z
  .string()
  .trim()
  .max(24)
  .regex(/^[0-9+\-\s()]*$/, "ফোন নম্বরটি ঠিক নয় / That phone number looks wrong");

export const optionalText = (max = 500) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((value) => (value === "" ? undefined : value));

export const uuid = z.string().uuid();

/** Turns a zod failure into the flat field map AppError carries. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const fields: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "form";
    if (!fields[key]) fields[key] = issue.message;
  }
  return fields;
}
