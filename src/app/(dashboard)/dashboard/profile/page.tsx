import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { requireUser } from "@/lib/auth/guards";
import { formatDate } from "@/lib/utils/format";
import ProfileForm from "./profile-form";

export const metadata: Metadata = { title: "প্রোফাইল / Profile" };

export default async function ProfilePage() {
  const actor = await requireUser();

  return (
    <>
      <PageHeader
        title="আমার প্রোফাইল / My profile"
        description="আপনার নাম, ফোন ও ভাষা।"
      />

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <Card>
          <CardHeader title="তথ্য / Details" />
          <CardBody>
            <ProfileForm user={actor.user} />
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="অ্যাকাউন্ট / Account" />
          <CardBody>
            <dl className="space-y-4 text-sm">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-ink-soft">ইমেইল</dt>
                <dd className="truncate font-semibold">{actor.user.email}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-ink-soft">প্ল্যাটফর্ম ভূমিকা</dt>
                <dd>
                  <Badge tone={actor.user.role === "SUPER_ADMIN" ? "brand" : "neutral"}>
                    {actor.user.role}
                  </Badge>
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-ink-soft">যোগ দিয়েছেন</dt>
                <dd className="font-semibold">
                  {formatDate(actor.user.created_at, "en")}
                </dd>
              </div>
            </dl>

            <p className="mt-5 text-xs text-ink-muted">
              ইমেইল ও ভূমিকা এখান থেকে বদলানো যায় না। / Email and role are not
              editable here.
            </p>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
