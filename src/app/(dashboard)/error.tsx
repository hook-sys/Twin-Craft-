"use client";

import { ErrorState } from "@/components/ui/states";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);

  return (
    <ErrorState
      title="পেজটি লোড করা গেল না / This page could not load"
      description="আবার চেষ্টা করুন। / Try again."
      onRetry={reset}
      retryLabel="আবার চেষ্টা করুন / Try again"
    />
  );
}
