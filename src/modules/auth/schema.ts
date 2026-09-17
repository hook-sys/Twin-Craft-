import { z } from "zod";
import { email, password, personName } from "@/lib/validations/common";

export const signUpSchema = z.object({
  email,
  password,
  fullName: personName,
});

export const signInSchema = z.object({
  email,
  password: z.string().min(1, "পাসওয়ার্ড দিন / Password is required"),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
