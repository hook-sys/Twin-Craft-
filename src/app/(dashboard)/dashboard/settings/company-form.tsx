"use client";

import { useActionState } from "react";
import { updateCompanyAction } from "./actions";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/field";
import { Spinner } from "@/components/ui/states";
import type { Company } from "@/types";

export default function CompanyForm({ company }: { company: Company }) {
  const [state, action, pending] = useActionState(updateCompanyAction, null);
  const fields = state && !state.ok ? state.fields : undefined;

  return (
    <form action={action} className="space-y-4">
      {state?.ok && <Alert tone="success">সংরক্ষণ হয়েছে / Saved</Alert>}
      {state && !state.ok && !fields && <Alert>{state.error}</Alert>}

      <Field label="কোম্পানির নাম / Name" htmlFor="name" error={fields?.name} required>
        <Input
          id="name"
          name="name"
          defaultValue={company.name}
          invalid={Boolean(fields?.name)}
          required
        />
      </Field>

      <Field label="ফোন / Phone" htmlFor="phone" error={fields?.phone}>
        <Input id="phone" name="phone" defaultValue={company.phone ?? ""} />
      </Field>

      <Field label="ঠিকানা / Address" htmlFor="address" error={fields?.address}>
        <Textarea
          id="address"
          name="address"
          rows={2}
          defaultValue={company.address ?? ""}
        />
      </Field>

      <Button type="submit" disabled={pending}>
        {pending && <Spinner />}
        {pending ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ করুন"}
      </Button>
    </form>
  );
}
