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

  const email = user.email ?? "";
  const raw = email.split("@")[0] || t.roleOwner;
  const name = raw.charAt(0).toUpperCase() + raw.slice(1);

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
