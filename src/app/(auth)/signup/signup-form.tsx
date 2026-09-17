"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signUpAction } from "../actions";
import { Alert } from "@/components/ui/alert";
import { buttonClass, Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { Spinner } from "@/components/ui/states";
import { routes } from "@/config/app";

export default function SignupForm() {
  const [state, action, pending] = useActionState(signUpAction, null);
  const fields = state && !state.ok ? state.fields : undefined;

  if (state?.ok) {
    return (
      <div className="mt-7 text-center">
        <p className="text-lg font-bold">ইমেইল দেখুন ✉️</p>
        <p className="mt-2 text-sm text-ink-soft">
          <strong>{state.data.email}</strong> — এই ঠিকানায় একটা নিশ্চিতকরণ লিংক
          পাঠানো হয়েছে। লিংকে ক্লিক করে অ্যাকাউন্ট চালু করুন।
        </p>
        <Link href={routes.login} className={buttonClass("secondary", "md", "mt-6")}>
          লগইন পেজে যান
        </Link>
      </div>
    );
  }

  return (
    <form action={action} className="mt-7 space-y-4">
      {state && !state.ok && !fields && <Alert>{state.error}</Alert>}

      <Field label="আপনার নাম / Full name" htmlFor="fullName" error={fields?.fullName} required>
        <Input
          id="fullName"
          name="fullName"
          autoComplete="name"
          invalid={Boolean(fields?.fullName)}
          required
        />
      </Field>

      <Field label="ইমেইল / Email" htmlFor="email" error={fields?.email} required>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          invalid={Boolean(fields?.email)}
          required
        />
      </Field>

      <Field
        label="পাসওয়ার্ড / Password"
        htmlFor="password"
        hint="কমপক্ষে ৮ অক্ষর / At least 8 characters"
        error={fields?.password}
        required
      >
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          invalid={Boolean(fields?.password)}
          required
        />
      </Field>

      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending && <Spinner />}
        {pending ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট খুলুন"}
      </Button>
    </form>
  );
}
