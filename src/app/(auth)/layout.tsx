import Link from "next/link";
import { app, routes } from "@/config/app";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-12">
        <Link href={routes.home} className="flex items-center gap-2.5 self-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand text-lg font-bold text-white">
            A
          </span>
          <span className="text-xl font-bold">{app.name}</span>
        </Link>

        <div className="mt-8 rounded-2xl border border-line bg-surface p-7 shadow-[var(--shadow-card)] sm:p-8">
          {children}
        </div>

        <p className="mt-6 text-center text-xs text-ink-muted">
          {app.tagline.bn} · {app.tagline.en}
        </p>
      </div>
    </main>
  );
}
