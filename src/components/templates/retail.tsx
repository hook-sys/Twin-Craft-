/* eslint-disable @next/next/no-img-element */
import { BadgeIcon } from "@/components/icons";
import { siteLabels } from "@/lib/i18n";
import type { SiteContent } from "@/lib/site-content";
import { displayTracking, eyebrow } from "./shared";

function Monogram({ name, className }: { name: string; className?: string }) {
  return (
    <span className={className}>{name.trim().charAt(0) || "·"}</span>
  );
}

export default function RetailTemplate({ content }: { content: SiteContent }) {
  const L = siteLabels(content.language);
  const brow = eyebrow(content.language);
  const display = displayTracking(content.language);

  return (
    <div className="min-h-full bg-[#faf8f5] font-sans text-[#1c1917] antialiased">
      <header className="sticky top-0 z-20 border-b border-[#1c1917]/10 bg-[#faf8f5]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <div className="flex items-center gap-3">
            {content.logoUrl ? (
              <img
                src={content.logoUrl}
                alt=""
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <Monogram
                name={content.businessName}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1c1917] text-base font-semibold text-[#faf8f5]"
              />
            )}
            <span className="text-lg font-semibold">{content.businessName}</span>
          </div>

          {content.phone && (
            <a
              href={`tel:${content.phone}`}
              className="hidden items-center gap-2 rounded-full bg-[#1c1917] px-5 py-2.5 text-sm font-medium text-[#faf8f5] transition hover:bg-[#44403c] sm:inline-flex"
            >
              <BadgeIcon name="tag" className="h-4 w-4" />
              {L.callToOrder}
            </a>
          )}
        </div>
      </header>

      <section className="relative isolate overflow-hidden bg-[#1c1917] text-[#faf8f5]">
        {content.heroImage && (
          <>
            <img
              src={content.heroImage}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1c1917] via-[#1c1917]/85 to-[#1c1917]/45" />
          </>
        )}

        <div
          className={`relative mx-auto max-w-6xl px-6 ${
            content.heroImage ? "py-28 sm:py-36" : "py-20 sm:py-24"
          }`}
        >
          {content.tagline && (
            <p className={`text-sm font-semibold text-amber-300 ${brow}`}>
              {content.tagline}
            </p>
          )}
          <h1
            className={`mt-6 max-w-3xl text-[2.75rem] font-semibold leading-[1.06] sm:text-7xl ${display}`}
          >
            {content.businessName}
          </h1>

          {content.phone && (
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href={`tel:${content.phone}`}
                className="inline-flex items-center gap-2.5 rounded-full bg-amber-400 px-8 py-4 text-base font-semibold text-[#1c1917] transition hover:bg-amber-300"
              >
                {L.callToOrder} — {content.phone}
              </a>
              {content.hours && (
                <span className="inline-flex items-center gap-2 text-sm text-[#faf8f5]/70">
                  <BadgeIcon name="clock" className="h-4 w-4" />
                  {content.hours}
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {content.badges.length > 0 && (
        <section className="border-b border-[#1c1917]/10 bg-white">
          <div className="mx-auto flex max-w-6xl flex-wrap justify-center divide-[#1c1917]/10 sm:divide-x">
            {content.badges.map((badge) => (
              <div
                key={badge.label}
                className="flex flex-1 items-center justify-center gap-3 px-8 py-8 sm:min-w-[15rem]"
              >
                <BadgeIcon name={badge.icon} className="h-6 w-6 text-amber-600" />
                <p className="text-base font-medium">{badge.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {content.items.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex items-end justify-between gap-6">
            <h2 className={`text-3xl font-semibold sm:text-4xl ${display}`}>
              {L.products}
            </h2>
          </div>

          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {content.items.map((item) => (
              <article key={item.title} className="group">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-[#1c1917]/10 bg-white">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt=""
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Monogram
                        name={item.title}
                        className="text-6xl font-semibold text-[#1c1917]/20"
                      />
                    </div>
                  )}
                </div>
                <h3 className="mt-5 text-xl font-medium">{item.title}</h3>
                {item.description && (
                  <p className="mt-2 leading-relaxed text-[#1c1917]/60">
                    {item.description}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {content.about && (
        <section className="bg-[#1c1917] text-[#faf8f5]">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-24 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            <h2 className={`text-3xl font-semibold sm:text-4xl ${display}`}>
              {L.shopAbout}
            </h2>
            <p className="whitespace-pre-line text-lg leading-[1.8] text-[#faf8f5]/75">
              {content.about}
            </p>
          </div>
        </section>
      )}

      {content.gallery.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-4 sm:grid-cols-3">
            {content.gallery.map((src) => (
              <img
                key={src}
                src={src}
                alt=""
                className="aspect-square w-full rounded-2xl object-cover"
              />
            ))}
          </div>
        </section>
      )}

      <footer className="border-t border-[#1c1917]/10">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className={`text-3xl font-semibold ${display}`}>
            {L.shopAddress}
          </h2>
          <dl className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {content.address && (
              <div>
                <dt className="flex items-center gap-2 text-sm text-[#1c1917]/50">
                  <BadgeIcon name="tag" className="h-4 w-4" />
                  {L.address}
                </dt>
                <dd className="mt-2 text-lg">{content.address}</dd>
              </div>
            )}
            {content.phone && (
              <div>
                <dt className="text-sm text-[#1c1917]/50">{L.phone}</dt>
                <dd className="mt-2 text-lg">
                  <a href={`tel:${content.phone}`}>{content.phone}</a>
                </dd>
              </div>
            )}
            {content.email && (
              <div>
                <dt className="text-sm text-[#1c1917]/50">{L.email}</dt>
                <dd className="mt-2 text-lg break-all">
                  <a href={`mailto:${content.email}`}>{content.email}</a>
                </dd>
              </div>
            )}
            {content.hours && (
              <div>
                <dt className="flex items-center gap-2 text-sm text-[#1c1917]/50">
                  <BadgeIcon name="clock" className="h-4 w-4" />
                  {L.openHours}
                </dt>
                <dd className="mt-2 text-lg">{content.hours}</dd>
              </div>
            )}
          </dl>
        </div>
      </footer>
    </div>
  );
}
