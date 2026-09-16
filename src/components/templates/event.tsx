/* eslint-disable @next/next/no-img-element */
import { siteLabels } from "@/lib/i18n";
import type { SiteContent } from "@/lib/site-content";

export default function EventTemplate({ content }: { content: SiteContent }) {
  const L = siteLabels(content.language);
  const [cover, ...rest] = content.gallery;

  return (
    <div className="min-h-full bg-rose-50 font-serif text-rose-950">
      <header className="relative">
        {cover ? (
          <img src={cover} alt="" className="h-72 w-full object-cover" />
        ) : (
          <div className="h-56 w-full bg-gradient-to-br from-rose-200 via-pink-200 to-rose-300" />
        )}
        <div className="mx-auto -mt-16 max-w-2xl px-6">
          <div className="rounded-2xl bg-white/95 p-8 text-center shadow-lg backdrop-blur">
            {content.logoUrl && (
              <img
                src={content.logoUrl}
                alt=""
                className="mx-auto mb-4 h-16 w-16 rounded-full object-cover"
              />
            )}
            <h1 className="text-3xl italic tracking-wide">
              {content.businessName}
            </h1>
            {content.tagline && (
              <p className="mt-3 text-rose-700">{content.tagline}</p>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">
        {rest.length > 0 && (
          <section className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {rest.map((src) => (
              <img
                key={src}
                src={src}
                alt=""
                className="aspect-[4/5] w-full rounded-xl object-cover shadow-sm"
              />
            ))}
          </section>
        )}

        {content.services.length > 0 && (
          <section className="mt-12 text-center">
            <h2 className="text-sm font-semibold text-rose-500">
              {L.services}
            </h2>
            <ul className="mt-6 flex flex-wrap justify-center gap-3">
              {content.services.map((service) => (
                <li
                  key={service}
                  className="rounded-full border border-rose-300 bg-white px-5 py-2 text-sm"
                >
                  {service}
                </li>
              ))}
            </ul>
          </section>
        )}

        {content.about && (
          <section className="mt-12 text-center">
            <h2 className="text-sm font-semibold text-rose-500">
              {L.ourWords}
            </h2>
            <p className="mt-4 whitespace-pre-line text-lg leading-loose italic">
              {content.about}
            </p>
          </section>
        )}

        {content.highlights.length > 0 && (
          <section className="mt-12 grid gap-4 sm:grid-cols-3">
            {content.highlights.map((item) => (
              <p
                key={item}
                className="rounded-xl bg-white p-5 text-center shadow-sm"
              >
                {item}
              </p>
            ))}
          </section>
        )}

        <section className="mt-12 rounded-2xl bg-rose-600 p-8 text-center text-white">
          <h2 className="text-2xl italic">{L.eventCta}</h2>
          {content.phone && (
            <a
              href={`tel:${content.phone}`}
              className="mt-4 inline-block rounded-full bg-white px-8 py-3 font-sans text-sm font-semibold text-rose-700"
            >
              {content.phone}
            </a>
          )}
          <div className="mt-4 space-y-1 text-sm text-rose-100">
            {content.email && <p>{content.email}</p>}
            {content.address && <p>{content.address}</p>}
          </div>
        </section>
      </main>
    </div>
  );
}
