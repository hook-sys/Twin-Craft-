import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TemplateRenderer } from "@/components/templates";
import { siteLabels } from "@/lib/i18n";
import { parseSiteContent } from "@/lib/site-content";
import { createClient } from "@/lib/supabase/server";

async function loadSite(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("sites")
    .select("template, content_json")
    .eq("slug", slug)
    .maybeSingle();

  if (!data) return null;

  return { template: data.template as string, content: parseSiteContent(data.content_json) };
}

export async function generateMetadata({
  params,
}: PageProps<"/s/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const site = await loadSite(slug);

  if (!site) {
    return { title: "সাইট পাওয়া যায়নি" };
  }

  return {
    title: site.content.businessName,
    description: site.content.tagline ?? undefined,
  };
}

export default async function SitePage({ params }: PageProps<"/s/[slug]">) {
  const { slug } = await params;
  const site = await loadSite(slug);

  if (!site) {
    notFound();
  }

  return (
    <div className="flex-1">
      <TemplateRenderer template={site.template} content={site.content} />
      <footer className="bg-white px-6 py-6 text-center text-xs text-zinc-400">
        {siteLabels(site.content.language).builtWith}
      </footer>
    </div>
  );
}
