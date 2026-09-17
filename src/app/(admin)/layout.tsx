import { AppShell } from "@/components/app/app-shell";
import type { NavEntry } from "@/components/app/nav";
import { routes } from "@/config/app";
import { requireSuperAdmin } from "@/lib/auth/guards";
import { listMyCompanies } from "@/lib/auth/session";

/**
 * Platform administration. The guard runs here, on the server, before any
 * admin page renders — there is no client-side check to bypass.
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const actor = await requireSuperAdmin();
  const memberships = await listMyCompanies(actor.user.id);

  const entries: NavEntry[] = [
    { href: routes.admin, label: "অ্যাডমিন হোম / Admin", icon: "shield" },
    { href: routes.adminCompanies, label: "কোম্পানি / Companies", icon: "company" },
    { href: routes.adminUsers, label: "ইউজার / Users", icon: "team" },
    { href: routes.dashboard, label: "আমার ড্যাশবোর্ড / My dashboard", icon: "home" },
  ];

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
