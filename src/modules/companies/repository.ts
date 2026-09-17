import "server-only";
import { createServerDb } from "@/lib/db/server";
import type { Company, CompanyMember } from "@/types";

const COLUMNS =
  "id, name, slug, phone, address, logo_url, plan, status, created_by, created_at, updated_at, deleted_at";

export async function findById(id: string): Promise<Company | null> {
  const db = await createServerDb();
  const { data } = await db
    .from("companies")
    .select(COLUMNS)
    .eq("id", id)
    .is("deleted_at", null)
    .maybeSingle();

  return (data as Company | null) ?? null;
}

export async function slugExists(slug: string): Promise<boolean> {
  const db = await createServerDb();
  const { data } = await db
    .from("companies")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  return Boolean(data);
}

export async function insert(input: {
  name: string;
  slug: string;
  phone?: string;
  address?: string;
  createdBy: string;
}): Promise<{ company: Company | null; conflict: boolean }> {
  const db = await createServerDb();
  const { data, error } = await db
    .from("companies")
    .insert({
      name: input.name,
      slug: input.slug,
      phone: input.phone ?? null,
      address: input.address ?? null,
      created_by: input.createdBy,
    })
    .select(COLUMNS)
    .maybeSingle();

  if (error) {
    return { company: null, conflict: error.code === "23505" };
  }

  return { company: (data as Company | null) ?? null, conflict: false };
}

export async function update(
  id: string,
  patch: Partial<Pick<Company, "name" | "phone" | "address" | "logo_url">>,
): Promise<Company | null> {
  const db = await createServerDb();
  const { data } = await db
    .from("companies")
    .update(patch)
    .eq("id", id)
    .select(COLUMNS)
    .maybeSingle();

  return (data as Company | null) ?? null;
}

/** Companies this person belongs to, with the membership that grants access. */
export async function listForUser(
  userId: string,
): Promise<Array<{ company: Company; membership: CompanyMember }>> {
  const db = await createServerDb();
  const { data } = await db
    .from("company_members")
    .select(`id, company_id, user_id, role, created_at, updated_at, company:companies (${COLUMNS})`)
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  const rows = (data ?? []) as unknown as Array<
    CompanyMember & { company: Company | null }
  >;

  return rows
    .filter((row) => row.company && !row.company.deleted_at)
    .map(({ company, ...membership }) => ({
      company: company as Company,
      membership,
    }));
}

/** Super-admin listing. */
export async function list({
  page = 1,
  perPage = 25,
  search,
}: {
  page?: number;
  perPage?: number;
  search?: string;
}): Promise<{ rows: Company[]; total: number }> {
  const db = await createServerDb();
  const from = (page - 1) * perPage;

  let query = db
    .from("companies")
    .select(COLUMNS, { count: "exact" })
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .range(from, from + perPage - 1);

  if (search) {
    query = query.or(`name.ilike.%${search}%,slug.ilike.%${search}%`);
  }

  const { data, count } = await query;
  return { rows: (data ?? []) as Company[], total: count ?? 0 };
}
