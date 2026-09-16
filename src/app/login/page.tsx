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
import LoginForm from "./login-form";

export default async function LoginPage() {
  const lang = await getLang();
  const t = uiLabels(lang);

  const points = [
    { icon: <Bolt className="h-5 w-5" />, tone: "indigo" as const, title: t.trustNoCoding, sub: t.trustNoCodingSub },
    { icon: <Layers className="h-5 w-5" />, tone: "violet" as const, title: t.trustTemplates, sub: t.trustTemplatesSub },
    { icon: <ShieldCheck className="h-5 w-5" />, tone: "emerald" as const, title: t.trustFree, sub: t.trustFreeSub },
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

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
          <div className="hidden min-w-0 lg:block">
            <h1 className="text-4xl font-bold leading-[1.15]">
              {t.loginSideTitleA}{" "}
              <GradientText>{t.loginSideTitleB}</GradientText>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-slate-600">
              {t.heroSubtitle}
            </p>

            <dl className="mt-10 space-y-5">
              {points.map((point) => (
                <div key={point.title} className="flex items-center gap-4">
                  <IconTile tone={point.tone}>{point.icon}</IconTile>
                  <div>
                    <dt className="font-semibold">{point.title}</dt>
                    <dd className="text-sm text-slate-500">{point.sub}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <Glass className="mt-10 overflow-hidden p-2.5">
              <div className="h-60 w-full overflow-hidden rounded-2xl bg-white">
                <div className="pointer-events-none h-[1500px] w-[1400px] origin-top-left scale-[0.4]">
                  <TemplateRenderer
                    template="retail"
                    content={templates[0].demo(t.demoBusinessName, lang)}
                  />
                </div>
              </div>
            </Glass>
          </div>

          <Glass className="p-8 sm:p-10">
            <div className="flex items-center justify-end gap-3 text-sm">
              <span className="text-slate-500">{t.noAccount}</span>
              <Link
                href="/signup"
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 font-semibold transition hover:bg-slate-50"
              >
                {t.signupTitle}
              </Link>
            </div>

            <div className="mt-8">
              <LoginForm t={t} />
            </div>

            <p className="mt-8 text-center text-sm">
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
