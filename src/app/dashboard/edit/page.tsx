import { redirect } from "next/navigation";
import { uiLabels } from "@/lib/i18n";
import { getLang } from "@/lib/lang";
import { parseSiteContent } from "@/lib/site-content";
import { createClient } from "@/lib/supabase/server";
import EditForm from "./edit-form";

export default async function EditPage() {
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
    .select("slug, template, content_json")
    .eq("owner_id", user.id)
    .maybeSingle();

  if (!site) {
    redirect("/dashboard/gallery");
  }

  return (
    <main className="flex-1">
      <EditForm
        slug={site.slug}
        template={site.template}
        initial={parseSiteContent(site.content_json)}
        t={uiLabels(lang)}
      />
    </main>
  );
}
