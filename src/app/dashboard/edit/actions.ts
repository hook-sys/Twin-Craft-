"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type EditState = { error: string | null; saved: boolean };

export async function saveSite(
  _previous: EditState,
  formData: FormData,
): Promise<EditState> {
  const businessName = String(formData.get("business_name") ?? "").trim();

  if (!businessName) {
    return { error: "ব্যবসার নাম খালি রাখা যাবে না।", saved: false };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const optional = (field: string) => {
    const value = String(formData.get(field) ?? "").trim();
    return value === "" ? null : value;
  };

  const { data, error } = await supabase
    .from("sites")
    .update({
      business_name: businessName,
      tagline: optional("tagline"),
      about: optional("about"),
      phone: optional("phone"),
      address: optional("address"),
      updated_at: new Date().toISOString(),
    })
    .eq("owner_id", user.id)
    .select("slug")
    .maybeSingle();

  if (error || !data) {
    return { error: "সংরক্ষণ করা গেল না। আবার চেষ্টা করুন।", saved: false };
  }

  revalidatePath(`/s/${data.slug}`);
  revalidatePath("/dashboard");

  return { error: null, saved: true };
}
