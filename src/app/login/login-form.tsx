"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Arrow } from "@/components/marketing/chrome";
import type { UiLabels } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/client";

const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-white/90 py-3.5 pl-12 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100";

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="h-5 w-5"
    >
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7.5 8 5 8-5" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="h-5 w-5"
    >
      <rect x="4.5" y="10" width="15" height="10" rx="3" />
      <path d="M8.5 10V7.5a3.5 3.5 0 0 1 7 0V10" />
    </svg>
  );
}

export default function LoginForm({ t }: { t: UiLabels }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-3xl font-bold">{t.loginTitle}</h1>
      <p className="mt-2 text-slate-600">{t.loginSubtitle}</p>

      <label className="mt-8 block text-sm font-semibold" htmlFor="email">
        {t.emailLabel}
      </label>
      <div className="relative mt-2">
        <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
          <MailIcon />
        </span>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>

      <label className="mt-5 block text-sm font-semibold" htmlFor="password">
        {t.passwordLabel}
      </label>
      <div className="relative mt-2">
        <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
          <LockIcon />
        </span>
        <input
          id="password"
          type={show ? "text" : "password"}
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={inputClass}
        />
        <button
          type="button"
          onClick={() => setShow((value) => !value)}
          className="absolute inset-y-0 right-4 text-sm font-medium text-slate-500"
        >
          {show ? "••" : "👁"}
        </button>
      </div>

      {error && (
        <p className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] py-4 font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:brightness-110 disabled:opacity-60"
      >
        {loading ? t.waiting : t.login}
        {!loading && <Arrow className="h-4 w-4" />}
      </button>

      <p className="mt-6 text-center text-sm text-slate-600 lg:hidden">
        {t.noAccount}{" "}
        <Link href="/signup" className="font-semibold text-indigo-600">
          {t.signupTitle}
        </Link>
      </p>
    </form>
  );
}
