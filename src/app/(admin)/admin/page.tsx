import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { routes } from "@/config/app";
import { requireSuperAdmin } from "@/lib/auth/guards";
import * as companies from "@/modules/companies/repository";
import * as users from "@/modules/users/repository";

export const metadata: Metadata = { title: "অ্যাডমিন / Admin" };

export default async function AdminHomePage() {
  await requireSuperAdmin();

  const [companyPage, userPage] = await Promise.all([
    companies.list({ page: 1, perPage: 1 }),
    users.list({ page: 1, perPage: 1 }),
  ]);

  const stats = [
    {
      label: "মোট কোম্পানি / Companies",
      value: companyPage.total,
      href: routes.adminCompanies,
    },
    { label: "মোট ইউজার / Users", value: userPage.total, href: routes.adminUsers },
  ];

  return (
    <>
      <PageHeader
        title="প্ল্যাটফর্ম অ্যাডমিন / Platform admin"
        description="পুরো Aladeen-এর হিসাব এক জায়গায়।"
      />

      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="h-full p-5 transition hover:border-brand">
              <p className="truncate text-sm text-ink-soft">{stat.label}</p>
              <p className="mt-1.5 text-3xl font-bold">{stat.value}</p>
            </Card>
          </Link>
        ))}
      </div>

      <p className="mt-6 text-sm text-ink-muted">
        টেমপ্লেট ম্যানেজমেন্ট, সাবস্ক্রিপশন ও প্ল্যাটফর্ম রিপোর্ট পরের ধাপে।
        / Template management, subscriptions and platform reports come next.
      </p>
    </>
  );
}
