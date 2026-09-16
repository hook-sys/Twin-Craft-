import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getTemplate } from "@/lib/templates";

async function loadSite(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("sites")
    .select("template, business_name, tagline, about, phone, address")
    .eq("slug", slug)
    .maybeSingle();

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

  const theme = getTemplate(site.template);

  return (
    <div className={`flex min-h-full flex-1 flex-col ${theme.page}`}>
      <header className={`px-6 py-20 text-center ${theme.hero}`}>
        <h1 className={`text-4xl font-bold tracking-tight ${theme.heading}`}>
          {site.business_name}
        </h1>
        {site.tagline && (
          <p className={`mx-auto mt-3 max-w-xl text-lg ${theme.tagline}`}>
            {site.tagline}
          </p>
        )}
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12">
        {site.about && (
          <section className={`rounded-xl p-6 ${theme.card}`}>
            <h2 className={`text-xs font-semibold tracking-wide ${theme.label}`}>
              আমাদের সম্পর্কে
            </h2>
            <p className="mt-3 whitespace-pre-line leading-relaxed">
              {site.about}
            </p>
          </section>
        )}

        {(site.phone || site.address) && (
          <section className={`mt-6 rounded-xl p-6 ${theme.card}`}>
            <h2 className={`text-xs font-semibold tracking-wide ${theme.label}`}>
              যোগাযোগ
            </h2>
            {site.phone && (
              <p className="mt-3">
                ফোন:{" "}
                <a href={`tel:${site.phone}`} className="font-medium underline">
                  {site.phone}
                </a>
              </p>
            )}
            {site.address && <p className="mt-2">ঠিকানা: {site.address}</p>}
          </section>
        )}
      </main>

      <footer className="px-6 py-8 text-center text-xs opacity-60">
        Company Profile Maker দিয়ে তৈরি
      </footer>
    </div>
  );
}
