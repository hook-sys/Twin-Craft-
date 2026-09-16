import Link from "next/link";
import { redirect } from "next/navigation";
import { BarChart, Donut } from "@/components/dashboard/charts";
import {
  ArrowRight,
  ArrowUp,
  BellIcon,
  BoltIcon,
  BoxIcon,
  CalendarIcon,
  ChartIcon,
  CheckCircle,
  ChevronDown,
  ClockIcon,
  EyeIcon,
  HeadsetIcon,
  ImageIcon,
  LayersIcon,
  PageIcon,
  PaletteIcon,
  PenIcon,
  PlusUserIcon,
  TruckIcon,
  UsersIcon,
} from "@/components/dashboard/icons";
import { TemplateRenderer } from "@/components/templates";
import { uiLabels, type Lang, type UiLabels } from "@/lib/i18n";
import { getLang } from "@/lib/lang";
import { parseSiteContent } from "@/lib/site-content";
import { createClient } from "@/lib/supabase/server";
import { getTemplate, templates } from "@/lib/templates";

const ZONE = "Asia/Dhaka";

function num(value: number, lang: Lang) {
  return new Intl.NumberFormat(lang === "bn" ? "bn-BD" : "en-US").format(value);
}

function day(value: string | null, lang: Lang) {
  if (!value) return "";
  return new Intl.DateTimeFormat(lang === "bn" ? "bn-BD" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: ZONE,
  }).format(new Date(value));
}

function Card({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)] ${className}`}
    >
      {children}
    </section>
  );
}

function CardHead({
  icon,
  title,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-blue-600">{icon}</span>
      <h2 className="text-[17px] font-bold">{title}</h2>
      {action && <div className="ml-auto">{action}</div>}
    </div>
  );
}

export default async function DashboardPage() {
  const lang = await getLang();
  const t = uiLabels(lang);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: site } = await supabase
    .from("sites")
    .select("slug, template, content_json, created_at, updated_at")
    .eq("owner_id", user.id)
    .maybeSingle();

  const raw = (user.email ?? "").split("@")[0] || t.roleOwner;
  const name = raw.charAt(0).toUpperCase() + raw.slice(1);
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      hour: "numeric",
      hour12: false,
      timeZone: ZONE,
    }).format(new Date()),
  );
  const greeting =
    hour < 12
      ? t.greetingMorning
      : hour < 17
        ? t.greetingNoon
        : t.greetingEvening;

  const today = new Intl.DateTimeFormat(lang === "bn" ? "bn-BD" : "en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: ZONE,
  }).format(new Date());

  if (!site) {
    return (
      <>
        <Greeting greeting={greeting} name={name} t={t} today={today} />
        <Card className="mt-6 border-dashed py-14 text-center">
          <h2 className="text-xl font-bold">{t.noSiteTitle}</h2>
          <p className="mx-auto mt-2 max-w-sm text-slate-600">{t.noSiteBody}</p>
          <Link
            href="/dashboard/gallery"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            {t.openGallery}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Card>
      </>
    );
  }

  const content = parseSiteContent(site.content_json);
  const template = getTemplate(site.template);

  const images =
    content.gallery.length +
    (content.heroImage ? 1 : 0) +
    (content.logoUrl ? 1 : 0) +
    content.items.filter((item) => item.image).length;
  const others = [
    content.tagline,
    content.about,
    content.phone,
    content.email,
    content.address,
    content.hours,
  ].filter(Boolean).length;

  const stats = [
    {
      icon: <LayersIcon className="h-6 w-6" />,
      tone: "bg-blue-50 text-blue-600",
      label: t.cardVisitors,
      value: num(1240, lang),
      change: "12%",
      note: t.vsLastWeek,
    },
    {
      icon: <EyeIcon className="h-6 w-6" />,
      tone: "bg-emerald-50 text-emerald-600",
      label: t.cardPageViews,
      value: num(8420, lang),
      change: "8%",
      note: t.vsLastWeek,
    },
    {
      icon: <UsersIcon className="h-6 w-6" />,
      tone: "bg-violet-50 text-violet-600",
      label: t.cardLeads,
      value: num(36, lang),
      change: "5%",
      note: t.vsLastMonth,
    },
    {
      icon: <BoxIcon className="h-6 w-6" />,
      tone: "bg-amber-50 text-amber-600",
      label: t.cardProducts,
      value: num(content.items.length, lang),
      change: "18%",
      note: t.vsLastMonth,
    },
  ];

  const chart = [
    { label: t.daySat, a: 11500, b: 8200 },
    { label: t.daySun, a: 9800, b: 9600 },
    { label: t.dayMon, a: 11600, b: 10300 },
    { label: t.dayTue, a: 13800, b: 10600 },
    { label: t.dayWed, a: 14700, b: 11200 },
    { label: t.dayThu, a: 11900, b: 8600 },
    { label: t.dayFri, a: 11700, b: 8300 },
  ];

  const slices = [
    { label: t.donutProducts, value: content.items.length, color: "#2563eb" },
    { label: t.donutImages, value: images, color: "#10b981" },
    { label: t.donutBadges, value: content.badges.length, color: "#8b5cf6" },
    { label: t.donutOthers, value: others, color: "#cbd5e1" },
  ];
  const totalItems = slices.reduce((sum, slice) => sum + slice.value, 0);

  const quick = [
    {
      icon: <PageIcon className="h-6 w-6" />,
      tone: "bg-blue-50 text-blue-600",
      label: t.quickEdit,
      href: "/dashboard/edit",
    },
    {
      icon: <PaletteIcon className="h-6 w-6" />,
      tone: "bg-emerald-50 text-emerald-600",
      label: t.quickDesign,
      href: "/dashboard/gallery",
    },
    {
      icon: <PlusUserIcon className="h-6 w-6" />,
      tone: "bg-rose-50 text-rose-500",
      label: t.quickProduct,
      href: "/dashboard/edit",
    },
    {
      icon: <TruckIcon className="h-6 w-6" />,
      tone: "bg-violet-50 text-violet-600",
      label: t.quickView,
      href: `/s/${site.slug}`,
    },
  ];

  const activities = [
    {
      icon: <PageIcon className="h-5 w-5" />,
      tone: "bg-blue-50 text-blue-600",
      title: t.actContentUpdated,
      sub: content.businessName,
      time: day(site.updated_at, lang),
    },
    {
      icon: <PenIcon className="h-5 w-5" />,
      tone: "bg-emerald-50 text-emerald-600",
      title: t.actDesignInstalled,
      sub: template.name,
      time: day(site.created_at, lang),
    },
    {
      icon: <ImageIcon className="h-5 w-5" />,
      tone: "bg-violet-50 text-violet-600",
      title: t.actSiteCreated,
      sub: `${t.donutImages}: ${num(images, lang)}`,
      time: day(site.created_at, lang),
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      tone: "bg-amber-50 text-amber-600",
      title: t.actSitePublished,
      sub: `/s/${site.slug}`,
      time: day(site.created_at, lang),
    },
  ];

  const leads = [
    {
      icon: <UsersIcon className="h-5 w-5" />,
      tone: "bg-blue-50 text-blue-600",
      label: t.leadsTotal,
      value: num(124, lang),
      change: "12%",
    },
    {
      icon: <BellIcon className="h-5 w-5" />,
      tone: "bg-violet-50 text-violet-600",
      label: t.leadsActive,
      value: num(36, lang),
      change: "8%",
    },
    {
      icon: <ClockIcon className="h-5 w-5" />,
      tone: "bg-amber-50 text-amber-600",
      label: t.leadsFollowUp,
      value: num(18, lang),
      change: "5%",
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      tone: "bg-emerald-50 text-emerald-600",
      label: t.leadsConverted,
      value: num(12, lang),
      change: "3%",
    },
  ];

  const designs = [
    template,
    ...templates.filter((item) => item.id !== template.id).slice(0, 2),
  ];

  return (
    <>
      <Greeting greeting={greeting} name={name} t={t} today={today} />

      {/* stat cards */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <div className="flex items-start gap-4">
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.tone}`}
              >
                {stat.icon}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm text-slate-500">{stat.label}</p>
                <p className="mt-1 text-[26px] font-bold leading-tight">
                  {stat.value}
                </p>
              </div>
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-sm">
              <ArrowUp className="h-3.5 w-3.5 text-emerald-500" />
              <span className="font-semibold text-emerald-600">
                {stat.change}
              </span>
              <span className="truncate text-slate-400">{stat.note}</span>
            </p>
          </Card>
        ))}
      </div>

      {/* chart row */}
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.6fr_1.1fr_0.9fr]">
        <Card>
          <CardHead
            icon={<ChartIcon className="h-5 w-5" />}
            title={t.chartTitle}
            action={
              <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-600">
                {t.thisWeek}
                <ChevronDown className="h-4 w-4" />
              </span>
            }
          />
          <div className="mt-4 flex gap-5 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#bfdbfe]" />
              {t.seriesLast}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#2563eb]" />
              {t.seriesThis}
            </span>
          </div>
          <BarChart
            data={chart}
            max={20000}
            axis={["20K", "15K", "10K", "5K", "0"]}
          />
        </Card>

        <Card>
          <CardHead
            icon={<BoxIcon className="h-5 w-5" />}
            title={t.contentTitle}
          />
          <Donut
            slices={slices}
            centerValue={num(totalItems, lang)}
            centerLabel={t.contentTotal}
          />
        </Card>

        <Card>
          <CardHead
            icon={<BoltIcon className="h-5 w-5" />}
            title={t.quickTitle}
          />
          <div className="mt-5 grid grid-cols-2 gap-3">
            {quick.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className={`flex flex-col gap-3 rounded-2xl p-4 text-sm font-semibold transition hover:brightness-95 ${action.tone}`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/80">
                  {action.icon}
                </span>
                <span className="leading-tight text-slate-700">
                  {action.label}
                </span>
              </Link>
            ))}
          </div>
        </Card>
      </div>

      {/* bottom row */}
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_1fr_1.15fr]">
        <Card>
          <CardHead
            icon={<ClockIcon className="h-5 w-5" />}
            title={t.activitiesTitle}
            action={
              <Link
                href="/dashboard/edit"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600"
              >
                {t.viewAll}
                <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
          <ul className="mt-2 divide-y divide-slate-100">
            {activities.map((activity) => (
              <li
                key={activity.title}
                className="flex items-center gap-3.5 py-3.5"
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${activity.tone}`}
                >
                  {activity.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">
                    {activity.title}
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    {activity.sub}
                  </p>
                </div>
                <span className="shrink-0 text-xs text-slate-400">
                  {activity.time}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardHead
            icon={<ImageIcon className="h-5 w-5" />}
            title={t.yourDesignTitle}
            action={
              <Link
                href="/dashboard/gallery"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600"
              >
                {t.viewAll}
                <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
          <div className="mt-5 grid grid-cols-3 gap-3">
            {designs.map((design) => (
              <div key={design.id} className="min-w-0">
                <div className="h-24 w-full overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <div className="pointer-events-none h-[880px] w-[800px] origin-top-left scale-[0.145]">
                    <TemplateRenderer
                      template={design.id}
                      content={design.demo(content.businessName, lang)}
                    />
                  </div>
                </div>
                <p className="mt-2 truncate text-xs font-semibold">
                  {design.name}
                </p>
                <p className="truncate text-[11px] text-slate-500">
                  {design.sections} {t.sectionsWord}
                </p>
              </div>
            ))}
          </div>
          <Link
            href="/dashboard/gallery"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            {t.openGalleryStudio}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Card>

        <Card>
          <CardHead
            icon={<UsersIcon className="h-5 w-5" />}
            title={t.leadsTitle}
            action={
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400">
                {t.demoNote}
              </span>
            }
          />
          <ul className="mt-2 divide-y divide-slate-100">
            {leads.map((lead) => (
              <li key={lead.label} className="flex items-center gap-3.5 py-3.5">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${lead.tone}`}
                >
                  {lead.icon}
                </span>
                <span className="min-w-0 flex-1 truncate text-sm text-slate-600">
                  {lead.label}
                </span>
                <span className="shrink-0 font-semibold">{lead.value}</span>
                <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-emerald-600">
                  <ArrowUp className="h-3 w-3" />
                  {lead.change}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* support banner */}
      <Card className="mt-5 flex flex-wrap items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <HeadsetIcon className="h-6 w-6" />
        </span>
        <div className="min-w-0">
          <p className="font-bold">{t.supportTitle}</p>
          <p className="text-sm text-slate-500">{t.supportBody}</p>
        </div>
        <Link
          href="/dashboard/edit"
          className="ml-auto inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold transition hover:bg-slate-50"
        >
          <HeadsetIcon className="h-5 w-5" />
          {t.contactSupport}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Card>
    </>
  );
}

function Greeting({
  greeting,
  name,
  t,
  today,
}: {
  greeting: string;
  name: string;
  t: UiLabels;
  today: string;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-[30px] font-bold leading-tight sm:text-[34px]">
          {greeting}, {name}!
        </h1>
        <p className="mt-1.5 text-slate-500">{t.greetingSub}</p>
      </div>
      <span className="inline-flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600">
        <CalendarIcon className="h-5 w-5 text-blue-600" />
        {today}
        <ChevronDown className="h-4 w-4 text-slate-400" />
      </span>
    </div>
  );
}
