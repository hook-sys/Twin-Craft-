"use server";

import { revalidatePath } from "next/cache";
import { getModule } from "@/lib/erp/modules";
import { createClient } from "@/lib/supabase/server";

/** Insert one row into a module's table, taking only that module's own fields. */
export async function createRecord(moduleKey: string, formData: FormData) {
  const erp = getModule(moduleKey);
  if (!erp || erp.readOnly) return;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const row: Record<string, string | number | null> = { owner_id: user.id };

  for (const field of erp.fields) {
    const raw = formData.get(field.key);
    const value = typeof raw === "string" ? raw.trim() : "";

    if (value === "") {
      if (field.required) return;
      continue;
    }

    if (field.type === "number") {
      const parsed = Number(value);
      if (!Number.isFinite(parsed)) return;
      row[field.key] = parsed;
      continue;
    }

    if (field.type === "select") {
      const allowed = field.options?.some((option) => option.value === value);
      if (!allowed) return;
    }

    row[field.key] = value;
  }

  await supabase.from(erp.table).insert(row);
  revalidatePath(`/dashboard/${moduleKey}`);
  revalidatePath("/dashboard");
}

export async function deleteRecord(moduleKey: string, formData: FormData) {
  const erp = getModule(moduleKey);
  if (!erp || erp.readOnly) return;

  const id = formData.get("id");
  if (typeof id !== "string" || id === "") return;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from(erp.table)
    .delete()
    .eq("id", id)
    .eq("owner_id", user.id);

  revalidatePath(`/dashboard/${moduleKey}`);
  revalidatePath("/dashboard");
}
