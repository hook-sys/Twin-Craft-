"use client";

import { useActionState, useState } from "react";
import { installTemplate, type InstallState } from "./actions";
import { templates } from "@/lib/templates";

const initialState: InstallState = { error: null };

export default function GalleryForm() {
  const [selected, setSelected] = useState(templates[0].id);
  const [state, formAction, pending] = useActionState(
    installTemplate,
    initialState,
  );

  return (
    <form action={formAction} className="w-full max-w-3xl">
      <h1 className="text-2xl font-bold">ডিজাইন বেছে নিন</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        পছন্দের ডিজাইনে ক্লিক করুন, নিচে ব্যবসার নাম লিখে সাইট চালু করুন।
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {templates.map((template) => (
          <label
            key={template.id}
            className={`cursor-pointer rounded-xl border-2 p-4 transition ${
              selected === template.id
                ? "border-black dark:border-white"
                : "border-zinc-200 dark:border-zinc-800"
            }`}
          >
            <input
              type="radio"
              name="template"
              value={template.id}
              checked={selected === template.id}
              onChange={() => setSelected(template.id)}
              className="sr-only"
            />
            <div className={`h-20 rounded-lg ${template.swatch}`} />
            <p className="mt-3 font-semibold">{template.name}</p>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              {template.description}
            </p>
          </label>
        ))}
      </div>

      <label className="mt-8 block text-sm font-medium" htmlFor="business_name">
        ব্যবসার নাম
      </label>
      <input
        id="business_name"
        name="business_name"
        required
        placeholder="যেমন: রহিম স্টোর"
        className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
      />

      <label className="mt-4 block text-sm font-medium" htmlFor="slug">
        সাইটের ঠিকানা
      </label>
      <div className="mt-1 flex items-center gap-2">
        <span className="text-sm text-zinc-500">/s/</span>
        <input
          id="slug"
          name="slug"
          required
          placeholder="rahim-store"
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>
      <p className="mt-1 text-xs text-zinc-500">
        শুধু ছোট হাতের ইংরেজি অক্ষর, সংখ্যা ও হাইফেন। পরে বদলানো যাবে না।
      </p>

      {state.error && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 w-full rounded-lg bg-black px-4 py-2.5 font-medium text-white disabled:opacity-50 dark:bg-white dark:text-black sm:w-auto"
      >
        {pending ? "তৈরি হচ্ছে..." : "এই ডিজাইনে সাইট চালু করুন"}
      </button>
    </form>
  );
}
