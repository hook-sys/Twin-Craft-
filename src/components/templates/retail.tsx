/* eslint-disable @next/next/no-img-element */
import { siteLabels } from "@/lib/i18n";
import type { SiteContent } from "@/lib/site-content";
import { displayTracking, eyebrow } from "./shared";

export default function RetailTemplate({ content }: { content: SiteContent }) {
  const L = siteLabels(content.language);
  const brow = eyebrow(content.language);
  const [hero, ...rest] = content.gallery;

  return (
    <div className="min-h-full bg-stone-50 font-sans text-stone-900">
      <header className="sticky top-0 z-10 border-b border-stone-200 bg-stone-50/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <div className="flex items-center gap-3">
            {content.logoUrl ? (
              <img
                src={content.logoUrl}
                alt=""
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-900 text-sm font-semibold text-stone-50">
                {content.businessName.charAt(0)}
              </span>
            )}
            <span className="text-lg font-semibold">{content.businessName}</span>
          </div>
          {content.phone && (
            <a
              href={`tel:${content.phone}`}
              className="hidden rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-stone-50 sm:inline-block"
            >
              {L.callToOrder}
            </a>
          )}
        </div>
      </header>

      <section className="relative overflow-hidden">
        {hero ? (
          <>
            <img src={hero} alt="" className="h-[32rem] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/60 to-stone-950/20" />
          </>
        ) : (
          <div className="h-[26rem] w-full bg-gradient-to-br from-amber-200 via-stone-200 to-stone-300" />
        )}

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="max-w-xl">
              {content.tagline && (
                <p
                  className={`text-sm font-semibold ${brow} ${
                    hero ? "text-amber-200" : "text-stone-600"
                  }`}
                >
                  {content.tagline}
                </p>
              )}
              <h1
                className={`mt-4 text-5xl font-semibold leading-[1.05] sm:text-6xl ${displayTracking(
                  content.language,
                )} ${hero ? "text-white" : "text-stone-900"}`}
              >
                {content.businessName}
              </h1>
              {content.phone && (
                <a
                  href={`tel:${content.phone}`}
                  className="mt-8 inline-block rounded-full bg-amber-400 px-8 py-3.5 text-sm font-semibold text-stone-900"
                >
                  {L.callToOrder} — {content.phone}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {content.highlights.length > 0 && (
        <section className="border-y border-stone-200 bg-white">
          <div className="mx-auto flex max-w-6xl flex-wrap justify-center divide-stone-200 sm:divide-x">
            {content.highlights.map((item) => (
              <p
                key={item}
                className="flex-1 px-8 py-8 text-center text-base font-medium text-stone-700 sm:min-w-[14rem]"
              >
                {item}
              </p>
            ))}
          </div>
        </section>
      )}

      {content.services.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-24">
          <p className={`text-sm font-semibold text-amber-700 ${brow}`}>
            {L.products}
          </p>
          <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {content.services.map((service, index) => (
              <article key={service} className="group">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-stone-200">
                  {rest[index] ? (
                    <img
                      src={rest[index]}
                      alt=""
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-stone-200 to-amber-100" />
                  )}
                </div>
                <h3 className="mt-4 text-lg font-medium">{service}</h3>
              </article>
            ))}
          </div>
        </section>
      )}

      {content.about && (
        <section className="bg-stone-900 text-stone-100">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-[1fr_1.2fr]">
            <h2
              className={`text-4xl font-semibold leading-tight ${displayTracking(
                content.language,
              )}`}
            >
              {L.shopAbout}
            </h2>
            <p className="whitespace-pre-line text-lg leading-relaxed text-stone-300">
              {content.about}
            </p>
          </div>
        </section>
      )}

      <footer className="mx-auto max-w-6xl px-6 py-20">
        <p className={`text-sm font-semibold text-amber-700 ${brow}`}>
          {L.shopAddress}
        </p>
        <dl className="mt-8 grid gap-8 text-sm sm:grid-cols-2 lg:grid-cols-4">
          {content.address && (
            <div>
              <dt className="text-stone-500">{L.address}</dt>
              <dd className="mt-1 text-base">{content.address}</dd>
            </div>
          )}
          {content.phone && (
            <div>
              <dt className="text-stone-500">{L.phone}</dt>
              <dd className="mt-1 text-base">{content.phone}</dd>
            </div>
          )}
          {content.email && (
            <div>
              <dt className="text-stone-500">{L.email}</dt>
              <dd className="mt-1 text-base">{content.email}</dd>
            </div>
          )}
          {content.hours && (
            <div>
              <dt className="text-stone-500">{L.openHours}</dt>
              <dd className="mt-1 text-base">{content.hours}</dd>
            </div>
          )}
        </dl>
      </footer>
    </div>
  );
}
