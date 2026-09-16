"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ModuleIcon from "@/components/dashboard/module-icon";

export type NavItem = {
  key: string;
  label: string;
  href?: string;
  icon: string;
};

export default function SidebarNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-0.5">
      {items.map((item) => {
        const active =
          item.href &&
          (item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href));

        const inner = (
          <>
            <span className="shrink-0">
              <ModuleIcon name={item.icon} className="h-5 w-5" />
            </span>
            <span className="truncate">{item.label}</span>
          </>
        );

        const base =
          "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[15px] font-medium transition";

        if (!item.href) {
          return (
            <span
              key={item.key}
              className={`${base} cursor-default text-slate-400`}
            >
              {inner}
            </span>
          );
        }

        return (
          <Link
            key={item.key}
            href={item.href}
            className={`${base} ${
              active
                ? "bg-blue-50 text-blue-600"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            {inner}
          </Link>
        );
      })}
    </nav>
  );
}
