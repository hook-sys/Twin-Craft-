import Link from "next/link";
import LanguageSwitch from "@/components/language-switch";
import SidebarNav, { type NavItem } from "@/components/dashboard/sidebar-nav";
import {
  BellIcon,
  ChevronDown,
  MenuIcon,
  SearchIcon,
} from "@/components/dashboard/icons";
import { getModule } from "@/lib/erp/modules";
import type { Lang, UiLabels } from "@/lib/i18n";

export function navItems(t: UiLabels, lang: Lang): NavItem[] {
  const fromModule = (key: string) => {
    const erp = getModule(key);
    return {
      key,
      label: erp ? erp.title[lang] : key,
      href: `/dashboard/${key}`,
      icon: erp?.icon ?? key,
    };
  };

  return [
    { key: "dashboard", label: t.navDashboard, href: "/dashboard", icon: "dashboard" },
    { key: "account", label: t.navAccount, href: "/dashboard/account", icon: "account" },
    fromModule("inventory"),
    fromModule("production"),
    fromModule("hr"),
    fromModule("crm"),
    fromModule("leads"),
    fromModule("accounts"),
    { key: "site", label: t.navMySite, href: "/dashboard/edit", icon: "site" },
    { key: "design", label: t.navDesign, href: "/dashboard/gallery", icon: "design" },
    { key: "reports", label: t.navReports, href: "/dashboard/reports", icon: "reports" },
    fromModule("subscriptions"),
    fromModule("pages"),
    fromModule("blog"),
    fromModule("support"),
    { key: "settings", label: t.navSettings, href: "/dashboard/settings", icon: "settings" },
    fromModule("logs"),
  ];
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#2563eb] to-[#60a5fa] font-bold text-white shadow-lg shadow-blue-500/25 ${className}`}
    >
      P
    </span>
  );
}

export default function DashboardShell({
  lang,
  t,
  email,
  name,
  signOut,
  children,
}: {
  lang: Lang;
  t: UiLabels;
  email: string;
  name: string;
  signOut: () => Promise<void>;
  children: React.ReactNode;
}) {
  const items = navItems(t, lang);

  return (
    <div className="flex min-h-screen w-full bg-[#f5f7fb] text-slate-900">
      {/* sidebar */}
      <aside className="sticky top-0 hidden h-screen w-[272px] shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
        <Link href="/" className="flex items-center gap-3 px-5 py-5">
          <Logo className="h-11 w-11 text-xl" />
          <span className="leading-tight">
            <span className="block text-[22px] font-bold">{t.brandName}</span>
            <span className="block truncate text-[11px] text-slate-500">
              {t.brandMotto}
            </span>
          </span>
        </Link>

        <div className="flex-1 overflow-y-auto px-3 pb-4">
          <SidebarNav items={items} />
        </div>

        <div className="m-3 flex items-center gap-3 rounded-2xl bg-blue-50/70 px-4 py-3.5">
          <Logo className="h-9 w-9 text-sm" />
          <span className="leading-tight">
            <span className="block text-sm font-bold">{t.sidebarCardTitle}</span>
            <span className="block text-[11px] text-slate-500">
              {t.sidebarCardBody}
            </span>
          </span>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* top bar */}
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
            <details className="lg:hidden">
              <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-xl text-slate-600 hover:bg-slate-50">
                <MenuIcon className="h-6 w-6" />
              </summary>
              <div className="absolute left-2 right-2 top-16 z-40 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
                <SidebarNav items={items} />
              </div>
            </details>

            <label className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-slate-500 focus-within:border-blue-300 focus-within:bg-white lg:max-w-2xl">
              <SearchIcon className="h-5 w-5 shrink-0" />
              <input
                type="search"
                placeholder={t.searchPlaceholder}
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
              <span className="hidden rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-500 sm:block">
                Ctrl + K
              </span>
            </label>

            <div className="ml-auto flex items-center gap-2 sm:gap-4">
              <span className="relative hidden h-10 w-10 items-center justify-center rounded-xl text-slate-500 sm:flex">
                <BellIcon className="h-6 w-6" />
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500" />
              </span>

              <LanguageSwitch current={lang} />

              <div className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#2563eb] to-[#60a5fa] text-sm font-bold text-white">
                  {name.slice(0, 1).toUpperCase()}
                </span>
                <span className="hidden leading-tight sm:block">
                  <span className="block text-sm font-semibold">{name}</span>
                  <span className="block text-xs text-slate-500">
                    {t.roleOwner}
                  </span>
                </span>
                <details className="relative">
                  <summary className="flex cursor-pointer list-none items-center text-slate-400">
                    <ChevronDown className="h-5 w-5" />
                  </summary>
                  <div className="absolute right-0 z-40 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                    <p className="truncate px-3 py-2 text-xs text-slate-500">
                      {email}
                    </p>
                    <form action={signOut}>
                      <button
                        type="submit"
                        className="w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                      >
                        {t.logout}
                      </button>
                    </form>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </header>

        <div className="min-w-0 flex-1 px-4 py-6 sm:px-6">{children}</div>
      </div>
    </div>
  );
}
