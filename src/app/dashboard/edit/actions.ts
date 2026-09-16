"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isLang } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/server";

export type EditState = { error: string | null; saved: boolean };

function text(formData: FormData, field: string) {
  const value = String(formData.get(field) ?? "").trim();
  return value === "" ? null : value;
}

function lines(formData: FormData, field: string) {
  return String(formData.get(field) ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export async function saveSite(
  _previous: EditState,
  formData: FormData,
): Promise<EditState> {
  const businessName = text(formData, "business_name");

  if (!businessName) {
    return {
      error: "ব্যবসার নাম খালি রাখা যাবে না। / Business name cannot be empty.",
      saved: false,
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("sites")
    .update({
      business_name: businessName,
      language: isLang(formData.get("language")) ? formData.get("language") : "bn",
      logo_url: text(formData, "logo_url"),
      tagline: text(formData, "tagline"),
      about: text(formData, "about"),
      services: lines(formData, "services"),
      highlights: lines(formData, "highlights"),
      gallery: lines(formData, "gallery"),
      phone: text(formData, "phone"),
      email: text(formData, "email"),
      address: text(formData, "address"),
      hours: text(formData, "hours"),
      updated_at: new Date().toISOString(),
    })
    .eq("owner_id", user.id)
    .select("slug")
    .maybeSingle();

  if (error || !data) {
    return {
      error: "সংরক্ষণ করা গেল না। / Could not save. Please try again.",
      saved: false,
    };
  }

  revalidatePath(`/s/${data.slug}`);
  revalidatePath("/dashboard");

  return { error: null, saved: true };
}
