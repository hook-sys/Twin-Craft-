"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { parseSiteContent, toStoredContent } from "@/lib/site-content";
import { createClient } from "@/lib/supabase/server";

export type SaveResult = { error: string | null; savedAt: number | null };

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

export async function saveContent(raw: unknown): Promise<SaveResult> {
  const content = parseSiteContent(raw);

  if (!content.businessName) {
    return {
      error: "ব্যবসার নাম খালি রাখা যাবে না। / Business name cannot be empty.",
      savedAt: null,
    };
  }

  const { supabase, user } = await requireUser();

  const { data, error } = await supabase
    .from("sites")
    .update({
      content_json: toStoredContent(content),
      updated_at: new Date().toISOString(),
    })
    .eq("owner_id", user.id)
    .select("slug")
    .maybeSingle();

  if (error || !data) {
    return {
      error: "সংরক্ষণ করা গেল না। / Could not save. Please try again.",
      savedAt: null,
    };
  }

  revalidatePath(`/s/${data.slug}`);
  revalidatePath("/dashboard");

  return { error: null, savedAt: Date.now() };
}

export async function uploadImage(
  formData: FormData,
): Promise<{ url: string | null; error: string | null }> {
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return { url: null, error: "কোনো ছবি পাওয়া যায়নি। / No image received." };
  }
  if (file.size > 5 * 1024 * 1024) {
    return {
      url: null,
      error: "ছবিটা ৫ MB-এর বেশি বড়। / Image is larger than 5 MB.",
    };
  }

  const { supabase, user } = await requireUser();

  const extension = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${user.id}/${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage
    .from("site-images")
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) {
    return {
      url: null,
      error: "ছবি আপলোড করা গেল না। / Could not upload the image.",
    };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("site-images").getPublicUrl(path);

  return { url: publicUrl, error: null };
}
