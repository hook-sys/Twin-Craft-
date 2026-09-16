"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BlogIcon,
  BoxIcon,
  CardIcon,
  ChartIcon,
  ChevronDown,
  GearIcon,
  HeadsetIcon,
  HomeIcon,
  LayersIcon,
  ListIcon,
  PageIcon,
  PenIcon,
  UserIcon,
  UsersIcon,
} from "@/components/dashboard/icons";

export type NavItem = {
  key: string;
  label: string;
  href?: string;
  chevron?: boolean;
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
            <span className="shrink-0">{iconFor(item.key)}</span>
            <span className="truncate">{item.label}</span>
            {item.chevron && (
              <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-60" />
            )}
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


function iconFor(key: string) {
  const className = "h-5 w-5";
  switch (key) {
    case "dashboard":
      return <HomeIcon className={className} />;
    case "account":
      return <UserIcon className={className} />;
    case "site":
      return <BoxIcon className={className} />;
    case "design":
      return <PenIcon className={className} />;
    case "products":
      return <LayersIcon className={className} />;
    case "leads":
      return <UsersIcon className={className} />;
    case "reports":
      return <ChartIcon className={className} />;
    case "subscriptions":
      return <CardIcon className={className} />;
    case "pages":
      return <PageIcon className={className} />;
    case "blog":
      return <BlogIcon className={className} />;
    case "support":
      return <HeadsetIcon className={className} />;
    case "settings":
      return <GearIcon className={className} />;
    default:
      return <ListIcon className={className} />;
  }
}
