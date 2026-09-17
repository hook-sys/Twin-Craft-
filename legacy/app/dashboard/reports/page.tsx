import { redirect } from "next/navigation";
import { BarChart, Donut } from "@/components/dashboard/charts";
import { ChartIcon } from "@/components/dashboard/icons";
import ModuleIcon from "@/components/dashboard/module-icon";
import { fmtMoney, fmtNumber, toneClass } from "@/lib/erp/format";
import {
  countWhere,
  dailyMoney,
  groupBy,
  loadErpSnapshot,
  sumBy,
} from "@/lib/erp/queries";
import { uiLabels } from "@/lib/i18n";
import { getLang } from "@/lib/lang";
import { createClient } from "@/lib/supabase/server";

const ZONE = "Asia/Dhaka";

export default async function ReportsPage() {
  const lang = await getLang();
  const t = uiLabels(lang);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const erp = await loadErpSnapshot(user.id);

  const income = erp.transactions
    .filter((row) => String(row.kind) === "income")
    .reduce((sum, row) => sum + Number(row.amount ?? 0), 0);
  const expense = erp.transactions
    .filter((row) => String(row.kind) === "expense")
    .reduce((sum, row) => sum + Number(row.amount ?? 0), 0);

  const week = dailyMoney(erp.transactions, 7);
  const weekMax =
    Math.max(...week.map((p) => Math.max(p.income, p.expense)), 1000) * 1.1;
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
  const stockSlices = [
    ...stockGroups.head.map((entry, index) => ({
      label: entry[0],
      value: entry[1],
      color: palette[index] ?? "#cbd5e1",
    })),
    ...(stockGroups.tail > 0
      ? [{ label: t.othersLabel, value: stockGroups.tail, color: "#cbd5e1" }]
      : []),
  ];

  const funnel = [
    { label: { bn: "নতুন", en: "New" }, key: "new", tone: "blue" },
    { label: { bn: "যোগাযোগ", en: "Contacted" }, key: "contacted", tone: "violet" },
    { label: { bn: "ফলো আপ", en: "Follow up" }, key: "follow_up", tone: "amber" },
    { label: { bn: "কনভার্ট", en: "Converted" }, key: "converted", tone: "green" },
  ].map((stage) => ({
    ...stage,
    count: countWhere(erp.leads, "status", stage.key),
  }));
  const funnelMax = Math.max(...funnel.map((stage) => stage.count), 1);

  const jobs = [
    { key: "pending", label: { bn: "অপেক্ষমাণ", en: "Pending" }, color: "#cbd5e1" },
    { key: "running", label: { bn: "চলছে", en: "Running" }, color: "#2563eb" },
    { key: "done", label: { bn: "সম্পন্ন", en: "Done" }, color: "#10b981" },
  ].map((status) => ({
    label: status.label[lang],
    value: countWhere(erp.production, "status", status.key),
    color: status.color,
  }));

  const topProducts = [...erp.products]
    .map((row) => ({
      name: String(row.name),
      value: Number(row.stock ?? 0) * Number(row.price ?? 0),
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const cards = [
    { label: t.seriesIncome, value: fmtMoney(income, lang), icon: "money", tone: "green" },
    { label: t.seriesExpense, value: fmtMoney(expense, lang), icon: "money", tone: "rose" },
    { label: t.cardStock, value: fmtNumber(sumBy(erp.products, "stock"), lang), icon: "products", tone: "blue" },
    { label: t.leadsTotal, value: fmtNumber(erp.customers.length, lang), icon: "leads", tone: "violet" },
  ];

  return (
    <>
      <div className="flex items-start gap-3.5">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <ChartIcon className="h-6 w-6" />
        </span>
        <div>
          <h1 className="text-[26px] font-bold leading-tight sm:text-[30px]">
            {t.navReports}
          </h1>
          <p className="mt-1 text-slate-500">{t.reportsSubtitle}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <section
            key={card.label}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center gap-3.5">
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${toneClass[card.tone]}`}
              >
                <ModuleIcon name={card.icon} className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm text-slate-500">{card.label}</p>
                <p className="mt-0.5 text-[22px] font-bold leading-tight">
                  {card.value}
                </p>
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-[17px] font-bold">{t.chartMoneyTitle}</h2>
          <div className="mt-3 flex gap-5 text-xs text-slate-500">
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
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-[17px] font-bold">{t.inventoryTitle}</h2>
          <Donut
            slices={stockSlices}
            centerValue={fmtNumber(sumBy(erp.products, "stock"), lang)}
            centerLabel={t.totalStockLabel}
          />
        </section>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-[17px] font-bold">{t.leadFunnel}</h2>
          <ul className="mt-5 space-y-4">
            {funnel.map((stage) => (
              <li key={stage.key}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">{stage.label[lang]}</span>
                  <span className="font-semibold">
                    {fmtNumber(stage.count, lang)}
                  </span>
                </div>
                <span className="mt-1.5 block h-2 rounded-full bg-slate-100">
                  <span
                    className="block h-2 rounded-full bg-blue-600"
                    style={{
                      width: `${Math.round((stage.count / funnelMax) * 100)}%`,
                    }}
                  />
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-[17px] font-bold">{t.productionStatus}</h2>
          <Donut
            slices={jobs}
            centerValue={fmtNumber(erp.production.length, lang)}
            centerLabel={t.cardOrders}
          />
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-[17px] font-bold">{t.topProducts}</h2>
          <ul className="mt-4 divide-y divide-slate-100">
            {topProducts.map((product) => (
              <li
                key={product.name}
                className="flex items-center gap-3 py-3 text-sm"
              >
                <span className="min-w-0 flex-1 truncate text-slate-600">
                  {product.name}
                </span>
                <span className="shrink-0 font-semibold">
                  {fmtMoney(product.value, lang)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
