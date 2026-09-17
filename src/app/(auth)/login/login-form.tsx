"use client";

import { useActionState } from "react";
import { signInAction } from "../actions";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { Spinner } from "@/components/ui/states";

export default function LoginForm() {
  const [state, action, pending] = useActionState(signInAction, null);
  const fields = state && !state.ok ? state.fields : undefined;

  return (
    <form action={action} className="mt-7 space-y-4">
      {state && !state.ok && !fields && <Alert>{state.error}</Alert>}

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
        error={fields?.password}
        required
      >
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          invalid={Boolean(fields?.password)}
          required
        />
      </Field>

      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending && <Spinner />}
        {pending ? "অপেক্ষা করুন..." : "লগইন করুন"}
      </Button>
    </form>
  );
}
