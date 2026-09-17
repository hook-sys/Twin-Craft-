import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { requireCompany } from "@/lib/auth/guards";
import { can } from "@/lib/permissions";
import { formatDate } from "@/lib/utils/format";
import CompanyForm from "./company-form";

export const metadata: Metadata = { title: "কোম্পানি / Company" };

export default async function CompanySettingsPage() {
  const actor = await requireCompany();
  const editable = can(actor, "company:update");

  return (
    <>
      <PageHeader
        title="কোম্পানির তথ্য / Company"
        description="নাম, যোগাযোগ ও প্ল্যান।"
      />

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <Card>
          <CardHeader title="মূল তথ্য / Details" />
          <CardBody>
            {editable ? (
              <CompanyForm company={actor.company} />
            ) : (
              <Alert tone="brand">
                শুধু মালিক ও অ্যাডমিন কোম্পানির তথ্য বদলাতে পারেন. / Only owners
                and admins can edit these details.
              </Alert>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="প্ল্যান ও অবস্থা / Plan & status" />
          <CardBody>
            <dl className="space-y-4 text-sm">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-ink-soft">ওয়ার্কস্পেস ঠিকানা</dt>
                <dd className="font-semibold">/{actor.company.slug}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-ink-soft">প্ল্যান</dt>
                <dd>
                  <Badge tone="brand">{actor.company.plan.toUpperCase()}</Badge>
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-ink-soft">অবস্থা</dt>
                <dd>
                  <Badge
                    tone={actor.company.status === "active" ? "success" : "warning"}
                  >
                    {actor.company.status}
                  </Badge>
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-ink-soft">তৈরি</dt>
                <dd className="font-semibold">
                  {formatDate(actor.company.created_at, "en")}
                </dd>
              </div>
            </dl>

            <p className="mt-5 text-xs text-ink-muted">
              প্ল্যান বদলানো যাবে বিলিং থেকে — কোম্পানি নিজে বদলাতে পারে না।
              Plan and status are set by billing, never by the company itself.
            </p>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
