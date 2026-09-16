import Link from "next/link";
import LanguageSwitch from "@/components/language-switch";
import {
  Arrow,
  Backdrop,
  Bell,
  Bolt,
  BrandMark,
  Clock,
  FileStack,
  Layers,
  ShieldCheck,
  Star,
  Users,
} from "@/components/marketing/chrome";
import { HeroMockup } from "@/components/marketing/hero-mockup";
import type { Lang, UiLabels } from "@/lib/i18n";

/**
 * The left-hand marketing column and page chrome shared by login and signup,
 * so both pages carry exactly the landing page's design.
 */
export default function AuthShell({
  lang,
  t,
  titleA,
  titleB,
  altPrompt,
  altLabel,
  altHref,
  children,
}: {
  lang: Lang;
  t: UiLabels;
  titleA: string;
  titleB: string;
  altPrompt: string;
  altLabel: string;
  altHref: string;
  children: React.ReactNode;
}) {
  const trust = [
    {
      icon: <Bolt className="h-4 w-4" />,
      tone: "bg-indigo-100 text-indigo-600",
      title: t.trustNoCoding,
      sub: t.trustNoCodingSub,
    },
    {
      icon: <Layers className="h-4 w-4" />,
      tone: "bg-sky-100 text-sky-600",
      title: t.trustTemplates,
      sub: t.trustTemplatesSub,
    },
    {
      icon: <ShieldCheck className="h-4 w-4" />,
      tone: "bg-emerald-100 text-emerald-600",
      title: t.trustFree,
      sub: t.trustFreeSub,
    },
  ];

  const stats = [
    {
      icon: <Users className="h-4 w-4" />,
      tone: "bg-teal-100 text-teal-600",
      value: t.stat1Value,
      label: t.stat1Label,
      stars: false,
    },
    {
      icon: <FileStack className="h-4 w-4" />,
      tone: "bg-sky-100 text-sky-600",
      value: t.stat2Value,
      label: t.stat2Label,
      stars: false,
    },
    {
      icon: <Bell className="h-4 w-4" />,
      tone: "bg-violet-100 text-violet-600",
      value: t.stat3Value,
      label: t.stat3Label,
      stars: true,
    },
    {
      icon: <Clock className="h-4 w-4" />,
      tone: "bg-amber-100 text-amber-600",
      value: t.stat4Value,
      label: t.stat4Label,
      stars: false,
    },
  ];

  return (
    <main className="flex-1 overflow-x-clip text-slate-900">
      <Backdrop />

      <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
        {/* same glass bar as the landing page */}
        <header className="mt-5 rounded-[26px] border border-white/70 bg-white/70 px-4 py-2.5 shadow-[0_20px_60px_-35px_rgba(30,41,80,0.45)] backdrop-blur-xl sm:px-5">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex shrink-0 items-center gap-2">
              <BrandMark
                className="h-9 w-9 text-base"
                letter={lang === "en" ? "P" : "প"}
              />
              <span className="text-lg font-bold">{t.brandName}</span>
            </Link>

            <div className="ml-auto flex items-center gap-2">
              <LanguageSwitch current={lang} />
              <Link
                href="/"
                className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:block"
              >
                {t.backHome}
              </Link>
              <Link
                href={altHref}
                className="inline-flex items-center gap-2 rounded-full bg-[#101a3d] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-[#1b2a58]"
              >
                {altLabel}
                <Arrow className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </header>

        <div className="grid items-center gap-10 py-10 lg:grid-cols-[1fr_0.85fr] lg:py-14">
          {/* marketing column */}
          <div className="hidden min-w-0 lg:block">
            <span className="inline-flex items-center rounded-full border border-white/70 bg-white/80 px-4 py-1.5 text-sm font-medium text-slate-600 shadow-sm backdrop-blur">
              {t.heroBadge}
            </span>

            <h1 className="mt-6 text-[2.5rem] font-extrabold leading-[1.1] tracking-tight xl:text-5xl">
              <span className="block">{titleA}</span>
              <span className="block bg-gradient-to-r from-[#7dd3fc] via-[#818cf8] to-[#a855f7] bg-clip-text text-transparent">
                {titleB}
              </span>
            </h1>

            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-slate-600">
              {t.heroSubtitle}
            </p>

            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-5">
              {trust.map((item) => (
                <div key={item.title} className="flex items-center gap-2.5">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-xl ${item.tone}`}
                  >
                    {item.icon}
                  </span>
                  <div className="leading-tight">
                    <dt className="text-[13px] font-semibold">{item.title}</dt>
                    <dd className="text-[13px] text-slate-500">{item.sub}</dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="mt-10 hidden xl:block">
              <HeroMockup t={t} />
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 xl:hidden">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 rounded-[20px] border border-white/70 bg-white/85 px-4 py-3 shadow-[0_20px_50px_-40px_rgba(30,41,80,0.6)]"
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${stat.tone}`}
                  >
                    {stat.icon}
                  </span>
                  <div className="min-w-0 leading-tight">
                    <p className="flex items-center gap-1.5 text-base font-extrabold">
                      {stat.value}
                      {stat.stars && (
                        <span className="flex gap-0.5 text-amber-400">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star key={index} className="h-2.5 w-2.5" />
                          ))}
                        </span>
                      )}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* form column */}
          <div className="min-w-0">
            <div className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-[0_35px_90px_-45px_rgba(30,41,80,0.75)] backdrop-blur-xl sm:p-9">
              {children}

              <p className="mt-7 text-center text-sm text-slate-600">
                {altPrompt}{" "}
                <Link href={altHref} className="font-semibold text-slate-900">
                  {altLabel}
                </Link>
              </p>
            </div>

            <p className="mt-5 text-center text-sm lg:hidden">
              <Link href="/" className="text-slate-500 hover:text-slate-900">
                {t.backHome}
              </Link>
            </p>
          </div>
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-white/60 py-8 text-sm text-slate-500">
          <p>
            © {new Date().getFullYear()} {t.brandName}. {t.footerNote}
          </p>
          <div className="flex gap-5">
            <Link href="/login" className="hover:text-slate-900">
              {t.signIn}
            </Link>
            <Link href="/signup" className="hover:text-slate-900">
              {t.getStartedFree}
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
