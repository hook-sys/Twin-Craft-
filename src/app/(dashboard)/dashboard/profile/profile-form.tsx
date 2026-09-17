"use client";

import { useActionState } from "react";
import { updateProfileAction } from "./actions";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field, Input, Select } from "@/components/ui/field";
import { Spinner } from "@/components/ui/states";
import type { User } from "@/types";

export default function ProfileForm({ user }: { user: User }) {
  const [state, action, pending] = useActionState(updateProfileAction, null);
  const fields = state && !state.ok ? state.fields : undefined;

  return (
    <form action={action} className="space-y-4">
      {state?.ok && <Alert tone="success">সংরক্ষণ হয়েছে / Saved</Alert>}
      {state && !state.ok && !fields && <Alert>{state.error}</Alert>}

      <Field label="নাম / Full name" htmlFor="fullName" error={fields?.fullName} required>
        <Input
          id="fullName"
          name="fullName"
          defaultValue={user.full_name ?? ""}
          invalid={Boolean(fields?.fullName)}
          required
        />
      </Field>

      <Field label="ফোন / Phone" htmlFor="phone" error={fields?.phone}>
        <Input id="phone" name="phone" defaultValue={user.phone ?? ""} />
      </Field>

      <Field label="ভাষা / Language" htmlFor="locale" error={fields?.locale}>
        <Select id="locale" name="locale" defaultValue={user.locale}>
          <option value="bn">বাংলা</option>
          <option value="en">English</option>
        </Select>
      </Field>

      <input type="hidden" name="avatarUrl" value={user.avatar_url ?? ""} />

      <Button type="submit" disabled={pending}>
        {pending && <Spinner />}
        {pending ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ করুন"}
      </Button>
    </form>
  );
}
