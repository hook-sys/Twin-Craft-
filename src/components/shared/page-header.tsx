export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="min-w-0">
        <h1 className="text-[26px] font-bold leading-tight sm:text-[30px]">
          {title}
        </h1>
        {description && <p className="mt-1.5 text-ink-soft">{description}</p>}
      </div>
      {action}
    </div>
  );
}
