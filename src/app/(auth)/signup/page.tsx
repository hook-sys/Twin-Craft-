import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { routes } from "@/config/app";
import { getAuthUser } from "@/lib/auth/session";
import SignupForm from "./signup-form";

export const metadata: Metadata = { title: "নতুন অ্যাকাউন্ট / Create account" };

export default async function SignupPage() {
  if (await getAuthUser()) redirect(routes.dashboard);

  return (
    <>
      <h1 className="text-2xl font-bold">ফ্রি অ্যাকাউন্ট খুলুন</h1>
      <p className="mt-1.5 text-sm text-ink-soft">
        Create your free Aladeen account — no card required.
      </p>

      <SignupForm />

      <p className="mt-6 text-center text-sm text-ink-soft">
        আগে থেকেই অ্যাকাউন্ট আছে?{" "}
        <Link href={routes.login} className="font-semibold text-brand">
          লগইন করুন
        </Link>
      </p>
    </>
  );
}
