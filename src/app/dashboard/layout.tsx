import { redirect } from "next/navigation";
import DashboardShell from "@/components/dashboard/shell";
import { uiLabels } from "@/lib/i18n";
import { getLang } from "@/lib/lang";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({
  children,
}: LayoutProps<"/dashboard">) {
  const lang = await getLang();
  const t = uiLabels(lang);

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

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .maybeSingle();

  const email = user.email ?? "";
  const fallback = email.split("@")[0] || t.roleOwner;
  const name =
    profile?.full_name?.trim() ||
    fallback.charAt(0).toUpperCase() + fallback.slice(1);

  return (
    <DashboardShell
      lang={lang}
      t={t}
      email={email}
      name={name}
      signOut={signOut}
    >
      {children}
    </DashboardShell>
  );
}
