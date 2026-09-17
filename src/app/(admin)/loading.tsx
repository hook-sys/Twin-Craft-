import { Skeleton } from "@/components/ui/states";

export default function Loading() {
  return (
    <div>
      <Skeleton className="h-9 w-64" />
      <Skeleton className="mt-3 h-5 w-80" />
      <Skeleton className="mt-6 h-80" />
    </div>
  );
}
