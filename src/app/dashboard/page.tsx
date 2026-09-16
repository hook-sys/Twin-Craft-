import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  async function signOut() {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <div>
        <h1 className="text-3xl font-bold">ড্যাশবোর্ড</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          স্বাগতম, <strong>{user.email}</strong>
        </p>
      </div>

      <p className="max-w-md text-zinc-600 dark:text-zinc-400">
        আপনার অ্যাকাউন্ট তৈরি হয়ে গেছে। পরের ধাপে এখানে ডিজাইন গ্যালারি থেকে
        টেমপ্লেট বেছে নিয়ে নিজের সাইট বানাতে পারবেন।
      </p>

      <form action={signOut}>
        <button
          type="submit"
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium dark:border-zinc-700"
        >
          লগআউট
        </button>
      </form>
    </main>
  );
}
