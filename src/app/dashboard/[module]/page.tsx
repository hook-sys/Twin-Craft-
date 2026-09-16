import { notFound } from "next/navigation";
import { ArrowRight } from "@/components/dashboard/icons";
import ModuleIcon from "@/components/dashboard/module-icon";
import { fmtDate, fmtMoney, fmtNumber, toneClass } from "@/lib/erp/format";
import { getModule, type Column, type Summary } from "@/lib/erp/modules";
import { uiLabels, type Lang } from "@/lib/i18n";
import { getLang } from "@/lib/lang";
import { createClient } from "@/lib/supabase/server";
import { createRecord, deleteRecord } from "./actions";

type Row = Record<string, unknown>;

function summarise(summary: Summary, rows: Row[], lang: Lang) {
  const matches = (row: Row) =>
    !summary.where || String(row[summary.where.column]) === summary.where.value;

  if (summary.kind === "count") return fmtNumber(rows.length, lang);
  if (summary.kind === "countWhere")
    return fmtNumber(rows.filter(matches).length, lang);

  const total = rows
    .filter(summary.kind === "sumWhere" ? matches : () => true)
    .reduce((sum, row) => sum + Number(row[summary.column ?? ""] ?? 0), 0);

  return summary.money ? fmtMoney(total, lang) : fmtNumber(total, lang);
}

function Cell({
  column,
  row,
  lang,
}: {
  column: Column;
  row: Row;
  lang: Lang;
}) {
  const value = row[column.key];

  if (column.kind === "status") {
    const option = column.options?.find(
      (item) => item.value === String(value),
    );
    return (
      <span
        className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-semibold ${
          toneClass[option?.tone ?? "slate"]
        }`}
      >
        {option ? option.label[lang] : String(value ?? "—")}
      </span>
    );
  }

  if (column.kind === "money") return <>{fmtMoney(value, lang)}</>;
  if (column.kind === "number") return <>{fmtNumber(value, lang)}</>;
  if (column.kind === "date") return <>{fmtDate(value, lang)}</>;

  if (column.kind === "progress") {
    const done = Number(value ?? 0);
    const total = Number(row[column.of ?? ""] ?? 0) || 1;
    const percent = Math.min(Math.round((done / total) * 100), 100);
    return (
      <span className="flex min-w-[7rem] items-center gap-2">
        <span className="h-1.5 flex-1 rounded-full bg-slate-100">
          <span
            className="block h-1.5 rounded-full bg-blue-600"
            style={{ width: `${percent}%` }}
          />
        </span>
        <span className="text-xs text-slate-500">{percent}%</span>
      </span>
    );
  }

  const text = value === null || value === undefined || value === "" ? "—" : String(value);
  return <>{text}</>;
}

export default async function ModulePage({
  params,
}: PageProps<"/dashboard/[module]">) {
  const { module: moduleKey } = await params;
  const erp = getModule(moduleKey);
  if (!erp) notFound();

  const lang = await getLang();
  const t = uiLabels(lang);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from(erp.table)
    .select("*")
    .eq("owner_id", user?.id ?? "")
    .order(erp.orderBy, { ascending: false });

  const rows: Row[] = data ?? [];
  const create = createRecord.bind(null, erp.key);
  const remove = deleteRecord.bind(null, erp.key);

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <ModuleIcon name={erp.icon} className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-[26px] font-bold leading-tight sm:text-[30px]">
              {erp.title[lang]}
            </h1>
            <p className="mt-1 text-slate-500">{erp.subtitle[lang]}</p>
          </div>
        </div>
      </div>

      {/* summary cards */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {erp.summaries.map((summary) => (
          <section
            key={summary.key}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center gap-3.5">
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${toneClass[summary.tone]}`}
              >
                <ModuleIcon name={summary.icon} className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm text-slate-500">
                  {summary.label[lang]}
                </p>
                <p className="mt-0.5 text-[22px] font-bold leading-tight">
                  {summarise(summary, rows, lang)}
                </p>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* add form */}
      {!erp.readOnly && (
        <details className="mt-5 rounded-2xl border border-slate-200 bg-white">
          <summary className="flex cursor-pointer list-none items-center gap-2 px-5 py-4 font-semibold text-blue-600">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
              +
            </span>
            {erp.addLabel[lang]}
          </summary>
          <form
            action={create}
            className="grid gap-4 border-t border-slate-100 p-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {erp.fields.map((field) => (
              <label key={field.key} className="block text-sm">
                <span className="font-semibold">
                  {field.label[lang]}
                  {field.required && <span className="text-rose-500"> *</span>}
                </span>
                {field.type === "select" ? (
                  <select
                    name={field.key}
                    defaultValue={field.options?.[0]?.value}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 outline-none focus:border-blue-400"
                  >
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label[lang]}
                      </option>
                    ))}
                  </select>
                ) : field.type === "textarea" ? (
                  <textarea
                    name={field.key}
                    rows={2}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 outline-none focus:border-blue-400"
                  />
                ) : (
                  <input
                    name={field.key}
                    type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
                    step={field.type === "number" ? "any" : undefined}
                    required={field.required}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 outline-none focus:border-blue-400"
                  />
                )}
              </label>
            ))}
            <div className="flex items-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                {t.save}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </details>
      )}

      {/* table */}
      <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                {erp.columns.map((column) => (
                  <th key={column.key} className="px-5 py-3.5 font-semibold">
                    {column.label[lang]}
                  </th>
                ))}
                {!erp.readOnly && <th className="px-5 py-3.5" />}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row) => (
                <tr key={String(row.id)} className="hover:bg-slate-50/70">
                  {erp.columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-5 py-3.5 align-middle text-slate-700"
                    >
                      <Cell column={column} row={row} lang={lang} />
                    </td>
                  ))}
                  {!erp.readOnly && (
                    <td className="px-5 py-3.5 text-right">
                      <form action={remove}>
                        <input
                          type="hidden"
                          name="id"
                          value={String(row.id)}
                        />
                        <button
                          type="submit"
                          className="rounded-lg px-3 py-1.5 text-xs font-semibold text-rose-500 transition hover:bg-rose-50"
                        >
                          {t.remove}
                        </button>
                      </form>
                    </td>
                  )}
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={erp.columns.length + 1}
                    className="px-5 py-14 text-center text-slate-500"
                  >
                    {erp.subtitle[lang]}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
