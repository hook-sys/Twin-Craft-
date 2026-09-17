import Link from "next/link";
import { redirect } from "next/navigation";
import { BarChart, Donut } from "@/components/dashboard/charts";
import {
  ArrowRight,
  BoltIcon,
  BoxIcon,
  CalendarIcon,
  ChartIcon,
  ChevronDown,
  ClockIcon,
  HeadsetIcon,
  ImageIcon,
  LayersIcon,
  PageIcon,
  PlusUserIcon,
  UsersIcon,
} from "@/components/dashboard/icons";
import ModuleIcon from "@/components/dashboard/module-icon";
import { TemplateRenderer } from "@/components/templates";
import { fmtDate, fmtMoney, fmtNumber, toneClass } from "@/lib/erp/format";
import {
  countWhere,
  dailyMoney,
  groupBy,
  loadErpSnapshot,
  sumBy,
} from "@/lib/erp/queries";
import { uiLabels, type UiLabels } from "@/lib/i18n";
import { getLang } from "@/lib/lang";
import { parseSiteContent } from "@/lib/site-content";
import { createClient } from "@/lib/supabase/server";
import { getTemplate, templates } from "@/lib/templates";

const ZONE = "Asia/Dhaka";

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

  const [{ data: site }, { data: profile }, erp] = await Promise.all([
    supabase
      .from("sites")
      .select("slug, template, content_json, created_at, updated_at")
      .eq("owner_id", user.id)
      .maybeSingle(),
    supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .maybeSingle(),
    loadErpSnapshot(user.id),
  ]);

  const fallback = (user.email ?? "").split("@")[0] || t.roleOwner;
  const name =
    profile?.full_name?.trim() ||
    fallback.charAt(0).toUpperCase() + fallback.slice(1);
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      hour: "numeric",
      hour12: false,
      timeZone: ZONE,
    }).format(new Date()),
  );
  const greeting =
    hour < 12 ? t.greetingMorning : hour < 17 ? t.greetingNoon : t.greetingEvening;

  const today = new Intl.DateTimeFormat(lang === "bn" ? "bn-BD" : "en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: ZONE,
  }).format(new Date());

  // ---------------------------------------------------------------- numbers
  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);

  const monthlySales = erp.transactions
    .filter(
      (row) =>
        String(row.kind) === "income" &&
        new Date(String(row.entry_date)) >= monthStart,
    )
    .reduce((sum, row) => sum + Number(row.amount ?? 0), 0);

  const stats = [
    {
      icon: <LayersIcon className="h-6 w-6" />,
      tone: "blue",
      label: t.cardOrders,
      value: fmtNumber(erp.production.length, lang),
      href: "/dashboard/production",
    },
    {
      icon: <BoxIcon className="h-6 w-6" />,
      tone: "green",
      label: t.cardStock,
      value: fmtNumber(sumBy(erp.products, "stock"), lang),
      href: "/dashboard/inventory",
    },
    {
      icon: <UsersIcon className="h-6 w-6" />,
      tone: "violet",
      label: t.cardEmployees,
      value: fmtNumber(countWhere(erp.employees, "status", "active"), lang),
      href: "/dashboard/hr",
    },
    {
      icon: <ChartIcon className="h-6 w-6" />,
      tone: "amber",
      label: t.cardSales,
      value: fmtMoney(monthlySales, lang),
      href: "/dashboard/accounts",
    },
  ];

  const week = dailyMoney(erp.transactions, 7);
  const weekMax =
    Math.max(
      ...week.map((point) => Math.max(point.income, point.expense)),
      1000,
    ) * 1.1;
  const chart = week.map((point) => ({
    label: new Intl.DateTimeFormat(lang === "bn" ? "bn-BD" : "en-GB", {
      weekday: "short",
      timeZone: ZONE,
    }).format(point.date),
    a: point.income,
    b: point.expense,
  }));
  const axis = [3, 2, 1, 0].map((step) =>
    fmtNumber(Math.round((weekMax / 3) * step), lang),
  );

  const stockGroups = groupBy(erp.products, "category", "stock", 3);
  const palette = ["#2563eb", "#10b981", "#8b5cf6", "#f59e0b"];
  const slices = [
    ...stockGroups.head.map((entry, index) => ({
      label: entry[0],
      value: entry[1],
      color: palette[index] ?? "#cbd5e1",
    })),
    ...(stockGroups.tail > 0
      ? [{ label: t.othersLabel, value: stockGroups.tail, color: "#cbd5e1" }]
      : []),
  ];

  const quick = [
    {
      icon: <BoxIcon className="h-6 w-6" />,
      tone: "blue",
      label: t.quickNewProduct,
      href: "/dashboard/inventory",
    },
    {
      icon: <PageIcon className="h-6 w-6" />,
      tone: "green",
      label: t.quickNewJob,
      href: "/dashboard/production",
    },
    {
      icon: <PlusUserIcon className="h-6 w-6" />,
      tone: "rose",
      label: t.quickNewEmployee,
      href: "/dashboard/hr",
    },
    {
      icon: <UsersIcon className="h-6 w-6" />,
      tone: "violet",
      label: t.quickNewLead,
      href: "/dashboard/leads",
    },
  ];

  const crm = [
    {
      icon: "leads",
      tone: "blue",
      label: t.leadsTotal,
      value: fmtNumber(erp.customers.length, lang),
    },
    {
      icon: "reports",
      tone: "violet",
      label: t.leadsActive,
      value: fmtNumber(countWhere(erp.leads, "status", "new"), lang),
    },
    {
      icon: "logs",
      tone: "amber",
      label: t.leadsFollowUp,
      value: fmtNumber(countWhere(erp.leads, "status", "follow_up"), lang),
    },
    {
      icon: "site",
      tone: "green",
      label: t.leadsConverted,
      value: fmtNumber(countWhere(erp.leads, "status", "converted"), lang),
    },
  ];

  const content = site ? parseSiteContent(site.content_json) : null;
  const template = site ? getTemplate(site.template) : null;
  const designs = template
    ? [template, ...templates.filter((item) => item.id !== template.id).slice(0, 2)]
    : templates.slice(0, 3);
  const designName = content?.businessName ?? t.demoBusinessName;

  return (
    <>
      <Greeting greeting={greeting} name={name} t={t} today={today} />

      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="h-full transition hover:border-blue-200">
              <div className="flex items-start gap-4">
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${toneClass[stat.tone]}`}
                >
                  {stat.icon}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm text-slate-500">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-[26px] font-bold leading-tight">
                    {stat.value}
                  </p>
                </div>
              </div>
              <p className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-blue-600">
                {t.viewAll}
                <ArrowRight className="h-3.5 w-3.5" />
              </p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.6fr_1.1fr_0.9fr]">
        <Card>
          <CardHead
            icon={<ChartIcon className="h-5 w-5" />}
            title={t.chartMoneyTitle}
            action={
              <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-600">
                {t.last7days}
                <ChevronDown className="h-4 w-4" />
              </span>
            }
          />
          <div className="mt-4 flex gap-5 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#bfdbfe]" />
              {t.seriesIncome}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#2563eb]" />
              {t.seriesExpense}
            </span>
          </div>
          <BarChart data={chart} max={weekMax} axis={axis} />
        </Card>

        <Card>
          <CardHead
            icon={<BoxIcon className="h-5 w-5" />}
            title={t.inventoryTitle}
            action={
              <Link
                href="/dashboard/inventory"
                className="text-sm font-semibold text-blue-600"
              >
                {t.viewAll}
              </Link>
            }
          />
          <Donut
            slices={slices}
            centerValue={fmtNumber(sumBy(erp.products, "stock"), lang)}
            centerLabel={t.totalStockLabel}
          />
        </Card>

        <Card>
          <CardHead icon={<BoltIcon className="h-5 w-5" />} title={t.quickTitle} />
          <div className="mt-5 grid grid-cols-2 gap-3">
            {quick.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className={`flex flex-col gap-3 rounded-2xl p-4 text-sm font-semibold transition hover:brightness-95 ${toneClass[action.tone]}`}
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

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_1fr_1.15fr]">
        <Card>
          <CardHead
            icon={<ClockIcon className="h-5 w-5" />}
            title={t.activitiesTitle}
            action={
              <Link
                href="/dashboard/logs"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600"
              >
                {t.viewAll}
                <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
          <ul className="mt-2 divide-y divide-slate-100">
            {erp.activity.slice(0, 5).map((row) => (
              <li key={String(row.id)} className="flex items-center gap-3.5 py-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <ModuleIcon name={String(row.area)} className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">
                    {String(row.title)}
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    {String(row.detail ?? "")}
                  </p>
                </div>
                <span className="shrink-0 text-xs text-slate-400">
                  {fmtDate(row.created_at, lang)}
                </span>
              </li>
            ))}
            {erp.activity.length === 0 && (
              <li className="py-10 text-center text-sm text-slate-500">
                {t.noSiteBody}
              </li>
            )}
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
                      content={design.demo(designName, lang)}
                    />
                  </div>
                </div>
                <p className="mt-2 truncate text-xs font-semibold">
                  {design.name}
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
              <Link
                href="/dashboard/leads"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600"
              >
                {t.viewAll}
                <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
          <ul className="mt-2 divide-y divide-slate-100">
            {crm.map((row) => (
              <li key={row.label} className="flex items-center gap-3.5 py-3.5">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${toneClass[row.tone]}`}
                >
                  <ModuleIcon name={row.icon} className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1 truncate text-sm text-slate-600">
                  {row.label}
                </span>
                <span className="shrink-0 font-semibold">{row.value}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="mt-5 flex flex-wrap items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <HeadsetIcon className="h-6 w-6" />
        </span>
        <div className="min-w-0">
          <p className="font-bold">{t.supportTitle}</p>
          <p className="text-sm text-slate-500">{t.supportBody}</p>
        </div>
        <Link
          href="/dashboard/support"
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
