import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getTemplate } from "@/lib/templates";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: site } = await supabase
    .from("sites")
    .select("slug, template, business_name, tagline")
    .eq("owner_id", user.id)
    .maybeSingle();

  async function signOut() {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
  }

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-12">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">ড্যাশবোর্ড</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {user.email}
          </p>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm dark:border-zinc-700"
          >
            লগআউট
          </button>
        </form>
      </div>

      {site ? (
        <section className="mt-8 rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div
              className={`h-10 w-10 rounded-lg ${getTemplate(site.template).swatch}`}
            />
            <div>
              <h2 className="font-semibold">{site.business_name}</h2>
              <p className="text-xs text-zinc-500">
                ডিজাইন: {getTemplate(site.template).name}
              </p>
            </div>
          </div>

          {site.tagline && (
            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
              {site.tagline}
            </p>
          )}

          <p className="mt-4 text-sm">
            আপনার সাইট:{" "}
            <Link
              href={`/s/${site.slug}`}
              className="font-medium underline"
              target="_blank"
            >
              /s/{site.slug}
            </Link>
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/dashboard/edit"
              className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black"
            >
              তথ্য সম্পাদনা করুন
            </Link>
            <Link
              href={`/s/${site.slug}`}
              target="_blank"
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium dark:border-zinc-700"
            >
              সাইট দেখুন
            </Link>
          </div>
        </section>
      ) : (
        <section className="mt-8 rounded-xl border border-dashed border-zinc-300 p-8 text-center dark:border-zinc-700">
          <h2 className="font-semibold">এখনো কোনো সাইট নেই</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-600 dark:text-zinc-400">
            ডিজাইন গ্যালারি থেকে একটা টেমপ্লেট বেছে নিন — কয়েক সেকেন্ডেই আপনার
            কোম্পানি প্রোফাইল সাইট তৈরি হয়ে যাবে।
          </p>
          <Link
            href="/dashboard/gallery"
            className="mt-6 inline-block rounded-lg bg-black px-5 py-2.5 font-medium text-white dark:bg-white dark:text-black"
          >
            ডিজাইন গ্যালারি দেখুন
          </Link>
        </section>
      )}
    </main>
  );
}
