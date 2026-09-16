import Link from "next/link";
import LanguageSwitch from "@/components/language-switch";
import {
  Backdrop,
  Bolt,
  Brand,
  Glass,
  GradientText,
  IconTile,
  Layers,
  ShieldCheck,
} from "@/components/marketing/chrome";
import { TemplateRenderer } from "@/components/templates";
import { uiLabels } from "@/lib/i18n";
import { getLang } from "@/lib/lang";
import { templates } from "@/lib/templates";
import SignupForm from "./signup-form";

export default async function SignupPage() {
  const lang = await getLang();
  const t = uiLabels(lang);

  const points = [
    {
      icon: <Bolt className="h-5 w-5" />,
      tone: "indigo" as const,
      title: t.trustNoCoding,
      sub: t.trustNoCodingSub,
    },
    {
      icon: <Layers className="h-5 w-5" />,
      tone: "violet" as const,
      title: t.trustTemplates,
      sub: t.trustTemplatesSub,
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      tone: "emerald" as const,
      title: t.trustFree,
      sub: t.trustFreeSub,
    },
  ];

  return (
    <main className="flex-1 text-slate-900">
      <Backdrop />

      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex items-center justify-between gap-4">
          <Brand
            name={t.brandName}
            sub={t.brandSub}
            letter={lang === "en" ? "P" : "প"}
          />
          <LanguageSwitch current={lang} />
        </div>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1.05fr_1fr]">
          <div className="hidden min-w-0 lg:block">
            <h1 className="text-4xl font-bold leading-[1.15]">
              {t.signupSideTitleA}{" "}
              <GradientText>{t.signupSideTitleB}</GradientText>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-slate-600">
              {t.heroSubtitle}
            </p>

            <dl className="mt-10 space-y-6">
              {points.map((point) => (
                <div key={point.title} className="flex items-start gap-4">
                  <IconTile tone={point.tone}>{point.icon}</IconTile>
                  <div>
                    <dt className="font-semibold">{point.title}</dt>
                    <dd className="text-sm text-slate-500">{point.sub}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="mt-10 grid grid-cols-2 gap-4">
              {templates.slice(0, 2).map((template) => (
                <Glass key={template.id} className="overflow-hidden p-2">
                  <div className="h-36 w-full overflow-hidden rounded-xl bg-white">
                    <div className="pointer-events-none h-[880px] w-[800px] origin-top-left scale-[0.29]">
                      <TemplateRenderer
                        template={template.id}
                        content={template.demo(t.demoBusinessName, lang)}
                      />
                    </div>
                  </div>
                </Glass>
              ))}
            </div>
          </div>

          <Glass className="p-8 sm:p-10">
            <div className="flex items-center justify-end gap-3 text-sm">
              <span className="text-slate-500">{t.haveAccount}</span>
              <Link
                href="/login"
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 font-semibold transition hover:bg-slate-50"
              >
                {t.login}
              </Link>
            </div>

            <div className="mt-8">
              <SignupForm t={t} />
            </div>

            <div className="mt-8 grid gap-4 border-t border-slate-200 pt-6 sm:grid-cols-3">
              {points.map((point) => (
                <div key={point.title} className="text-center">
                  <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    {point.icon}
                  </span>
                  <p className="mt-2 text-xs font-semibold">{point.title}</p>
                  <p className="text-xs text-slate-500">{point.sub}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-sm">
              <Link href="/" className="text-slate-500 hover:text-slate-900">
                {t.backHome}
              </Link>
            </p>
          </Glass>
        </div>
      </div>
    </main>
  );
}
