import Link from "next/link";
import { signOutAction } from "@/app/(auth)/actions";
import { Nav, type NavEntry } from "@/components/app/nav";
import { ChevronDown, MenuIcon } from "@/components/app/icons";
import { Badge } from "@/components/ui/badge";
import { app, routes } from "@/config/app";
import { roleLabels } from "@/lib/permissions";
import { initials } from "@/lib/utils/format";
import type { Actor, Company } from "@/types";
import { switchCompanyAction } from "@/app/(dashboard)/actions";

/** The signed-in chrome: sidebar, company switcher, account menu. */
export function AppShell({
  actor,
  entries,
  companies,
  children,
}: {
  actor: Actor;
  entries: NavEntry[];
  companies: Company[];
  children: React.ReactNode;
}) {
  const name = actor.user.full_name?.trim() || actor.user.email.split("@")[0];

  return (
    <div className="flex min-h-screen w-full bg-canvas text-ink">
      <aside className="sticky top-0 hidden h-screen w-[264px] shrink-0 flex-col border-r border-line bg-surface lg:flex">
        <Link href={routes.dashboard} className="flex items-center gap-3 px-5 py-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand text-lg font-bold text-white">
            A
          </span>
          <span className="leading-tight">
            <span className="block text-xl font-bold">{app.name}</span>
            <span className="block truncate text-[11px] text-ink-muted">
              {app.tagline.en}
            </span>
          </span>
        </Link>

        <div className="flex-1 overflow-y-auto px-3 pb-4">
          <Nav entries={entries} />
        </div>

        {actor.company && (
          <div className="m-3 rounded-2xl bg-brand-soft px-4 py-3.5">
            <p className="truncate text-sm font-bold">{actor.company.name}</p>
            <p className="mt-0.5 text-[11px] text-ink-soft">
              /{actor.company.slug}
            </p>
          </div>
        )}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-line bg-surface">
          <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
            <details className="lg:hidden">
              <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-xl text-ink-soft hover:bg-surface-muted">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Menu</span>
              </summary>
              <div className="absolute left-2 right-2 top-16 z-40 rounded-2xl border border-line bg-surface p-3 shadow-[var(--shadow-float)]">
                <Nav entries={entries} />
              </div>
            </details>

            {companies.length > 1 && actor.company ? (
              <form action={switchCompanyAction} className="min-w-0">
                <select
                  name="companyId"
                  defaultValue={actor.company.id}
                  className="max-w-[240px] truncate rounded-xl border border-line bg-surface px-3.5 py-2 text-sm font-semibold outline-none focus:border-brand"
                >
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
                <button type="submit" className="sr-only">
                  Switch company
                </button>
              </form>
            ) : (
              actor.company && (
                <p className="truncate font-semibold">{actor.company.name}</p>
              )
            )}

            <div className="ml-auto flex items-center gap-3">
              {actor.user.role === "SUPER_ADMIN" && (
                <Badge tone="brand">Super admin</Badge>
              )}

              <details className="relative">
                <summary className="flex cursor-pointer list-none items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                    {initials(name)}
                  </span>
                  <span className="hidden leading-tight sm:block">
                    <span className="block text-sm font-semibold">{name}</span>
                    <span className="block text-xs text-ink-muted">
                      {actor.membership
                        ? roleLabels[actor.membership.role].en
                        : actor.user.email}
                    </span>
                  </span>
                  <ChevronDown className="h-4 w-4 text-ink-muted" />
                </summary>

                <div className="absolute right-0 z-40 mt-2 w-60 rounded-2xl border border-line bg-surface p-2 shadow-[var(--shadow-float)]">
                  <p className="truncate px-3 py-2 text-xs text-ink-muted">
                    {actor.user.email}
                  </p>
                  <Link
                    href={routes.profile}
                    className="block rounded-xl px-3 py-2 text-sm font-medium hover:bg-surface-muted"
                  >
                    আমার প্রোফাইল / My profile
                  </Link>
                  <form action={signOutAction}>
                    <button
                      type="submit"
                      className="w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-danger hover:bg-danger-soft"
                    >
                      লগআউট / Sign out
                    </button>
                  </form>
                </div>
              </details>
            </div>
          </div>
        </header>

        <div className="min-w-0 flex-1 px-4 py-6 sm:px-6">{children}</div>
      </div>
    </div>
  );
}
