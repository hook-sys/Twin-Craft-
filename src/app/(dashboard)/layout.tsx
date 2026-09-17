import { AppShell } from "@/components/app/app-shell";
import type { NavEntry } from "@/components/app/nav";
import { routes } from "@/config/app";
import { requireCompany } from "@/lib/auth/guards";
import { listMyCompanies } from "@/lib/auth/session";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const actor = await requireCompany();
  const memberships = await listMyCompanies(actor.user.id);

  const entries: NavEntry[] = [
    { href: routes.dashboard, label: "ওভারভিউ / Overview", icon: "home" },
    { href: routes.team, label: "টিম / Team", icon: "team" },
    { href: routes.companySettings, label: "কোম্পানি / Company", icon: "company" },
    { href: routes.profile, label: "প্রোফাইল / Profile", icon: "user" },
  ];

  if (actor.user.role === "SUPER_ADMIN") {
    entries.push({ href: routes.admin, label: "অ্যাডমিন / Admin", icon: "shield" });
  }

  return (
    <AppShell
      actor={actor}
      entries={entries}
      companies={memberships.map((entry) => entry.company)}
    >
      {children}
    </AppShell>
  );
}
