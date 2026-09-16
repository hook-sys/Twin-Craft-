"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { templates } from "@/lib/templates";

const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]{1,30}[a-z0-9]$/;

export type InstallState = { error: string | null };

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return { supabase, user };
}

function validTemplate(formData: FormData) {
  const template = String(formData.get("template") ?? "");
  return templates.some((option) => option.id === template) ? template : null;
}

export async function installTemplate(
  _previous: InstallState,
  formData: FormData,
): Promise<InstallState> {
  const template = validTemplate(formData);
  const businessName = String(formData.get("business_name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "")
    .trim()
    .toLowerCase();

  if (!template) {
    return { error: "একটা ডিজাইন বেছে নিন। / Pick a design." };
  }
  if (!businessName) {
    return { error: "ব্যবসার নাম লিখুন। / Enter a business name." };
  }
  if (!SLUG_PATTERN.test(slug)) {
    return {
      error:
        "ঠিকানায় শুধু ছোট হাতের ইংরেজি অক্ষর, সংখ্যা ও হাইফেন চলবে (৩-৩২ অক্ষর), যেমন: rahim-store",
    };
  }

  const { supabase, user } = await requireUser();

  const { error } = await supabase.from("sites").insert({
    owner_id: user.id,
    slug,
    template,
    business_name: businessName,
  });

  if (error) {
    if (error.code === "23505") {
      return {
        error:
          "এই ঠিকানাটা আগেই কেউ নিয়ে নিয়েছে — অন্য একটা লিখুন। / That address is taken.",
      };
    }
    return { error: "সাইট তৈরি করা গেল না। / Could not create the site." };
  }

  redirect("/dashboard");
}

export async function switchTemplate(
  _previous: InstallState,
  formData: FormData,
): Promise<InstallState> {
  const template = validTemplate(formData);

  if (!template) {
    return { error: "একটা ডিজাইন বেছে নিন। / Pick a design." };
  }

  const { supabase, user } = await requireUser();

  const { data, error } = await supabase
    .from("sites")
    .update({ template, updated_at: new Date().toISOString() })
    .eq("owner_id", user.id)
    .select("slug")
    .maybeSingle();

  if (error || !data) {
    return { error: "ডিজাইন বদলানো গেল না। / Could not change the design." };
  }

  revalidatePath(`/s/${data.slug}`);
  revalidatePath("/dashboard");
  redirect("/dashboard");
}
