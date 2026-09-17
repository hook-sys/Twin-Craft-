import Link from "next/link";
import LanguageSwitch from "@/components/language-switch";
import { ArrowRight } from "@/components/dashboard/icons";
import ModuleIcon from "@/components/dashboard/module-icon";
import { uiLabels } from "@/lib/i18n";
import { getLang } from "@/lib/lang";
import { createClient } from "@/lib/supabase/server";
import { getTemplate } from "@/lib/templates";

export default async function SettingsPage() {
  const lang = await getLang();
  const t = uiLabels(lang);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: site } = await supabase
    .from("sites")
    .select("slug, template")
    .eq("owner_id", user?.id ?? "")
    .maybeSingle();

  const links = [
    { label: t.editContent, href: "/dashboard/edit", icon: "site" },
    { label: t.changeDesign, href: "/dashboard/gallery", icon: "design" },
    { label: t.navAccount, href: "/dashboard/account", icon: "account" },
    { label: t.navSubscriptions, href: "/dashboard/subscriptions", icon: "subscriptions" },
  ];

  return (
    <>
      <div className="flex items-start gap-3.5">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <ModuleIcon name="settings" className="h-6 w-6" />
        </span>
        <div>
          <h1 className="text-[26px] font-bold leading-tight sm:text-[30px]">
            {t.navSettings}
          </h1>
          <p className="mt-1 text-slate-500">{t.editSubtitle}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-[17px] font-bold">{t.panelLanguage}</h2>
          <p className="mt-1.5 text-sm text-slate-500">{t.siteLanguageHint}</p>
          <div className="mt-4">
            <LanguageSwitch current={lang} />
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-[17px] font-bold">{t.yourSite}</h2>
          {site ? (
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-slate-500">{t.siteAddress}</dt>
                <dd className="font-semibold">
                  <Link
                    href={`/s/${site.slug}`}
                    target="_blank"
                    className="text-blue-600"
                  >
                    /s/{site.slug}
                  </Link>
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-slate-500">{t.design}</dt>
                <dd className="font-semibold">
                  {getTemplate(site.template).name}
                </dd>
              </div>
            </dl>
          ) : (
            <p className="mt-4 text-sm text-slate-500">{t.noSiteBody}</p>
          )}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">
          <h2 className="text-[17px] font-bold">{t.quickTitle}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3.5 text-sm font-semibold transition hover:bg-slate-50"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <ModuleIcon name={link.icon} className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1 truncate">{link.label}</span>
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
