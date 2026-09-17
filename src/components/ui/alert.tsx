import { cn } from "@/lib/utils/cn";

export function Alert({
  tone = "danger",
  title,
  children,
  className,
}: {
  tone?: "danger" | "success" | "warning" | "brand";
  title?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const tones = {
    danger: "border-danger/20 bg-danger-soft text-danger",
    success: "border-success/20 bg-success-soft text-success",
    warning: "border-warning/20 bg-warning-soft text-warning",
    brand: "border-brand/20 bg-brand-soft text-brand-ink",
  } as const;

  return (
    <div
      role="alert"
      className={cn("rounded-xl border px-4 py-3 text-sm", tones[tone], className)}
    >
      {title && <p className="font-semibold">{title}</p>}
      {children}
    </div>
  );
}
