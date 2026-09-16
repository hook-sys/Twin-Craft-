import { redirect } from "next/navigation";
import { uiLabels } from "@/lib/i18n";
import { getLang } from "@/lib/lang";
import { createClient } from "@/lib/supabase/server";
import GalleryForm from "./gallery-form";

export default async function GalleryPage() {
  const lang = await getLang();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: site } = await supabase
    .from("sites")
    .select("template")
    .eq("owner_id", user.id)
    .maybeSingle();

  return (
    <main className="flex flex-1 justify-center px-6 py-12">
      <GalleryForm
        t={uiLabels(lang)}
        lang={lang}
        currentTemplate={site?.template ?? null}
      />
    </main>
  );
}
