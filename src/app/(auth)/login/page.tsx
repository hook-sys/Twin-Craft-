import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { routes } from "@/config/app";
import { getAuthUser } from "@/lib/auth/session";
import LoginForm from "./login-form";

export const metadata: Metadata = { title: "লগইন / Sign in" };

export default async function LoginPage() {
  if (await getAuthUser()) redirect(routes.dashboard);

  return (
    <>
      <h1 className="text-2xl font-bold">লগইন করুন</h1>
      <p className="mt-1.5 text-sm text-ink-soft">
        Sign in to your Aladeen account.
      </p>

      <LoginForm />

      <p className="mt-6 text-center text-sm text-ink-soft">
        অ্যাকাউন্ট নেই?{" "}
        <Link href={routes.signup} className="font-semibold text-brand">
          নতুন অ্যাকাউন্ট খুলুন
        </Link>
      </p>
    </>
  );
}
