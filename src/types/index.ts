export type AppRole = "SUPER_ADMIN" | "USER";
export type CompanyRole = "OWNER" | "ADMIN" | "STAFF";
export type CompanyStatus = "active" | "suspended";
export type PlanTier = "free" | "pro";

export type User = {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: AppRole;
  locale: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type Company = {
  id: string;
  name: string;
  slug: string;
  phone: string | null;
  address: string | null;
  logo_url: string | null;
  plan: PlanTier;
  status: CompanyStatus;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type CompanyMember = {
  id: string;
  company_id: string;
  user_id: string;
  role: CompanyRole;
  created_at: string;
  updated_at: string;
};

export type CompanyMemberWithUser = CompanyMember & {
  user: Pick<User, "id" | "email" | "full_name" | "avatar_url">;
};

export type AuditLog = {
  id: string;
  company_id: string | null;
  actor_id: string | null;
  action: string;
  entity: string;
  entity_id: string | null;
  detail: Record<string, unknown>;
  created_at: string;
};

/** Who is asking, and on behalf of which company. Passed into every service. */
export type Actor = {
  user: User;
  company: Company | null;
  membership: CompanyMember | null;
};
