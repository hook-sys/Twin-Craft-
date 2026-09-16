import Link from "next/link";
import LanguageSwitch from "@/components/language-switch";
import {
  Arrow,
  ArrowUpRight,
  Backdrop,
  Bolt,
  BrandMark,
  Clock,
  Layers,
  Menu,
  Play,
  Search,
  ShieldCheck,
  Wallet,
} from "@/components/marketing/chrome";
import { HeroMockup } from "@/components/marketing/hero-mockup";
import { TemplateRenderer } from "@/components/templates";
import { uiLabels } from "@/lib/i18n";
import { getLang } from "@/lib/lang";
import { templates } from "@/lib/templates";

/** Handwritten annotations in the reference art. No webfont needed. */
const script = {
  fontFamily:
    '"Segoe Script","Bradley Hand","Snell Roundhand","Brush Script MT",cursive',
};

export default async function Home() {
  const lang = await getLang();
  const t = uiLabels(lang);
  const showcase = templates.slice(0, 4);
  const wide = lang === "en" ? "tracking-[0.28em]" : "";

  const navLinks = [
    { label: t.navHome, href: "/" },
    { label: t.navTemplates, href: "/signup" },
    { label: t.navFeatures, href: "/signup" },
    { label: t.navPricing, href: "/signup" },
    { label: t.navAbout, href: "/signup" },
  ];

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

  const badges = [
    { label: t.badgeFree, tone: "text-violet-600" },
    { label: t.badgeNew, tone: "text-emerald-600" },
    { label: t.badgeBangla, tone: "text-orange-500" },
    { label: t.badgeModern, tone: "text-indigo-600" },
  ];

  const stats = [
    {
      icon: <Wallet className="h-5 w-5" />,
      tone: "bg-sky-100 text-sky-600",
      value: t.stat1Value,
      label: t.stat1Label,
    },
    {
      icon: <Layers className="h-5 w-5" />,
      tone: "bg-indigo-100 text-indigo-600",
      value: t.stat2Value,
      label: t.stat2Label,
    },
    {
      icon: <Bolt className="h-5 w-5" />,
      tone: "bg-violet-100 text-violet-600",
      value: t.stat3Value,
      label: t.stat3Label,
    },
    {
      icon: <Clock className="h-5 w-5" />,
      tone: "bg-emerald-100 text-emerald-600",
      value: t.stat4Value,
      label: t.stat4Label,
    },
  ];

  return (
    <main className="flex-1 overflow-x-clip text-slate-900">
      <Backdrop />

      <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
        {/* ---------------------------------------------------------- nav */}
        <header className="mt-5 rounded-[26px] border border-white/70 bg-white/70 px-4 py-2.5 shadow-[0_20px_60px_-35px_rgba(30,41,80,0.45)] backdrop-blur-xl sm:px-5">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex shrink-0 items-center gap-2">
              <BrandMark className="h-9 w-9 text-base" letter={lang === "en" ? "P" : "প"} />
              <span className="text-lg font-bold">{t.brandName}</span>
            </Link>

            <nav className="mx-auto hidden items-center gap-1 rounded-full bg-white/60 px-2 py-1 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-slate-900"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <span className="hidden text-slate-500 sm:block" aria-hidden>
                <Search className="h-5 w-5" />
              </span>
              <LanguageSwitch current={lang} />
              <Link
                href="/login"
                className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:block"
              >
                {t.signIn}
              </Link>
              <Link
                href="/signup"
                className="hidden items-center gap-2 rounded-full bg-[#101a3d] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-[#1b2a58] sm:inline-flex"
              >
                {t.getStarted}
                <Arrow className="h-4 w-4" />
              </Link>

              <details className="relative sm:hidden">
                <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full text-slate-700">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">{t.navMenu}</span>
                </summary>
                <div className="absolute right-0 z-40 mt-2 w-52 rounded-2xl border border-white/70 bg-white/95 p-2 shadow-xl backdrop-blur-xl">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-600"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="/login"
                    className="mt-1 block rounded-xl px-3 py-2 text-sm font-semibold"
                  >
                    {t.signIn}
                  </Link>
                  <Link
                    href="/signup"
                    className="mt-1 block rounded-xl bg-[#101a3d] px-3 py-2 text-center text-sm font-semibold text-white"
                  >
                    {t.getStarted}
                  </Link>
                </div>
              </details>
            </div>
          </div>
        </header>

        {/* --------------------------------------------------------- hero */}
        <section className="relative grid items-center gap-12 py-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8 lg:py-16">
          <div className="relative z-10">
            <span className="inline-flex items-center rounded-full border border-white/70 bg-white/80 px-4 py-1.5 text-sm font-medium text-slate-600 shadow-sm backdrop-blur">
              {t.heroBadge}
            </span>

            <h1 className="mt-6 text-[2.6rem] font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.45rem]">
              <span className="block">{t.heroTitleA}</span>
              <span className="block">{t.heroTitleB}</span>
              <span className="block bg-gradient-to-r from-[#7dd3fc] via-[#818cf8] to-[#a855f7] bg-clip-text text-transparent">
                {t.heroTitleC}
              </span>
            </h1>

            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-slate-600">
              {t.heroSubtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-full bg-[#101a3d] px-7 py-4 font-semibold text-white shadow-xl shadow-slate-900/20 transition hover:bg-[#1b2a58]"
              >
                {t.getStartedFree}
                <Arrow className="h-4 w-4" />
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-4 font-semibold text-slate-800 shadow-lg shadow-slate-900/5 transition hover:bg-slate-50"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#101a3d] text-white">
                  <Play className="h-3 w-3" />
                </span>
                {t.watchDemo}
              </Link>
            </div>

            <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-5">
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
          </div>

          <div className="relative hidden md:block">
            <HeroMockup t={t} />
          </div>

          {/* handwritten note, top right of the hero */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-4 -right-24 hidden text-right text-[22px] leading-tight text-slate-500 min-[1440px]:block"
            style={script}
          >
            <span className="block">{t.scriptDrag}</span>
            <span className="block">{t.scriptDrop}</span>
            <span className="block">{t.scriptCustomize}</span>
            <svg
              viewBox="0 0 60 60"
              className="ml-auto mt-1 h-12 w-12 text-slate-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
            >
              <path d="M48 4c6 18 2 34-14 44" />
              <path d="M28 40l6 8 9-4" />
            </svg>
          </div>
        </section>

        {/* ---------------------------------------------------- templates */}
        <section className="relative mb-14 rounded-[36px] border border-white/60 bg-white/55 p-6 shadow-[0_30px_90px_-55px_rgba(30,41,80,0.6)] backdrop-blur-xl sm:p-9">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p
                className={`text-xs font-semibold uppercase text-slate-500 ${wide}`}
              >
                {t.templatesEyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {t.templatesTitle}
              </h2>
              <p className="mt-2 max-w-xl text-[15px] text-slate-600">
                {t.templatesSubtitle}
              </p>
            </div>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold shadow-lg shadow-slate-900/5 transition hover:bg-slate-50"
            >
              {t.viewAllTemplates}
              <Arrow className="h-4 w-4" />
            </Link>
          </div>

          <div className="-mx-1 mt-7 flex gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <span className="shrink-0 rounded-full bg-[#101a3d] px-5 py-2.5 text-sm font-semibold text-white">
              {t.filterAll}
            </span>
            {templates.slice(0, 5).map((template) => (
              <span
                key={template.id}
                className="shrink-0 rounded-full bg-white/90 px-5 py-2.5 text-sm font-medium text-slate-600 shadow-sm"
              >
                {template.name}
              </span>
            ))}
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/90 px-5 py-2.5 text-sm font-medium text-slate-600 shadow-sm">
              {t.filterMore}
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {showcase.map((template, index) => (
              <div
                key={template.id}
                className="min-w-0 overflow-hidden rounded-[26px] border border-white/70 bg-white/85 p-3 shadow-[0_25px_60px_-40px_rgba(30,41,80,0.6)] backdrop-blur-xl"
              >
                <div className="relative h-44 w-full overflow-hidden rounded-[20px] bg-white">
                  <div className="pointer-events-none h-[880px] w-[800px] origin-top-left scale-[0.29]">
                    <TemplateRenderer
                      template={template.id}
                      content={template.demo(t.demoBusinessName, lang)}
                    />
                  </div>
                  <span
                    className={`absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold shadow-sm ${badges[index].tone}`}
                  >
                    {badges[index].label}
                  </span>
                  <span
                    aria-hidden
                    className="absolute right-3 top-3 h-6 w-6 rounded-full border border-white/70 bg-white/60 backdrop-blur"
                  />
                </div>

                <div className="flex items-end justify-between gap-3 px-1.5 pb-1 pt-3.5">
                  <div className="min-w-0">
                    <p className="truncate font-bold">{template.name}</p>
                    <p className="mt-1 truncate text-xs text-slate-500">
                      {template.sections} {t.sectionsWord} • {template.audience}
                    </p>
                  </div>
                  <Link
                    href="/signup"
                    aria-label={template.name}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#101a3d] text-white transition hover:bg-[#1b2a58]"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3.5 rounded-[22px] border border-white/70 bg-white/85 px-5 py-4 shadow-[0_20px_50px_-40px_rgba(30,41,80,0.6)]"
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${stat.tone}`}
                >
                  {stat.icon}
                </span>
                <div className="min-w-0 leading-tight">
                  <p className="text-xl font-extrabold">{stat.value}</p>
                  <p className="mt-0.5 text-[13px] text-slate-500">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* handwritten note, bottom right */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-36 bottom-6 hidden w-32 text-center text-[19px] leading-tight text-slate-500 min-[1440px]:block"
            style={script}
          >
            {t.scriptTrusted}
            <svg
              viewBox="0 0 60 40"
              className="mx-auto mt-1 h-8 w-16 text-slate-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
            >
              <path d="M4 6c14 16 30 24 52 26" />
              <path d="M46 28l10 4-4 6" />
            </svg>
          </div>
        </section>

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
