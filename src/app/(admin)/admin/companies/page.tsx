import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Table, Td, Th } from "@/components/ui/table";
import { EmptyState } from "@/components/ui/states";
import { requireSuperAdmin } from "@/lib/auth/guards";
import { formatDate } from "@/lib/utils/format";
import * as companies from "@/modules/companies/repository";

export const metadata: Metadata = { title: "কোম্পানি / Companies" };

const PER_PAGE = 25;

export default async function AdminCompaniesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  await requireSuperAdmin();

  const params = await searchParams;
  const page = Math.max(1, Number(params.page ?? 1) || 1);
  const { rows, total } = await companies.list({
    page,
    perPage: PER_PAGE,
    search: params.q,
  });

  return (
    <>
      <PageHeader
        title="সব কোম্পানি / All companies"
        description={`${total} টি কোম্পানি`}
      />

      <Card className="mt-6 overflow-hidden">
        {rows.length === 0 ? (
          <EmptyState
            title="কোনো কোম্পানি নেই / No companies yet"
            description="কেউ সাইনআপ করে কোম্পানি তৈরি করলে এখানে দেখা যাবে।"
          />
        ) : (
          <Table
            head={
              <tr>
                <Th>নাম / Name</Th>
                <Th>ঠিকানা / Slug</Th>
                <Th>প্ল্যান / Plan</Th>
                <Th>অবস্থা / Status</Th>
                <Th>তৈরি / Created</Th>
              </tr>
            }
          >
            {rows.map((company) => (
              <tr key={company.id} className="hover:bg-surface-muted/60">
                <Td className="font-semibold text-ink">{company.name}</Td>
                <Td>/{company.slug}</Td>
                <Td>
                  <Badge tone="brand">{company.plan.toUpperCase()}</Badge>
                </Td>
                <Td>
                  <Badge tone={company.status === "active" ? "success" : "warning"}>
                    {company.status}
                  </Badge>
                </Td>
                <Td>{formatDate(company.created_at, "en")}</Td>
              </tr>
            ))}
          </Table>
        )}
      </Card>

      <Pagination page={page} total={total} basePath="/admin/companies" />
    </>
  );
}

function Pagination({
  page,
  total,
  basePath,
}: {
  page: number;
  total: number;
  basePath: string;
}) {
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));
  if (pages === 1) return null;

  return (
    <nav className="mt-4 flex items-center gap-2 text-sm">
      {Array.from({ length: pages }).map((_, index) => (
        <a
          key={index}
          href={`${basePath}?page=${index + 1}`}
          className={
            index + 1 === page
              ? "rounded-lg bg-brand px-3 py-1.5 font-semibold text-white"
              : "rounded-lg px-3 py-1.5 text-ink-soft hover:bg-surface-muted"
          }
        >
          {index + 1}
        </a>
      ))}
    </nav>
  );
}
