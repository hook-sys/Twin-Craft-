"use client";

import Link from "next/link";
import { useActionState } from "react";
import { LANGUAGES, type UiLabels } from "@/lib/i18n";
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
  t,
}: {
  slug: string;
  content: SiteContent;
  t: UiLabels;
}) {
  const [state, formAction, pending] = useActionState(saveSite, initialState);

  return (
    <form action={formAction} className="w-full max-w-lg">
      <h1 className="text-2xl font-bold">{t.editTitle}</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {t.editSubtitle}
      </p>

      <label className="mt-6 block text-sm font-medium" htmlFor="business_name">
        {t.businessName}
      </label>
      <input
        id="business_name"
        name="business_name"
        required
        defaultValue={content.businessName}
        className={field}
      />

      <label className="mt-4 block text-sm font-medium" htmlFor="language">
        {t.siteLanguage}
      </label>
      <select
        id="language"
        name="language"
        defaultValue={content.language}
        className={field}
      >
        {LANGUAGES.map((option) => (
          <option key={option.code} value={option.code}>
            {option.label}
          </option>
        ))}
      </select>
      <Hint>{t.siteLanguageHint}</Hint>

      <label className="mt-4 block text-sm font-medium" htmlFor="tagline">
        {t.tagline}
      </label>
      <input
        id="tagline"
        name="tagline"
        defaultValue={content.tagline ?? ""}
        placeholder={t.taglinePlaceholder}
        className={field}
      />

      <label className="mt-4 block text-sm font-medium" htmlFor="logo_url">
        {t.logoUrl}
      </label>
      <input
        id="logo_url"
        name="logo_url"
        defaultValue={content.logoUrl ?? ""}
        placeholder="https://..."
        className={field}
      />
      <Hint>{t.logoHint}</Hint>

      <label className="mt-4 block text-sm font-medium" htmlFor="about">
        {t.aboutLabel}
      </label>
      <textarea
        id="about"
        name="about"
        rows={5}
        defaultValue={content.about ?? ""}
        placeholder={t.aboutPlaceholder}
        className={field}
      />

      <label className="mt-4 block text-sm font-medium" htmlFor="services">
        {t.servicesLabel}
      </label>
      <textarea
        id="services"
        name="services"
        rows={5}
        defaultValue={content.services.join("\n")}
        className={field}
      />
      <Hint>{t.perLineHint}</Hint>

      <label className="mt-4 block text-sm font-medium" htmlFor="highlights">
        {t.highlightsLabel}
      </label>
      <textarea
        id="highlights"
        name="highlights"
        rows={3}
        defaultValue={content.highlights.join("\n")}
        className={field}
      />
      <Hint>{t.perLineHint}</Hint>

      <label className="mt-4 block text-sm font-medium" htmlFor="gallery">
        {t.galleryLabel}
      </label>
      <textarea
        id="gallery"
        name="gallery"
        rows={3}
        defaultValue={content.gallery.join("\n")}
        placeholder={"https://.../photo-1.jpg\nhttps://.../photo-2.jpg"}
        className={field}
      />
      <Hint>{t.galleryHint}</Hint>

      <label className="mt-4 block text-sm font-medium" htmlFor="phone">
        {t.phoneLabel}
      </label>
      <input
        id="phone"
        name="phone"
        defaultValue={content.phone ?? ""}
        placeholder="01XXXXXXXXX"
        className={field}
      />

      <label className="mt-4 block text-sm font-medium" htmlFor="email">
        {t.emailLabel}
      </label>
      <input
        id="email"
        name="email"
        type="email"
        defaultValue={content.email ?? ""}
        className={field}
      />

      <label className="mt-4 block text-sm font-medium" htmlFor="address">
        {t.addressLabel}
      </label>
      <input
        id="address"
        name="address"
        defaultValue={content.address ?? ""}
        className={field}
      />

      <label className="mt-4 block text-sm font-medium" htmlFor="hours">
        {t.hoursLabel}
      </label>
      <input
        id="hours"
        name="hours"
        defaultValue={content.hours ?? ""}
        placeholder={t.hoursPlaceholder}
        className={field}
      />

      {state.error && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {state.error}
        </p>
      )}

      {state.saved && (
        <p className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          {t.saved}{" "}
          <Link
            href={`/s/${slug}`}
            target="_blank"
            className="font-medium underline"
          >
            {t.seeOnSite}
          </Link>
        </p>
      )}

      <div className="mt-6 flex gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-black px-5 py-2.5 font-medium text-white disabled:opacity-50 dark:bg-white dark:text-black"
        >
          {pending ? t.saving : t.save}
        </button>
        <Link
          href="/dashboard"
          className="rounded-lg border border-zinc-300 px-5 py-2.5 font-medium dark:border-zinc-700"
        >
          {t.back}
        </Link>
      </div>
    </form>
  );
}
