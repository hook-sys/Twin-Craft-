/* eslint-disable @next/next/no-img-element */
import { siteLabels } from "@/lib/i18n";
import type { SiteContent } from "@/lib/site-content";
import { displayTracking, eyebrow } from "./shared";

export default function RestaurantTemplate({
  content,
}: {
  content: SiteContent;
}) {
  const L = siteLabels(content.language);
  const brow = eyebrow(content.language);
  const [hero, ...rest] = content.gallery;
  const half = Math.ceil(content.services.length / 2);
  const columns = [
    content.services.slice(0, half),
    content.services.slice(half),
  ];

  return (
    <div className="min-h-full bg-[#0f0d0b] font-serif text-[#f3ece1]">
      <section className="relative">
        {hero ? (
          <>
            <img src={hero} alt="" className="h-[34rem] w-full object-cover" />
            <div className="absolute inset-0 bg-black/55" />
          </>
        ) : (
          <div className="h-[28rem] w-full bg-gradient-to-b from-[#241d16] to-[#0f0d0b]" />
        )}

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          {content.logoUrl && (
            <img
              src={content.logoUrl}
              alt=""
              className="mb-8 h-20 w-20 rounded-full object-cover ring-1 ring-amber-300/60"
            />
          )}
          <p className={`text-sm font-semibold text-amber-300 ${brow}`}>
            {L.welcome}
          </p>
          <h1
            className={`mt-5 max-w-3xl text-5xl leading-[1.08] sm:text-7xl ${displayTracking(
              content.language,
            )}`}
          >
            {content.businessName}
          </h1>
          {content.tagline && (
            <p className="mt-6 max-w-lg text-lg italic text-[#f3ece1]/70">
              {content.tagline}
            </p>
          )}
        </div>
      </section>

      {content.services.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 py-24">
          <p className={`text-center text-sm font-semibold text-amber-300 ${brow}`}>
            {L.menu}
          </p>
          <div className="mt-12 grid gap-x-16 sm:grid-cols-2">
            {columns.map((column, index) => (
              <ul key={index}>
                {column.map((item) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-3 border-b border-amber-300/15 py-5 text-lg"
                  >
                    <span>{item}</span>
                    <span className="flex-1" />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </section>
      )}

      {content.about && (
        <section className="border-y border-amber-300/15 bg-[#161210]">
          <div className="mx-auto max-w-2xl px-6 py-24 text-center">
            <p className={`text-sm font-semibold text-amber-300 ${brow}`}>
              {L.story}
            </p>
            <p className="mt-8 whitespace-pre-line text-xl leading-[1.9] text-[#f3ece1]/85">
              {content.about}
            </p>
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="grid grid-cols-2 gap-1 sm:grid-cols-3">
          {rest.map((src) => (
            <img
              key={src}
              src={src}
              alt=""
              className="aspect-square w-full object-cover"
            />
          ))}
        </section>
      )}

      <footer className="mx-auto max-w-3xl px-6 py-24 text-center">
        {content.hours && (
          <p className="text-lg text-[#f3ece1]/70">
            {L.openHours}: {content.hours}
          </p>
        )}
        {content.phone && (
          <a
            href={`tel:${content.phone}`}
            className="mt-8 inline-block rounded-full border border-amber-300/70 px-10 py-4 text-amber-200"
          >
            {L.bookTable} — {content.phone}
          </a>
        )}
        <div className="mt-8 space-y-1 text-sm text-[#f3ece1]/50">
          {content.address && <p>{content.address}</p>}
          {content.email && <p>{content.email}</p>}
        </div>
      </footer>
    </div>
  );
}
