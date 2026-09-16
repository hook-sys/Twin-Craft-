/* eslint-disable @next/next/no-img-element */
import { siteLabels } from "@/lib/i18n";
import type { SiteContent } from "@/lib/site-content";
import { displayTracking, eyebrow } from "./shared";

export default function BasicTemplate({ content }: { content: SiteContent }) {
  const L = siteLabels(content.language);
  const brow = eyebrow(content.language);
  const [hero, ...rest] = content.gallery;

  return (
    <div className="min-h-full bg-white font-sans text-zinc-900">
      <header className="border-b border-zinc-200">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6 py-5">
          <div className="flex items-center gap-3">
            {content.logoUrl ? (
              <img
                src={content.logoUrl}
                alt=""
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white">
                {content.businessName.charAt(0)}
              </span>
            )}
            <span className="font-medium">{content.businessName}</span>
          </div>
          {content.phone && (
            <a href={`tel:${content.phone}`} className="text-sm text-zinc-500">
              {content.phone}
            </a>
          )}
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 pb-20 pt-24">
        <h1
          className={`max-w-3xl text-5xl font-semibold leading-[1.05] sm:text-7xl ${displayTracking(
            content.language,
          )}`}
        >
          {content.tagline ?? content.businessName}
        </h1>
      </section>

      {hero && (
        <section className="mx-auto max-w-5xl px-6 pb-20">
          <img
            src={hero}
            alt=""
            className="aspect-[16/9] w-full rounded-3xl object-cover"
          />
        </section>
      )}

      {content.about && (
        <section className="border-t border-zinc-200">
          <div className="mx-auto grid max-w-5xl gap-10 px-6 py-20 lg:grid-cols-[12rem_1fr]">
            <h2 className={`text-sm font-semibold text-zinc-400 ${brow}`}>
              {L.about}
            </h2>
            <p className="whitespace-pre-line text-xl leading-relaxed">
              {content.about}
            </p>
          </div>
        </section>
      )}

      {content.services.length > 0 && (
        <section className="border-t border-zinc-200">
          <div className="mx-auto grid max-w-5xl gap-10 px-6 py-20 lg:grid-cols-[12rem_1fr]">
            <h2 className={`text-sm font-semibold text-zinc-400 ${brow}`}>
              {L.services}
            </h2>
            <ul>
              {content.services.map((service) => (
                <li
                  key={service}
                  className="border-b border-zinc-200 py-5 text-xl last:border-0"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {content.highlights.length > 0 && (
        <section className="border-t border-zinc-200">
          <div className="mx-auto grid max-w-5xl gap-10 px-6 py-20 lg:grid-cols-[12rem_1fr]">
            <h2 className={`text-sm font-semibold text-zinc-400 ${brow}`}>
              {L.highlights}
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {content.highlights.map((item) => (
                <li key={item} className="rounded-xl bg-zinc-50 p-5 text-lg">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="mx-auto grid max-w-5xl gap-4 px-6 py-20 sm:grid-cols-3">
          {rest.map((src) => (
            <img
              key={src}
              src={src}
              alt=""
              className="aspect-square w-full rounded-2xl object-cover"
            />
          ))}
        </section>
      )}

      <footer className="border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className={`text-sm font-semibold text-zinc-400 ${brow}`}>
            {L.contact}
          </h2>
          <dl className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {content.phone && (
              <div>
                <dt className="text-sm text-zinc-500">{L.phone}</dt>
                <dd className="mt-1 text-lg">{content.phone}</dd>
              </div>
            )}
            {content.email && (
              <div>
                <dt className="text-sm text-zinc-500">{L.email}</dt>
                <dd className="mt-1 text-lg">{content.email}</dd>
              </div>
            )}
            {content.address && (
              <div>
                <dt className="text-sm text-zinc-500">{L.address}</dt>
                <dd className="mt-1 text-lg">{content.address}</dd>
              </div>
            )}
            {content.hours && (
              <div>
                <dt className="text-sm text-zinc-500">{L.hours}</dt>
                <dd className="mt-1 text-lg">{content.hours}</dd>
              </div>
            )}
          </dl>
        </div>
      </footer>
    </div>
  );
}
