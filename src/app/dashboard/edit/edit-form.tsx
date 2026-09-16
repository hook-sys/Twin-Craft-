"use client";

import Link from "next/link";
import { useActionState } from "react";
import { saveSite, type EditState } from "./actions";

const initialState: EditState = { error: null, saved: false };

type Site = {
  slug: string;
  business_name: string;
  tagline: string | null;
  about: string | null;
  phone: string | null;
  address: string | null;
};

const field =
  "mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900";

export default function EditForm({ site }: { site: Site }) {
  const [state, formAction, pending] = useActionState(saveSite, initialState);

  return (
    <form action={formAction} className="w-full max-w-lg">
      <h1 className="text-2xl font-bold">সাইটের তথ্য</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        যা লিখবেন তা সাথে সাথে আপনার সাইটে দেখা যাবে।
      </p>

      <label className="mt-6 block text-sm font-medium" htmlFor="business_name">
        ব্যবসার নাম
      </label>
      <input
        id="business_name"
        name="business_name"
        required
        defaultValue={site.business_name}
        className={field}
      />

      <label className="mt-4 block text-sm font-medium" htmlFor="tagline">
        এক লাইনের পরিচয়
      </label>
      <input
        id="tagline"
        name="tagline"
        defaultValue={site.tagline ?? ""}
        placeholder="যেমন: ২০ বছর ধরে সেরা মানের পণ্য"
        className={field}
      />

      <label className="mt-4 block text-sm font-medium" htmlFor="about">
        আমাদের সম্পর্কে
      </label>
      <textarea
        id="about"
        name="about"
        rows={5}
        defaultValue={site.about ?? ""}
        placeholder="আপনার ব্যবসার গল্প, কী কী সেবা দেন — সব লিখুন।"
        className={field}
      />

      <label className="mt-4 block text-sm font-medium" htmlFor="phone">
        ফোন নম্বর
      </label>
      <input
        id="phone"
        name="phone"
        defaultValue={site.phone ?? ""}
        placeholder="01XXXXXXXXX"
        className={field}
      />

      <label className="mt-4 block text-sm font-medium" htmlFor="address">
        ঠিকানা
      </label>
      <input
        id="address"
        name="address"
        defaultValue={site.address ?? ""}
        placeholder="দোকান/অফিসের ঠিকানা"
        className={field}
      />

      {state.error && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {state.error}
        </p>
      )}

      {state.saved && (
        <p className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          সংরক্ষণ হয়েছে ✓{" "}
          <Link
            href={`/s/${site.slug}`}
            target="_blank"
            className="font-medium underline"
          >
            সাইটে দেখুন
          </Link>
        </p>
      )}

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-black px-5 py-2.5 font-medium text-white disabled:opacity-50 dark:bg-white dark:text-black"
        >
          {pending ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ করুন"}
        </button>
        <Link
          href="/dashboard"
          className="rounded-lg border border-zinc-300 px-5 py-2.5 font-medium dark:border-zinc-700"
        >
          ফিরে যান
        </Link>
      </div>
    </form>
  );
}
