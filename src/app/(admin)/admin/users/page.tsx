import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Table, Td, Th } from "@/components/ui/table";
import { EmptyState } from "@/components/ui/states";
import { requireSuperAdmin } from "@/lib/auth/guards";
import { formatDate, initials } from "@/lib/utils/format";
import * as users from "@/modules/users/repository";

export const metadata: Metadata = { title: "ইউজার / Users" };

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  await requireSuperAdmin();

  const params = await searchParams;
  const page = Math.max(1, Number(params.page ?? 1) || 1);
  const { rows, total } = await users.list({ page, perPage: 25, search: params.q });

  return (
    <>
      <PageHeader title="সব ইউজার / All users" description={`${total} জন ইউজার`} />

      <Card className="mt-6 overflow-hidden">
        {rows.length === 0 ? (
          <EmptyState title="কোনো ইউজার নেই / No users yet" />
        ) : (
          <Table
            head={
              <tr>
                <Th>নাম / Name</Th>
                <Th>ইমেইল / Email</Th>
                <Th>ভূমিকা / Role</Th>
                <Th>যোগ দিয়েছেন / Joined</Th>
              </tr>
            }
          >
            {rows.map((user) => (
              <tr key={user.id} className="hover:bg-surface-muted/60">
                <Td>
                  <span className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand-ink">
                      {initials(user.full_name ?? user.email)}
                    </span>
                    <span className="truncate font-semibold text-ink">
                      {user.full_name ?? "—"}
                    </span>
                  </span>
                </Td>
                <Td>{user.email}</Td>
                <Td>
                  <Badge tone={user.role === "SUPER_ADMIN" ? "brand" : "neutral"}>
                    {user.role}
                  </Badge>
                </Td>
                <Td>{formatDate(user.created_at, "en")}</Td>
              </tr>
            ))}
          </Table>
        )}
      </Card>
    </>
  );
}
