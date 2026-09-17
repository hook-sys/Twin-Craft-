"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { ICON_CHOICES } from "@/components/icons";
import { TemplateRenderer } from "@/components/templates";
import { LANGUAGES, type UiLabels } from "@/lib/i18n";
import type { IconName, SiteContent } from "@/lib/site-content";
import { saveContent } from "./actions";
import ImageField from "./image-field";

const field =
  "mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-zinc-200 pt-6 dark:border-zinc-800">
      <h2 className="text-sm font-semibold text-zinc-500">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

export default function EditForm({
  slug,
  template,
  initial,
  t,
}: {
  slug: string;
  template: string;
  initial: SiteContent;
  t: UiLabels;
}) {
  const [content, setContent] = useState(initial);
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();

  function patch(changes: Partial<SiteContent>) {
    setContent((current) => {
      const next = { ...current, ...changes };
      next.services = next.items.map((item) => item.title);
      next.highlights = next.badges.map((badge) => badge.label);
      return next;
    });
    setDirty(true);
    setSaved(false);
  }

  function save() {
    startTransition(async () => {
      const result = await saveContent(content);
      setError(result.error);
      if (!result.error) {
        setDirty(false);
        setSaved(true);
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-[110rem] px-6 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t.editTitle}</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {t.editSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {dirty && (
            <span className="text-sm text-amber-600">{t.unsaved}</span>
          )}
          {saved && (
            <span className="text-sm text-emerald-600">{t.saved}</span>
          )}
          <Link
            href={`/s/${slug}`}
            target="_blank"
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium dark:border-zinc-700"
          >
            {t.viewSite}
          </Link>
          <button
            type="button"
            onClick={save}
            disabled={pending}
            className="rounded-lg bg-black px-5 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-white dark:text-black"
          >
            {pending ? t.saving : t.save}
          </button>
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {error}
        </p>
      )}

      <div className="mt-8 grid gap-10 lg:grid-cols-[26rem_1fr]">
        <div className="space-y-6">
          <Section title={t.basicsSection}>
            <div>
              <label className="text-sm font-medium" htmlFor="business_name">
                {t.businessName}
              </label>
              <input
                id="business_name"
                value={content.businessName}
                onChange={(event) =>
                  patch({ businessName: event.target.value })
                }
                className={field}
              />
            </div>

            <div>
              <label className="text-sm font-medium" htmlFor="tagline">
                {t.tagline}
              </label>
              <input
                id="tagline"
                value={content.tagline ?? ""}
                onChange={(event) =>
                  patch({ tagline: event.target.value || null })
                }
                placeholder={t.taglinePlaceholder}
                className={field}
              />
            </div>

            <ImageField
              label={t.logoImage}
              value={content.logoUrl}
              onChange={(url) => patch({ logoUrl: url })}
              t={t}
            />

            <ImageField
              label={t.heroImage}
              value={content.heroImage}
              onChange={(url) => patch({ heroImage: url })}
              t={t}
            />

            <div>
              <label className="text-sm font-medium" htmlFor="about">
                {t.aboutLabel}
              </label>
              <textarea
                id="about"
                rows={6}
                value={content.about ?? ""}
                onChange={(event) =>
                  patch({ about: event.target.value || null })
                }
                placeholder={t.aboutPlaceholder}
                className={field}
              />
            </div>

            <div>
              <label className="text-sm font-medium" htmlFor="language">
                {t.siteLanguage}
              </label>
              <select
                id="language"
                value={content.language}
                onChange={(event) =>
                  patch({ language: event.target.value as SiteContent["language"] })
                }
                className={field}
              >
                {LANGUAGES.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </Section>

          <Section title={t.productsSection}>
            {content.items.map((item, index) => (
              <div
                key={index}
                className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800"
              >
                <input
                  value={item.title}
                  onChange={(event) => {
                    const items = [...content.items];
                    items[index] = { ...item, title: event.target.value };
                    patch({ items });
                  }}
                  placeholder={t.productTitle}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 font-medium dark:border-zinc-700 dark:bg-zinc-900"
                />
                <input
                  value={item.description ?? ""}
                  onChange={(event) => {
                    const items = [...content.items];
                    items[index] = {
                      ...item,
                      description: event.target.value || null,
                    };
                    patch({ items });
                  }}
                  placeholder={t.productDescription}
                  className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
                />
                <div className="mt-3">
                  <ImageField
                    label={t.addImage}
                    value={item.image}
                    onChange={(url) => {
                      const items = [...content.items];
                      items[index] = { ...item, image: url };
                      patch({ items });
                    }}
                    t={t}
                  />
                </div>
                <button
                  type="button"
                  onClick={() =>
                    patch({
                      items: content.items.filter((_, i) => i !== index),
                    })
                  }
                  className="mt-3 text-sm text-red-600 underline"
                >
                  {t.remove}
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                patch({
                  items: [
                    ...content.items,
                    { title: "", description: null, image: null },
                  ],
                })
              }
              className="w-full rounded-lg border border-dashed border-zinc-300 py-2.5 text-sm font-medium dark:border-zinc-700"
            >
              + {t.addProduct}
            </button>
          </Section>

          <Section title={t.badgesSection}>
            {content.badges.map((badge, index) => (
              <div key={index} className="flex items-center gap-2">
                <select
                  value={badge.icon}
                  onChange={(event) => {
                    const badges = [...content.badges];
                    badges[index] = {
                      ...badge,
                      icon: event.target.value as IconName,
                    };
                    patch({ badges });
                  }}
                  className="rounded-lg border border-zinc-300 px-2 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
                >
                  {ICON_CHOICES.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
                <input
                  value={badge.label}
                  onChange={(event) => {
                    const badges = [...content.badges];
                    badges[index] = { ...badge, label: event.target.value };
                    patch({ badges });
                  }}
                  placeholder={t.badgeLabel}
                  className="flex-1 rounded-lg border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900"
                />
                <button
                  type="button"
                  onClick={() =>
                    patch({
                      badges: content.badges.filter((_, i) => i !== index),
                    })
                  }
                  className="text-sm text-red-600 underline"
                >
                  {t.remove}
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                patch({
                  badges: [
                    ...content.badges,
                    { icon: "sparkle" as IconName, label: "" },
                  ],
                })
              }
              className="w-full rounded-lg border border-dashed border-zinc-300 py-2.5 text-sm font-medium dark:border-zinc-700"
            >
              + {t.addBadge}
            </button>
          </Section>

          <Section title={t.contactSection}>
            {(
              [
                ["phone", t.phoneLabel],
                ["email", t.emailLabel],
                ["address", t.addressLabel],
                ["hours", t.hoursLabel],
              ] as const
            ).map(([key, label]) => (
              <div key={key}>
                <label className="text-sm font-medium" htmlFor={key}>
                  {label}
                </label>
                <input
                  id={key}
                  value={content[key] ?? ""}
                  onChange={(event) =>
                    patch({ [key]: event.target.value || null })
                  }
                  className={field}
                />
              </div>
            ))}
          </Section>
        </div>

        <div className="lg:sticky lg:top-8 lg:self-start">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-sm font-semibold text-zinc-500">
              {t.livePreview}
            </h2>
          </div>
          <div className="mt-3 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <div className="max-h-[75vh] overflow-y-auto bg-white">
              <TemplateRenderer template={template} content={content} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
