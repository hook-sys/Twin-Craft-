"use client";

import { useActionState, useState } from "react";
import { createCompanyAction } from "./actions";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/field";
import { Spinner } from "@/components/ui/states";
import { slugify } from "@/lib/utils/format";

export default function OnboardingForm() {
  const [state, action, pending] = useActionState(createCompanyAction, null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const fields = state && !state.ok ? state.fields : undefined;

  return (
    <form action={action} className="space-y-4">
      {state && !state.ok && !fields && <Alert>{state.error}</Alert>}

      <Field label="কোম্পানির নাম / Company name" htmlFor="name" error={fields?.name} required>
        <Input
          id="name"
          name="name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            if (!slugTouched) setSlug(slugify(event.target.value));
          }}
          placeholder="রহিম ভ্যারাইটিজ স্টোর"
          invalid={Boolean(fields?.name)}
          required
        />
      </Field>

      <Field
        label="ঠিকানা / Workspace address"
        htmlFor="slug"
        hint="ছোট হাতের অক্ষর, সংখ্যা ও হাইফেন — যেমন rahim-store"
        error={fields?.slug}
        required
      >
        <Input
          id="slug"
          name="slug"
          value={slug}
          onChange={(event) => {
            setSlugTouched(true);
            setSlug(slugify(event.target.value));
          }}
          placeholder="rahim-store"
          invalid={Boolean(fields?.slug)}
          required
        />
      </Field>

      <Field label="ফোন / Phone" htmlFor="phone" error={fields?.phone}>
        <Input id="phone" name="phone" placeholder="01XXXXXXXXX" />
      </Field>

      <Field label="ঠিকানা / Address" htmlFor="address" error={fields?.address}>
        <Textarea id="address" name="address" rows={2} />
      </Field>

      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending && <Spinner />}
        {pending ? "তৈরি হচ্ছে..." : "কোম্পানি তৈরি করুন"}
      </Button>
    </form>
  );
}
