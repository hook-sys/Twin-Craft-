import { z } from "zod";
import {
  companyName,
  optionalText,
  phone,
  slug,
} from "@/lib/validations/common";

export const createCompanySchema = z.object({
  name: companyName,
  slug,
  phone: phone.optional().or(z.literal("")),
  address: optionalText(240),
});

export const updateCompanySchema = z.object({
  name: companyName,
  phone: phone.optional().or(z.literal("")),
  address: optionalText(240),
});

export type CreateCompanyInput = z.infer<typeof createCompanySchema>;
export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>;
