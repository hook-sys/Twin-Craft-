import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import GalleryForm from "./gallery-form";

export default async function GalleryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: site } = await supabase
    .from("sites")
    .select("id")
    .eq("owner_id", user.id)
    .maybeSingle();

  if (site) {
    redirect("/dashboard");
  }

  return (
    <main className="flex flex-1 justify-center px-6 py-12">
      <GalleryForm />
    </main>
  );
}
