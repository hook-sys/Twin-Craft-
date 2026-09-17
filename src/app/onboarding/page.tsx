import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { app, routes } from "@/config/app";
import { requireUser } from "@/lib/auth/guards";
import OnboardingForm from "./onboarding-form";

export const metadata: Metadata = { title: "কোম্পানি তৈরি করুন / Create company" };

export default async function OnboardingPage() {
  const actor = await requireUser();
  if (actor.company) redirect(routes.dashboard);

  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-6 py-12">
        <span className="flex h-11 w-11 items-center justify-center self-center rounded-2xl bg-brand text-lg font-bold text-white">
          A
        </span>

        <h1 className="mt-6 text-center text-2xl font-bold">
          আপনার ব্যবসার নাম লিখুন
        </h1>
        <p className="mt-2 text-center text-sm text-ink-soft">
          {app.name} এই তথ্য দিয়ে আপনার কোম্পানি তৈরি করবে। পরে বদলানো যাবে।
          <br />
          This creates your company workspace. You can change it later.
        </p>

        <div className="mt-8 rounded-2xl border border-line bg-surface p-7 shadow-[var(--shadow-card)]">
          <OnboardingForm />
        </div>
      </div>
    </main>
  );
}
