import { redirect } from "next/navigation";
import { uiLabels } from "@/lib/i18n";
import { getLang } from "@/lib/lang";
import { SITE_COLUMNS, toSiteContent, type SiteRow } from "@/lib/site-content";
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
    .select(`slug, ${SITE_COLUMNS}`)
    .eq("owner_id", user.id)
    .maybeSingle<SiteRow & { slug: string }>();

  if (!site) {
    redirect("/dashboard/gallery");
  }

  return (
    <main className="flex flex-1 justify-center px-6 py-12">
      <EditForm
        slug={site.slug}
        content={toSiteContent(site)}
        t={uiLabels(lang)}
      />
    </main>
  );
}
