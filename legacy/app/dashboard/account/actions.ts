"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function saveProfile(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const text = (key: string) => {
    const value = formData.get(key);
    return typeof value === "string" && value.trim() !== "" ? value.trim() : null;
  };

  await supabase.from("profiles").upsert({
    id: user.id,
    full_name: text("full_name"),
    phone: text("phone"),
    company: text("company"),
    updated_at: new Date().toISOString(),
  });

  revalidatePath("/dashboard/account");
  revalidatePath("/dashboard");
}
