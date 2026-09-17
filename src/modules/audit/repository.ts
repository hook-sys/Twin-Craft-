import "server-only";
import { createServerDb } from "@/lib/db/server";
import type { AuditLog } from "@/types";

const COLUMNS =
  "id, company_id, actor_id, action, entity, entity_id, detail, created_at";

export async function append(entry: {
  companyId: string | null;
  actorId: string;
  action: string;
  entity: string;
  entityId?: string | null;
  detail?: Record<string, unknown>;
}): Promise<void> {
  const db = await createServerDb();
  await db.from("audit_logs").insert({
    company_id: entry.companyId,
    actor_id: entry.actorId,
    action: entry.action,
    entity: entry.entity,
    entity_id: entry.entityId ?? null,
    detail: entry.detail ?? {},
  });
}

export async function listByCompany(
  companyId: string,
  limit = 20,
): Promise<AuditLog[]> {
  const db = await createServerDb();
  const { data } = await db
    .from("audit_logs")
    .select(COLUMNS)
    .eq("company_id", companyId)
    .order("created_at", { ascending: false })
    .limit(limit);

  return (data ?? []) as AuditLog[];
}
