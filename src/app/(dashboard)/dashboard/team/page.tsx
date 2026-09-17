import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Table, Td, Th } from "@/components/ui/table";
import { requireCompany } from "@/lib/auth/guards";
import { can, roleLabels } from "@/lib/permissions";
import { formatDate, initials } from "@/lib/utils/format";
import * as members from "@/modules/members/service";
import MemberRow from "./member-row";

export const metadata: Metadata = { title: "টিম / Team" };

export default async function TeamPage() {
  const actor = await requireCompany();
  const team = await members.listMembers(actor, actor.company.id);
  const mayChangeRole = can(actor, "member:role");
  const mayRemove = can(actor, "member:remove");

  return (
    <>
      <PageHeader
        title="টিম / Team"
        description={`${actor.company.name}-এ কে কী করতে পারে।`}
      />

      {!mayChangeRole && (
        <Alert tone="brand" className="mt-5">
          ভূমিকা বদলাতে পারেন শুধু মালিক। / Only an owner can change roles.
        </Alert>
      )}

      <Card className="mt-5 overflow-hidden">
        <Table
          head={
            <tr>
              <Th>সদস্য / Member</Th>
              <Th>ভূমিকা / Role</Th>
              <Th>যোগ দিয়েছেন / Joined</Th>
              <Th className="text-right">—</Th>
            </tr>
          }
        >
          {team.map((member) => (
            <tr key={member.id} className="hover:bg-surface-muted/60">
              <Td>
                <span className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand-ink">
                    {initials(member.user?.full_name ?? member.user?.email ?? "?")}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-semibold text-ink">
                      {member.user?.full_name ?? "—"}
                      {member.user_id === actor.user.id && (
                        <span className="ml-2 text-xs text-ink-muted">(আপনি)</span>
                      )}
                    </span>
                    <span className="block truncate text-xs text-ink-muted">
                      {member.user?.email}
                    </span>
                  </span>
                </span>
              </Td>
              <Td>
                <Badge tone={member.role === "OWNER" ? "brand" : "neutral"}>
                  {roleLabels[member.role].en}
                </Badge>
              </Td>
              <Td>{formatDate(member.created_at, "en")}</Td>
              <Td className="text-right">
                <MemberRow
                  memberId={member.id}
                  role={member.role}
                  canChangeRole={mayChangeRole}
                  canRemove={mayRemove && member.user_id !== actor.user.id}
                />
              </Td>
            </tr>
          ))}
        </Table>
      </Card>

      <p className="mt-4 text-sm text-ink-muted">
        টিমে নতুন সদস্য যোগ করার ইনভাইট সিস্টেম পরের ধাপে আসছে। / Member invites
        arrive in the next phase.
      </p>
    </>
  );
}
