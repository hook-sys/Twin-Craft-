import Link from "next/link";
import { ArrowRight } from "@/components/dashboard/icons";
import ModuleIcon from "@/components/dashboard/module-icon";
import { fmtDate } from "@/lib/erp/format";
import { uiLabels } from "@/lib/i18n";
import { getLang } from "@/lib/lang";
import { createClient } from "@/lib/supabase/server";
import { saveProfile } from "./actions";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 outline-none focus:border-blue-400";

export default async function AccountPage() {
  const lang = await getLang();
  const t = uiLabels(lang);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone, company, plan")
    .eq("id", user?.id ?? "")
    .maybeSingle();

  const { data: site } = await supabase
    .from("sites")
    .select("slug, template")
    .eq("owner_id", user?.id ?? "")
    .maybeSingle();

  return (
    <>
      <div className="flex items-start gap-3.5">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <ModuleIcon name="account" className="h-6 w-6" />
        </span>
        <div>
          <h1 className="text-[26px] font-bold leading-tight sm:text-[30px]">
            {t.navAccount}
          </h1>
          <p className="mt-1 text-slate-500">{user?.email}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-[17px] font-bold">{t.basicsSection}</h2>
          <form action={saveProfile} className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="font-semibold">{t.businessName}</span>
              <input
                name="full_name"
                defaultValue={profile?.full_name ?? ""}
                className={inputClass}
              />
            </label>
            <label className="block text-sm">
              <span className="font-semibold">{t.phoneLabel}</span>
              <input
                name="phone"
                defaultValue={profile?.phone ?? ""}
                className={inputClass}
              />
            </label>
            <label className="block text-sm sm:col-span-2">
              <span className="font-semibold">{t.sidebarCardTitle}</span>
              <input
                name="company"
                defaultValue={profile?.company ?? ""}
                className={inputClass}
              />
            </label>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                {t.save}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-[17px] font-bold">{t.navSubscriptions}</h2>
          <dl className="mt-5 space-y-4 text-sm">
            <div className="flex items-center justify-between gap-3">
              <dt className="text-slate-500">{t.emailLabel}</dt>
              <dd className="truncate font-semibold">{user?.email}</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-slate-500">{t.navSubscriptions}</dt>
              <dd className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                {(profile?.plan ?? "free").toUpperCase()}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-slate-500">{t.yourSite}</dt>
              <dd className="font-semibold">
                {site ? (
                  <Link
                    href={`/s/${site.slug}`}
                    target="_blank"
                    className="text-blue-600"
                  >
                    /s/{site.slug}
                  </Link>
                ) : (
                  "—"
                )}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-slate-500">{t.actSiteCreated}</dt>
              <dd className="font-semibold">
                {fmtDate(user?.created_at ?? null, lang)}
              </dd>
            </div>
          </dl>

          <Link
            href="/dashboard/subscriptions"
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold transition hover:bg-slate-50"
          >
            {t.navSubscriptions}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </>
  );
}
