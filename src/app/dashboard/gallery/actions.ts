"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { templates } from "@/lib/templates";

const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]{1,30}[a-z0-9]$/;

export type InstallState = { error: string | null };

export async function installTemplate(
  _previous: InstallState,
  formData: FormData,
): Promise<InstallState> {
  const template = String(formData.get("template") ?? "");
  const businessName = String(formData.get("business_name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "")
    .trim()
    .toLowerCase();

  if (!templates.some((option) => option.id === template)) {
    return { error: "একটা ডিজাইন বেছে নিন।" };
  }
  if (!businessName) {
    return { error: "ব্যবসার নাম লিখুন।" };
  }
  if (!SLUG_PATTERN.test(slug)) {
    return {
      error:
        "ঠিকানায় শুধু ছোট হাতের ইংরেজি অক্ষর, সংখ্যা ও হাইফেন চলবে (৩-৩২ অক্ষর), যেমন: rahim-store",
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { error } = await supabase.from("sites").insert({
    owner_id: user.id,
    slug,
    template,
    business_name: businessName,
  });

  if (error) {
    if (error.code === "23505") {
      return { error: "এই ঠিকানাটা আগেই কেউ নিয়ে নিয়েছে — অন্য একটা লিখুন।" };
    }
    return { error: "সাইট তৈরি করা গেল না। আবার চেষ্টা করুন।" };
  }

  redirect("/dashboard");
}
