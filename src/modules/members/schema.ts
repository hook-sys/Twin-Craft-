import { z } from "zod";
import { email, uuid } from "@/lib/validations/common";

export const roleSchema = z.enum(["OWNER", "ADMIN", "STAFF"]);

export const changeRoleSchema = z.object({
  memberId: uuid,
  role: roleSchema,
});

export const removeMemberSchema = z.object({ memberId: uuid });

export const inviteSchema = z.object({ email, role: roleSchema });

export type ChangeRoleInput = z.infer<typeof changeRoleSchema>;
