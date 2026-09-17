"use client";

import { ErrorState } from "@/components/ui/states";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);

  return (
    <main className="flex flex-1 items-center justify-center">
      <ErrorState
        title="কিছু একটা ভুল হয়েছে / Something went wrong"
        description="আবার চেষ্টা করুন। সমস্যা থাকলে আমাদের জানান। / Try again. If it keeps happening, let us know."
        onRetry={reset}
        retryLabel="আবার চেষ্টা করুন / Try again"
      />
    </main>
  );
}
