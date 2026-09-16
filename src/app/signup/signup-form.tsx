"use client";

import Link from "next/link";
import { useState } from "react";
import type { UiLabels } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/client";

export default function SignupForm({ t }: { t: UiLabels }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setDone(true);
    setLoading(false);
  }

  if (done) {
    return (
      <div className="w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold">{t.checkEmail} ✉️</h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          <strong>{email}</strong> — {t.checkEmailBody}
        </p>
        <Link
          href="/login"
          className="mt-6 inline-block text-sm font-medium underline"
        >
          {t.goToLogin}
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm">
      <h1 className="text-2xl font-bold">{t.signupTitle}</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {t.signupSubtitle}
      </p>

      <label className="mt-6 block text-sm font-medium" htmlFor="email">
        {t.emailLabel}
      </label>
      <input
        id="email"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
      />

      <label className="mt-4 block text-sm font-medium" htmlFor="password">
        {t.passwordLabel}
      </label>
      <input
        id="password"
        type="password"
        required
        minLength={6}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
      />
      <p className="mt-1 text-xs text-zinc-500">{t.passwordHint}</p>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-lg bg-black px-4 py-2.5 font-medium text-white disabled:opacity-50 dark:bg-white dark:text-black"
      >
        {loading ? t.waiting : t.createAccount}
      </button>

      <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
        {t.haveAccount}{" "}
        <Link href="/login" className="font-medium underline">
          {t.login}
        </Link>
      </p>
    </form>
  );
}
