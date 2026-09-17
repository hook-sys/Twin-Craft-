"use client";

import { ErrorState } from "@/components/ui/states";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);

  return (
    <ErrorState
      title="অ্যাডমিন পেজ লোড হয়নি / Admin page failed to load"
      onRetry={reset}
      retryLabel="আবার চেষ্টা করুন / Try again"
    />
  );
}
