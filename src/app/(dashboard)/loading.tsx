import { Skeleton } from "@/components/ui/states";

export default function Loading() {
  return (
    <div>
      <Skeleton className="h-9 w-56" />
      <Skeleton className="mt-3 h-5 w-80" />
      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((key) => (
          <Skeleton key={key} className="h-28" />
        ))}
      </div>
      <Skeleton className="mt-5 h-72" />
    </div>
  );
}
