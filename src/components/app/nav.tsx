"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

export type NavEntry = { href: string; label: string; icon: string };

import {
  BuildingIcon,
  HomeIcon,
  ShieldIcon,
  TeamIcon,
  UserIcon,
} from "./icons";

function Icon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case "home":
      return <HomeIcon className={className} />;
    case "team":
      return <TeamIcon className={className} />;
    case "company":
      return <BuildingIcon className={className} />;
    case "shield":
      return <ShieldIcon className={className} />;
    default:
      return <UserIcon className={className} />;
  }
}

export function Nav({ entries }: { entries: NavEntry[] }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-0.5">
      {entries.map((entry) => {
        const active =
          entry.href === pathname ||
          (entry.href !== "/dashboard" &&
            entry.href !== "/admin" &&
            pathname.startsWith(entry.href));

        return (
          <Link
            key={entry.href}
            href={entry.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[15px] font-medium transition",
              active
                ? "bg-brand-soft text-brand"
                : "text-ink-soft hover:bg-surface-muted hover:text-ink",
            )}
          >
            <Icon name={entry.icon} className="h-5 w-5 shrink-0" />
            <span className="truncate">{entry.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
