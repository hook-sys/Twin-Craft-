"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { SiteContent } from "@/lib/site-content";
import { saveSite, type EditState } from "./actions";

const initialState: EditState = { error: null, saved: false };

const field =
  "mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900";

function Hint({ children }: { children: React.ReactNode }) {
  return <p className="mt-1 text-xs text-zinc-500">{children}</p>;
}

export default function EditForm({
  slug,
  content,
}: {
  slug: string;
  content: SiteContent;
}) {
  const [state, formAction, pending] = useActionState(saveSite, initialState);

  return (
    <form action={formAction} className="w-full max-w-lg">
      <h1 className="text-2xl font-bold">সাইটের তথ্য</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        যা লিখবেন তা সংরক্ষণের পর সাথে সাথে আপনার সাইটে দেখা যাবে।
      </p>

      <label className="mt-6 block text-sm font-medium" htmlFor="business_name">
        ব্যবসার নাম
      </label>
      <input
        id="business_name"
        name="business_name"
        required
        defaultValue={content.businessName}
        className={field}
      />

      <label className="mt-4 block text-sm font-medium" htmlFor="tagline">
        এক লাইনের পরিচয়
      </label>
      <input
        id="tagline"
        name="tagline"
        defaultValue={content.tagline ?? ""}
        placeholder="যেমন: ২০ বছর ধরে সেরা মানের পণ্য"
        className={field}
      />

      <label className="mt-4 block text-sm font-medium" htmlFor="logo_url">
        লোগোর লিংক
      </label>
      <input
        id="logo_url"
        name="logo_url"
        defaultValue={content.logoUrl ?? ""}
        placeholder="https://..."
        className={field}
      />
      <Hint>ছবির ইন্টারনেট ঠিকানা বসান। না দিলে নামের প্রথম অক্ষর দেখাবে।</Hint>

      <label className="mt-4 block text-sm font-medium" htmlFor="about">
        আমাদের সম্পর্কে
      </label>
      <textarea
        id="about"
        name="about"
        rows={5}
        defaultValue={content.about ?? ""}
        placeholder="আপনার ব্যবসার গল্প লিখুন।"
        className={field}
      />

      <label className="mt-4 block text-sm font-medium" htmlFor="services">
        পণ্য বা সেবার তালিকা
      </label>
      <textarea
        id="services"
        name="services"
        rows={5}
        defaultValue={content.services.join("\n")}
        placeholder={"চাল ও ডাল\nভোজ্য তেল\nপ্রসাধনী"}
        className={field}
      />
      <Hint>প্রতি লাইনে একটা করে লিখুন।</Hint>

      <label className="mt-4 block text-sm font-medium" htmlFor="highlights">
        বিশেষ দিক / সার্টিফিকেশন
      </label>
      <textarea
        id="highlights"
        name="highlights"
        rows={3}
        defaultValue={content.highlights.join("\n")}
        placeholder={"হোম ডেলিভারি\n১০০% আসল পণ্য"}
        className={field}
      />
      <Hint>প্রতি লাইনে একটা করে।</Hint>

      <label className="mt-4 block text-sm font-medium" htmlFor="gallery">
        ছবির গ্যালারি
      </label>
      <textarea
        id="gallery"
        name="gallery"
        rows={3}
        defaultValue={content.gallery.join("\n")}
        placeholder={"https://.../ছবি-১.jpg\nhttps://.../ছবি-২.jpg"}
        className={field}
      />
      <Hint>প্রতি লাইনে একটা ছবির লিংক। ইভেন্ট ও রেস্টুরেন্ট ডিজাইনে দেখাবে।</Hint>

      <label className="mt-4 block text-sm font-medium" htmlFor="phone">
        ফোন নম্বর
      </label>
      <input
        id="phone"
        name="phone"
        defaultValue={content.phone ?? ""}
        placeholder="01XXXXXXXXX"
        className={field}
      />

      <label className="mt-4 block text-sm font-medium" htmlFor="email">
        ইমেইল
      </label>
      <input
        id="email"
        name="email"
        type="email"
        defaultValue={content.email ?? ""}
        className={field}
      />

      <label className="mt-4 block text-sm font-medium" htmlFor="address">
        ঠিকানা
      </label>
      <input
        id="address"
        name="address"
        defaultValue={content.address ?? ""}
        className={field}
      />

      <label className="mt-4 block text-sm font-medium" htmlFor="hours">
        খোলা থাকার সময়
      </label>
      <input
        id="hours"
        name="hours"
        defaultValue={content.hours ?? ""}
        placeholder="সকাল ৯টা - রাত ৯টা"
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
            href={`/s/${slug}`}
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
