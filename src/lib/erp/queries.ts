import { createClient } from "@/lib/supabase/server";

export type Row = Record<string, unknown>;

/** One round of reads covering every ERP module the dashboard reports on. */
export async function loadErpSnapshot(ownerId: string) {
  const supabase = await createClient();

  const table = async (name: string, order: string) => {
    const { data } = await supabase
      .from(name)
      .select("*")
      .eq("owner_id", ownerId)
      .order(order, { ascending: false });
    return (data ?? []) as Row[];
  };

  const [
    products,
    transactions,
    employees,
    production,
    customers,
    leads,
    activity,
  ] = await Promise.all([
    table("products", "created_at"),
    table("transactions", "entry_date"),
    table("employees", "created_at"),
    table("production_orders", "created_at"),
    table("customers", "created_at"),
    table("leads", "created_at"),
    table("activity_log", "created_at"),
  ]);

  return { products, transactions, employees, production, customers, leads, activity };
}

export type ErpSnapshot = Awaited<ReturnType<typeof loadErpSnapshot>>;

/** Income and expense totals for each of the last `days` days, oldest first. */
export function dailyMoney(transactions: Row[], days: number) {
  const buckets: { date: Date; income: number; expense: number }[] = [];

  for (let back = days - 1; back >= 0; back -= 1) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - back);
    buckets.push({ date, income: 0, expense: 0 });
  }

  for (const row of transactions) {
    const raw = String(row.entry_date ?? "");
    const bucket = buckets.find(
      (item) => item.date.toISOString().slice(0, 10) === raw.slice(0, 10),
    );
    if (!bucket) continue;
    const amount = Number(row.amount ?? 0);
    if (String(row.kind) === "income") bucket.income += amount;
    else bucket.expense += amount;
  }

  return buckets;
}

export function sumBy(rows: Row[], column: string) {
  return rows.reduce((sum, row) => sum + Number(row[column] ?? 0), 0);
}

export function countWhere(rows: Row[], column: string, value: string) {
  return rows.filter((row) => String(row[column]) === value).length;
}

/** Groups rows by a text column, largest first, folding the tail into "others". */
export function groupBy(rows: Row[], column: string, valueColumn: string, keep: number) {
  const totals = new Map<string, number>();

  for (const row of rows) {
    const key = String(row[column] ?? "—");
    totals.set(key, (totals.get(key) ?? 0) + Number(row[valueColumn] ?? 0));
  }

  const sorted = [...totals.entries()].sort((a, b) => b[1] - a[1]);
  const head = sorted.slice(0, keep);
  const tail = sorted.slice(keep).reduce((sum, entry) => sum + entry[1], 0);

  return { head, tail };
}
