"use client";

import { useActionState, useState } from "react";
import { TemplateRenderer } from "@/components/templates";
import { templates } from "@/lib/templates";
import { installTemplate, type InstallState } from "./actions";

const initialState: InstallState = { error: null };

/** Renders a real template at reduced scale so the card shows the actual design. */
function Thumbnail({ id }: { id: string }) {
  const template = templates.find((option) => option.id === id)!;

  return (
    <div className="pointer-events-none h-44 overflow-hidden rounded-lg bg-white">
      <div className="h-[880px] w-[800px] origin-top-left scale-[0.28]">
        <TemplateRenderer template={id} content={template.sample} />
      </div>
    </div>
  );
}

export default function GalleryForm() {
  const [selected, setSelected] = useState(templates[0].id);
  const [previewing, setPreviewing] = useState<string | null>(null);
  const [state, formAction, pending] = useActionState(
    installTemplate,
    initialState,
  );

  const previewTemplate = templates.find((item) => item.id === previewing);

  return (
    <>
      <form action={formAction} className="w-full max-w-5xl">
        <h1 className="text-2xl font-bold">ডিজাইন গ্যালারি</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          আপনার ব্যবসার ধরনের সাথে মেলে এমন একটা ডিজাইন বেছে নিন। বড় করে দেখতে
          &ldquo;প্রিভিউ&rdquo; চাপুন।
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`rounded-xl border-2 p-3 transition ${
                selected === template.id
                  ? "border-black dark:border-white"
                  : "border-zinc-200 dark:border-zinc-800"
              }`}
            >
              <label className="block cursor-pointer">
                <input
                  type="radio"
                  name="template"
                  value={template.id}
                  checked={selected === template.id}
                  onChange={() => setSelected(template.id)}
                  className="sr-only"
                />
                <Thumbnail id={template.id} />
                <p className="mt-3 font-semibold">{template.name}</p>
                <p className="mt-0.5 text-xs text-zinc-500">
                  {template.audience}
                </p>
                <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                  {template.description}
                </p>
              </label>

              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewing(template.id)}
                  className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium dark:border-zinc-700"
                >
                  প্রিভিউ
                </button>
                <button
                  type="button"
                  onClick={() => setSelected(template.id)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
                    selected === template.id
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "border border-zinc-300 dark:border-zinc-700"
                  }`}
                >
                  {selected === template.id ? "বেছে নেওয়া হয়েছে ✓" : "বেছে নিন"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 max-w-md">
          <h2 className="text-lg font-semibold">আপনার সাইটের তথ্য</h2>

          <label
            className="mt-4 block text-sm font-medium"
            htmlFor="business_name"
          >
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
            className="mt-6 w-full rounded-lg bg-black px-4 py-2.5 font-medium text-white disabled:opacity-50 dark:bg-white dark:text-black"
          >
            {pending ? "তৈরি হচ্ছে..." : "এই ডিজাইন বেছে নিন"}
          </button>
        </div>
      </form>

      {previewTemplate && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/70 p-4"
          onClick={() => setPreviewing(null)}
        >
          <div
            className="mx-auto flex h-full w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-zinc-200 px-5 py-3">
              <div>
                <p className="font-semibold text-zinc-900">
                  {previewTemplate.name}
                </p>
                <p className="text-xs text-zinc-500">
                  {previewTemplate.audience}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelected(previewTemplate.id);
                    setPreviewing(null);
                  }}
                  className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white"
                >
                  এই ডিজাইন বেছে নিন
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewing(null)}
                  className="rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-700"
                >
                  বন্ধ
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              <TemplateRenderer
                template={previewTemplate.id}
                content={previewTemplate.sample}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
