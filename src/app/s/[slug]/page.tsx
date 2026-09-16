import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TemplateRenderer } from "@/components/templates";
import { SITE_COLUMNS, toSiteContent, type SiteRow } from "@/lib/site-content";
import { createClient } from "@/lib/supabase/server";

async function loadSite(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("sites")
    .select(`template, ${SITE_COLUMNS}`)
    .eq("slug", slug)
    .maybeSingle<SiteRow & { template: string }>();

  return data;
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
    title: site.business_name,
    description: site.tagline ?? undefined,
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
      <TemplateRenderer
        template={site.template}
        content={toSiteContent(site)}
      />
      <footer className="bg-white px-6 py-6 text-center text-xs text-zinc-400">
        Company Profile Maker দিয়ে তৈরি
      </footer>
    </div>
  );
}
