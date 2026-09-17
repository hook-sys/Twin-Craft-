import { cn } from "@/lib/utils/cn";
import { buttonClass } from "./button";
import Link from "next/link";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse rounded-xl bg-surface-muted", className)} />
  );
}

export function Spinner({ className }: { className?: string }) {
  return (
    <span
      role="status"
      aria-label="loading"
      className={cn(
        "inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent",
        className,
      )}
    />
  );
}

/** Nothing here yet — say what this place is for and how to fill it. */
export function EmptyState({
  title,
  description,
  action,
  icon,
}: {
  title: string;
  description?: string;
  action?: { label: string; href: string };
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center px-6 py-14 text-center">
      {icon && (
        <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-brand">
          {icon}
        </span>
      )}
      <p className="text-lg font-bold">{title}</p>
      {description && (
        <p className="mx-auto mt-1.5 max-w-sm text-sm text-ink-soft">
          {description}
        </p>
      )}
      {action && (
        <Link href={action.href} className={buttonClass("primary", "md", "mt-6")}>
          {action.label}
        </Link>
      )}
    </div>
  );
}

/** Rendered by every error.tsx boundary, so failures look the same everywhere. */
export function ErrorState({
  title,
  description,
  onRetry,
  retryLabel,
}: {
  title: string;
  description?: string;
  onRetry?: () => void;
  retryLabel: string;
}) {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-danger-soft text-danger">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          className="h-6 w-6"
          aria-hidden
        >
          <path d="M12 4.5 20.5 19h-17Z" />
          <path d="M12 10v4M12 16.5h.01" />
        </svg>
      </span>
      <p className="text-lg font-bold">{title}</p>
      {description && (
        <p className="mx-auto mt-1.5 max-w-sm text-sm text-ink-soft">
          {description}
        </p>
      )}
      {onRetry && (
        <button onClick={onRetry} className={buttonClass("secondary", "md", "mt-6")}>
          {retryLabel}
        </button>
      )}
    </div>
  );
}
