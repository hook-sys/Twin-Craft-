import "server-only";
import { createServerDb } from "@/lib/db/server";
import type { CompanyMember, CompanyMemberWithUser, CompanyRole } from "@/types";

const COLUMNS = "id, company_id, user_id, role, created_at, updated_at";

export async function listByCompany(
  companyId: string,
): Promise<CompanyMemberWithUser[]> {
  const db = await createServerDb();
  const { data } = await db
    .from("company_members")
    .select(`${COLUMNS}, user:users (id, email, full_name, avatar_url)`)
    .eq("company_id", companyId)
    .order("created_at", { ascending: true });

  return (data ?? []) as unknown as CompanyMemberWithUser[];
}

export async function findById(id: string): Promise<CompanyMember | null> {
  const db = await createServerDb();
  const { data } = await db
    .from("company_members")
    .select(COLUMNS)
    .eq("id", id)
    .maybeSingle();

  return (data as CompanyMember | null) ?? null;
}

export async function findFor(
  companyId: string,
  userId: string,
): Promise<CompanyMember | null> {
  const db = await createServerDb();
  const { data } = await db
    .from("company_members")
    .select(COLUMNS)
    .eq("company_id", companyId)
    .eq("user_id", userId)
    .maybeSingle();

  return (data as CompanyMember | null) ?? null;
}

export async function insert(input: {
  companyId: string;
  userId: string;
  role: CompanyRole;
}): Promise<CompanyMember | null> {
  const db = await createServerDb();
  const { data } = await db
    .from("company_members")
    .insert({
      company_id: input.companyId,
      user_id: input.userId,
      role: input.role,
    })
    .select(COLUMNS)
    .maybeSingle();

  return (data as CompanyMember | null) ?? null;
}

export async function updateRole(
  id: string,
  role: CompanyRole,
): Promise<CompanyMember | null> {
  const db = await createServerDb();
  const { data } = await db
    .from("company_members")
    .update({ role })
    .eq("id", id)
    .select(COLUMNS)
    .maybeSingle();

  return (data as CompanyMember | null) ?? null;
}

export async function remove(id: string): Promise<void> {
  const db = await createServerDb();
  await db.from("company_members").delete().eq("id", id);
}

export async function countOwners(companyId: string): Promise<number> {
  const db = await createServerDb();
  const { count } = await db
    .from("company_members")
    .select("id", { count: "exact", head: true })
    .eq("company_id", companyId)
    .eq("role", "OWNER");

  return count ?? 0;
}
