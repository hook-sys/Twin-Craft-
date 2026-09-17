import { z } from "zod";
import { optionalText, personName, phone } from "@/lib/validations/common";

export const updateProfileSchema = z.object({
  fullName: personName,
  phone: phone.optional().or(z.literal("")),
  locale: z.enum(["bn", "en"]),
  avatarUrl: optionalText(500),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
