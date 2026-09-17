import "server-only";
import { createServerDb } from "@/lib/db/server";
import type { User } from "@/types";

const COLUMNS = "id, email, full_name, phone, avatar_url, role, locale, created_at, updated_at, deleted_at";

export async function findById(id: string): Promise<User | null> {
  const db = await createServerDb();
  const { data } = await db
    .from("users")
    .select(COLUMNS)
    .eq("id", id)
    .is("deleted_at", null)
    .maybeSingle();

  return (data as User | null) ?? null;
}

export async function updateProfile(
  id: string,
  patch: Partial<Pick<User, "full_name" | "phone" | "avatar_url" | "locale">>,
): Promise<User | null> {
  const db = await createServerDb();
  const { data } = await db
    .from("users")
    .update(patch)
    .eq("id", id)
    .select(COLUMNS)
    .maybeSingle();

  return (data as User | null) ?? null;
}

/** Super-admin listing. Paginated because this table only grows. */
export async function list({
  page = 1,
  perPage = 25,
  search,
}: {
  page?: number;
  perPage?: number;
  search?: string;
}): Promise<{ rows: User[]; total: number }> {
  const db = await createServerDb();
  const from = (page - 1) * perPage;

  let query = db
    .from("users")
    .select(COLUMNS, { count: "exact" })
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .range(from, from + perPage - 1);

  if (search) {
    query = query.or(`email.ilike.%${search}%,full_name.ilike.%${search}%`);
  }

  const { data, count } = await query;
  return { rows: (data ?? []) as User[], total: count ?? 0 };
}
