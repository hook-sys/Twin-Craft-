import type { Actor, CompanyRole } from "@/types";

/**
 * Everything a person can do, and which company role may do it.
 * A SUPER_ADMIN passes every check; nobody else bypasses this table.
 */
export const permissions = {
  "company:read": ["OWNER", "ADMIN", "STAFF"],
  "company:update": ["OWNER", "ADMIN"],
  "company:delete": ["OWNER"],
  "member:read": ["OWNER", "ADMIN", "STAFF"],
  "member:invite": ["OWNER", "ADMIN"],
  "member:role": ["OWNER"],
  "member:remove": ["OWNER", "ADMIN"],
  "website:read": ["OWNER", "ADMIN", "STAFF"],
  "website:update": ["OWNER", "ADMIN"],
  "website:publish": ["OWNER", "ADMIN"],
  "crm:read": ["OWNER", "ADMIN", "STAFF"],
  "crm:write": ["OWNER", "ADMIN", "STAFF"],
  "inventory:read": ["OWNER", "ADMIN", "STAFF"],
  "inventory:write": ["OWNER", "ADMIN", "STAFF"],
  "accounts:read": ["OWNER", "ADMIN"],
  "accounts:write": ["OWNER", "ADMIN"],
  "hr:read": ["OWNER", "ADMIN"],
  "hr:write": ["OWNER", "ADMIN"],
  "billing:read": ["OWNER", "ADMIN"],
  "billing:manage": ["OWNER"],
  "audit:read": ["OWNER", "ADMIN"],
} satisfies Record<string, CompanyRole[]>;

export type Permission = keyof typeof permissions;

export function can(actor: Actor, permission: Permission): boolean {
  if (actor.user.role === "SUPER_ADMIN") return true;
  if (!actor.membership) return false;
  return (permissions[permission] as readonly CompanyRole[]).includes(
    actor.membership.role,
  );
}

export function isSuperAdmin(actor: Pick<Actor, "user">): boolean {
  return actor.user.role === "SUPER_ADMIN";
}

/** Role labels for the UI. */
export const roleLabels: Record<CompanyRole, { bn: string; en: string }> = {
  OWNER: { bn: "মালিক", en: "Owner" },
  ADMIN: { bn: "অ্যাডমিন", en: "Admin" },
  STAFF: { bn: "স্টাফ", en: "Staff" },
};
