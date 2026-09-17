import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ClockIcon } from "@/components/app/icons";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { buttonClass } from "@/components/ui/button";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/states";
import { routes } from "@/config/app";
import { requireCompany } from "@/lib/auth/guards";
import { can } from "@/lib/permissions";
import { roleLabels } from "@/lib/permissions";
import { formatDate } from "@/lib/utils/format";
import * as audit from "@/modules/audit/repository";
import { auditLabel } from "@/modules/audit/labels";
import * as members from "@/modules/members/repository";

export const metadata: Metadata = { title: "ওভারভিউ / Overview" };

export default async function DashboardPage() {
  const actor = await requireCompany();

  const [team, activity] = await Promise.all([
    members.listByCompany(actor.company.id),
    can(actor, "audit:read")
      ? audit.listByCompany(actor.company.id, 6)
      : Promise.resolve([]),
  ]);

  const name = actor.user.full_name?.trim() || actor.user.email.split("@")[0];

  const stats = [
    {
      label: "টিম মেম্বার / Team members",
      value: String(team.length),
      href: routes.team,
    },
    {
      label: "আপনার ভূমিকা / Your role",
      value: roleLabels[actor.membership.role].en,
      href: routes.team,
    },
    {
      label: "প্ল্যান / Plan",
      value: actor.company.plan.toUpperCase(),
      href: routes.companySettings,
    },
    {
      label: "তৈরি হয়েছে / Created",
      value: formatDate(actor.company.created_at, "en"),
      href: routes.companySettings,
    },
  ];

  return (
    <>
      <PageHeader
        title={`স্বাগতম, ${name}!`}
        description={`${actor.company.name} — এখান থেকে পুরো ব্যবসা চালাবেন।`}
        action={
          <Badge tone={actor.company.status === "active" ? "success" : "warning"}>
            {actor.company.status}
          </Badge>
        }
      />

      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="h-full p-5 transition hover:border-brand">
              <p className="truncate text-sm text-ink-soft">{stat.label}</p>
              <p className="mt-1.5 text-2xl font-bold">{stat.value}</p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_1fr]">
        <Card>
          <CardHeader
            title="সাম্প্রতিক কাজ / Recent activity"
            description="এই কোম্পানিতে যা যা হয়েছে"
          />
          {activity.length === 0 ? (
            <EmptyState
              title="এখনো কিছু হয়নি / Nothing yet"
              description="আপনি বা আপনার টিম কিছু করলেই এখানে দেখা যাবে।"
              icon={<ClockIcon className="h-6 w-6" />}
            />
          ) : (
            <ul className="divide-y divide-line">
              {activity.map((entry) => (
                <li
                  key={entry.id}
                  className="flex items-center gap-3 px-5 py-3.5 text-sm"
                >
                  <span className="min-w-0 flex-1 truncate font-medium">
                    {auditLabel(entry.action)}
                  </span>
                  <span className="shrink-0 text-xs text-ink-muted">
                    {formatDate(entry.created_at, "en")}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <CardHeader title="পরের ধাপ / Next steps" />
          <CardBody className="space-y-3">
            <p className="text-sm text-ink-soft">
              ফাউন্ডেশন তৈরি — কোম্পানি, টিম ও অনুমতি এখন কাজ করছে। ওয়েবসাইট
              বিল্ডার, সিআরএম, ইনভেন্টরি ও হিসাব পরের ধাপে যুক্ত হবে।
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href={routes.team} className={buttonClass("primary", "sm")}>
                টিম দেখুন
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={routes.companySettings}
                className={buttonClass("secondary", "sm")}
              >
                কোম্পানির তথ্য
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
